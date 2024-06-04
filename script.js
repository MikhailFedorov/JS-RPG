let xp = 0;
let health = 100;
let maxHealth = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let flatterFlag = false;
let roomCost = 50;
let campFlag = false;
let askFlag = false;

const locations1 = [
  {
    id: 0,
    name: "town square",
    "button text": ["Go to store", "Go to inn", "Explore"],
    "button functions": [goStore, goInn, explore],
    text: "You are in the Town square."
  },
  {
    id: 1,
    name: "store",
    "button text": ["Buy health (10 gold)", "Buy weapon (30 gold)", "Go to Town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in the store."
  },
  {
    id: 2,
    name: "cave",
    "button text": ["Fight slime", "Fight goblin", "Go to Town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You can hear squelching noises in the dark. After approaching it you notice a slime. You can see bones floating in his translucent body. They probably belong to an unfortunate villager who decided to explore the cave. With the corner of your eye you see a dark figure in the shadows. It is a goblin who fell asleep. Maybe you can beat some information about the base out of him? "
  },
  {
    id: 3,
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You have started a fight."
  },
  {
    id: 4,
    name: "defeatMonster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
  },
  {
    id: 5,
    name: "victory",
    "button text": ["NG+", "NG+", "NG+"],
    "button functions": [goTown, goTown, goTown],
    text: "You have won the game!!!"
  },
  {
    id: 6,
    name: "lose",
    "button text": ["Restart", "Restart", "Restart"],
    "button functions": [restart, restart, restart],
    text: "You died."
  },
  {
    id: 7,
    name: "easterEgg",
    "button text": ["Pick 2", "Pick 8", "Go to Town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    id: 8,
    name: "town square start",
    "button text": ["Go to store", "Go to inn"],
    "button functions": [goStore, goInn],
    text: "You are in the Town square."
  },
  {
    id: 9,
    name: "inn",
    "button text": ["Buy room for a night (" + roomCost + " gold)", "Talk to the owner", "Go to Town square"],
    "button functions": [buyRoom, talkInn, goTown],
    text: "You enter the inn. You see an old sturdy man sitting at the desk right next to the entrance. You look at the ledger at his desk and see that there are available rooms left. A good night sleep would probably restore most of your health."
  },
  {
    id: 10,
    name: "talk inn",
    "button text": ["Ask about monsters", "Praise his inn", "Go back"],
    "button functions": [askMonsters, praiseInn, goInn],
    text: "You approach the man who turned out to be an owner. He looks at you with a friendly smile. \"Hello, traveller! You sure look tired! Feel free to buy a room at my precious inn!\" "
  },
  {
    id: 11,
    name: "explore",
    "button text": ["Go to the cave", "Go to Town", "Go to the goblin camp"],
    "button functions": [goCave, goTown, fightDragon],
    text: "You go through the main gates and stand on the road. Which way will you go?"
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
    hp: 25
  },
  {
    name: "Goblin warrior",
    level: 8,
    hp: 100
  },
  {
    name: "Goblin warlord",
    level: 20,
    hp: 300
  }
]

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const inventoryButton = document.querySelector("#inventory");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

button1.onclick = goStore;
button2.onclick = goInn;
button3.onclick = explore;
inventoryButton.onclick = openInventory;

function update(location) {
  text.innerText = location.text;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

function openInventory() {
  tempText = text.innerText;
  text.innerText = inventory;
  inventoryButton.innerText = "Back to menu";
  document.querySelector("#controls").style.display = "none";
  inventoryButton.onclick = closeInventory;
};

function closeInventory() {
  text.innerText = tempText;
  inventoryButton.innerText = "Inventory"
  document.querySelector("#controls").style.display = "block";
  inventoryButton.onclick = openInventory;
};

function goInn(){
  button3.style.display = "block";
  update(locations1[9]);
}

function buyRoom() {
  if (gold >= roomCost) {
    gold -= roomCost;
    health = maxHealth;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You feel fully rested!";
  }
  else {
    text.innerText = "You don't have enough money";
  }
};



function talkInn() {
  update(locations1[10]);
}

function askMonsters() {
  if (askFlag == false){
    text.innerText = "Oh, yes, we do have problems with monsters. These damn goblins keep raiding caravans transporting goods to our town and attacking people who wander too far outside town. Killing their leader would probably stop their tyranny but no one knows where his base is. Anyway, you dont look like you are strong enugh to defeat him right now. However, you could help with other thing - there's a cave near the river villagers are taking water from and some people heard strange noises coming from there recently. You would realy help by investigating it because people are now afraid to come near that place. *You can now explore the cave.*";
    askFlag = true;
  } else {
    text.innerText = "Unfortunately I don't have anything else to tell you.";
  }
};

function praiseInn() {
  if (flatterFlag == false){
    text.innerText = "Thank you, traveller. I can see you have a good taste. You know what? Let me give you a discount for that! *room price is reduced.*";
    flatterFlag = true;
    roomCost -= 10;
  } else {
    text.innerText = "You flatter me too much!";
  }
};

function goStore() {
  button3.style.display = "block";
  update(locations1[1]);
};

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    maxHealth += 10;
    roomCost += 10;
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
  monsterStats.style.display = "none";
  if (askFlag == true){
    button3.style.display = "block";
    update(locations1[0]);
  } else {
    button3.style.display = "none";
    update(locations1[8]);
  }
};

function explore() {
  if (campFlag == false) {
    button3.style.display = "none";
  }
  update(locations1[11]);
}

function goCave() {
  update(locations1[2]);
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
  update(locations1[3]);
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
    if (monsters[fighting].name == "Goblin warlord") {
      victory();
    } else if (monsters[fighting].name == "Goblin warrior"){
      campFlag = true;
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
  button3.style.display = "block";
  update(locations1[4]);
  text.innerText = "You have defeated " + monsters[fighting].name + " ! Now you can go back to Town square and mend your wounds."
  monsterStats.style.display = "none";
  gold += Math.floor(monsters[fighting].level * 6.7);
  goldText.innerText = gold;
  xp += monsters[fighting].level;
  xpText.innerText = xp;
};

function lose() {
  update(locations1[6]);
  monsterStats.style.display = "none";
  gold = 0;
  health = 0;
  healthText.innerText = health;
  goldText.innerText = gold;
  xp = 0;
  xpText.innerText = xp;
};

function restart() {
  update(locations1[8]);
  gold = 50;
  health = 100;
  xp = 0;
  healthText.innerText = health;
  goldText.innerText = gold;
  xpText.innerText = xp;
  maxhealth = 100;
  currentWeapon = 0;
  inventory = ["stick"];
  flatterFlag = false;
  roomCost = 50;
  campFlag = false;
  askFlag = false;
};

function victory() {
  update(locations1[5]);
};

function easterEgg(){
  update(locations1[7]);
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

