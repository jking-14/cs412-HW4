// cube

function makeCube(x, y, z) {
  const positions = new Float32Array([
    -x, -y, -z,  // 0
    x, -y, -z,  // 1
    x, y, -z,  // 2
    -x, y, -z,  // 3
    -x, -y, z,  // 4
    x, -y, z,  // 5
    x, y, z,  // 6
    -x, y, z   // 7
  ]);

  const colors = new Float32Array([
    1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1
  ]);


  const indices = new Uint16Array([
    // Front
    4, 5, 6, 4, 6, 7,
    // Back
    1, 0, 3, 1, 3, 2,
    // Top
    3, 7, 6, 3, 6, 2,
    // Bottom
    0, 1, 5, 0, 5, 4,
    // Right
    1, 2, 6, 1, 6, 5,
    // Left
    0, 4, 7, 0, 7, 3,
  ]);
  
  return {
    positions,
    colors,
    indices
  };
}


function makeSphere(r, vSteps, uSteps) {
  let positions = [];
  let colors = [];
  let indices = [];

  for (let i = 0; i <= vSteps; i++) {
    const v = i * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);
      const x = cosu * sinv;
      const y = cosv;
      const z = sinu * sinv;

      positions.push(r * x, r * y, r * z);

      colors.push(
        Math.abs(x),
        Math.abs(y),
        Math.abs(z)
      );
    }
  }

  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * (uSteps + 1)) + j;
      const k2 = k1 + uSteps + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}

function makeTorus(R, r, vSteps, uSteps) {
  let positions = [];
  let colors = [];
  let indices = [];

  for (let i = 0; i <= vSteps; i++) {
    const v = i * 2 * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);
      const x = (R + r*cosv)*cosu;
      const y = (R + r*cosv)*sinu;
      const z = r*sinv;

      positions.push(x, y, z);

      colors.push(
        Math.abs(x),
        Math.abs(y),
        Math.abs(z)
      );
    }
  }

  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * (uSteps + 1)) + j;
      const k2 = k1 + uSteps + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}

class part {
      constructor(object) {
        this.object = object;
        
        this.positions = this.object.positions;
        this.colors = this.object.colors;
        this.indices = this.object.indices;
        this.children = [];
      }

      add(child) {
        this.children.push(child);
        return child;
      }
}

function setColor(part, r, g, b) {
  for (let i = 0; i < part.colors.length; i += 3) {
    part.colors[i] = r;
    part.colors[i+1] = g;
    part.colors[i+2] = b;
  }
}

const sun = new part(makeSphere(5, 20, 20));
const planet = sun.add(new part(makeSphere(2, 20, 20)));
const satellite2 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite3 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite4 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite5 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite6 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite7 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite8 = planet.add(new part(makeSphere(0.25, 20, 20)));
const satellite9 = planet.add(new part(makeSphere(0.25, 20, 20)));
const moon = planet.add(new part(makeSphere(1, 20, 20)));
const satellite = moon.add(new part(makeSphere(0.5, 20, 20)));

setColor(sun, 1.00, 0.75, 0.05);
setColor(planet, 0.10, 0.40, 0.85);
setColor(moon, 0.65, 0.65, 0.68);
setColor(satellite, 0.80, 0.85, 0.90);
setColor(satellite2, 0.80, 0.85, 0.90);
setColor(satellite3, 0.80, 0.85, 0.90);
setColor(satellite4, 0.80, 0.85, 0.90);
setColor(satellite5, 0.80, 0.85, 0.90);
setColor(satellite6, 0.80, 0.85, 0.90);
setColor(satellite7, 0.80, 0.85, 0.90);
setColor(satellite8, 0.80, 0.85, 0.90);
setColor(satellite9, 0.80, 0.85, 0.90);
