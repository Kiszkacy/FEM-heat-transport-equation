
function Solver(n) {
    this.n = n;

    // return ith-point
    this.x = function(i) {
        return 2 * (i/(this.n-1)); // *2 <- length of (0,2)
    }

    // return value of ith basis func at point x
    this.e = function(i, x) {
        if (x > this.x(i) && x <= this.x(i+1)) return (1-((this.n-1)*x/2.0-i)); // desc part -> \
        if (x > this.x(i-1) && x <= this.x(i)) return ((this.n-1)*x/2.0-i+1); // asc part -> /
        return 0; // not in range
    }

    // return value of ith basis func derivative at point x
    this.eDerivative = function(i, x) {
        if (x > this.x(i) && x <= this.x(i+1)) return (-(this.n-1)/2.0); // desc part -> \
        if (x > this.x(i-1) && x <= this.x(i)) return ((this.n-1)/2.0); // asc part -> /
        return 0; // not in range
    }

    this.B = function(i, j) {
        return this.e(i, 0) * this.e(j, 0) - this.integrate((x) => this.eDerivative(i, x) * this.eDerivative(j, x),
                                                            Math.max(0, this.x(i-1), this.x(j-1)), // find highest lowest point
                                                            Math.min(2, this.x(i+1), this.x(j+1))); // find lowest highest point
    }

    this.L = function(j) {
        return 20 * this.e(j, 0);
    }

    // integrate using gaussian quadrature with 2 points
    this.integrate = function(fn, from, to) {
        const xn = (x) => x*(from-to)/2.0 + (from+to)/2.0; // "normalized" function range
        return ((to-from)/2.0) * (fn(xn(Math.sqrt(3)/3)) + fn(xn(-Math.sqrt(3)/3)));
    }

    // gauss elimination | not mine implementation
    this.gaussElimination = function(matrix) {
        for (let i = 0; i < this.n; i++) {
            if (matrix[i][i] === 0) {
                let c = 1;
                while ((i + c) < this.n && matrix[i + c][i] === 0) c++;
                if ((i + c) === this.n) break;
                for (let j = i, k = 0; k <= this.n; k++) {
                    [matrix[j][k], matrix[j+c][k]] = [matrix[j+c][k], matrix[j][k]];
                }
            }

            for (let j = 0; j < this.n; j++) {
                if (i === j) continue;
                let p = matrix[j][i] / matrix[i][i];
                for (let k = 0; k <= this.n; k++) matrix[j][k] = matrix[j][k] - matrix[i][k] * p;
            }
        }
    }

    // main func
    this.solve = function() {
        // create matrix and fill it
        const matrix = Array(this.n).fill(null).map(() => Array(this.n+1).fill(0));
        for(let i = 0; i < this.n; i++)
            for(let j = 0; j < this.n; j++) matrix[i][j] = this.B(j, i);
        for(let i = 0; i < this.n; i++) matrix[i][this.n] = this.L(i);


        // dirichlet boundary zeros
        for(let i = 0; i < this.n; i++) {
            matrix[this.n-1][i] = 0;
            matrix[i][this.n-1] = 0;
        }
        matrix[this.n-1][this.n-1] = 1;
        matrix[this.n-1][this.n] = 0;

        // solve
        this.gaussElimination(matrix);

        // create solution
        const sol = Array(this.n).fill(0).map((_, idx) => matrix[idx][this.n]/matrix[idx][idx]);
        return (x) => sol.reduce((sum, val, idx) => sum + val*this.e(idx, x), 0);
    }

    return this;
}


