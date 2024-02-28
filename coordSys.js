// //================ Polar ============================================================

console.log("\n-----------POLAR-----------\n");

function cartesianToPolar(cartesianPoints) {
  return cartesianPoints.map((point) => {
    let r = Math.sqrt(point.x * point.x + point.y * point.y);
    let theta = Math.atan2(point.y, point.x);
    return { r: r, theta: theta };
  });
}

function polarToCartesian(polarPoints) {
  return polarPoints.map((point) => {
    let x = point.r * Math.cos(point.theta);
    let y = point.r * Math.sin(point.theta);
    return { x: x, y: y };
  });
}

function compare2DPointSets(polarToCartPoints, cartesianPoints) {
  const epsilon = 0.0001; // Tolerance for comparison

  // Check if both arrays have the same length
  if (cartesianPoints.length !== polarToCartPoints.length) return false;

  for (let i = 0; i < cartesianPoints.length; i++) {
    const { x: x1, y: y1 } = cartesianPoints[i];
    const { x: x2, y: y2 } = polarToCartPoints[i];

    const areEqualX = Math.abs(x1 - x2) < epsilon;
    const areEqualY = Math.abs(y1 - y2) < epsilon;

    // If either coordinate pair doesn't match, the sets are not equal
    if (!areEqualX || !areEqualY) return false;
  }

  return true;
}

function generate2DPoints(numPoints, rangeX, rangeY) {
  let points2D = [];
  for (let i = 0; i < numPoints; i++) {
    // Generate random x and y coordinates
    let x = Math.random() * (rangeX.max - rangeX.min) + rangeX.min;
    let y = Math.random() * (rangeY.max - rangeY.min) + rangeY.min;
    points2D.push({ x, y });
  }
  return points2D;
}

let numPoints2D = 15000; // Adjust the number of 2D points

// Adjust the ranges as needed
let range2DX = { min: -100, max: 100 };
let range2DY = { min: -100, max: 100 };

const cartPoints2D = generate2DPoints(numPoints2D, range2DX, range2DY);

const polarPoints = cartesianToPolar(cartPoints2D);
const convBackCartesian = polarToCartesian(polarPoints);

const result = compare2DPointSets(cartPoints2D, convBackCartesian);
console.log(`The 2D point sets are ${result ? "equal" : "not equal"}.`);

//====================================================================================

//=================Spherical==========================================================

console.log("\n-----------SPHERICAL-----------\n");

function cartesianToSpherical(cartesianPoints) {
  return cartesianPoints.map((point) => {
    let r = Math.sqrt(
      point.x * point.x + point.y * point.y + point.z * point.z
    );
    let theta = Math.acos(point.z / r);
    let phi = Math.atan2(point.y, point.x);
    return { r: r, theta: theta, phi: phi };
  });
}

function sphericalToCartesian(sphericalPoints) {
  return sphericalPoints.map((point) => {
    let x = point.r * Math.sin(point.theta) * Math.cos(point.phi);
    let y = point.r * Math.sin(point.theta) * Math.sin(point.phi);
    let z = point.r * Math.cos(point.theta);
    return { x: x, y: y, z: z };
  });
}

function compare3DPointSets(cartesianPoints, convertedPoints) {
  const epsilon = 0.0001; // Tolerance for comparison

  if (cartesianPoints.length !== convertedPoints.length) return false;

  for (let i = 0; i < cartesianPoints.length; i++) {
    const { x: x1, y: y1, z: z1 } = cartesianPoints[i];
    const { x: x2, y: y2, z: z2 } = convertedPoints[i];

    const areEqualX = Math.abs(x1 - x2) < epsilon;
    const areEqualY = Math.abs(y1 - y2) < epsilon;
    const areEqualZ = Math.abs(z1 - z2) < epsilon;

    if (!areEqualX || !areEqualY || !areEqualZ) return false;
  }

  return true;
}

// Example usage
function generate3DPoints(numPoints, rangeX, rangeY, rangeZ) {
  let points3D = [];
  for (let i = 0; i < numPoints; i++) {
    let x = Math.random() * (rangeX.max - rangeX.min) + rangeX.min;
    let y = Math.random() * (rangeY.max - rangeY.min) + rangeY.min;
    let z = Math.random() * (rangeZ.max - rangeZ.min) + rangeZ.min;
    points3D.push({ x, y, z });
  }
  return points3D;
}

let numPoints3D = 15000; // Adjust the number of 3D points

let range3DX = { min: -100, max: 100 };
let range3DY = { min: -100, max: 100 };
let range3DZ = { min: -100, max: 100 };

const cartPoints3D = generate3DPoints(
  numPoints3D,
  range3DX,
  range3DY,
  range3DZ
);

const sphericalPoints = cartesianToSpherical(cartPoints3D);
const convertedBackCartesian = sphericalToCartesian(sphericalPoints);

const result3D = compare3DPointSets(cartPoints3D, convertedBackCartesian);
console.log(`The 3D point sets are ${result3D ? "equal" : "not equal"}.`);

//===============Functions=======================================================

console.log("\n-----------DISTANCE FUNCTIONS-----------\n");

// Distance in Cartesian Coordinates
function cartesianDistance2D(points) {
  // Start timing
  const startTime = performance.now();

  let distances = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let d = Math.sqrt(
        Math.pow(points[j].x - points[i].x, 2) +
          Math.pow(points[j].y - points[i].y, 2)
      );
      distances.push(d);
    }
  }
  // End timing and calculate the duration
  const endTime = performance.now();
  console.log(
    `Calculation of cartesian 2D distance took ${
      endTime - startTime
    } milliseconds`
  );

  return distances;
}

function cartesianDistance3D(points) {
  // Start timing
  const startTime = performance.now();

  let distances = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let d = Math.sqrt(
        Math.pow(points[j].x - points[i].x, 2) +
          Math.pow(points[j].y - points[i].y, 2) +
          Math.pow(points[j].z - points[i].z, 2)
      );
      distances.push(d);
    }
  }

  const endTime = performance.now();
  console.log(
    `Calculation of cartesian 3D distance took ${
      endTime - startTime
    } milliseconds`
  );

  return distances;
}

// Distance in Polar Coordinates
function polarDistance(polarPoints) {
  // Start timing
  const startTime = performance.now();

  // Convert polar to Cartesian
  let cartesianPoints = polarPoints.map((point) => ({
    x: point.r * Math.cos(point.theta),
    y: point.r * Math.sin(point.theta),
  }));

  const endTime = performance.now();
  console.log(
    `Calculation of polar distance took ${endTime - startTime} milliseconds`
  );

  return cartesianDistance2D(cartesianPoints);
}

// Distance in Spherical Coordinates
function sphericalDistance(sphericalPoints) {
  // Start timing
  const startTime = performance.now();

  // Convert spherical to Cartesian
  let cartesianPoints = sphericalPoints.map((point) => ({
    x: point.r * Math.sin(point.theta) * Math.cos(point.phi),
    y: point.r * Math.sin(point.theta) * Math.sin(point.phi),
    z: point.r * Math.cos(point.theta),
  }));

  const endTime = performance.now();
  console.log(
    `Calculation of spherical distance took ${endTime - startTime} milliseconds`
  );

  return cartesianDistance3D(cartesianPoints);
}

let distances2D = cartesianDistance2D(cartPoints2D);
let distances3D = cartesianDistance3D(cartPoints3D);
let distancesPolar2D = polarDistance(polarPoints);
let distancesSpherical3D = sphericalDistance(sphericalPoints);
