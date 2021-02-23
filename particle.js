class Particle {

    constructor(x, y) {
        this.pos     = new Vec2(x, y);
        this.dir     = new Vec2(1, 0);
        this.fov     = PI * 0.33; // Field of View
        this.radian  = 0;
        this.size    = 4;
        this.raysC   = 150; // Rays count
        this.minDist = Infinity;
    }

    updateDir(radian) {
        this.radian += radian;
        this.radian  = this.radian % (2 * PI);

        if(this.radian < 0)
            this.radian += (2 * PI);

        this.dir.set(1, 0);
        this.dir.rotate(this.radian);
    }

    updatePos() {
        const vel = this.dir.copy();
        vel.setMag(0.5);

        if(this.minDist > this.size)
            this.pos.add(vel);

    }

    castRays(width, height, board) {
        this.minDist = Infinity;
        const rRes = height / board.row;
        const cRes = width  / board.col;
        const cR   = Math.floor(this.pos.y / rRes); // Current Row
        const cC   = Math.floor(this.pos.x / cRes); // Current Col

        if(cR < 1 || cC < 1 || cR >= board.row -1 || cC >= board.col - 1) return;

        let rays = [];
        let clr;
        const dRad = this.fov / this.raysC;

        let sRad = this.radian - this.fov / 2; // Starting Radian
        if(sRad < 0)
            sRad += (2 * PI);

        for(let i = -1; i < this.raysC; i ++) {
            let x, y, tempX, tempY, dX, dY, r, c;
            let minDist = Infinity;
            let rad; // Ray's Radian

            if(i == -1)
                rad = this.radian;
            else
                rad = (sRad + i * dRad) % (2 * PI);

            // For Verticle Rays
            if(rad > PI) {
                for(let j = cR; j > 0; j --) {
                    dY = j * rRes - this.pos.y;
                    dX = dY / Math.tan(rad);

                    x = this.pos.x + dX;
                    y = this.pos.y + dY;
                    r = Math.floor(y / rRes) - 1;
                    c = Math.floor(x / cRes);

                    if(c < 0 || c >= board.col)
                        break;

                    if(board.grid[r * board.col + c] == 1) {
                        minDist = dY / Math.sin(rad);
                        clr = 140 - minDist;
                        break;
                    }
                }
            }
            else {
                for(let j = cR + 1; j < board.row; j ++) {
                    dY = j * rRes - this.pos.y;
                    dX = dY / Math.tan(rad);

                    x = this.pos.x + dX;
                    y = this.pos.y + dY;
                    r = Math.floor(y / rRes);
                    c = Math.floor(x / cRes);

                    if(c < 0 || c >= board.col)
                        break;

                    if(board.grid[r * board.col + c] == 1) {
                        minDist = dY / Math.sin(rad);
                        clr = 140 - minDist;
                        break;
                    }
                }
            }

            // For Horizontal Rays
            if(rad < PI / 2 || rad > 3 * PI / 2) {
                for(let j = cC + 1; j < board.col; j ++) {
                    dX = j * cRes - this.pos.x
                    dY = dX * Math.tan(rad);

                    tempX = this.pos.x + dX;
                    tempY = this.pos.y + dY;
                    r = Math.floor(tempY / rRes);
                    c = Math.floor(tempX / cRes);

                    if(r < 0 || r >= board.row)
                        break;

                    if(board.grid[r * board.col + c] == 1) {
                        const dist = dX / Math.cos(rad);
                        if(dist < minDist) {
                            x = tempX;
                            y = tempY;
                            minDist = dist;
                            clr = 120 - minDist;
                        }
                        break;
                    }
                }
            }
            else {
                for(let j = cC; j > 0; j --) {
                    dX = j * cRes - this.pos.x
                    dY = dX * Math.tan(rad);

                    tempX = this.pos.x + dX;
                    tempY = this.pos.y + dY;
                    r = Math.floor(tempY / rRes);
                    c = Math.floor(tempX / cRes) - 1;

                    if(r < 0 || r >= board.row)
                        break;

                    if(board.grid[r * board.col + c] == 1) {
                        const dist = dX / Math.cos(rad);
                        if(dist < minDist) {
                            x = tempX;
                            y = tempY;
                            minDist = dist;
                            clr = 120 - minDist;
                        }
                        break;
                    }
                }
            }

            if(i == -1) {
                this.minDist = minDist;
                continue;
            }

            rays.push({clr, dist: minDist * Math.cos(rad - this.radian)});

            strokeWeight(1);
            stroke(color(255, 255, 255, 10));
            line(this.pos.x, this.pos.y, x, y);
        }

        return rays
    }

    display(width, height) {
        // Displaying Particle
        const x = this.pos.x - this.size / 2;
        const y = this.pos.y - this.size / 2;

        noStroke();
        fill(color(255, 255, 255));
        square(x, y, this.size);
    }

}