// RECIPE ARRAY 
const recipes = [
  {
    eyebrow: "DINNER IS SERVED",
    banner: "Khoresh & Stuffed Peppers",
    bannerColor: [192, 123, 42],
    photos: [
      { src: "img/sabzi.jpeg",     caption: "Khoresh", desc: "A fragrant Persian herb stew slow-cooked with fenugreek, parsley, and dried limes. Served over fluffy white rice." },
      { src: "img/stuffedpep.jpg", caption: "Stuffed Peppers", desc: "Bell peppers filled with spiced ground meat, rice, and herbs, then baked until tender in a light tomato sauce." }
    ]
  },
  {
    eyebrow: "THE BASE AND BASICS",
    banner: "Rice & Tahdig",
    bannerColor: [168, 154, 82],
    photos: [
      { src: "img/tahdig.jpeg",  caption: "Tahdig (rice)", desc: "The crown jewel of Persian cooking — a crispy golden rice crust formed at the bottom of the pot. Everyone fights for a piece." },
      { src: "img/tahdig2.jpeg", caption: "Tahdig (potato)", desc: "Thinly sliced potatoes layered beneath the rice to create a rich, golden crust with a satisfying crunch." }
    ]
  },
  {
    eyebrow: "SOMETHING TO START",
    banner: "Appetizers & Dessert",
    bannerColor: [90, 107, 58],
    photos: [
      { src: "img/Lebanese-Tabbouleh-Salad-TIMG.jpg", caption: "Tabbouleh", desc: "A bright, herby salad of finely chopped parsley, tomato, and bulgur wheat, dressed simply with lemon and olive oil." },
      { src: "img/Baklava-hero-1.jpg",                caption: "Baklava", desc: "Layers of flaky phyllo pastry filled with crushed walnuts and pistachios, soaked in a honey and rose water syrup." }
    ]
  }
];

const bazaarItems = [
  {
    category: "Spices & Herbs",
    name: "Sumac",
    src: "img/sumac.jpg",
    origin: "MIDDLE EAST",
    desc: "A deep red spice ground from dried berries, sumac brings a tangy citrus flavor to meats, salads, and rice dishes. A staple in Persian cooking."
  },
  {
    category: "Pantry",
    name: "Saffron",
    src: "img/saffron.png",
    origin: "IRAN",
    desc: "The most prized spice in Persian cuisine, saffron gives rice its signature golden color and a subtle floral aroma. A little goes a long way."
  }
];

// STATE
let yOffset = 0;
let targetY = 0;
let currentSection = 'home';
let hoveredNav = -1;
let imgs = {};
let bazaarImgs = {};
let recipeImgs = {};
let font, fontItalic;

// NAV
const navItems = ['Home', 'Recipes', 'Bazaar', 'About'];

// Section y positions (calculated after setup)
let sectionY = {};

function preload() {
  font       = loadFont('https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-400-normal.ttf');
  fontItalic = loadFont('https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-400-italic.ttf');

  imgs.hero = loadImage('img/Kabab.jpeg');
  imgs.marianne = loadImage('img/marianne.png');

  recipes.forEach(function(recipe) {
    recipe.photos.forEach(function(photo) {
      recipeImgs[photo.src] = loadImage(photo.src);
    });
  });

  bazaarItems.forEach(function(item) {
    bazaarImgs[item.name] = loadImage(item.src);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  imageMode(CORNER);

  sectionY.home    = 0;
  sectionY.recipes = windowHeight;
  sectionY.bazaar  = windowHeight + 2000;
  sectionY.about   = windowHeight + 2000 + 1400;
}

function draw() {
  background(255);

  // Smooth scroll
  yOffset = lerp(yOffset, targetY, 0.1);

  // Update active nav based on scroll position
  if (yOffset < sectionY.recipes - 60)      currentSection = 'home';
  else if (yOffset < sectionY.bazaar - 60)  currentSection = 'recipes';
  else if (yOffset < sectionY.about - 60)   currentSection = 'bazaar';
  else                                       currentSection = 'about';

  push();
  translate(0, -yOffset);

  drawHome();
  drawRecipes();
  drawBazaar();
  drawAbout();

  pop();

  // Nav drawn last so it sits on top
  drawNav();
}

// ─── NAV ───────────────────────────────────────────────
function drawNav() {
  fill(28, 20, 10);
  noStroke();
  rect(0, 0, width, 60);

  stroke(201, 164, 74);
  strokeWeight(2);
  line(0, 60, width, 60);
  noStroke();

  navItems.forEach(function(item, i) {
    const x = (width / (navItems.length + 1)) * (i + 1);
    const isActive = currentSection === item.toLowerCase();
    const isHovered = hoveredNav === i;

    textFont(fontItalic);
    textSize(22);
    textAlign(CENTER, CENTER);

    fill(isHovered ? 255 : 212, isHovered ? 255 : 168, isHovered ? 255 : 90);
    text(item, x, 30);

    if (isActive) {
      stroke(212, 168, 90);
      strokeWeight(1);
      line(x - 20, 48, x + 20, 48);
      noStroke();
    }
  });
}

// HOME PAGE
function drawHome() {
  const imgRatio = imgs.hero.width / imgs.hero.height;
  const canvasRatio = width / windowHeight;
  let drawW, drawH, drawX, drawY;

  if (canvasRatio > imgRatio) {
    drawW = width;
    drawH = width / imgRatio;
    drawX = 0;
    drawY = (windowHeight - drawH) / 2;
  } else {
    drawH = windowHeight;
    drawW = windowHeight * imgRatio;
    drawX = (width - drawW) / 2;
    drawY = 0;
  }

  image(imgs.hero, drawX, drawY, drawW, drawH);

  textFont(fontItalic);
  textSize(72);
  textAlign(CENTER, BOTTOM);

  fill(0, 0, 0, 150);
  text("Marianne's Kitchen", width / 2 + 3, windowHeight - 37);

  fill(201, 164, 74);
  text("Marianne's Kitchen", width / 2, windowHeight - 40);
}

// RECIPES SECTION
function drawRecipes() {
  const startY = sectionY.recipes;
  const pad = 30;
  let y = startY + 80;

  recipes.forEach(function(recipe) {
    // Eyebrow
    textFont(font);
    textSize(13);
    textAlign(LEFT, TOP);
    fill(139, 105, 20);
    text(recipe.eyebrow, pad, y);
    y += 24;

    // Heading
    textSize(64);
    fill(0);
    text('Recipes', pad, y);
    y += 80;

    // Banner
    fill(recipe.bannerColor[0], recipe.bannerColor[1], recipe.bannerColor[2]);
    noStroke();
    rect(pad, y, width - pad * 2, 80);

    textFont(fontItalic);
    textSize(36);
    fill(255);
    textAlign(LEFT, CENTER);
    text(recipe.banner, pad + 20, y + 40);
    y += 100;

    // Photo grid — two columns
    const cellW = (width - pad * 2 - 4) / 2;
    const cellH = 220;

    recipe.photos.forEach(function(photo, i) {
      const x = pad + i * (cellW + 4);
      const img = recipeImgs[photo.src];

      drawCropped(img, x, y, cellW, cellH);

      // Caption
      textFont(font);
      textSize(20);
      textAlign(LEFT, TOP);
      fill(0);
      text(photo.caption, x, y + cellH + 10);

      // Caption underline
      stroke(221);
      strokeWeight(1);
      line(x, y + cellH + 36, x + cellW, y + cellH + 36);
      noStroke();

      // Description
      textFont(fontItalic);
      textSize(15);
      fill(100);
      drawWrappedText(photo.desc, x, y + cellH + 46, cellW, 22);
    });

    y += cellH + 140;
  });
}

// BAZAAR SECTION
function drawBazaar() {
  const startY = sectionY.bazaar;
  const pad = 30;
  let y = startY + 80;

  // Eyebrow
  textFont(font);
  textSize(13);
  textAlign(LEFT, TOP);
  fill(139, 105, 20);
  text('INGREDIENT GUIDE', pad, y);
  y += 24;

  // Title
  textSize(64);
  fill(0);
  text('The Bazaar', pad, y);
  y += 80;

  const listW = 200;
  const detailX = pad + listW + 1;
  const detailW = width - pad - listW - pad - 1;
  const layoutY = y;
  const layoutH = 1200;

  // Border around whole layout
  stroke(221);
  strokeWeight(1);
  noFill();
  rect(pad, layoutY, width - pad * 2, layoutH);

  // Divider between list and detail
  line(pad + listW, layoutY, pad + listW, layoutY + layoutH);
  noStroke();

  // Left list
  let listY = layoutY + 20;
  bazaarItems.forEach(function(item) {
    textFont(font);
    textSize(18);
    fill(0);
    textAlign(LEFT, TOP);
    text(item.category, pad + 10, listY);

    stroke(221);
    strokeWeight(1);
    line(pad + 10, listY + 28, pad + listW - 10, listY + 28);
    noStroke();
    listY += 40;

    textSize(18);
    fill(85);
    textAlign(RIGHT, TOP);
    text(item.name, pad + listW - 10, listY);
    listY += 40;
  });

  // Right detail
  let detY = layoutY + 20;
  bazaarItems.forEach(function(item) {
    drawCropped(bazaarImgs[item.name], detailX + 10, detY, detailW - 20, 400);
    detY += 416;

    textFont(font);
    textSize(24);
    fill(0);
    textAlign(LEFT, TOP);
    text(item.name, detailX + 10, detY);
    detY += 34;

    textSize(13);
    fill(139, 105, 20);
    text(item.origin, detailX + 10, detY);
    detY += 24;

    textFont(fontItalic);
    textSize(18);
    fill(85);
    drawWrappedText(item.desc, detailX + 10, detY, detailW - 20, 26);
    detY += 100;

    stroke(221);
    strokeWeight(1);
    line(detailX + 10, detY, detailX + detailW - 10, detY);
    noStroke();
    detY += 20;
  });
}

// ABOUT SECTION
function drawAbout() {
  const startY = sectionY.about;
  const pad = 30;
  let y = startY + 80;

  stroke(201, 164, 74);
  strokeWeight(1);
  line(pad, startY, width - pad, startY);
  noStroke();

  textFont(font);
  textSize(13);
  textAlign(LEFT, TOP);
  fill(139, 105, 20);
  text('ABOUT', pad, y);
  y += 24;

  textSize(64);
  fill(0);
  text('The Cook', pad, y);
  y += 80;

  const imgW = 300;
  const textW = width - pad * 2 - imgW - 40;

  const aboutText1 = 'This is my grandma Marianne. She married my grandfather after he had left Iran — and that is where she found her love for Persian cooking. For as long as I can remember she has been the one behind the stove at every family gathering, quietly making sure everyone was fed and happy.';
  const aboutText2 = 'Her recipes were never written down. They lived in her hands, in the way she seasoned without measuring and tasted without recipes. This site is my attempt to preserve them.';

  textFont(font);
  textSize(20);
  fill(51);
  textAlign(LEFT, TOP);
  drawWrappedText(aboutText1, pad, y, textW, 34);
  drawWrappedText(aboutText2, pad, y + 160, textW, 34);

  image(imgs.marianne, width - pad - imgW, y, imgW, 360);

  stroke(201, 164, 74);
  strokeWeight(1);
  line(pad, y + 380, width - pad, y + 380);
  noStroke();
}

// ANIMATIONS

function drawCropped(img, x, y, w, h) {
  if (!img) return;
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sx, sy, sw, sh;

  if (imgRatio > boxRatio) {
    sh = img.height;
    sw = sh * boxRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / boxRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }

  copy(img, sx, sy, sw, sh, x, y, w, h);
}

function drawWrappedText(str, x, y, maxW, lineH) {
  const words = str.split(' ');
  let line = '';
  let currentY = y;

  words.forEach(function(word) {
    const test = line + word + ' ';
    if (textWidth(test) > maxW && line !== '') {
      text(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineH;
    } else {
      line = test;
    }
  });
  if (line) text(line.trim(), x, currentY);
}

// ANIMATIONS

function mouseWheel(event) {
  const totalH = sectionY.about + 700;
  targetY = constrain(targetY + event.delta, 0, totalH - windowHeight);
  return false;
}

function mouseMoved() {
  hoveredNav = -1;
  if (mouseY < 60) {
    navItems.forEach(function(item, i) {
      const x = (width / (navItems.length + 1)) * (i + 1);
      if (abs(mouseX - x) < 50) hoveredNav = i;
    });
  }
}

function mousePressed() {
  if (mouseY < 60) {
    navItems.forEach(function(item, i) {
      const x = (width / (navItems.length + 1)) * (i + 1);
      if (abs(mouseX - x) < 50) {
        targetY = sectionY[item.toLowerCase()];
      }
    });
  } 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  sectionY.home    = 0;
  sectionY.recipes = windowHeight;
  sectionY.bazaar  = windowHeight + 2000;
  sectionY.about   = windowHeight + 2000 + 1400;
}