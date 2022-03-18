// Todo
// Random circles on edge DONE
// Random circles cutting out edge 
// Little dots
// Lines connecting circles

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  // Move center to the middle of the canvas
  background(255);
  stroke(0);
  mainCircleRadius = 250;
  // Draw main circle at center
  circle(width/2,height/2, mainCircleRadius);
  // Draw a random circle on the outside of the main circle
  drawEdgeCircle(mainCircleRadius);

}

// Draw circle on the edge of the main circle
function drawEdgeCircle(mainCircleRadius){
  let circradius = random(50,100);
  let circangle = random(0,360);
  let circvec = getcircle(circangle, mainCircleRadius/2);
  circvec.add(width/2,height/2);
  circle(circvec.x, circvec.y, circradius);
  // Draw line from center to edge of new circle
  // Get vector to put dots at edge of new circle
  vec = createVector(circvec.x - width/2, circvec.y - height/2);
  factor = 0.5;
  closeness_to_edge = factor * circradius/2
  vec.normalize().mult(mainCircleRadius/2 - closeness_to_edge);
  vec.add(width/2,height/2);
  fill(0);
  circle(vec.x, vec.y, 8);
  // Draw 3 dots at the edge of the circle with 50% chance
  if (random(0,1) > 0.5){
    drawDots(vec, circradius);
  }


}

// Draw 3 dots at the edge of the circle
function drawDots(circleCenter, circleRadius){
  // Get vector between center of new circle and vec
  vec2 = createVector(circleCenter.x - width/2, circleCenter.y - height/2);
  vec3 = vec2.copy();
  // Create a vector that is perpendicular to vec2
  rotationAmount = 20;
  vec2.rotate(90-rotationAmount);
  vec2.normalize().mult(10);
  vec2.add(circleCenter.x, circleCenter.y);
  
  vec3.rotate(90+rotationAmount);
  vec3.normalize().mult(-10);
  vec3.add(circleCenter.x, circleCenter.y);
  circle(vec2.x, vec2.y, 5);
// Draw another dot with 50% chance
  if(random(0,1) > 0.5){
    circle(vec3.x, vec3.y, 5);
  }
}

// Get point on circle
function getcircle(circangle, circradius){
  let xvec = cos(circangle) * circradius
  let yvec = sin(circangle) * circradius
  return createVector(xvec,yvec)
}