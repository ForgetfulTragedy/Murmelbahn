let ground;
let ground2;
let blocks = [];
let blockA;
let slides = [];
let kopfImg;
let ball;
let kugel;
let mouse;
let hitSound;
let audio;

let balloon;
let balloonImg;
let korb;

let clown;
let clownImg;

let affeL;
let affeR;
let afferImg;
let affelImg;

let tatzeL;
let tatzelImg;
let tatzeR;
let tatzerImg;

let buch;
let buchImg;

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
  const canvas = createCanvas(4910, 720);

  for (let i = 0; i < 9; i++) {
    // alternate x postion and angle based on whether i is even or odd
    const x = (i % 2 == 0) ? 250 : 650;
    const a = (i % 2 == 0) ? Math.PI * 0.06 : Math.PI * -0.06;
    slides.push(
      blockA = new Block(world, {
        x: 1200,
        y: 675,
        w: 6600,
        h: 15,
        color: 'red'
      }, {
        isStatic: true
      })
    );
  }

  //Blocks[19] soll label 'knopf' bekommen
  blocks[19].body.label = 'knopf';

  //Blocks[18] soll höhere Restitution bekommen
  blocks[18].body.restitution = 10;

  //load images
  kopfImg = loadImage('kopf.png');
  tatzelImg = loadImage('TatzeL.png');
  tatzerImg = loadImage('TatzeR.png');
  clownImg = loadImage('clown.png');
  balloonImg = loadImage('balloon.png');
  afferImg = loadImage('AffeR.png');
  affelImg = loadImage('AffeL.png');
  buchImg = loadImage('buch.png');

  //add bodies
  ball = new SpriteBall(world, {
    x: 50,
    y: 285,
    r: 20,
    image: kopfImg
  }, {
    label: 'ball',
    //friction: 0.09
  });

  kugel = new Ball(world, {
    x: -80,
    y: 100,
    r: 20,
    color: 'gold'
  }, {
    friction: 0.001,
    mass: 3
  });

  ground = new Block(world, {
    x: -70,
    y: 250,
    w: 250,
    h: 15,
    color: 'red'
  }, {
    isStatic: true,
    angle: 145
  });

  ground2 = new Block(world, {
    x: 50,
    y: 305,
    w: 30,
    h: 15,
    color: 'red'
  }, {
    isStatic: true
  });

  //add Tatzen(Bär)
  tatzeL = new SpriteBlock(world, {
    x: 1217,
    y: 285,
    w: 39,
    h: 36,
    image: tatzelImg
  }, {
    isStatic: true
  });

  tatzeR = new SpriteBlock(world, {
    x: 1320,
    y: 320,
    w: 42,
    h: 34,
    image: tatzerImg
  }, {
    isStatic: true
  });

  clown = new SpriteBlock(world, {
    x: 2060,
    y: 443,
    w: 85,
    h: 85,
    color: 'red',
    image: clownImg
  }, {
    isStatic: true,
    restitution: 2
  });

  affeL = new SpriteBlock(world, {
    x: 4290,
    y: 480,
    w: 22,
    h: 181,
    image: affelImg
  }, {
    isStatic: true
  });

  affeR = new SpriteBlock(world, {
    x: 4400,
    y: 480,
    w: 22,
    h: 169,
    image: afferImg
  }, {
    isStatic: true
  });

  korb = new PolygonSpriteFromSVG(world, {
    x: 2245,
    y: 500,
    file: './korb.svg',
    scale: 1,
    image: balloonImg
  }, {
    isStatic: true,
  });

  buch = new SpriteBlock(world, {
    x: 3793,
    y: 70,
    w: 208,
    h: 10,
    image: buchImg
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

//Funktionen Bewegungen
function tatzeLMove() {
  let oscillatePosY = tatzeL.body.position.y + Math.sin(frameCount * 0.06) * 2;
  Matter.Body.setPosition(
    tatzeL.body, {
      x: tatzeL.body.position.x,
      y: oscillatePosY
    }
  );
}

function tatzeRMove() {
  let oscillatePosY = tatzeR.body.position.y + Math.cos(frameCount * 0.06) * 2;
  Matter.Body.setPosition(
    tatzeR.body, {
      x: tatzeR.body.position.x,
      y: oscillatePosY
    }
  );
}

//moveBlock geht nur für horizontale Bewegungen, da wir auch ein paar funktionen mit cos statt sin
//haben macht es nicht so viel sinn nochmal alles umzuschreiben

function moveBlock(block, f1, f2) {
  if (block.body) {
    let oscillatePosX = block.body.position.x + Math.sin(frameCount * f1) * f2;
    Matter.Body.setPosition(
      block.body, {
        x: oscillatePosX,
        y: block.body.position.y
      }
    );
  }
}

function clownMove() {
  let oscillatePosY = clown.body.position.y + Math.sin(frameCount * 0.03) * 2.5;
  Matter.Body.setPosition(
    clown.body, {
      x: clown.body.position.x,
      y: oscillatePosY
    }
  );
}

function buchMove() {
  let oscillatePosY = buch.body.position.y + Math.sin(frameCount * 0.008) * 1.7;
  Matter.Body.setPosition(
    buch.body, {
      x: buch.body.position.x,
      y: oscillatePosY
    }
  );
}

function affeLMove() {
  let oscillatePosX = affeL.body.position.x + Math.sin(frameCount * 0.07) * 2;
  Matter.Body.setPosition(
    affeL.body, {
      x: oscillatePosX,
      y: affeL.body.position.y
    }
  );
}

function affeRMove() {
  let oscillatePosX = affeR.body.position.x + Math.cos(frameCount * 0.07) * 2;
  Matter.Body.setPosition(
    affeR.body, {
      x: oscillatePosX,
      y: affeR.body.position.y
    }
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
        x: 0.008,
        y: -0.035
      });
  }

  // prevent accidentally scrolling of website with SPACE key
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
}


function draw() {
  clear();
  //ground.draw();
  //ground2.draw();

  ball.draw();
  kugel.draw();

  tatzeL.draw();
  tatzeR.draw();
  korb.draw();
  clown.draw();
  affeL.draw();
  affeR.draw();
  buch.draw();

  mouse.draw();

  for (let b of blocks) {
    //b.draw();
  }
  for (let s of slides) {
    //s.draw();
  }

  //Call functions!!
  tatzeLMove();
  tatzeRMove();
  moveBlock(korb, 0.007, 2.3);
  clownMove();
  buchMove();
  affeLMove();
  affeRMove();
  scrollFollow(ball);

}

function scrollFollow(object) {
  if (insideViewport(object) == false) {
    const $element = $('html, body');
    if ($element.is(':animated') == false) {
      $element.animate({
        scrollLeft: object.body.position.x - 200,
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
