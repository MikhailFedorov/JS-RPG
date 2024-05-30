let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the Town square."
  },
  {
    name: "store",
    "button text": ["Buy health (10 gold)", "Buy weapon (30 gold)", "Go to Town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight beast", "Go to Town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see a slime squelching near you and a beast lurking in the dark."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You have started a fight."
  },
  {
    name: "defeatMonster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
  },
  {
    name: "victory",
    "button text": ["NG+", "NG+", "NG+"],
    "button functions": [goTown, goTown, goTown],
    text: "You have won the game!!!"
  },
  {
    name: "lose",
    "button text": ["Restart", "Restart", "Restart"],
    "button functions": [restart, restart, restart],
    text: "You died."
  },
  {
    name: "easterEgg",
    "button text": ["Pick 2", "Pick 8", "Go to Town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
]

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "warhammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  },
];

const monsters = [
  {
    name: "Slime",
    level: 2,
    hp: 15
  },
  {
    name: "Fanged beast",
    level: 8,
    hp: 60
  },
  {
    name: "Dragon",
    level: 20,
    hp: 300
  }
]

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  text.innerText = location.text;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

function goStore() {
  update(locations[1]);
};

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "Your health is increased!";
  }
  else {
    text.innerText = "You don't have enough money";
  }

};

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      goldText.innerText = gold;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText = "You have bought a " + newWeapon + ".";
      text.innerText += " Now you have " + inventory + " in your inventory.";
    } else {
      text.innerText = "You don't have enough money";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
};

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " Now you have " + inventory + " in your inventory.";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
function goTown() {
  update(locations[0]);
};

function goCave() {
  update(locations[2]);
};

function fightSlime() {
  fighting = 0;
  goFight();
};

function fightBeast() {
  fighting = 1;
  goFight();
};

function fightDragon() {
  fighting = 2;
  goFight();
};

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].hp;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
};

function attack() {
  if (isMonsterHit()) {
    let monsterDamage = getMonsterAttackValue(monsters[fighting].level);
    health -= monsterDamage;
    healthText.innerText = health;
    text.innerText = "The " + monsters[fighting].name + " attacks you for " + monsterDamage + " damage!";
  } else {
    text.innerText = "The " + monsters[fighting].name + " misses!";
  }
  if (isPlayerHit()) {
    let playerDamage = getPlayerAttackValue();
    monsterHealth -= playerDamage;
    monsterHealthText.innerText = monsterHealth;
    text.innerText += "You attack " + monsters[fighting].name + " for " + playerDamage + " damage!";
  } else {
    text.innerText += "You miss.";
  }
  
  

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
    if (monsters[fighting].name == "Dragon") {
      victory();
    }
  }
};

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    if (hit < 0) {
      hit = 0;
    }
    return hit;
}

function getPlayerAttackValue() {
  let attackValue = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;
  return attackValue
};

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
};

function isPlayerHit() {
  return Math.random() > .2
};

function dodge() {
  text.innerText = "You dodged an attack from the " + monsters[fighting].name + ".";
};

function defeatMonster() {
  update(locations[4]);
  text.innerText = "You have defeated " + monsters[fighting].name + " ! Now you can go back to Town square and mend your wounds."
  monsterStats.style.display = "none";
  gold += Math.floor(monsters[fighting].level * 6.7);
  goldText.innerText = gold;
  xp += monsters[fighting].level;
  xpText.innerText = xp;
};

function lose() {
  update(locations[6]);
  monsterStats.style.display = "none";
  gold = 0;
  health = 0;
  healthText.innerText = health;
  goldText.innerText = gold;
  xp = 0;
  xpText.innerText = xp;
};

function restart() {
  update(locations[0]);
  gold = 50;
  health = 100;
  healthText.innerText = health;
  goldText.innerText = gold;
};

function victory() {
  update(locations[5]);
};

function easterEgg(){
  update(locations[7]);
}

function pickTwo() {
  pick(2);
};

function pickEight() {
  pick(8);
};

function pick(number) {
  goTown();
  let numbers = [];
  while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + number + ". Here are the random numbers:\n";

  for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
  }
  
  if (numbers.indexOf(number) !== -1) {
    gold += 20;
    goldText.innerText = gold;
    text.innerText += "Right! You win 20 gold."
  } else {
    health -= 10
    healthText.innerText = health;
    text.innerText += "Wrong! You loose 10 hp."
    if (health <= 0){
      lose();
    }
  }
  
  
};

