/**
 * Author: Samiksha Singh
 * Date: 05/02/2025
 * Purpose: Defines a 3D rock model using Three.js.
 */

import * as THREE from 'three';

/**
 * Creates a 3D rock model using Three.js.
 * 
 * ROCK DIMENSIONS AND PROPERTIES:
 * 
 * Rock:
 *   - Shape: Dodecahedron (size parameter, default: 1)
 *   - Color: Gray (0x666666)
 *   - Material: MeshPhongMaterial 
 *   - Rotation: Random on all axes for variety
 *   
 * 
 * @param {number} size - Base size of the rock (default: 1)
 * @returns {THREE.Mesh} A Three.js Mesh representing the rock
 */
export function createRock(size = 1) {
  // ======== ROCK ========
  const rockGeometry = new THREE.DodecahedronGeometry(size, 0);
  const rockMaterial = new THREE.MeshPhongMaterial({
    color: 0x666666,  // Gray
    flatShading: true
  });
  const rock = new THREE.Mesh(rockGeometry, rockMaterial);
  
  // Random rotation for variety
  rock.rotation.x = Math.random() * Math.PI;
  rock.rotation.y = Math.random() * Math.PI;
  rock.rotation.z = Math.random() * Math.PI;
  
  // Slightly random scale for variety
  const scale = 0.8 + Math.random() * 0.4;
  rock.scale.set(scale, scale * 0.7, scale);
  
  return rock;
}