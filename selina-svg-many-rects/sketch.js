let ground;
let blocks = [];
let kopfImg;
let ball;
let box;
let mouse;
//let hitSound;

// function preload() {
//   // load sound
//   hitSound = loadSound('sound.mp3');
//   hitSound.playMode('sustain');
// }

function setup() {
  const canvas =createCanvas(2455, 600);
  let engine = Matter.Engine.create();
  let world = engine.world;

  svgRects = document.getElementsByTagName('rect');
  for (let r=0; r<svgRects.length;r++) {
    let w = +svgRects[r].getAttribute('width')
    let h = +svgRects[r].getAttribute('height')
    blocks.push(new BlockCore(
      world,
      {
        x: +svgRects[r].getAttribute('x') + w / 2,
        y: +svgRects[r].getAttribute('y') + h / 2,
        w: w,
        h: h,
        color: 'blue',
      },
      { isStatic: true}
    ));
  }

  //load images
  kopfImg = loadImage('kopf.png');

  //add bodies
  box = new Block(world, { x: 150, y: 200, w: 40, h: 20, color: 'grey' }, {isStatic: true, restitution:8, label:'knopf'});
  ball = new SpriteBall(world, { x: 100, y: 50, r: 10, image: kopfImg}, {label:'ball'});
  ground = new Block(world, { x: 400, y: 430, w: 810, h: 15, color: 'grey' }, { isStatic: true });

  //setup mouse
  mouse = new Mouse(engine, canvas);

  //sound
  // Matter.Events.on(engine, 'collisionStart', function(event) {
  //   const pairs = event.pairs[0];
  //   const bodyA = pairs.bodyA;
  //   const bodyB = pairs.bodyB;
  //   if (bodyA.label === "ball" || bodyB.label === "knopf") {
  //     hitSound.play();
  //   }
  // });

  // run the engine
  Matter.Runner.run(engine);
}

//jump
function keyPressed(e){
  if (keyCode == "32"){
    Matter.Body.applyForce(
      ball.body,
      {x: ball.body.position.x, y: ball.body.position.y},
      {x: 0.002, y: -0.008 }
    );
  }
  // prevent accidentally scrolling of website with SPACE key
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
}

function draw() {
  clear();
  ground.draw();
  ball.draw();
  box.draw();
  mouse.draw();
  for (let b of blocks) {
    b.draw();
  }
}
