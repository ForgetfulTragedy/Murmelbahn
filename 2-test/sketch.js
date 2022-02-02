let ground;
let ball;
let tisch;
let kopfImg;
let mouse;
let platform;

function setup() {
  const canvas = createCanvas(1280, 720);
  console.log("Hello World123");

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  //load images
  kopfImg = loadImage('kopf.png');

  //add bodies
  ball = new SpriteBall(world, { x: 100, y: 50, r: 25, image: kopfImg});
  platform = new Block(world, { x: 600, y: 200, w: 160, h: 20, color: 'black'},{isStatic: true, restitution: 4 });

  // create a ground
  ground = new Block(world, { x:400 , y: 300, w: windowWidth * 1.5, h: 15, color: 'pink' }, { isStatic: true, angle: Math.PI * 0.06});

  //setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function platformMove(){
let oscillatePosY = 200 + Math.sin(frameCount * 0.01) * 100;
  Matter.Body.setPosition(
    platform.body,
    {x: platform.body.position.x, y: oscillatePosY}
  );
}

//jump
function keyPressed(e){
  if (keyCode == "32"){
    Matter.Body.applyForce(
      ball.body,
      {x: ball.body.position.x, y: ball.body.position.y},
      {x: 0.01, y: -0.1}
    );
  }
  // prevent accidentally scrolling of website with SPACE key
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
}


function draw() {
  background (255);
  ball.draw();
  ground.draw();
  platform.draw();
  mouse.draw();
  platformMove();
}

// svgRects = document.getElementsByTagName('rect');
// for (let r=0; r<svgRects.length;r++) {
//   let w = +svgRects[r].getAttribute('width');
//   let h = +svgRects[r].getAttribute('height');

// let rectAngle = svgRects[r].getAttribute('transform')
// let angleString;
// if(rectAngle != null) {
//   angleString = rectAngle.substring(7,13)
// } else {
//   anglString = 0
// }

//if svgRects[bestimmtes r] dann soll angle (per hand eingegebener wert) sein

// console.log(svgRects[r]);
// console.log(r);
// console.log(angleString);
// console.log(typeof(rectAngle));

// blocks.push(new BlockCore(
//   world,
//   {
//     x: +svgRects[r].getAttribute('x') + w / 2,
//     y: +svgRects[r].getAttribute('y') + h / 2,
//     w: w,
//     h: h,
//     color: 'blue'
//   },
//   { isStatic: true
//     angle: angleString }
// ));
