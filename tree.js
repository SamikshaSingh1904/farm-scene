/**
 * Author: Samiksha Singh
 * Date: 05/04/2025
 * Purpose: Defines a 3D orange tree model with evenly distributed fruit using Three.js.
 */

import * as THREE from 'three';

/**
 * Creates a 3D orange tree model using Three.js.
 * 
 * ORANGE TREE DIMENSIONS AND COLORS:
 * 
 * Trunk:
 *   - Shape: Cylinder (radius top: trunkRadius * 0.7, radius bottom: trunkRadius, height: height)
 *   - Color: Brown (0x8B4513)
 *   - Position: (0, height/2, 0)
 * 
 * Foliage:
 *   - Shape: Sphere (radius: foliageRadius)
 *   - Color: Forest Green (0x228B22)
 *   - Position: (0, height + foliageRadius * 0.6, 0)
 * 
 * Oranges (orangeCount):
 *   - Shape: Sphere (radius: 0.3)
 *   - Color: Orange (0xFF7F00)
 *   - Position: Evenly distributed on foliage surface.
 *   
 * 
 * @param {number} height - Height of the trunk (default: 5)
 * @param {number} trunkRadius - Radius of the trunk (default: 0.3)
 * @param {number} foliageRadius - Radius of the foliage (default: 2)
 * @param {number} orangeCount - Number of oranges to create (default: 15)
 * @returns {THREE.Group} A Three.js Group containing all orange tree parts
 */
export function createOrangeTree(height = 5, trunkRadius = 0.3, foliageRadius = 2, orangeCount = 15) {
  // Create a group to hold all tree components
  const tree = new THREE.Group();
  
  // ======== TRUNK ========
  const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, height, 8);
  const trunkMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x8B4513  // Brown
  });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = height / 2;
  tree.add(trunk);
  
  // ======== FOLIAGE ========
  const foliageGeometry = new THREE.SphereGeometry(foliageRadius, 12, 12);
  const foliageMaterial = new THREE.MeshPhongMaterial({
    color: 0x228B22,  // Forest Green
    flatShading: false
  });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.y = height + foliageRadius * 0.6;
  tree.add(foliage);
  
  // ======== ORANGES ========
  createEvenlyDistributedOranges(tree, height, foliageRadius, orangeCount);
  
  return tree;
}

/**
 * Creates oranges evenly distributed on the foliage surface.
 * 
 * ORANGE PROPERTIES:
 *   
 *   - Position: Calculated using spherical coordinates on the foliage surface
 *   - Size Variation: Subtle random scaling (0.95 to 1.05) for natural appearance
 * 
 * @param {THREE.Group} tree - The tree group to add oranges to
 * @param {number} height - Height of the trunk
 * @param {number} foliageRadius - Radius of the foliage
 * @param {number} orangeCount - Number of oranges to create
 */
function createEvenlyDistributedOranges(tree, height, foliageRadius, orangeCount) {
  const orangeGeometry = new THREE.SphereGeometry(0.3, 10, 10);
  const orangeMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF7F00,  // Orange color
    shininess: 80
  });
  
  // Calculate base position for foliage
  const foliageY = height + foliageRadius * 0.6;
  const Ratio = (1 + Math.sqrt(5)) / 2;
  
  for (let i = 0; i < orangeCount; i++) {
    const orange = new THREE.Mesh(orangeGeometry, orangeMaterial);
    
    // Calculate the spherical coordinates 
    // This ensures points are approximately equidistant on the sphere
    const y = 1 - (i / (orangeCount - 1)) * 2;  // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);  // radius at y
    
    // Calculate the angle in radians
    const theta = 2 * Math.PI * i / Ratio;
    
    // Convert to coordinates
    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);
    
    // Position on the foliage sphere
    orange.position.x = foliageRadius * x;
    orange.position.y = foliageY + foliageRadius * y;
    orange.position.z = foliageRadius * z;
    
    // Add some subtle random scaling to the oranges for natural look
    
    const scale = 0.95 + Math.random() * 0.1;
    orange.scale.set(scale, scale, scale);
    
    tree.add(orange);
  }
}