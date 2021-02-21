class Board {

    constructor(row, col) {
        this.row  = row;
        this.col  = col;
        this.grid = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ];
    }

    display(width, height) {
        const rRes = height / this.col;
        const cRes = width  / this.row;

        noStroke();
        for(let i = 0; i < this.row; i ++) {
            for(let j = 0; j < this.col; j ++) {
                if(this.grid[i * this.col + j] == 1)
                    fill(color(20, 20, 20));
                else
                    fill(color(40, 40, 40));

                rect(j * cRes, i * rRes, cRes, rRes);
            }
        }
    }

}