/**
 * Author: Samiksha Singh
 * Date: 05/01/2025
 * Purpose: Defines a 3D bunny model using Three.js.
 */



import * as THREE from 'three';

/**
 * Creates a 3D bunny model using Three.js primitives
 * 
 * BUNNY DIMENSIONS AND COLORS:
 * 
 * Body:
 *   - Shape: Box (1.5 × 1 × 1.5)
 *   - Color: White (0xFFFFFF)
 *   - Position: Center (0, 0, 0)
 * 
 * Head:
 *   - Shape: Box (1 × 1 × 1)
 *   - Color: White (0xFFFFFF)
 *   - Position: (0, 0.8, 0.8)
 * 
 * Ears (2):
 *   - Shape: Box (0.2 × 1 × 0.2)
 *   - Color: Light Pink (0xFFDFD3)
 *   - Positions: Left (0.3, 1.6, 0.8), Right (-0.3, 1.6, 0.8)
 *   - Rotations: Left (-0.3 rad Z), Right (0.3 rad Z)
 * 
 * Eyes (2):
 *   - Shape: Sphere (radius 0.1)
 *   - Color: Black (0x000000)
 *   - Positions: Left (0.2, 0.9, 1.4), Right (-0.2, 0.9, 1.4)
 * 
 * Nose:
 *   - Shape: Sphere (radius 0.1)
 *   - Color: Pink (0xFFC0CB)
 *   - Position: (0, 0.7, 1.5)
 * 
 * Legs (4):
 *   - Shape: Box (0.3 × 0.7 × 0.3)
 *   - Color: White (0xFFFFFF)
 *   - Positions: Front Left (0.5, -0.8, 0.8), Front Right (-0.5, -0.8, 0.8),
 *                Back Left (0.5, -0.8, -0.8), Back Right (-0.5, -0.8, -0.8)
 * 
 * Tail:
 *   - Shape: Sphere (radius 0.3)
 *   - Color: White (0xFFFFFF)
 *   - Position: (0, -0.2, -1.3)
 * 
 * @returns {THREE.Group} A Three.js Group containing all bunny parts
 */
export function createBunny() {
  // Create a group to hold all bunny components
  const bunnyGroup = new THREE.Group();
  
  // ======== BODY ========
  const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 1.5);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,  // White
    shininess: 30
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bunnyGroup.add(body);
  
  // ======== HEAD ========
  const headGeometry = new THREE.BoxGeometry(1, 1, 1);
  const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,  // White
    shininess: 30
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 0.8, 0.8);
  bunnyGroup.add(head);
  
  // ======== EARS ========
  const earGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
  const earMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFDFD3,  // Light pink
    shininess: 20
  });
  
  // Left ear
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(0.3, 1.6, 0.8);
  leftEar.rotation.z = -0.3;
  bunnyGroup.add(leftEar);
  
  // Right ear
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(-0.3, 1.6, 0.8);
  rightEar.rotation.z = 0.3;
  bunnyGroup.add(rightEar);
  
  // ======== EYES ========
  const eyeGeometry = new THREE.SphereGeometry(0.1, 6, 6);
  const eyeMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,  // Black
    shininess: 100
  });
  
  // Left eye
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(0.2, 0.9, 1.4);
  bunnyGroup.add(leftEye);
  
  // Right eye
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(-0.2, 0.9, 1.4);
  bunnyGroup.add(rightEye);
  
  // ======== NOSE ========
  const noseGeometry = new THREE.SphereGeometry(0.1, 6, 6);
  const noseMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFC0CB,  // Pink
    shininess: 80
  });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, 0.7, 1.5);
  bunnyGroup.add(nose);
  
  // ======== LEGS ========
  const legGeometry = new THREE.BoxGeometry(0.3, 0.7, 0.3);
  const legMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,  // White
    shininess: 30
  });
  
  // Front left leg
  const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  frontLeftLeg.position.set(0.5, -0.8, 0.8);
  bunnyGroup.add(frontLeftLeg);
  
  // Front right leg
  const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  frontRightLeg.position.set(-0.5, -0.8, 0.8);
  bunnyGroup.add(frontRightLeg);
  
  // Back left leg
  const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  backLeftLeg.position.set(0.5, -0.8, -0.8);
  bunnyGroup.add(backLeftLeg);
  
  // Back right leg
  const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  backRightLeg.position.set(-0.5, -0.8, -0.8);
  bunnyGroup.add(backRightLeg);
  
  // ======== TAIL ========
  const tailGeometry = new THREE.SphereGeometry(0.3, 6, 6);
  const tailMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,  // White
    shininess: 40
  });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.set(0, -0.2, -1.3);
  bunnyGroup.add(tail);
  
  return bunnyGroup;
}