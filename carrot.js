/**
 * Author: Samiksha Singh
 * Date: 05/03/2025
 * Purpose: Defines a 3D carrot model using Three.js.
 */

import * as THREE from 'three';

/**
 * Creates a 3D carrot model using Three.js.
 * 
 * CARROT DIMENSIONS AND COLORS:
 * 
 * Root:
 *   - Shape: Cone (radius: 0.8, height: 1.6)
 *   - Color: Orange (0xFF7F00)
 *   - Position: (0, -0.5, 0)
 *   - Rotation: Math.PI on X-axis (pointing down)
 * 
 * Leaves (10):
 *   - Shape: Cylinder (radius top: 0.2, radius bottom: 0.03, height: 1.2)
 *   - Color: Forest Green (0x228B22)
 *   - Position: Arranged in a circle (radius: 0.2)
 *                with random height variations (0.3 to 0.7)
 *   - Rotation: Randomized for natural appearance
 *               with slight outward angle
 * 
 * @returns {THREE.Group} A Three.js Group containing all carrot parts
 */
export function createCarrot() {
  // Create a group to hold all carrot components
  const carrotGroup = new THREE.Group();
  
  // ======== ROOT ========
  const rootGeometry = new THREE.ConeGeometry(0.8, 1.6, 20);
  const rootMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFF7F00,  // Orange
    shininess: 30
  });
  const root = new THREE.Mesh(rootGeometry, rootMaterial);
  root.position.y = -0.5;
  root.rotation.x = Math.PI;  // Point down
  carrotGroup.add(root);
  
  // ======== LEAVES ========
  const leavesGeometry = new THREE.CylinderGeometry(0.2, 0.03, 1.2, 4);
  const leavesMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x228B22,  // Forest Green
    shininess: 20
  });
  
  // Create several stem leaves
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 0.2;
    
    const leaf = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaf.position.set(
      Math.cos(angle) * radius,
      0.3 + Math.random() * 0.4,
      Math.sin(angle) * radius
    );
    
    // Randomize rotation for more natural look
    leaf.rotation.set(
      Math.random() * 0.5 - 0.25 + 0.3,
      0,
      Math.random() * 0.5 - 0.25 + angle
    );
    
    carrotGroup.add(leaf);
  }
  
  return carrotGroup;
}