const width = 640 * 1.5;
const height = 480 * 1.5;
let rRes;
let cRes;
let mapScale = 0.2;

let board;
let particle;
let rays = [];

function setup() {
    const canvas = createCanvas(width, height);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    background(40);

    // Initializing Board
    board = new Board(12, 12);

    rRes = height / board.row;
    cRes = width  / board.col;
    // Initializing Particle
    particle = new Particle(cRes * 1.5 * mapScale, rRes * 1.5 * mapScale);
}

function draw() {
    background(40);

    // Displaying Walls
    drawWalls();

    // Displaying Board
    board.display(width * mapScale, height * mapScale);

    rays = particle.castRays(width * mapScale, height * mapScale, board);

    // Displaying Particle
    particle.display(width * mapScale, height * mapScale);

    // Updating Particle's Direction
    if(keyIsDown(37)) {
        particle.updateDir(-0.05);
    }
    if(keyIsDown(39)) {
        particle.updateDir( 0.05);
    }

    // Updating Particle's Position
    if(keyIsDown(38)) {
        particle.updatePos();
    }
}

function drawWalls() {
    let maxH = height *  1 / 0.07;
    let wallW = width / rays.length;
    let wallH;

    noStroke();
    fill(color(0));
    rect(0, 0, width, height / 2);

    noStroke();
    fill(color(40));
    rect(0, height / 2, width, height / 2);


    for(let i = 0; i < rays.length; i ++) {
        wallH   = (maxH / rays[i].dist);
        const x = i * wallW;
        const y = height / 2 - wallH / 2;

        noStroke();
        fill(rays[i].clr);
        rect(x, y, wallW, wallH);
    }
}