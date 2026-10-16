/**
 * Author: Samiksha Singh
 * Date: 05/02/2025
 * Purpose: Defines a 3D lettuce model using Three.js.
 */

import * as THREE from 'three';

/**
 * Creates a 3D lettuce model using Three.js.
 * 
 * LETTUCE DIMENSIONS AND COLORS:
 * 
 * Base:
 *   - Shape: Cylinder (radius top: 1, radius bottom: 1.2, height: 0.5)
 *   - Color: Light Green (0x90EE90)
 *   - Position: (0, -0.25, 0)
 * 
 * Outer Leaves (8):
 *   - Shape: Cone (radius: 0.6, height: 0.8)
 *   - Color: Medium Green (0x32CD32)
 *   - Position: Arranged in a circle (radius: 0.8)
 *   - Rotation: Pointing outward (Math.PI / 2 on X-axis)
 * 
 * Center Leaves (3):
 *   - Shape: Cone (radius: 0.6, height: 0.8)
 *   - Color: Medium Green (0x32CD32)
 *   - Position: Center (0, 0.4, 0)
 *   - Scale: 0.8 × 0.8 × 0.8 (slightly smaller)
 *   - Rotation: Slight random variations for natural look
 * 
 * @returns {THREE.Group} A Three.js Group containing all lettuce parts
 */


export function createLettuce() {
  // Create a group to hold all lettuce components
  const lettuceGroup = new THREE.Group();
  
  // ======== BASE ========
  const baseGeometry = new THREE.CylinderGeometry(1, 1.2, 0.5, 10);
  const baseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x90EE90,  // Light Green
    shininess: 30
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.25;
  lettuceGroup.add(base);
  
  // ======== OUTER LEAVES ========
  const leafGeometry = new THREE.ConeGeometry(0.6, 0.8, 6);
  const leafMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x32CD32,  // Medium Green
    shininess: 20
  });
  
  // Create leaves in a circular pattern
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 0.8;
    
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(
      Math.cos(angle) * radius,
      0.2,
      Math.sin(angle) * radius
    );
    leaf.rotation.set(
      Math.PI / 2,
      angle,
      0
    );
    
    lettuceGroup.add(leaf);
  }
  
  // ======== CENTER LEAVES ========
  for (let i = 0; i < 3; i++) {
    const centerLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
    centerLeaf.position.y = 0.4;
    centerLeaf.rotation.set(
      Math.random() * 0.2 - 0.1,
      Math.random() * Math.PI * 2,
      Math.random() * 0.2 - 0.1
    );
    centerLeaf.scale.set(0.8, 0.8, 0.8);
    
    lettuceGroup.add(centerLeaf);
  }
  
  return lettuceGroup;
}