let blockA;
let blockB;
let ground;
let ball;

function setup() {
  createCanvas(800, 600);
<<<<<<< HEAD
  console.log("Hello World!");
=======
  console.log("Hello World123");
>>>>>>> b16e934158a35a192bc8cddd8c8d3ac56ff061c1

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // create two boxes and a ground
  blockA = new Block(world, { x: 200, y: 200, w: 80, h: 80, color: 'white' });
  blockB = new Block(world, { x: 270, y: 50, w: 160, h: 80, color: 'white' });
  ground = new Block(world, { x: 400, y: 500, w: 810, h: 15, color: 'pink' }, { isStatic: true, angle: PI/36 });
  // run the engine
  Matter.Engine.run(engine);
}

function draw() {
  background('black');
  blockA.draw();
  blockB.draw();
  ground.draw();
}