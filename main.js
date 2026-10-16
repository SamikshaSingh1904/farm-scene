/**
 * 
 * Author: Samiksha Singh
 * Date: 4/29/25
 * 
 * Purpose:
 * This program is written for CS307 Project. 
 * It creates a scene of a bunny hopping in a field of carrots, a chicken hopping in a field of lettuce and a barn along with some orange trees and rocks.
 * 
 */


// ====================================================================
// Imports and Initial Setup
// ====================================================================


import * as THREE from 'three';
import { TW } from 'tw';
console.log(`Loaded Three.js version ${THREE.REVISION}`);
globalThis.THREE = THREE;
globalThis.TW = TW;

import { createBunny } from './bunny.js';
import { createLettuce } from './lettuce.js';
import { createHen } from './hen.js';
import { createStardewBarn } from './barn.js';
import { createCarrot } from './carrot.js';
import { createOrangeTree } from './tree.js';
import { createRock } from './rock.js';

// ====================================================================
// Scene Setup
// ====================================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background
globalThis.scene = scene;
// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize TW 
TW.mainInit(renderer, scene);

const camera = new THREE.PerspectiveCamera(
  60,                                   // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                  // Near 
  1000                                  // Far 
);

// Position camera above the field 
camera.position.set(0, 17, 25);
camera.up.set(0, 1, 0);        
camera.lookAt(0, 5, 0); 
camera.updateProjectionMatrix();
globalThis.camera = camera;
TW.render = function() {
  renderer.render(scene, camera);
};



// ====================================================================
// Animation Parameters
// ====================================================================


/*
 * Set up animation parameters for bunny. 
 * 
 */
const bunnyParams = {
  bunnySize: 1,         
  hopPeriod: 2,         // time to complete one hop 
  maxHopHeight: 2,      // Maximum height bunny reaches at peak of hop
  deltaT: 0.035,        // Time step between animation frames 
  hopDistance: 3        // hop distance
};

/*
 * Set up animation parameters for hen. 
 * 
 */
const henParams = {
  henSize: 1,         
  hopPeriod: 2.5,       // time to complete one hop (slightly slower than bunny)
  maxHopHeight: 2,    // Maximum height hen reaches at peak of hop (lower than bunny)
  deltaT: 0.035,        // Time step between animation frames 
  hopDistance: 3        // hop distance
};


/*
 * Keeps track of time, position, which lettuce has been eaten.
 * 
 * The zigzag pattern is done by flipping directionRight every time the bunny reaches an edge of the field.
 */
let bunnyAnimationState = {
  time: 0,              // Current animation time
  bunnyHeight: bunnyParams.bunnySize, // Current bunny y-position
  bunnyX: -bunnyParams.hopDistance/2, // Current bunny x-position (starts left of field)
  carrotsEaten: [],     // Array to track which carrots have been eaten
  rows: 5,              // Grid rows
  cols: 8,              // Grid columns
  currentRow: 0,        // Current row position in zigzag pattern
  currentCol: 0,        // Current column position in zigzag pattern
  directionRight: true, // Whether bunny is moving right (true) or left (false)
  lastFrameTime: 0      
};

/*
* Keeps track of hen animation state
*/
let henAnimationState = {
  time: 0,              // Current animation time
  henHeight: henParams.henSize, // Current hen y-position
  henX: -henParams.hopDistance/2, // Current hen x-position (starts left of field)
  lettuceEaten: [],     // Array to track which lettuce plants have been eaten
  rows: 5,              // Grid rows
  cols: 8,              // Grid columns
  currentRow: 0,        // Current row position in zigzag pattern
  currentCol: 0,        // Current column position in zigzag pattern
  directionRight: true, // Whether hen is moving right (true) or left (false)
  lastFrameTime: 0      
};


// Global variables
let bunny;
let hen;
let carrotField = {
  group: null,    // Container for all carrot meshes
  positions: [],  // Array of carrot positions
  grid: []        
};

let lettuceField = {
  group: null,    // Container for all lettuce meshes
  positions: [],  // Array of lettuce position
  grid: []        
};





// ====================================================================
// Lighting
// ====================================================================



/*
 * Two types of lights:
 * 1. Ambient light
 * 2. Directional light - to create sunlight
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);



// ====================================================================
// Ground Setup
// ====================================================================



/*
 * Using a dirt texture that repeats to create a natural looking ground.
 */
const textureLoader = new THREE.TextureLoader();
const dirtTexture = textureLoader.load('dirt.jpg');
dirtTexture.wrapS = THREE.RepeatWrapping;
dirtTexture.wrapT = THREE.RepeatWrapping;
dirtTexture.repeat.set(20, 20);

const groundGeometry = new THREE.PlaneGeometry(80, 80);
const groundMaterial = new THREE.MeshPhongMaterial({ 
  map: dirtTexture,
  side: THREE.DoubleSide 
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Make it horizontal
ground.position.y = -0.5;         // Slightly below origin
scene.add(ground);

// ====================================================================
// Background Elements Setup --Trees , Barn and Rocks
// ====================================================================


// Create and position orange tree
const orangeTree = createOrangeTree();
orangeTree.position.set(-12, 0, -18); // Left side near the barn
orangeTree.scale.set(1.8, 1.8, 1.8);  // Make tree larger
scene.add(orangeTree);

// Create a second orange tree
const orangeTree2 = createOrangeTree();
orangeTree2.position.set(20, 0, -25); // Far right background
orangeTree2.scale.set(1.5, 1.5, 1.5);
orangeTree2.rotation.y = Math.PI * 0.4; // Rotate slightly
scene.add(orangeTree2);


// Create an orange tree
const orangeTree3 = createOrangeTree();
orangeTree3.position.set(28, 0, -5); 
orangeTree3.scale.set(1.5, 1.5, 1.5);
orangeTree3.rotation.y = Math.PI * 0.4; 
scene.add(orangeTree3);

// Create orange tree
const orangeTree4 = createOrangeTree();
orangeTree4.position.set(-25, 0, -35); // Far right background
orangeTree4.scale.set(2, 2, 2);
orangeTree4.rotation.y = Math.PI * 0.4; // Rotate slightly
scene.add(orangeTree4);

// Create orange tree
const orangeTree5 = createOrangeTree();
orangeTree5.position.set(-32, 0, -10); // Far right background
orangeTree5.scale.set(1.2, 1.2, 1.2);
orangeTree5.rotation.y = Math.PI * 0.4; // Rotate slightly
scene.add(orangeTree5);

// Large rocks 
const largeRock1 = createRock();
largeRock1.position.set(30, 0, 15);  // Far right side
largeRock1.scale.set(2.5, 2.0, 2.5);
largeRock1.rotation.y = Math.PI * 0.3;
scene.add(largeRock1);

const largeRock2 = createRock();
largeRock2.position.set(-32, 0, -5);  // Far left side
largeRock2.scale.set(2.0, 1.8, 2.0);
largeRock2.rotation.y = Math.PI * 0.7;
scene.add(largeRock2);

// Small rocks 
const smallRock1 = createRock();
smallRock1.position.set(24, 0, 20);  // Front right
smallRock1.scale.set(0.6, 0.5, 0.6);
smallRock1.rotation.y = Math.PI * 1.3;
scene.add(smallRock1);

const smallRock2 = createRock();
smallRock2.position.set(-24, 0, 15);  // Front left
smallRock2.scale.set(0.7, 0.6, 0.7);
smallRock2.rotation.y = Math.PI * 0.9;
scene.add(smallRock2);

const smallRock3 = createRock();
smallRock3.position.set(15, 0, -26);  // Near barn right side
smallRock3.scale.set(0.5, 0.4, 0.5);
smallRock3.rotation.y = Math.PI * 1.5;
scene.add(smallRock3);

const barnRock1 = createRock();
barnRock1.position.set(12, 0, -22);  // Right side of barn
barnRock1.scale.set(0.8, 0.7, 0.8);
barnRock1.rotation.y = Math.PI * 0.4;
scene.add(barnRock1);

const barnRock2 = createRock();
barnRock2.position.set(-2, 0, -24);  // Left-behind the barn
barnRock2.scale.set(0.6, 0.5, 0.6);
barnRock2.rotation.y = Math.PI * 1.2;
scene.add(barnRock2);

const barn = createStardewBarn();
barn.position.set(5, 0, -15); 
scene.add(barn);

// ====================================================================
// Field Creation Functions
// ====================================================================



/*
 * Create lettuce field function sets up the entire field of lettuce
 * plants that the hen will hop through. 
 * 
 * 
 * - stores each lettuce's position in an array
 * - creates a 2D grid for easier row/column lookup
 * - tracks which lettuce plants have been eaten
 */
function createLettuceField(rows, cols, spacing) {
  // Remove existing lettuce field if it exists
  if (lettuceField.group) {
    scene.remove(lettuceField.group);
  }
  
  const fieldGroup = new THREE.Group();
  const lettucePositions = [];
  
  // Store the rows and cols in the animation state
  henAnimationState.rows = rows;
  henAnimationState.cols = cols;
  
  // Create a 2D array to store lettuce grid
  const lettuceGrid = [];
  for (let r = 0; r < rows; r++) {
    lettuceGrid[r] = [];
    for (let c = 0; c < cols; c++) {
      lettuceGrid[r][c] = null; 
    }
  }
  
  /*
   * Double loop creates our grid of lettuce plants.
   * For each row and column position:
   * creates a lettuce plant
   * calculates its position in the grid
   * adds it to the field
   * stores its data for later use
   * 
   * The grid is centered so position (0,0) is in the middle.
   */
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const lettuce = createLettuce();
      
      // Create a grid 
      const x = -15 + (col - (cols-1) / 2) * spacing; // Move field to the left
      const z = (row - (rows-1) / 2) * spacing;
      
      lettuce.position.set(x, 0, z);
      lettuce.scale.set(0.8, 0.8, 0.8);
      fieldGroup.add(lettuce);
      
      
      const lettuceData = {
        row: row,
        col: col,
        x: x,
        z: z,
        eaten: false,
        mesh: lettuce
      };
      
      
      const lettuceIndex = row * cols + col;
      if (henAnimationState.lettuceEaten[lettuceIndex]) {
        lettuce.visible = false;
        lettuceData.eaten = true;
      }
      
      // Store the lettuce data
      lettucePositions.push(lettuceData);
      
      // Store index of lettuce in the grid 
      lettuceGrid[row][col] = lettucePositions.length - 1;
    }
  }
  
  scene.add(fieldGroup);
  
  
  const result = {
    group: fieldGroup,      // The Three.js group containing all lettuce meshes
    positions: lettucePositions, 
    grid: lettuceGrid       
  };
  
  return result;
}

/*
 * Create carrot field function sets up the entire field of carrot
 * plants that the bunny will hop through. 
 * 
 * Similar to lettuce field but with carrots
 */
function createCarrotField(rows, cols, spacing) {
  // Remove existing carrot field if it exists
  if (carrotField.group) {
    scene.remove(carrotField.group);
  }
  
  const fieldGroup = new THREE.Group();
  const carrotPositions = [];
  
  // Store the rows and cols in the animation state
  bunnyAnimationState.rows = rows;
  bunnyAnimationState.cols = cols;
  
  // Create a 2D array to store carrot grid
  const carrotGrid = [];
  for (let r = 0; r < rows; r++) {
    carrotGrid[r] = [];
    for (let c = 0; c < cols; c++) {
      carrotGrid[r][c] = null; 
    }
  }
  
  /*
   * Double loop creates our grid of carrot plants.
   * Similar to lettuce field setup
   */
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const carrot = createCarrot();
      
      // Create a grid - position field on the right side
      const x = 15 + (col - (cols-1) / 2) * spacing;
      const z = (row - (rows-1) / 2) * spacing;
      
      carrot.position.set(x, 0, z);
      carrot.scale.set(0.8, 0.8, 0.8);
      fieldGroup.add(carrot);
      
      
      const carrotData = {
        row: row,
        col: col,
        x: x,
        z: z,
        eaten: false,
        mesh: carrot
      };
      
      
      const carrotIndex = row * cols + col;
      if (bunnyAnimationState.carrotsEaten[carrotIndex]) {
        carrot.visible = false;
        carrotData.eaten = true;
      }
      
      // Store the carrot data
      carrotPositions.push(carrotData);
      
      // Store index of carrot in the grid 
      carrotGrid[row][col] = carrotPositions.length - 1;
    }
  }
  
  scene.add(fieldGroup);
  
  
  const result = {
    group: fieldGroup,
    positions: carrotPositions, 
    grid: carrotGrid       
  };
  
  return result;
}





// ====================================================================
// Helper Functions
// ====================================================================


/*
 * This is a helper function that maps our hop animation progress to actual positions.
 */
function linearMap(x, minx, maxx, miny, maxy) {
  const t = (x-minx)/(maxx-minx);
  const y = t*(maxy-miny)+miny;
  return y;
}

/*
* Helper function that gives the index of a lettuce plant at a specific row and column.
* 
* Returns -1 if the position is outside the grid (invalid).
*/
function getLettuceIndex(row, col) {
  // Check if position is valid
  if (row < 0 || row >= henAnimationState.rows || col < 0 || col >= henAnimationState.cols) {
      return -1; // Invalid position
  }
  return lettuceField.grid[row][col];
}

/*
* Helper function that gives the index of a carrot plant at a specific row and column.
* 
* Returns -1 if the position is outside the grid (invalid).
*/
function getCarrotIndex(row, col) {
  // Check if position is valid
  if (row < 0 || row >= bunnyAnimationState.rows || col < 0 || col >= bunnyAnimationState.cols) {
      return -1; // Invalid position
  }
  return carrotField.grid[row][col];
}



// ====================================================================
// Movement Helper Functions
// ====================================================================



/*
* This function calculates where the hen should hop from and to.
* 
* For the zigzag pattern:
* - If moving right, next hop is to the right
* - If at right edge, next hop is down and start moving left
* - If moving left, next hop is to the left
* - If at left edge, next hop is down and start moving right
*/
function getHenHopPositions() {
  // Get current target lettuce index based on row and column
  const currentIndex = getLettuceIndex(henAnimationState.currentRow, henAnimationState.currentCol);
  
  // Calculate previous position (for hop start position)
  let startPos = { x: 0, z: 0 };
  
  // If first hop, start from just outside the grid
  if (henAnimationState.currentRow === 0 && henAnimationState.currentCol === 0) {
      startPos.x = -henParams.hopDistance/2;
      startPos.z = lettuceField.positions[0].z;
  } 
  // Otherwise calculate based on previous position in zigzag pattern
  else {
      let prevRow = henAnimationState.currentRow;
      let prevCol = henAnimationState.currentCol;
      
      if (henAnimationState.directionRight) {
          // Moving right, so previous position is to the left
          prevCol--;
      } else {
          // Moving left, so previous position is to the right
          prevCol++;
      }
      
      // row transition
      if (prevCol < 0 || prevCol >= henAnimationState.cols) {
          prevRow--;
          if (prevCol < 0) {
              prevCol = 0;
          } else {
              prevCol = henAnimationState.cols - 1;
          }
      }
      
      // Get position from the lettuce field
      const prevIndex = getLettuceIndex(prevRow, prevCol);
      if (prevIndex !== -1) {
          startPos.x = lettuceField.positions[prevIndex].x;
          startPos.z = lettuceField.positions[prevIndex].z;
      }
  }
  
  // Get current target position 
  let endPos = startPos; 
  
  // If currentIndex is valid, use the lettuce position
  if (currentIndex !== -1) {
      endPos = {
          x: lettuceField.positions[currentIndex].x,
          z: lettuceField.positions[currentIndex].z
      };
  }
  
  // Return all hop position things
  return {
      startPos: startPos,
      endPos: endPos,
      currentIndex: currentIndex
  };
}

/*
* This function calculates where the bunny should hop from and to.
* 
* For the zigzag pattern:
* - If moving right, next hop is to the right
* - If at right edge, next hop is down and start moving left
* - If moving left, next hop is to the left
* - If at left edge, next hop is down and start moving right
*/
function getBunnyHopPositions() {
  // Get current target carrot index based on row and column
  const currentIndex = getCarrotIndex(bunnyAnimationState.currentRow, bunnyAnimationState.currentCol);
  
  // Calculate previous position (for hop start position)
  let startPos = { x: 0, z: 0 };
  
  // If first hop, start from just outside the grid
  if (bunnyAnimationState.currentRow === 0 && bunnyAnimationState.currentCol === 0) {
      startPos.x = carrotField.positions[0].x - bunnyParams.hopDistance/2;
      startPos.z = carrotField.positions[0].z;
  } 
  // Otherwise calculate based on previous position in zigzag pattern
  else {
      let prevRow = bunnyAnimationState.currentRow;
      let prevCol = bunnyAnimationState.currentCol;
      
      if (bunnyAnimationState.directionRight) {
          // Moving right, so previous position is to the left
          prevCol--;
      } else {
          // Moving left, so previous position is to the right
          prevCol++;
      }
      
      // row transition
      if (prevCol < 0 || prevCol >= bunnyAnimationState.cols) {
          prevRow--;
          if (prevCol < 0) {
              prevCol = 0;
          } else {
              prevCol = bunnyAnimationState.cols - 1;
          }
      }
      
      // Get position from the carrot field
      const prevIndex = getCarrotIndex(prevRow, prevCol);
      if (prevIndex !== -1) {
          startPos.x = carrotField.positions[prevIndex].x;
          startPos.z = carrotField.positions[prevIndex].z;
      }
  }
  
  // Get current target position 
  let endPos = startPos; 
  
  // If currentIndex is valid, use the carrot position
  if (currentIndex !== -1) {
      endPos = {
          x: carrotField.positions[currentIndex].x,
          z: carrotField.positions[currentIndex].z
      };
  }
  
  // Return all hop position things
  return {
      startPos: startPos,
      endPos: endPos,
      currentIndex: currentIndex
  };
}

let bunnyFacingDirection = 0; // 0 = forward (default), radians for rotation
let henFacingDirection = 0;   // 0 = forward (default), radians for rotation
let henManualDirectionChange = false;
let bunnyManualDirectionChange = false;

/**
 * Changes an animal's direction of movement and facing orientation.
 * 
 * 
 * - Updates the animal's current position in the grid (row/column)
 * - Sets the proper facing direction for the 3D model
 * - Resets animation timing to begin a new movement hop
 * - Forces position update to start from current location
 * - Sets a flag to indicate manual direction change
 * 
 * @param {string} animal - The animal to move ('bunny' or 'hen')
 * @param {string} dir - Direction to move ('left', 'right', 'up', or 'down')
 */
function changeAnimalDirection(animal, dir) {
  if (animal === 'bunny') {
    const state = bunnyAnimationState;
    
    // Save current position before changing direction
    const currentPos = getBunnyHopPositions().endPos;
    
    // Determine next position based on direction
    if (dir === 'right') {
      state.directionRight = true;
      state.currentCol = Math.min(state.currentCol + 1, state.cols - 1);
      setAnimalFacingDirection('bunny', 'right');
    } else if (dir === 'left') {
      state.directionRight = false;
      state.currentCol = Math.max(state.currentCol - 1, 0);
      setAnimalFacingDirection('bunny', 'left');
    } else if (dir === 'up') {
      state.currentRow = Math.max(state.currentRow - 1, 0);
      setAnimalFacingDirection('bunny', 'backward');
    } else if (dir === 'down') {
      state.currentRow = Math.min(state.currentRow + 1, state.rows - 1);
      setAnimalFacingDirection('bunny', 'forward');
    }
    
    // Reset time to start new hop
    state.time = 0;
    
    // Force an immediate update to start the hop from current position
    bunny.position.set(currentPos.x, bunny.position.y, currentPos.z);
    
    // Mark that we've made a manual direction change
    bunnyManualDirectionChange = true;
    
  } else if (animal === 'hen') {
    const state = henAnimationState;
    
    // Save current position before changing direction
    const currentPos = getHenHopPositions().endPos;
    
    // Determine next position based on direction
    if (dir === 'right') {
      state.directionRight = true;
      state.currentCol = Math.min(state.currentCol + 1, state.cols - 1);
      setAnimalFacingDirection('hen', 'right');
    } else if (dir === 'left') {
      state.directionRight = false;
      state.currentCol = Math.max(state.currentCol - 1, 0);
      setAnimalFacingDirection('hen', 'left');
    } else if (dir === 'up') {
      state.currentRow = Math.max(state.currentRow - 1, 0);
      setAnimalFacingDirection('hen', 'backward');
    } else if (dir === 'down') {
      state.currentRow = Math.min(state.currentRow + 1, state.rows - 1);
      setAnimalFacingDirection('hen', 'forward');
    }
    
    // Reset time to start new hop
    state.time = 0;
    
    // Force an immediate update to start the hop from current position
    hen.position.set(currentPos.x, hen.position.y, currentPos.z);
    
    
    henManualDirectionChange = true;
  }
}

/**
 * Updates the hen's position and animation state for each frame.
 * 
 * 
 * - Calculates normalized time within hop period (0-1)
 * - Updates horizontal position linearly between start and end points
 * - Creates vertical bouncing effect using sine wave
 * - Handles eating lettuce when hen completes a hop over one
 * - Manages zigzag pattern movement across the lettuce field
 * - Resets field when hen reaches the end of all rows
 * 
 * ANIMATION ELEMENTS:
 * - Hopping follows a sine wave for natural bouncing motion
 * - Hen tilts slightly during hopping phases
 * - Direction changes at the edge of rows for zigzag pattern
 * 
 * @param {number} deltaTime - Time elapsed since the last frame in seconds
 * @returns {Object} Updated position data {x, y, z} for the hen
 */
function updateHenPosition(deltaTime) {
  // Update animation time
  henAnimationState.time += deltaTime;
  
  // Calculate normalized time within one hop period (0-1)
  const normalizedTime = (henAnimationState.time % henParams.hopPeriod) / henParams.hopPeriod;
  
  // Get current hop positions
  const hopPositions = getHenHopPositions();
  const startPos = hopPositions.startPos;
  const endPos = hopPositions.endPos;
  const currentIndex = hopPositions.currentIndex;
  
  // Calculate horizontal position 
  const henX = linearMap(normalizedTime, 0, 1, startPos.x, endPos.x);
  const henZ = linearMap(normalizedTime, 0, 1, startPos.z, endPos.z);
  
  // Calculate vertical position using sine for bouncing effect
  const angle = normalizedTime * Math.PI;
  const abs_sin = Math.abs(Math.sin(angle));
  const henHeight = linearMap(abs_sin, 0, 1, 
                        henParams.henSize, henParams.maxHopHeight);
  
  // Update hen position
  hen.position.x = henX;
  hen.position.y = henHeight;
  hen.position.z = henZ;
  
   
  hen.rotation.y = henFacingDirection;
  
  // Tilt hen slightly based on hop phase
  hen.rotation.x = -Math.sin(angle) * 0.5;
  
  // Check if hen has completed the hop and is over a lettuce
  if (normalizedTime >= 0.95 && currentIndex !== -1) {
      // Only eat the lettuce if it's not already eaten
      if (!lettuceField.positions[currentIndex].eaten) {
          // Make lettuce disappear
          lettuceField.positions[currentIndex].eaten = true;
          lettuceField.positions[currentIndex].mesh.visible = false;
          
          // Update eaten lettuce array
          henAnimationState.lettuceEaten[currentIndex] = true;
      }
  }
  
  // When a hop is completed
  if (normalizedTime >= 0.99) {
      // Reset animation time for next hop
      henAnimationState.time = 0;
      
      // calculate next position if no manual change was made
      if (!henManualDirectionChange) {
          // Calculate next position in zigzag pattern
          if (henAnimationState.directionRight) {
              // Moving right
              henAnimationState.currentCol++;
              
              // If we reach the end of a row, go down and reverse direction
              if (henAnimationState.currentCol >= henAnimationState.cols) {
                  henAnimationState.currentRow++;
                  henAnimationState.currentCol = henAnimationState.cols - 1;
                  henAnimationState.directionRight = false;
                  
              }
          } else {
              // Moving left
              henAnimationState.currentCol--;
              
              // If we reach the beginning of a row, go down and reverse direction
              if (henAnimationState.currentCol < 0) {
                  henAnimationState.currentRow++;
                  henAnimationState.currentCol = 0;
                  henAnimationState.directionRight = true;
                  
              }
          }
      }
      
      // Reset the manual direction change flag
      henManualDirectionChange = false;
      
      // Check if we've gone through all rows
      if (henAnimationState.currentRow >= henAnimationState.rows) {
          // Reset animation state for new field
          henAnimationState.lettuceEaten = [];
          henAnimationState.currentRow = 0;
          henAnimationState.currentCol = 0;
          henAnimationState.directionRight = true;
          // Don't reset the facing direction
          
          // Recreate lettuce field
          lettuceField = createLettuceField(5, 8, henParams.hopDistance);
      }
  }
  
  // Return updated position data 
  return { x: henX, y: henHeight, z: henZ };
}

/**
 * Updates the bunny's position and animation state for each frame.
 * 
 * 
 * - Calculates normalized time within hop period (0-1)
 * - Updates horizontal position linearly between start and end points
 * - Creates vertical bouncing effect using sine wave
 * - Handles eating carrots when bunny completes a hop over one
 * - Manages zigzag pattern movement across the carrot field
 * - Resets field when bunny reaches the end of all rows
 * 
 * ANIMATION ELEMENTS:
 * - Hopping follows a sine wave for natural bouncing motion
 * - Bunny tilts slightly during hopping phases
 * - Direction changes at the edge of rows for zigzag pattern
 * 
 * @param {number} deltaTime - Time elapsed since the last frame in seconds
 * @returns {Object} Updated position data {x, y, z} for the bunny
 */
function updateBunnyPosition(deltaTime) {
  // Update animation time
  bunnyAnimationState.time += deltaTime;
  
  // Calculate normalized time within one hop period (0-1)
  const normalizedTime = (bunnyAnimationState.time % bunnyParams.hopPeriod) / bunnyParams.hopPeriod;
  
  // Get current hop positions
  const hopPositions = getBunnyHopPositions();
  const startPos = hopPositions.startPos;
  const endPos = hopPositions.endPos;
  const currentIndex = hopPositions.currentIndex;
  
  // Calculate horizontal position 
  const bunnyX = linearMap(normalizedTime, 0, 1, startPos.x, endPos.x);
  const bunnyZ = linearMap(normalizedTime, 0, 1, startPos.z, endPos.z);
  
  // Calculate vertical position using sine for bouncing effect
  const angle = normalizedTime * Math.PI;
  const abs_sin = Math.abs(Math.sin(angle));
  const bunnyHeight = linearMap(abs_sin, 0, 1, 
                        bunnyParams.bunnySize, bunnyParams.maxHopHeight);
  
  // Update bunny position
  bunny.position.x = bunnyX;
  bunny.position.y = bunnyHeight;
  bunny.position.z = bunnyZ;
  
  // Use the facing direction variable 
  bunny.rotation.y = bunnyFacingDirection;
  
  // Tilt bunny slightly based on hop phase
  bunny.rotation.x = -Math.sin(angle) * 0.5;
  
  // Check if bunny has completed the hop and is over a carrot
  if (normalizedTime >= 0.95 && currentIndex !== -1) {
      // Only eat the carrot if it's not already eaten
      if (!carrotField.positions[currentIndex].eaten) {
          // Make carrot disappear
          carrotField.positions[currentIndex].eaten = true;
          carrotField.positions[currentIndex].mesh.visible = false;
          
          // Update eaten carrot array
          bunnyAnimationState.carrotsEaten[currentIndex] = true;
      }
  }
  
  // When a hop is completed
  if (normalizedTime >= 0.99) {
      // Reset animation time for next hop
      bunnyAnimationState.time = 0;
      
      // Only calculate next position if no manual change was made
      if (!bunnyManualDirectionChange) {
          // Calculate next position in zigzag pattern
          if (bunnyAnimationState.directionRight) {
              // Moving right
              bunnyAnimationState.currentCol++;
              
              // If we reach the end of a row, go down and reverse direction
              if (bunnyAnimationState.currentCol >= bunnyAnimationState.cols) {
                  bunnyAnimationState.currentRow++;
                  bunnyAnimationState.currentCol = bunnyAnimationState.cols - 1;
                  bunnyAnimationState.directionRight = false;
                  
              }
          } else {
              // Moving left
              bunnyAnimationState.currentCol--;
              
              // If we reach the beginning of a row, go down and reverse direction
              if (bunnyAnimationState.currentCol < 0) {
                  bunnyAnimationState.currentRow++;
                  bunnyAnimationState.currentCol = 0;
                  bunnyAnimationState.directionRight = true;
                  
              }
          }
      }
      
      // Reset the manual direction change flag
      bunnyManualDirectionChange = false;
      
      // Check if we've gone through all rows
      if (bunnyAnimationState.currentRow >= bunnyAnimationState.rows) {
          // Reset animation state for new field
          bunnyAnimationState.carrotsEaten = [];
          bunnyAnimationState.currentRow = 0;
          bunnyAnimationState.currentCol = 0;
          bunnyAnimationState.directionRight = true;
          // Don't reset the facing direction
          
          // Recreate carrot field
          carrotField = createCarrotField(5, 8, bunnyParams.hopDistance);
      }
  }
  
  // Return updated position data 
  return { x: bunnyX, y: bunnyHeight, z: bunnyZ };
}

/**
 * Sets the facing direction of an animal in the 3D scene.
 * 
 * ROTATIONS:
 * - 'left': 90 degrees (π/2 radians)
 * - 'right': -90 degrees (-π/2 radians)
 * - 'forward': 0 degrees (default orientation)
 * - 'backward': 180 degrees (π radians)
 * 
 * @param {string} animal - The animal to rotate ('bunny' or 'hen')
 * @param {string} direction - The direction to face ('left', 'right', 'forward', or 'backward')
 */
function setAnimalFacingDirection(animal, direction) {
  // Direction should be 'left', 'right', 'forward', or 'backward'
  if (animal === 'bunny') {
    switch (direction) {
      case 'left':
        bunnyFacingDirection = Math.PI / 2; // 90 degrees
        break;
      case 'right':
        bunnyFacingDirection = -Math.PI / 2; // -90 degrees
        break;
      case 'forward':
        bunnyFacingDirection = 0; // 0 degrees (default)
        break;
      case 'backward':
        bunnyFacingDirection = Math.PI; // 180 degrees
        break;
    }
  } else if (animal === 'hen') {
    switch (direction) {
      case 'left':
        henFacingDirection = Math.PI / 2; // 90 degrees
        break;
      case 'right':
        henFacingDirection = -Math.PI / 2; // -90 degrees
        break;
      case 'forward':
        henFacingDirection = 0; // 0 degrees (default)
        break;
      case 'backward':
        henFacingDirection = Math.PI; // 180 degrees
        break;
    }
  }
}



/*
 * Camera position presets
 */
const cameraPresets = {
  // Default view
  front: {
    position: new THREE.Vector3(0, 18, 25),
    lookAt: new THREE.Vector3(0, 10, 0)
  },
  // Overhead view of both fields
  overhead: {
    position: new THREE.Vector3(0, 45, 0),
    lookAt: new THREE.Vector3(0, 0, -8)
  },
  // View focusing on bunny and carrot field
  bunnyView: {
    position: new THREE.Vector3(25, 8, 15),
    lookAt: new THREE.Vector3(15, 2, 0)
  },
  // View focusing on hen and lettuce field
  henView: {
    position: new THREE.Vector3(-25, 10, 15),
    lookAt: new THREE.Vector3(-15, 3, 0)
  },
  // Front view of barn
  backView: {
    position: new THREE.Vector3(0, 26, -35),
    lookAt: new THREE.Vector3(0, 0, 0)
  },
  // low angle view
  ground: {
    position: new THREE.Vector3(0, 2, 35),
    lookAt: new THREE.Vector3(0, 5, 0)
  }
};

/*
 * Set camera to a specific preset
 */
function setCameraPreset(presetName) {
  const preset = cameraPresets[presetName];
  if (!preset) return;
  
  camera.position.copy(preset.position);
  camera.lookAt(preset.lookAt);
  camera.updateProjectionMatrix();
}



// ====================================================================
// Animation Functions
// ====================================================================



/*
* This function completely resets the animation to its initial state.
* 
* Time resets to 0
* Bunny and hen go back to starting position
* All lettuce and carrots reappear
* Zigzag patterns start from the top-left
*/
function resetAnimation() {
  // Reset bunny animation state
  bunnyAnimationState = {
      time: 0,
      bunnyHeight: bunnyParams.bunnySize,
      bunnyX: bunnyParams.hopDistance/2,
      carrotsEaten: [],
      rows: 5,
      cols: 8,
      currentRow: 0,
      currentCol: 0,
      directionRight: true,
      lastFrameTime: 0
  };
  
  // Reset hen animation state
  henAnimationState = {
      time: 0,
      henHeight: henParams.henSize,
      henX: -henParams.hopDistance/2,
      lettuceEaten: [],
      rows: 5,
      cols: 8,
      currentRow: 0,
      currentCol: 0,
      directionRight: true,
      lastFrameTime: 0
  };
  
  // scene objects
  bunny = createBunny();
  hen = createHen();
  scene.add(bunny);
  scene.add(hen);
  
  lettuceField = createLettuceField(5, 8, henParams.hopDistance);
  carrotField = createCarrotField(5, 8, bunnyParams.hopDistance);
  
  // Render initial state
  TW.render();
}

/*
* This is the main animation loop.
* 
* For each frame:
* Calculates time since last frame
* Updates bunny and hen positions
* Renders the scene
* Requests the next frame
* 
* It creates animation at the browser's refresh rate.
*/
function animate(currentTime) {
  // Calculate time since last frame
  if (!bunnyAnimationState.lastFrameTime) {
      bunnyAnimationState.lastFrameTime = currentTime;
  }
  if (!henAnimationState.lastFrameTime) {
      henAnimationState.lastFrameTime = currentTime;
  }
  
  const bunnyDeltaTime = (currentTime - bunnyAnimationState.lastFrameTime) * 0.001; // Convert to seconds
  bunnyAnimationState.lastFrameTime = currentTime;
  
  const henDeltaTime = (currentTime - henAnimationState.lastFrameTime) * 0.001; // Convert to seconds
  henAnimationState.lastFrameTime = currentTime;
  
  // Update bunny and hen positions with proper timing
  updateBunnyPosition(bunnyParams.deltaT);
  updateHenPosition(henParams.deltaT);
  
  // Render the scene 
  TW.render();
  
  // Continue animation loop
  requestAnimationFrame(animate);
}

// Create characters
bunny = createBunny();
hen = createHen();
scene.add(bunny);
scene.add(hen);

// Position bunny and hen initially
bunny.position.set(15, bunnyParams.bunnySize, 0);
hen.position.set(-15, henParams.henSize, 0);

// Setup initial fields
lettuceField = createLettuceField(5, 8, henParams.hopDistance);
carrotField = createCarrotField(5, 8, bunnyParams.hopDistance);


// Set up keyboard controls for camera views
TW.setKeyboardCallback("1", function() {
  setCameraPreset('front');
}, "Front camera view");

TW.setKeyboardCallback("2", function() {
  setCameraPreset('overhead');
}, "Overhead view");

TW.setKeyboardCallback("3", function() {
  setCameraPreset('bunnyView');
}, "Bunny field view");

TW.setKeyboardCallback("4", function() {
  setCameraPreset('henView');
}, "Hen field view");

TW.setKeyboardCallback("5", function() {
  setCameraPreset('backView');
}, "Back view");

TW.setKeyboardCallback("6", function() {
  setCameraPreset('ground');
}, "Ground level view");

// Bunny direction controls - WASD
TW.setKeyboardCallback("a", function() {
  changeAnimalDirection('bunny', 'left');
}, "Move bunny left");

TW.setKeyboardCallback("d", function() {
  changeAnimalDirection('bunny', 'right');
}, "Move bunny right");

TW.setKeyboardCallback("w", function() {
  changeAnimalDirection('bunny', 'up');
}, "Move bunny up");

TW.setKeyboardCallback("s", function() {
  changeAnimalDirection('bunny', 'down');
}, "Move bunny down");

// Hen direction controls - IJKL keys instead of arrow keys
TW.setKeyboardCallback("j", function() {
  changeAnimalDirection('hen', 'left');
}, "Move hen left");

TW.setKeyboardCallback("l", function() {
  changeAnimalDirection('hen', 'right');
}, "Move hen right");

TW.setKeyboardCallback("i", function() {
  changeAnimalDirection('hen', 'up');
}, "Move hen up");

TW.setKeyboardCallback("k", function() {
  changeAnimalDirection('hen', 'down');
}, "Move hen down");




// Bunny facing direction - F, G, H keys
TW.setKeyboardCallback("f", function() {
  setAnimalFacingDirection('bunny', 'forward');
}, "Bunny face forward");

TW.setKeyboardCallback("g", function() {
  setAnimalFacingDirection('bunny', 'left');
}, "Bunny face left");

TW.setKeyboardCallback("h", function() {
  setAnimalFacingDirection('bunny', 'right');
}, "Bunny face right");

TW.setKeyboardCallback("b", function() {
  setAnimalFacingDirection('bunny', 'backward');
}, "Bunny face backward");

// Hen facing direction - T, Y, U keys
TW.setKeyboardCallback("t", function() {
  setAnimalFacingDirection('hen', 'forward');
}, "Hen face forward");

TW.setKeyboardCallback("y", function() {
  setAnimalFacingDirection('hen', 'left');
}, "Hen face left");

TW.setKeyboardCallback("u", function() {
  setAnimalFacingDirection('hen', 'right');
}, "Hen face right");

TW.setKeyboardCallback("n", function() {
  setAnimalFacingDirection('hen', 'backward');
}, "Hen face backward");

// Reset animation
TW.setKeyboardCallback("r", resetAnimation, "Reset animation");

// Start the animation
requestAnimationFrame(animate);