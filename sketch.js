// home page

 
let img;
 
function preload() {
  img = loadImage("Kabab.jpeg");
}
 
function setup() {
  createCanvas(1440, 764);
  noLoop(); // static composition
}
 
function draw() {

  image(img, 0, 0, 1440, 764);
 
  
  let vignette = drawingContext.createRadialGradient(
    720, 382, 200,
    720, 382, 900
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.45)");
  drawingContext.fillStyle = vignette;
  rect(0, 0, 1440, 764);
 
  fill(28, 20, 10, 225);           // near-black warm brown, semi-transparent
  noStroke();
  rect(0, 0, 1440, 68);
 
  // Top hairline — bright gold
  fill("#C9A44A");
  rect(0, 0, 1440, 2);
 
  // Bottom accent line — slightly lighter gold
  fill("#B8933A");
  rect(0, 66, 1440, 2);
 
  let dividerPositions = [360, 720, 1080];
  stroke("#8B6914");
  strokeWeight(1);
  for (let x of dividerPositions) {
    line(x, 12, x, 56);
  }
 
  // Nav text — Cormorant Garamond Regular 48
  textFont("Cormorant Garamond, serif"); // browser will use system/Google font if available
  textSize(48);
  textAlign(CENTER, CENTER);
  noStroke();
 
  let navItems = ["Home", "Recipes", "Bazaar", "About"];
  let navCenters = [180, 540, 900, 1260];
 
  for (let i = 0; i < navItems.length; i++) {
    
    fill("#D4A85A");
    text(navItems[i], navCenters[i], 34);
 

    if (navItems[i] === "Home") {
      stroke("#C9A44A");
      strokeWeight(1.5);
      let tw = textWidth("Home");
      line(navCenters[i] - tw / 2, 56, navCenters[i] + tw / 2, 56);
      noStroke();
    }
  }
 
  textFont("Cormorant Garamond, serif");
  textSize(158);
  textStyle(BOLDITALIC);
  textAlign(LEFT, BASELINE);
 
  fill(80, 45, 5, 120);
  text("Marianne\u2019s Kitchen", 135, 386);
 
  // Main gold title
  fill("#C9A84C");
  text("Marianne\u2019s Kitchen", 131, 382);
 
  fill(220, 185, 100, 160);
  text("Marianne\u2019s Kitchen", 131, 382);
 
  textStyle(NORMAL); 
}