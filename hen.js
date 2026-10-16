/**
 * Author: Samiksha Singh
 * Date: 05/02/2025
 * Purpose: Defines a 3D hen model using Three.js.
 */

import * as THREE from 'three';

/**
 * Creates a 3D hen model using Three.js.
 * 
 * HEN DIMENSIONS AND COLORS:
 * 
 * Body:
 *   - Shape: Sphere (radius: 0.8)
 *   - Color: White (0xFFFFFF)
 *   - Scale: 1 × 1 × 1.2 (slightly elongated)
 *   - Position: Center (0, 0, 0)
 * 
 * Neck:
 *   - Shape: Cylinder (radius top: 0.25, radius bottom: 0.35, height: 0.4)
 *   - Color: White (0xFFFFFF)
 *   - Position: (0, 0.4, 0.7)
 *   - Rotation: Math.PI / 4 on X-axis (angled forward)
 * 
 * Head:
 *   - Shape: Sphere (radius: 0.5)
 *   - Color: White (0xFFFFFF)
 *   - Position: (0, 0.7, 1.1)
 * 
 * Beak:
 *   - Shape: Cone (radius: 0.2, height: 0.4)
 *   - Color: Yellow (0xFFFF00)
 *   - Position: (0, 0.6, 1.7)
 *   - Rotation: Math.PI / 2 on X-axis (pointing forward)
 * 
 * Eyes (2):
 *   - Shape: Sphere (radius: 0.1)
 *   - Color: Black (0x000000)
 *   - Positions: Left (0.25, 0.8, 1.45), Right (-0.25, 0.8, 1.45)
 * 
 * Eye Highlights (2):
 *   - Shape: Sphere (radius: 0.03)
 *   - Color: White (0xFFFFFF)
 *   - Positions: Left (0.22, 0.83, 1.52), Right (-0.22, 0.83, 1.52)
 * 
 * Comb (4):
 *   - Shape: Plane (0.6 × 0.4)
 *   - Color: Red (0xFF0000)
 *   - Position: (0, 1.1, 1.1)
 *   - Rotation: Math.PI / 2 on Y-axis, Math.PI / 3 on Z-axis
 * 
 * Wattle:
 *   - Shape: Circle (radius: 0.25) 
 *   - Color: Red (0xFF0000)
 *   - Position: (0, 0.35, 1.5)
 *   - Rotation: Math.PI / 3 on X-axis
 * 
 * Wings (2):
 *   - Shape: Half Sphere
 *   - Color: White (0xFFFFFF)
 *   - Positions: Left (0.9, 0, 0), Right (-0.8, 0, 0)
 *   - Scale: 0.5 × 0.8 × 1
 * 
 * Legs (2):
 *   - Shape: Cylinder (radius: 0.08, height: 0.8)
 *   - Color: Yellow (0xFFFF00)
 *   - Positions: Left (0.3, -0.8, 0), Right (-0.3, -0.8, 0)
 * 
 * Feet (2):
 *   - Shape: Cone (radius: 0.2, height: 0.4)
 *   - Color: Yellow (0xFFFF00)
 *   - Positions: Left (0.3, -1.2, 0.2), Right (-0.3, -1.2, 0.2)
 *   - Scale: 1 × 1 × 0.2 (flattened)
 * 
 * Tail Feathers (6):
 *   - Shape: Plane (0.2 × 1)
 *   - Color: Red (0xFF0000)
 *   - Position: (0, 0.2, -1)
 *   - Rotation: Fan arrangement with Math.PI / 4 on Z-axis
 * 
 * @returns {THREE.Group} A Three.js Group containing all hen parts
 */


export function createHen() {
  // Create a group to hold all hen components
  const henGroup = new THREE.Group();
  
  // ======== BODY ========
  const bodyGeometry = new THREE.SphereGeometry(0.8, 16, 16);
  const bodyMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,  // White
    shininess: 10
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.set(1, 1, 1.2);
  henGroup.add(body);
  
  // ======== NECK ========
  const neckGeometry = new THREE.CylinderGeometry(0.25, 0.35, 0.4, 16);
  const neckMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,  // White
    shininess: 10
  });
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  neck.position.set(0, 0.4, 0.7);  // Moved closer to body
  neck.rotation.x = Math.PI / 4;  // Angle the neck forward
  henGroup.add(neck);
  
  // ======== HEAD ========
  const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const headMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,  // White
    shininess: 10
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 0.7, 1.1);  // Positioned closer to body
  henGroup.add(head);
  
  // ======== BEAK ========
  const beakGeometry = new THREE.ConeGeometry(0.2, 0.4, 8);
  const beakMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFF00,  // Yellow
    shininess: 20
  });
  const beak = new THREE.Mesh(beakGeometry, beakMaterial);
  beak.position.set(0, 0.6, 1.7);  // Adjusted position
  beak.rotation.x = Math.PI / 2;  // Point forward
  henGroup.add(beak);

  // ======== EYES ========
  const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const eyeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x000000,  // Black
    shininess: 100
  });
  
  // Left eye
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(0.25, 0.8, 1.45);  // Adjusted for new head position
  henGroup.add(leftEye);
  
  // Right eye
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(-0.25, 0.8, 1.45);  // Adjusted for new head position
  henGroup.add(rightEye);
  
  // ======== EYE HIGHLIGHTS ========
  const highlightGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const highlightMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,  // White
    shininess: 100
  });
  
  // Left eye highlight
  const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
  leftHighlight.position.set(0.22, 0.83, 1.52);  // Adjusted for new eye position
  henGroup.add(leftHighlight);
  
  // Right eye highlight
  const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
  rightHighlight.position.set(-0.22, 0.83, 1.52);  // Adjusted for new eye position
  henGroup.add(rightHighlight);
  
  // ======== COMB ========
  const combGeometry = new THREE.PlaneGeometry(0.6, 0.4);
  const combMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFF0000,  // Red
    shininess: 20,
    side: THREE.DoubleSide
  });
  
  // Create multiple comb pieces with better alignment
  for (let i = 0; i < 4; i++) {
    const comb = new THREE.Mesh(combGeometry, combMaterial);
    comb.position.set(0, 1.1, 1.1);
    comb.rotation.y = Math.PI / 2;
    comb.rotation.z = Math.PI / 3;
    henGroup.add(comb);
  }
  
  // ======== WATTLE ========
  const wattleGeometry = new THREE.CircleGeometry(0.25, 16);
  const wattleMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFF0000,  // Red
    shininess: 20,
    side: THREE.DoubleSide
  });
  const wattle = new THREE.Mesh(wattleGeometry, wattleMaterial);
  wattle.position.set(0, 0.35, 1.5);  // Better positioned under the beak
  wattle.rotation.x = Math.PI / 3;  // Slightly adjusted angle
  henGroup.add(wattle);
  
  // ======== WINGS ========
  const wingGeometry = new THREE.SphereGeometry(0.8, 16, 16, 0, Math.PI, 0, Math.PI / 2);
  const wingMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,  // White
    shininess: 10
  });
  
  // Left wing
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.set(0.9, 0, 0);
  leftWing.rotation.z = Math.PI / 2;
  leftWing.rotation.y = -Math.PI / 10;
  leftWing.scale.set(0.5, 0.8, 1);
  henGroup.add(leftWing);
  
  // Right wing
  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  rightWing.position.set(-0.8, 0, 0);
  rightWing.rotation.z = -Math.PI / 2;
  rightWing.rotation.y = Math.PI / 10;
  rightWing.scale.set(0.5, 0.8, 1);
  henGroup.add(rightWing);
  
  // ======== LEGS ========
  const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
  const legMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFF00,  // Yellow
    shininess: 20
  });
  
  // Left leg
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  leftLeg.position.set(0.3, -0.8, 0);
  henGroup.add(leftLeg);
  
  // Right leg
  const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
  rightLeg.position.set(-0.3, -0.8, 0);
  henGroup.add(rightLeg);
  
  // ======== FEET ========
  const footGeometry = new THREE.ConeGeometry(0.2, 0.4, 3);
  const footMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFFF00,  // Yellow
    shininess: 20
  });
  
  // Left foot
  const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
  leftFoot.position.set(0.3, -1.2, 0.2);
  leftFoot.rotation.x = Math.PI / 2;
  leftFoot.scale.set(1, 1, 0.2);
  henGroup.add(leftFoot);
  
  // Right foot
  const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
  rightFoot.position.set(-0.3, -1.2, 0.2);
  rightFoot.rotation.x = Math.PI / 2;
  rightFoot.scale.set(1, 1, 0.2);
  henGroup.add(rightFoot);
  
  // ======== TAIL FEATHERS ========
  const tailFeatherGeometry = new THREE.PlaneGeometry(0.2, 1);
  const tailFeatherMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFF0000,  // Red
    shininess: 20,
    side: THREE.DoubleSide
  });
  
  // Create tail feathers in a fan arrangement
  for (let i = 0; i < 6; i++) {
    const angle = (i - 2) * Math.PI / 12;
    const tailFeather = new THREE.Mesh(tailFeatherGeometry, tailFeatherMaterial);
    tailFeather.position.set(0, 0.2, -1); 
    tailFeather.rotation.set(0, angle, Math.PI / 4);
    henGroup.add(tailFeather);
  }
  
  return henGroup;
}