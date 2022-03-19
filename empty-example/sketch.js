// Todo
// Random circles on edge DONE
// Random circles cutting out edge 
// Little dots DONE
// Lines connecting circles

function setup() {
  createCanvas(3300, 2550);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(255);
  // drawCircle(100, 100, 100);
  // drawCircle(300, 100, 100);
  // drawCircle(100, 300, 100);
  // drawCircle(300, 300, 100);
  // Get 4 evenly spaced points around a centered circle
  let centerX = width / 2;
  let centerY = height / 2;
  let mainCircleRadius = 800;
  let n_circles = 8;
  for(let i = 0; i < n_circles; i++) {
    let angle = i * (360 / n_circles);
    let x = centerX + mainCircleRadius * cos(angle);
    let y = centerY + mainCircleRadius * sin(angle);
    drawCircle(x, y, 400);
  }

}

function drawCircle(centerX, centerY, mainCircleRadius) {
  stroke(0);
  fill(255);
  // Thick stroke
  strokeWeight(0);

  // Set up color
  fillColor = randomColor();
  fill(fillColor);

  // Draw main circle at center
  circle(centerX, centerY, mainCircleRadius);

  // Draw a random circle on the outside of the main circle
  circleRadius = random(.2, .5) * mainCircleRadius;
  circleAngle = random(0, 360);

  edgeCircleColor = randomColor(fillColor);
  drawEdgeCircle(centerX, centerY, mainCircleRadius, circleRadius, circleAngle,edgeCircleColor);

  // Rolldice to see if we draw another orbiting circle
  circleRadius2 = random(.2, .5) * mainCircleRadius;
  circleAngle2 =  circleAngle + 180 + random(-45, 45);
  hasSecondCircle = rollDice(0.5);
  if (hasSecondCircle) {
    // Draw another circle on the outside of the main circle
    circleRadius2 = random(.2, .5) * mainCircleRadius;
    circleAngle2 =  circleAngle + 180 + random(-70, 70);
    edgeCircleColor2 = randomColor(fillColor);
    drawEdgeCircle(centerX, centerY, mainCircleRadius, circleRadius2, circleAngle2, edgeCircleColor2);
  }

  // Remove slice by adding white circle on top of everything
  cutCircleAngle = random(0, 360);
  fill(255);
  stroke(255);
  // let circVec = getcircle(centerX, centerY, cutCircleAngle, mainCircleRadius/2);
  circle(cutCircleX, cutCircleY, 10);
  // Draw a line from the edge of the small circle to the edge of the main circle
  // Get center of small circle 1


}

function randomColor(colorToAvoid){
  // Colors https://www.canva.com/colors/color-palettes/mermaid-lagoon/
  let colors = ["#145DA0", "#0C2D48", "#2E8BC0", "#B1D4E0"];
  // Remove colorToAvoid from colors
  colors = colors.filter(color => color != colorToAvoid);
  // fill(colors[random(colors.length)]);
  colorPicked = random(colors);
  return colorPicked;
}


// Draw circle on the edge of the main circle
function drawEdgeCircle(centerX, centerY, mainCircleRadius, circradius, circangle, fillColor) {
  fill(fillColor);
  let circvec = getcircle(centerX, centerY, circangle, mainCircleRadius / 2);
  // circvec.add(centerX,centerY);
  circle(circvec.x, circvec.y, circradius,);
  // Draw line from center to edge of new circle
  // Get vector to put dots at edge of new circle
  // Draw dots on the outside of the circle
  drawDots(centerX, centerY, circvec, circradius, mainCircleRadius);


}

// Draw 3 dots at the edge of the circle
function drawDots(centerX, centerY, circleCenter, circleRadius, mainCircleRadius) {
  vec = createVector(circleCenter.x - centerX, circleCenter.y - centerY);
  factor = 0.5;
  closeness_to_edge = factor * circleRadius / 2
  vec.normalize().mult(mainCircleRadius / 2 - closeness_to_edge);
  vec.add(centerX, centerY);
  fill(255);
  stroke(255)
  let smallDotRadius = 15;
  circle(vec.x, vec.y, smallDotRadius * 1.3);
  // Get vector between center of new circle and vec
  vec2 = createVector(vec.x - centerX, vec.y - centerY);
  vec3 = vec2.copy();
  // Create a vector that is perpendicular to vec2
  rotationAmount = 20;
  vec2.rotate(90 - rotationAmount);
  let distance = 30;
  vec2.normalize().mult(distance);
  vec2.add(vec.x, vec.y);

  vec3.rotate(90 + rotationAmount);
  vec3.normalize().mult(-distance);
  vec3.add(vec.x, vec.y);
  if (rollDice(0.5)) {
    circle(vec2.x, vec2.y, smallDotRadius);
  }
  // Draw another dot with 50% chance
  if (rollDice(0.5)) {
    circle(vec3.x, vec3.y, smallDotRadius);
  }
}


// Get point on circle
function getcircle(xval, yval, circangle, circradius) {
  let xvec = cos(circangle) * circradius + xval
  let yvec = sin(circangle) * circradius + yval
  return createVector(xvec, yvec)
}

function rollDice(prob) {
  if (random(0, 1) < prob) {
    return true;
  }
  return false;
}