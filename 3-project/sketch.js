let ground;
let ball;
let tisch;
let kopfImg;
let mouse;

function setup() {
  createCanvas(1280, 720);
  console.log("Hello World123");

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  //load images
  kopfImg = loadImage('kopf.png');

  //add bodies
  ball = new SpriteBall(world, { x: 100, y: 50, r: 25, image: kopfImg});

  // create a ground
  ground = new Block(world, { x:400 , y: 300, w: windowWidth * 1.5, h: 15, color: 'pink' }, { isStatic: true, angle: Math.PI * 0.06});

  //setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background (255);
  ball.draw();
  ground.draw();
  mouse.draw();
}
