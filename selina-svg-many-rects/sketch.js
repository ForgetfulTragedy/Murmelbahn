let ground;
let blocks = [];
let kopfImg;
let ball;
let box;
let mouse;
let hitSound;
let audio;
let engine = Matter.Engine.create();
let world = engine.world;

function preload() {
  //load sound
  soundFormats('mp3', 'ogg');
  hitSound = loadSound('sound.mp3');
  //hitSound.playMode('sustain');

  new BlocksFromSVG(world, "svgRects2.svg", blocks, {
    isStatic: true
  });
}

function setup() {
  const canvas = createCanvas(2455, 600);
  // let engine = Matter.Engine.create();
  // let world = engine.world;

  // new BlocksFromSVG(world, "svgRects2.svg", blocks, {
  //   isStatic: true
  // });

  //Blocks[19] soll label 'knopf' bekommen
    blocks[19].body.label= 'knopf';

  //Blocks[18] soll höhere Restitution bekommen
    blocks[18].body.restitution = 8;


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

  //load images
  kopfImg = loadImage('kopf.png');

  //add bodies
  box = new Block(world, {
    x: 150,
    y: 200,
    w: 40,
    h: 20,
    color: 'grey'
  }, {
    isStatic: true,
    restitution: 0.8,
    label: 'knopf'
  });

  ball = new SpriteBall(world, {
    x: 100,
    y: 50,
    r: 10,
    image: kopfImg
  }, {
    label: 'ball'
  });

  ground = new Block(world, {
    x: 400,
    y: 430,
    w: 810,
    h: 15,
    color: 'grey'
  }, {
    isStatic: true
  });

  //setup mouse
  mouse = new Mouse(engine, canvas);

  //sound
  Matter.Events.on(engine, 'collisionStart', function(event) {
    //console.log("erster test");
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    console.log(bodyA.label, bodyB.label);
    if ((bodyA.label === "ball" && bodyB.label === "knopf") || (bodyA.label === "knopf" && bodyB.label === "ball")) {
      hitSound.play();
    }
  });

  // run the engine
  Matter.Runner.run(engine);
}

//jump
function keyPressed(e) {
  if (keyCode == "32") {
    Matter.Body.applyForce(
      ball.body, {
        x: ball.body.position.x,
        y: ball.body.position.y
      }, {
        x: 0.002,
        y: -0.008
      }
    );
  }
  // prevent accidentally scrolling of website with SPACE key
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
}

//Zeichnet alle Objekte
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
