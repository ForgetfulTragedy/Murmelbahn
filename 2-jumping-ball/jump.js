let blockA;
let blockB;
let ground;
let ball;
let blocks=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("Hello World123");

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  //create ball
  ball= new Ball(
    world,
    {x: 200, y: 200, r:40,color: 'blue'},
    {isStatic: false, density: 0.1});

  blocks.push(ball);
  // create two boxes and a ground
  ground = new Block(
    world,
    { x: windowWidth/2, y: 700, w: windowWidth, h: 20, color: 'grey' },
    { isStatic: true});

//klappt noch nicht!!!
    block = new Block(
      world,
      {x: windowWidth/2, y:700, w: 80, h: 80, color: 'white'},
      {isStatic: false}
    );
  // run the engine
  Matter.Runner.run(engine);
}

//jump
function keyPressed(){
  if (keyCode == "32"){
    Matter.Body.applyForce(ball.body,{x:0, y:0},{x:5,y:-20});
  }
}

function draw() {
  background('black');
  blocks.forEach(block => block.draw());
  ground.draw();
}
