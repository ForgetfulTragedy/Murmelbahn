
let ground;
let ball;
let tisch;

function setup() {
  createCanvas(1280, 720);
  console.log("Hello World123");

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // create a ground
  ground = new Block(world, { x:400 , y: 700, w: windowWidth * 1.5, h: 15, color: 'pink' }, { isStatic: true});

  //Tisch
  beinA = new Block(world,{ x:100 , y: 610, w: 10, h: 160, color: 'white' }, { isStatic: true});
  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background('black');
  ground.draw();
  beinA.draw();
  beinB.draw();
  tischplatte.draw();
}
