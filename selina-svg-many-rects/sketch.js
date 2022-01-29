let ground;
let blocks = [];
let blockA;
let slides = [];
let kopfImg;
let ball;
let kugel;
let ballon;
let ballonImg;
let clown;
let clownImg;
let mouse;
let hitSound;
let audio;
let tatzeL;
let tatzelImg;
let tatzeR;
let tatzerImg;

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

  for (let i = 0; i < 9; i++) {
    // alternate x postion and angle based on whether i is even or odd
    const x = (i % 2 == 0) ? 250 : 650;
    const a = (i % 2 == 0) ? Math.PI * 0.06 : Math.PI * -0.06;
    slides.push(
      blockA = new Block(world, { x: 1200, y: 445, w: 2400, h: 15, color: 'red' }, { isStatic: true })
    );
  }

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
  tatzelImg = loadImage('Tatze1.png');
  tatzerImg = loadImage('Tatze2.png');
  clownImg = loadImage('clown.png');
  ballonImg = loadImage('ballon.png');

  //add bodies
  ball = new SpriteBall(world, {
    x: 70,
    y: 220,
    r: 10,
    image: kopfImg
  }, {
    label: 'ball',
    //friction: 0.09
  });

  kugel = new Ball(world, {
    x: -80,
    y: 100,
    r: 10,
    color: 'red'
  }, {
    friction: 0.001
  });

  ground = new Block(world, {
    x: - 100,
    y: 180,
    w: 200,
    h: 15,
    color: 'red'
  }, {
    isStatic: true,
    angle: 145
  });

  //add Tatzen(Bär)
  tatzeL = new SpriteBlock(world, {
    x: 793,
    y: 235,
    w: 27,
    h: 25,
    image: tatzelImg
  },{
    isStatic: true
  });

  tatzeR = new SpriteBlock(world, {
    x: 855,
    y: 235,
    w: 30,
    h: 26,
    image: tatzerImg
  },{
    isStatic: true
  });

  ballon = new SpriteBlock(world, {
  x: 1480,
  y: 280,
  w: 68,
  h: 20,
  color: 'yellow',
  image: ballonImg
}, {
  isStatic: true,
});

clown = new SpriteBlock(world, {
  x: 1342,
  y: 290,
  w: 85,
  h: 85,
  color: 'red',
  image: clownImg
}, {
  isStatic: true,
  restitution: 4
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

//Tatzen
function tatzeLMove(){
let oscillatePosY = 215+ Math.sin(frameCount * 0.05) * 20;
  Matter.Body.setPosition(
    tatzeL.body,
    {x: tatzeL.body.position.x, y: oscillatePosY}
  );
}

function tatzeRMove(){
let oscillatePosY = 215+ Math.cos(frameCount * 0.05) * 20;
  Matter.Body.setPosition(
    tatzeR.body,
    {x: tatzeR.body.position.x, y: oscillatePosY}
  );
}

function ballonMove(){
let oscillatePosX = ballon.body.position.x + Math.sin(frameCount * 0.03) * 2;
  Matter.Body.setPosition(
    ballon.body,
    {x: oscillatePosX, y: ballon.body.position.y}
  );
}

function clownMove(){
let oscillatePosY = clown.body.position.y + Math.sin(frameCount * 0.03) * 2;
  Matter.Body.setPosition(
    clown.body,
    {x: clown.body.position.x, y: oscillatePosY}
  );
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
        y: -0.007
      });
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
  kugel.draw();
  tatzeL.draw();
  tatzeR.draw();
  ballon.draw();
  clown.draw();

  mouse.draw();

  for (let b of blocks) {
     //b.draw();
  }

  for (let s of slides) {
  s.draw();
}

//Call functions!!
tatzeLMove();
tatzeRMove();
ballonMove();
clownMove();

//scrollFollow(ball);

}

function scrollFollow(object) {
  if (insideViewport(object) == false) {
    const $element = $('html, body');
    if ($element.is(':animated') == false) {
      $element.animate({
        scrollLeft: object.body.position.x-100,
        scrollRight: object.body.position.y
      }, 750);
    }
  }
}

function insideViewport(object) {
  const x = object.body.position.x;
  const y = object.body.position.y;
  const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
  const pageYOffset  = window.pageYOffset || document.documentElement.scrollTop;
  if (x >= pageXOffset && x <= pageXOffset + windowWidth &&
      y >= pageYOffset && y <= pageYOffset + windowHeight) {
    return true;
  } else {
    return false;
  }
}
