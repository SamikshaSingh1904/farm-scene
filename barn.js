/**
 * Author: Samiksha Singh
 * Date: 05/06/2025
 * Purpose: Defines a 3D Stardew Valley style barn using Three.js.
 */

import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();

/**
 * Creates a 3D Stardew Valley style barn model using Three.js.
 * 
 * BARN DIMENSIONS AND PROPERTIES:
 * 
 * Main Barn Structure:
 *   - Base: Box (width: 10.5, height: 0.5, depth: 8.5)
 *   - Body: Box (width: 10, height: 6, depth: 8)
 *   - Material: Wall texture for body, brown (0x8B4513) for base
 * 
 * Roof:
 *   - Shape: Triangular with overhangs
 *   - Height: 4.5 units above wall top
 *   - Color: Red (0xB22222)
 *   - Material: MeshPhongMaterial
 * 
 * Trim:
 *   - Corner posts: White (0xFFFAF0) at each corner
 *   - Top trim: White horizontal band at wall top
 * 
 * Door:
 *   - Main door: Brown (0x8B4513) with white X-pattern
 *   - Width: 3 units, Height: 4 units
 *   - White door frame
 *   - Wooden ramp in front
 * 
 * Windows:
 *   - Side windows: Two windows with cross pattern
 *   - Color: Light blue (0xADD8E6) with white frames
 * 
 * Decorative elements:
 *   - Weather vane on roof 
 *   - Hay bales around barn
 * 
 * @returns {THREE.Group} A Three.js Group containing the complete barn model
 */
export function createStardewBarn() {
    const barnGroup = new THREE.Group();
    
    // Main barn structure dimensions
    const barnWidth = 10;
    const barnDepth = 8;
    const barnHeight = 6;
    const roofHeight = 4.5;
    
    // Barn base - foundation
    const baseGeometry = new THREE.BoxGeometry(barnWidth + 0.5, 0.5, barnDepth + 0.5);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513, // Brown
      shininess: 10
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.25;
    barnGroup.add(base);
    
    const wallTexture = textureLoader.load('wall2.jpg');
    wallTexture.wrapS = THREE.MirrorRepeatWrapping;
    wallTexture.wrapT = THREE.MirrorRepeatWrapping;
    wallTexture.repeat.set(4, 1); // 4 horizontal repeats, 1 vertical

    // Barn body
    const bodyGeometry = new THREE.BoxGeometry(barnWidth, barnHeight, barnDepth);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        map: wallTexture, // Use texture instead of color
        shininess: 20
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = barnHeight / 2;
    barnGroup.add(body);
    
    
    const roofGroup = new THREE.Group();
    
    // Triangular roof faces
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(-barnWidth/2 - 1, 0);  // Extend past walls for overhang
    triangleShape.lineTo(0, roofHeight);
    triangleShape.lineTo(barnWidth/2 + 1, 0);   // Extend past walls for overhang
    triangleShape.lineTo(-barnWidth/2 - 1, 0);
    
    const extrudeSettings = {
      steps: 1,
      depth: barnDepth + 2,  // Extend past walls for overhang
      bevelEnabled: false
    };
    
    const roofGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
    const roofMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xB22222, 
      shininess: 15
    });
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.z = -(barnDepth / 2) - 1;  // Center and adjust for overhang
    roof.position.y = barnHeight;
    roofGroup.add(roof);
    
    // Add roof to barn
    barnGroup.add(roofGroup);
    
    // Add white trim at corners 
    const trimGeometry = new THREE.BoxGeometry(0.8, barnHeight, 0.8);
    const trimMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFFFAF0, // Floral white
      shininess: 15
    });
    
    // Create four corner trims
    const positions = [
      [barnWidth/2 - 0.3, 0, barnDepth/2 - 0.3],
      [barnWidth/2 - 0.3, 0, -barnDepth/2 + 0.4],
      [-barnWidth/2 + 0.3, 0, barnDepth/2 - 0.3],
      [-barnWidth/2 + 0.5, 0, -barnDepth/2 + 0.4]
    ];
    
    positions.forEach(pos => {
      const trim = new THREE.Mesh(trimGeometry, trimMaterial);
      trim.position.set(pos[0], barnHeight/2, pos[2]);
      barnGroup.add(trim);
    });
    
    // Add white horizontal trim along top of walls
    const topTrimGeometry = new THREE.BoxGeometry(barnWidth + 0.4, 0.6, barnDepth + 0.4);
    const topTrim = new THREE.Mesh(topTrimGeometry, trimMaterial);
    topTrim.position.y = barnHeight - 0.3;
    barnGroup.add(topTrim);
    
    // Add barn door with X pattern
    const doorWidth = 3;
    const doorHeight = 4;
    
    // Main door
    const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.3);
    const doorMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513, // Brown
      shininess: 20
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, doorHeight/2, barnDepth/2 + 0.15);
    barnGroup.add(door);
    
    // Door frame - white trim around door
    const doorFrameGeometry = new THREE.BoxGeometry(doorWidth + 0.4, doorHeight + 0.4, 0.25);
    const doorFrame = new THREE.Mesh(doorFrameGeometry, trimMaterial);
    doorFrame.position.set(0, doorHeight/2, barnDepth/2 + 0.05);
    barnGroup.add(doorFrame);
    
    // Door X pattern 
    const doorXMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFFFAF0, // Floral white
      shininess: 20
    });
    
    // X pattern - diagonal beams
    const diagonal1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, doorHeight * 1.2, 0.35),
      doorXMaterial
    );
    diagonal1.position.set(0, doorHeight/2, barnDepth/2 + 0.3);
    diagonal1.rotation.z = Math.PI / 4;
    barnGroup.add(diagonal1);
    
    const diagonal2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, doorHeight * 1.2, 0.35),
      doorXMaterial
    );
    diagonal2.position.set(0, doorHeight/2, barnDepth/2 + 0.3);
    diagonal2.rotation.z = -Math.PI / 4;
    barnGroup.add(diagonal2);
    
    //windows (rounded tops)
    const windowWidth = 1.2;
    const windowHeight = 1.8;
    
    // Front windows with rounded tops
    const frontWindowPositions = [
      [-barnWidth/2 + 2.2, barnHeight/2 + 0.8, barnDepth/2 + 0.05],
      [barnWidth/2 - 2.2, barnHeight/2 + 0.8, barnDepth/2 + 0.05]
    ];
    
    frontWindowPositions.forEach(pos => {
      // Window group
      const windowGroup = new THREE.Group();
      
      // Rectangular part
      const windowRect = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth, windowHeight - windowWidth/2, 0.1),
        new THREE.MeshPhongMaterial({ 
          color: 0xADD8E6, // Light blue
          shininess: 80,
          transparent: true,
          opacity: 0.7
        })
      );
      windowRect.position.y = -windowWidth/4;
      windowGroup.add(windowRect);
      
      
      const windowTop = new THREE.Mesh(
        new THREE.CircleGeometry(windowWidth/2, 32, 0, Math.PI),
        new THREE.MeshPhongMaterial({ 
          color: 0xADD8E6, // Light blue
          shininess: 80,
          transparent: true,
          opacity: 0.7
        })
      );
      // Rotate to face front and position properly
      windowTop.rotation.x = -Math.PI / 2;
      windowTop.position.y = (windowHeight/2) - (windowWidth/4);
      windowTop.position.z = 0.05;
      windowGroup.add(windowTop);
      
      // White frame
      const frameRect = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + 0.3, windowHeight - windowWidth/2 + 0.3, 0.05),
        trimMaterial
      );
      frameRect.position.y = -windowWidth/4;
      frameRect.position.z = -0.03;
      windowGroup.add(frameRect);
      
      
      const frameCurve = new THREE.Mesh(
        new THREE.CircleGeometry(windowWidth/2 + 0.15, 32, 0, Math.PI),
        trimMaterial
      );
      frameCurve.rotation.x = -Math.PI / 2;
      frameCurve.position.y = windowHeight/2 - windowWidth/4;
      frameCurve.position.z = -0.03;
      windowGroup.add(frameCurve);
      
      // Add window cross pattern 
      const crossH = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + 0.1, 0.15, 0.15),
        trimMaterial
      );
      crossH.position.z = 0.05;
      windowGroup.add(crossH);
      
      const crossV = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, windowHeight, 0.15),
        trimMaterial
      );
      crossV.position.z = 0.05;
      windowGroup.add(crossV);
      
      // Position entire window
      windowGroup.position.set(pos[0], pos[1], pos[2]);
      barnGroup.add(windowGroup);
    });
    
    // Add triangular loft window 
    const loftWindowShape = new THREE.Shape();
    const loftSize = 1.5;
    loftWindowShape.moveTo(-loftSize, 0);
    loftWindowShape.lineTo(0, loftSize);
    loftWindowShape.lineTo(loftSize, 0);
    loftWindowShape.lineTo(-loftSize, 0);
    
    const loftWindowGeometry = new THREE.ShapeGeometry(loftWindowShape);
    const loftWindow = new THREE.Mesh(
      loftWindowGeometry,
      new THREE.MeshPhongMaterial({ 
        color: 0xADD8E6, // Light blue
        shininess: 80,
        transparent: true,
        opacity: 0.7
      })
    );
    loftWindow.position.set(0, barnHeight + roofHeight/2, barnDepth/2 + 0.05);
    barnGroup.add(loftWindow);
    
    // Add loft window frame
    const loftFrameShape = new THREE.Shape();
    const loftFrameSize = loftSize + 0.2;
    loftFrameShape.moveTo(-loftFrameSize, -0.2);
    loftFrameShape.lineTo(0, loftFrameSize);
    loftFrameShape.lineTo(loftFrameSize, -0.2);
    loftFrameShape.lineTo(-loftFrameSize, -0.2);
    
    const loftFrameGeometry = new THREE.ShapeGeometry(loftFrameShape);
    const loftFrame = new THREE.Mesh(
      loftFrameGeometry,
      trimMaterial
    );
    loftFrame.position.set(0, barnHeight + roofHeight/2, barnDepth/2 + 0.03);
    barnGroup.add(loftFrame);
    
    // Add small wooden ramp in front of door
    const rampGeometry = new THREE.BoxGeometry(doorWidth, 0.6, 1.5);
    const ramp = new THREE.Mesh(rampGeometry, doorMaterial);
    ramp.position.set(0, -0.2, barnDepth/2 + 1);
    ramp.rotation.x = -Math.PI / 12; // Slight angle
    barnGroup.add(ramp);
    
    // Add weather vane on roof peak 
    const poleGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 8);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 }); // Dark gray
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(0, barnHeight + roofHeight + 1, 0);
    barnGroup.add(pole);
    
    // Weather vane arrow
    const arrowGeometry = new THREE.ConeGeometry(0.2, 0.8, 8);
    const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Gold
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    arrow.position.set(0, barnHeight + roofHeight + 2, 0);
    arrow.rotation.z = Math.PI / 2;
    barnGroup.add(arrow);
    
    // Add some hay bales around the barn for farm atmosphere
    const hayGeometry = new THREE.BoxGeometry(1, 0.8, 2);
    const hayMaterial = new THREE.MeshPhongMaterial({ color: 0xDAA520 }); // Golden yellow
    
    const hayPositions = [
      [-barnWidth/2 - 1.5, 0.4, barnDepth/2 - 1],
      [-barnWidth/2 - 2, 0.4, barnDepth/2 - 2.5],
      [barnWidth/2 + 1, 0.4, barnDepth/2 - 1.5]
    ];
    
    hayPositions.forEach((pos, index) => {
      const hay = new THREE.Mesh(hayGeometry, hayMaterial);
      hay.position.set(pos[0], pos[1], pos[2]);
      hay.rotation.y = index * Math.PI / 4; // Rotate each hay bale differently
      barnGroup.add(hay);
    });
    
    return barnGroup;
}