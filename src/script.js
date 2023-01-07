
let button = document.querySelector("#calc-button");
let input = document.querySelector("#point-count");
let canvas = document.querySelector("#graph-plot");

window.onload = () => {
    button.addEventListener("click", () => {
        if (!/^[1-9][0-9]*$/.test(input.value)) { // regex test
            alert("Input correct value! (positive integer)");
            return;
        }
        let pointCount = parseInt(input.value);
        let before = performance.now();
        const solution = new Solver(pointCount).solve();
        let after = performance.now();
        const dataset = [];
        for(let i = 0; i < pointCount; i++) {
            dataset.push({
                x: 2 * (i/(pointCount-1)),
                y: solution(2 * (i/(pointCount-1)))
            })
        }
        createChart(dataset, canvas);
        setTimeout(function() { alert("Solved in " + (after-before) + "ms"); }, 1);
    });
};