let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Airbender Staff"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const clickSound = new Audio('click.wav');
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const donkeyImg = document.querySelector("#donkeyImg");

const weapons = [
  { name: 'Airbender Staff', power: 5 },
  { name: 'Garneter', power: 30 },
  { name: 'Mjolnir', power: 50 },
  { name: 'Gatito Blade', power: 100 }
];

const monsters = [
  { name: "Jehovampire", level: 2, health: 15 },
  { name: "Leviaccountant", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Yer in the toon square. Ye see a sign that says 'Store'."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ye enter the store. Yer greeted by a big, green orc, the owner: 'Whit are ye supposed tae be? A jackass in a can? Whitiver, whit can Ah dae fur ye?'"
  },
  {
    name: "cave",
    "button text": ["Fight Jehovampire", "Fight Leviaccountant", "Go to town square"],
    "button functions": [fightJehovampire, fightLeviaccountant, goTown],
    text: "Ye enter the cave. Ye see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "Yer fightin' a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: "The monster screams 'Arg!' as it dies. Ye gain experience points an' find gold."
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Ye die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Ye stumble upon a wee secret game. Pick a number above, will ye? Ten numbers'll be randomly chosen between naught and ten. If the number ye pick matches one o' the random ones, ye've got yerself a win!"
  },
  {
    name: "fight dragon",
    "button text": ["Flirt back", "Do nothing", "Run back to town"],
    "button functions": [flirtBack, flirtBack, flirtBack],
    text: "As ye near the lair, ye can hear th' dragon within, every step makin' th' grun' quake. It catches yer scent, roarin' in anger. Ye steel yersel' fer th' battle. But when ye stand afore it, ye notice somethin': makeup on th' snoot, polished nails, a scent o' coconut soap... it's a lass-dragon! She halts an' fixates her gaze on ye wi' sparklin' een. She begins tae flirt wi' ye... whit dae ye dae?"
  },
  {
    name: "win1",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, easterEgg],
    text: "The drag'n instantly fa's in love wi' ye. She's mair powerful an' quicker than ye, so she grabs ye wi' her paw an' flies aff far awa'. Ye end up wedded an' wi' a wheen o' wee bairns."
  }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function playClickSound() {
  clickSound.play();
}

button1.addEventListener('click', playClickSound);
button2.addEventListener('click', playClickSound);
button3.addEventListener('click', playClickSound);

function update(location) {
  monsterStats.style.display = "none";
  button1.textContent = location["button text"][0];
  button2.textContent = location["button text"][1];
  button3.textContent = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function flirtBack() {
  update(locations[9]);
}

function goTown() {
  donkeyImg.src = "donkey.png";
  update(locations[0]);
}

function goStore() {
  donkeyImg.src = "orc.png";
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Ye dinnae have enough gold tae buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ye noo have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In yer inventory ye have: " + inventory;
    } else {
      text.innerText = "Ye dinnae have enough gold tae buy a weapon.";
    }
  } else {
    text.innerText = "Ye already have the maist powerful weapon!";
    button2.innerText = "Sell weapon fur 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ye sold a " + currentWeapon + ".";
    text.innerText += " In yer inventory ye have: " + inventory;
  } else {
    text.innerText = "Dinnae sell yer only weapon!";
  }
}

function fightJehovampire() {
  fighting = 0;
  donkeyImg.src = "Jehovampire.png";
  goFight();
}

function fightLeviaccountant() {
  fighting = 1;
  donkeyImg.src = "Leviaccountant.png";
  goFight();
}

function fightDragon() {
  donkeyImg.src = "output.jpg";
  update(locations[8]);
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " Ye attack it wi' yer " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Ye miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Yer " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Ye dooj th' attaack frae th' " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  var audio = new Audio('./Output 1-2.mp3');
  audio.play();
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Airbender Staff"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  donkeyImg.src = "donkey.png";
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Ye picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! Ye win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! Ye lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
