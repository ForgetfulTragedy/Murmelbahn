let blockA;
let blockB;
let ground;
let ball;
let blocks=[];
let blockGröße = 80;

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
    {isStatic: false, density: 0.15 });

  blocks.push(ball);
  // create two boxes and a ground
  ground = new Block(
    world,
    { x: windowWidth/2, y: 700, w: windowWidth, h: 20, color: 'grey' },
    { isStatic: true});

    blocks.push( new Block(
      world,
      {x: windowWidth/2, y:700-blockGröße/2, w: blockGröße, h: blockGröße, color: 'white'},
      {isStatic: true}
    ));
    blocks.push( new Block(
      world,
      {x: windowWidth/2+blockGröße, y:700-blockGröße/2, w: blockGröße, h: blockGröße, color: 'pink'},
      {isStatic: true}
    ));
    blocks.push( new Block(
      world,
      {x: windowWidth/2+blockGröße, y:700-1.5*blockGröße, w: blockGröße, h: blockGröße, color: 'green'},
      {isStatic: true}
    ));
    blocks.push( new Block(
      world,
      {x: windowWidth/2+2*blockGröße, y:700-0.5*blockGröße, w: blockGröße, h: blockGröße, color: 'blue'},
      {isStatic: true}
    ));
    blocks.push( new Block(
      world,
      {x: windowWidth/2+2*blockGröße, y:700-1.5*blockGröße, w: blockGröße, h: blockGröße, color: 'brown'},
      {isStatic: true}
    ));
    blocks.push( new Block(
      world,
      {x: windowWidth/2+2*blockGröße, y:700-2.5*blockGröße, w: blockGröße, h: blockGröße, color: 'red'},
      {isStatic: true}
    ));
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
