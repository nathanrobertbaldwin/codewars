// Class Info

class PathTile {

  static orderedPathTiles = [];

  constructor(y, x) {
    this.y = y;
    this.x = x;
    this.arr = [y, x]

    PathTile.orderedPathTiles.push(this.arr);
  }

  move(y, x) {
    let nextLocation = new PathTile(y, x);
    return nextLocation;
  }
}

class Turret {

  static allTurrets = []

  constructor(turretID, position, range, fireRate) {
    this.turretID = turretID;
    this.position = position;
    this.range = range;
    this.fireRate = fireRate;

    Turret.allTurrets.push(this)
  }

  _getFarthestAlienInRange(aliensOnBattlefield) {

    let filteredForRange = aliensOnBattlefield.filter(currentAlien => {
      let distance = Math.sqrt(((this.position[0] - currentAlien.position[0]) ** 2) + ((this.position[1] - currentAlien.position[1]) ** 2));
      return (distance <= this.range);
    })

    let farthestAlien;
    let farthestMovement = 0;
    for (let i = 0; i < filteredForRange.length; i++) {
      let currentAlien = filteredForRange[i];
      if (currentAlien.timesMoved > farthestMovement) {
        farthestAlien = currentAlien;
        farthestMovement = currentAlien.timesMoved;
      }
    }

    return farthestAlien;

  }

  static fireUponAlien(aliensOnBattlefield) {

    if (aliensOnBattlefield.length === 0) return;

    for (let i = 0; i < this.allTurrets.length; i++) {
      let currentTurret = this.allTurrets[i];
      let farthestAlien = currentTurret._getFarthestAlienInRange(aliensOnBattlefield);
      if (farthestAlien === undefined) continue;
      console.log(`Turret ${currentTurret.turretID} aimed at Alien ${farthestAlien.alienID}`)
      farthestAlien.alienHealth -= currentTurret.fireRate;
      console.log(`Alien ${farthestAlien.alienID} took ${currentTurret.fireRate} damage!`)
    }
  }
}

class Alien {

  static alienID = 1;
  static allAliens = [];

  static totalAlienHealth() {
    let sum = 0;
    for (let i = 0; i < this.allAliens.length; i++) {
      let currentAlien = this.allAliens[i];
      if (currentAlien.alienHealth < 0) currentAlien.alienHealth = 0;
      sum += currentAlien.alienHealth;
    }
    return sum;
  }

  constructor(alienHealth, position) {
    this.alienHealth = alienHealth;
    this.position = position;
    this.timesMoved = 0;
    this.alienID = Alien.alienID;

    Alien.alienID++;
    Alien.allAliens.push(this)
  }

  moveAlien(linkedPath) {
    this.timesMoved++;
    this.position = linkedPath[this.timesMoved];
  }
}

// Helper functions.
// Function 1: Mutates battlefield - adding a border - to avoid out of bounds errors while creating path data.

_getBorderedBattlefield = battlefield => {

  let length = battlefield[0].length
  battlefield.unshift("#".repeat(length + 2));
  battlefield.push("#".repeat(length + 2));

  length = battlefield[0].length;
  for (let i = 1; i < length - 1; i++) {
    battlefield[i] = `#${battlefield[i]}#`
  }

  return battlefield;

}

// Function 2: Mutates battlefield = converting it into an array - to make it easier to generated ordered path data.

_getBattlefieldArray = battlefield => {

  for (let i = 0; i < battlefield.length; i++) {
    battlefield[i] = battlefield[i].split('')
  }

  return battlefield;

}

// Function 3: Grabs the index of the starting cell.

_getStartIndex = (battlefield) => {

  for (let i = 0; i < battlefield.length; i++) {
    let row = battlefield[i];
    if (row.includes("0")) {
      startIndex = new PathTile (i, row.indexOf("0"))
    }
  }
  return startIndex;
}

// Function 4: Generates an array of ordered pairs that represent the path.

_generateLinkedPathData = (currentLocation, battlefield) => {

  let y = currentLocation.y;
  let x = currentLocation.x;

  let moveRight = battlefield[y][x + 1];
  let moveLeft = battlefield[y][x - 1];
  let moveUp = battlefield[y - 1][x];
  let moveDown = battlefield[y + 1][x];

  if (![moveRight, moveLeft, moveUp, moveDown].includes("1")) return;

  let nextLocation;

  if (moveRight === "1") nextLocation = currentLocation.move(y, x + 1);
  if (moveLeft === "1") nextLocation = currentLocation.move(y, x - 1);
  if (moveUp === "1") nextLocation = currentLocation.move(y - 1, x);
  if (moveDown === "1") nextLocation = currentLocation.move(y + 1, x);

  battlefield[y][x] = "@";
  _generateLinkedPathData(nextLocation, battlefield);

}

_generateModifiedLinkedPathData = (linkedPath, waveLength) => {
  for (let i = 0; i < waveLength; i++) {
    linkedPath.push([Infinity, Infinity])
  }
  return linkedPath;
}

// Function 5: Generate a class of turrets.

_generateTurretData = (battlefield, turrets) => {

  let length = battlefield[0].length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {

      let char = battlefield[i][j];
      if (/[A-Z]/.test(char)) {
        new Turret(char, [i, j], turrets[char][0], turrets[char][1])
      }
    }
  }
}

// Function 6: Generates a class of aliens with health and position data.

_generateAlienData = (wave, startIndex) => {

  for (let i = 0; i < wave.length; i++) {
    let alienHealth = wave[i];
    if (alienHealth > 0) wave[i] = new Alien(alienHealth, startIndex);
  }

  let totalMoves = PathTile.orderedPathTiles.length;

  for (let i = wave.length; i < totalMoves; i++) {
    wave.push(0);
  }

  return wave;
}

// Function 7: Move Aliens through the battlefield and return final alien health total.

_getFinalAlienHealth = (aliensOnBattlefield) => {
  return aliensOnBattlefield.reduce((sumHealth, currentAlien) => {
    return sumHealth += currentAlien.alienHealth;
  }, 0)
}


_moveAliensThroughBattlefield = (aliens, linkedPath) => {

  let aliensOnBattlefield = [];

  for (let i = 0; i < aliens.length; i++) {

    if (i === aliens.length - 1) {
      let finalAlienHealth = _getFinalAlienHealth (aliensOnBattlefield);
      if (finalAlienHealth === 0) return "You win!"
      return finalAlienHealth;
    }

    console.log(`------- Turn ${i} -------`)
    if (aliens[i] instanceof Alien) {
      aliensOnBattlefield.push(aliens[i])
      console.log(`Alien ${aliensOnBattlefield[aliensOnBattlefield.length - 1].alienID} was added to the battlefield.`);
    }


    for (let j = aliensOnBattlefield.length - 1; j >= 0; j--) {
      let currentAlien = aliensOnBattlefield[j];
      currentAlien.moveAlien(linkedPath);
    }

    Turret.fireUponAlien(aliensOnBattlefield);

    for (let k = 0; k < aliensOnBattlefield.length; k++) {
      let currentAlien = aliensOnBattlefield[k];
      if (currentAlien.alienHealth <= 0) {
        aliensOnBattlefield.splice(k, 1);
        console.log(`Alien ${currentAlien.alienID} was destroyed!`)
      }
    }

    if (i === aliens.length - 1) {
      console.log("------- CURRENT BATTLE REPORT:-------")
      console.log(aliensOnBattlefield)
      console.log("-------END OF BATTLE REPORT.-------")
    }
    console.log(" ");
  }
}

// Main function

function towerDefense(battlefield, turrets, wave) {

  // Function 1: Mutates battlefield - adding a border - to avoid out of bounds errors while creating path data.
  battlefield = _getBorderedBattlefield(battlefield);

  // Function 2: Mutates battlefield = converting it into an array - to make it easier to generated ordered path data.
  battlefield = _getBattlefieldArray(battlefield);

  // Function 3: Grabs the index of the starting cell.
  let startIndex = _getStartIndex(battlefield);

  // Function 4: Generates an array of ordered pairs that represent the path.
  _generateLinkedPathData(startIndex, battlefield);
  let linkedPath = PathTile.orderedPathTiles;
  linkedPath.pop();
  linkedPath = _generateModifiedLinkedPathData(linkedPath, wave.length)

  // Function 5: Generate a class of turrets.
  _generateTurretData(battlefield, turrets);

  // Function 6: Generates a class of aliens with health and position data.
  _generateAlienData(wave, startIndex);

  // Function 7: Move Aliens through the battlefield and return final alien health total.

  return _moveAliensThroughBattlefield(wave, linkedPath)
}

let battlefield = [
  '0111111',
  '  A  B1',
  ' 111111',
  ' 1     ',
  ' 1C1111',
  ' 111 D1',
  '      1'
];

let turrets = {A:[3,2],B:[1,4],C:[2,2],D:[1,3]};

let wave = [30,14,27,21,13,0,15,17,0,18,26];

console.log(towerDefense(battlefield, turrets, wave))
