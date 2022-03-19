// Todo
// Random circles on edge DONE
// Random circles cutting out edge 
// Little dots DONE
// Lines connecting circles

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(255);
  drawCircle(100,100, 100);
  drawCircle(300,300, 100);
  // Draw a grid of 9 circles
}

function drawCircle(centerX, centerY, mainCircleRadius) {
  stroke(0);
  fill(255);
  // Draw main circle at center
  circle(centerX, centerX, mainCircleRadius);
  // Draw a random circle on the outside of the main circle
  circleRadius = random(.2,.5) * mainCircleRadius;
  circleAngle = random(0,360);
  drawEdgeCircle(centerX, centerY,mainCircleRadius, circleRadius, circleAngle);
  // Draw a line between the two circles
  // drawLines(smallCircleCenter, smallCircleRadius, mainCircleRadius);
}

// Draw circle on the edge of the main circle
function drawEdgeCircle(centerX, centerY, mainCircleRadius, circradius, circangle){
  let circvec = getcircle(circangle, mainCircleRadius/2);
  circvec.add(centerX,centerY);
  circle(circvec.x, circvec.y, circradius,);
  // Draw line from center to edge of new circle
  // Get vector to put dots at edge of new circle
  drawDots(centerX, centerY,circvec, circradius, mainCircleRadius);


}

// Draw 3 dots at the edge of the circle
function drawDots(centerX, centerY,circleCenter, circleRadius,mainCircleRadius){
  vec = createVector(circleCenter.x - centerX, circleCenter.y - centerY);
  factor = 0.5;
  closeness_to_edge = factor * circleRadius/2
  vec.normalize().mult(mainCircleRadius/2 - closeness_to_edge);
  vec.add(centerX,centerY);
  fill(0);
  circle(vec.x, vec.y, 8);
  // Get vector between center of new circle and vec
  vec2 = createVector(vec.x - centerX, vec.y - centerY);
  vec3 = vec2.copy();
  // Create a vector that is perpendicular to vec2
  rotationAmount = 20;
  vec2.rotate(90-rotationAmount);
  vec2.normalize().mult(10);
  vec2.add(vec.x, vec.y);
  
  vec3.rotate(90+rotationAmount);
  vec3.normalize().mult(-10);
  vec3.add(vec.x, vec.y);
  circle(vec2.x, vec2.y, 5);
// Draw another dot with 50% chance
  if(random(0,1) > 0.5){
    circle(vec3.x, vec3.y, 5);
  }
}

// Draw lines between edges of different circles
function drawLines(smallCircleCenter, smallCircleRadius,mainCircleRadius){
  // Get slope of line between center of small circle and center of main circle
  let vec = createVector(smallCircleCenter.x - width/2, smallCircleCenter.y - height/2);
  let slope = vec.y/vec.x;
  // Get intersection of line with main circle
  let xintersect = (mainCircleRadius/2 - smallCircleRadius/2)/slope;
  let yintersect = mainCircleRadius/2 - xintersect * slope;
  // Get intersection of line small circle
  let xintersect2 = (smallCircleRadius/2 - mainCircleRadius/2)/slope;
  let yintersect2 = smallCircleRadius/2 - xintersect2 * slope;
  // Draw line between main circle and small circle
  line(width/2, height/2, xintersect, yintersect);
}

// Get point on circle
function getcircle(circangle, circradius){
  let xvec = cos(circangle) * circradius
  let yvec = sin(circangle) * circradius
  return createVector(xvec,yvec)
}