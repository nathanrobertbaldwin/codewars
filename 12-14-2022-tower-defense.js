// Class Info

class PathTiles {

  static orderedPathTiles = [];

  constructor(y, x) {
    this.y = y;
    this.x = x;
    this.arr = [y, x]

    PathTiles.orderedPathTiles.push(this.arr);
  }

  move(y, x) {
    let nextLocation = new PathTiles(y, x);
    return nextLocation;
  }
}

class Turret {

  static allTurrets = []

  constructor(turretID, position, range, fireRate, pathCellsInRange = []) {
    this.turret = turretID;
    this.position = position;
    this.range = range;
    this.fireRate = fireRate;
    this.pathCellsInRange = pathCellsInRange;

    Turret.allTurrets.push(this)
  }
}

class Alien {

  static allAliens = [];

  constructor(alienHealth, position) {
    this.alienHealth = alienHealth;
    this.position = position;

    Alien.allAliens.push(this)

  }

  hitAlien() {

  }
}

// Helper functions.
// Function 1: Adds a border to the grid to avoid out of bounds errors.
_getBorderedGrid = grid => {

  let length = grid[0].length
  grid.unshift("#".repeat(length + 2));
  grid.push("#".repeat(length + 2));

  length = grid[0].length;
  for (let i = 1; i < length - 1; i++) {
    grid[i] = `#${grid[i]}#`
  }

  return grid;

}

// Function 2: Mutates grid into an array to make it easier to generated ordered path data.

_getGridArray = grid => {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split('')
  }
  return grid;
}

// Function 3: Grabs the starting index.

_getStartIndex = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    if (row.includes("0")) {
      startIndex = new PathTiles(i, row.indexOf("0"))
    }
  }
  return startIndex;
}

// Function 4: Generates an array of the cells along the path in the correct order.

_getLinkedPathData = (grid, currentLocation) => {

  let y = currentLocation.y;
  let x = currentLocation.x;

  let moveRight = grid[y][x + 1];
  let moveLeft = grid[y][x - 1];
  let moveUp = grid[y - 1][x];
  let moveDown = grid[y + 1][x];

  if (![moveRight, moveLeft, moveUp, moveDown].includes("1")) return;

  let nextLocation;

  if (moveRight === "1") nextLocation = currentLocation.move(y, x + 1);
  if (moveLeft === "1") nextLocation = currentLocation.move(y, x - 1);
  if (moveUp === "1") nextLocation = currentLocation.move(y - 1, x);
  if (moveDown === "1") nextLocation = currentLocation.move(y + 1, x);

  grid[y][x] = "@";
  _getLinkedPathData(grid, nextLocation)

}

// Function 5: Generate a class of turrets with data on which cells they can affect.

_getTurretData = (grid, turrets) => {

  let length = grid[0].length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {

      let char = grid[i][j];
      if (/[A-Z]/.test(char)) {
        new Turret(char, [i, j], turrets[char][0], turrets[char][1])
      }
    }
  }
}

// Function 6: Updates the turrets with a list of path tiles in range for each turret.

_getTargetedCells = (turrets, linkedPath) => {

  for (let i = 0; i < turrets.length; i++) {
    let currentTurret = turrets[i];
    for (let j = 0; j < linkedPath.length; j++) {
      let pathCell = linkedPath[j];
      let distance = Math.sqrt(((currentTurret.position[0] - pathCell[0]) ** 2) + ((currentTurret.position[1] - pathCell[1]) ** 2));
      if (distance <= currentTurret.range) {
        currentTurret.pathCellsInRange.push(pathCell);
      }
    }
  }
}

  // Function 7: Generates a class of aliens with health and position data.

_getAlienData = (aliens) => {
  for (let i = 0; i < aliens.length; i++) {
    new Alien (aliens[i], [0,0]);
  }
}

// Main function

function towerDefense(grid, turrets, aliens) {

  // Function 1: Adds a border to the grid to avoid out of bounds errors.
  grid = _getBorderedGrid(grid);

  // Function 2: Mutates grid into an array to make it easier to generated ordered path data.
  grid = _getGridArray(grid);

  // Function 3: Grabs the starting index.
  let startIndex = _getStartIndex(grid);

  // Function 4: Generates an array of cells along the path in the correct order.
  _getLinkedPathData(grid, startIndex);
  let linkedPath = PathTiles.orderedPathTiles;

  // Function 5: Generate a class of turrets with data on which cells are in range.
  _getTurretData(grid, turrets, linkedPath);
  let allTurrets = Turret.allTurrets;

  // Function 6: Updates the turrets with a list of path tiles in range for each turret.
  _getTargetedCells(allTurrets, linkedPath)
  allTurrets = Turret.allTurrets;

  // Function 7: Generates a class of aliens with health and position data.
  _getAlienData(aliens);
  let allAliens = Alien.allAliens;

  console.log("REPORT")
  console.log("___________________________")
  console.log(grid)
  console.log("___________________________")
  console.log(linkedPath)
  console.log("___________________________")
  console.log(allTurrets)
  console.log("___________________________")
  console.log(allAliens)
  console.log("REPORT END")
  // Function 8: Move Aliens through the battlefield.

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

let turrets = { A: [3, 2], B: [1, 4], C: [2, 2], D: [1, 3] };

let wave = [5, 26, 30, 14, 27, 21, 13, 0, 15, 17, 0, 18];

console.log(towerDefense(battlefield, turrets, wave)); //10
