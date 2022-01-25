let ground;
let blocks = [];
let blockA;
let slides = [];
let kopfImg;
let ball;
let box;
let platform;
let clown;
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
  for (let i = 0; i < 9; i++) {
    // alternate x postion and angle based on whether i is even or odd
    const x = (i % 2 == 0) ? 250 : 650;
    const a = (i % 2 == 0) ? Math.PI * 0.06 : Math.PI * -0.06;
    slides.push(
      //      blockA = new Block(world, { x: 1200, y: 430, w: 2400, h: 15, color: 'grey' }, { isStatic: true })
    );
  }

  // new BlocksFromSVG(world, "svgRects2.svg", blocks, {
  //   isStatic: true
  // });

  //Blocks[19] soll label 'knopf' bekommen
  blocks[19].body.label = 'knopf';

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
    x: 1200,
    y: 430,
    w: 2400,
    h: 15,
    color: 'grey'
  }, {
    isStatic: true
  });
  platform = new Block(world, {
    x: 1435,
    y: 200,
    w: 68,
    h: 20,
    color: 'yellow'
  }, {
    isStatic: true,
  });
  clown = new Block(world, {
    x: 1340,
    y: 200,
    w: 50,
    h: 50,
    color: 'red'
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

function platformMove(){
let oscillatePosY = 200 + Math.sin(frameCount * 0.01) * 100;
  Matter.Body.setPosition(
    platform.body,
    {x: platform.body.position.x, y: oscillatePosY}
  );
}
function clownMove(){
let oscillatePosY = 360 + Math.sin(frameCount * 0.06) * 40;
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
  platform.draw();
  clown.draw();
  mouse.draw();
  for (let b of blocks) {
    //   b.draw();
  }
  for (let s of slides) {
    s.draw();
  }
  // follow the ball by scrolling the window
  scrollFollow(ball);
  platformMove();
  clownMove();


}

function scrollFollow(object) {
  if (insideViewport(object) == false) {
    const $element = $('html, body');
    if ($element.is(':animated') == false) {
      $element.animate({
        scrollLeft: object.body.position.x,
        scrollRight: object.body.position.y
      }, 750);
    }
  }
}

function insideViewport(object) {
  const x = object.body.position.x;
  const y = object.body.position.y;
  const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
  const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
  if (x >= pageXOffset && x <= pageXOffset + windowWidth &&
    y >= pageYOffset && y <= pageYOffset + windowHeight) {
    return true;
  } else {
    return false;
  }
}
