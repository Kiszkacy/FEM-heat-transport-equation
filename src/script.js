
let button = document.querySelector("#calc-button");
let elementInput = document.querySelector("#element-count");
let pointInput = document.querySelector("#point-count");
let canvas = document.querySelector("#graph-plot");

window.onload = () => {
    button.addEventListener("click", () => {
        if (!/^[1-9][0-9]*$/.test(elementInput.value) || !/^[1-9][0-9]*$/.test(pointInput.value)
            || parseInt(elementInput.value) === 1 || parseInt(pointInput.value) === 1) { // input validation
            alert("Input correct values! (>1)");
            return;
        }
        let elementCount = parseInt(elementInput.value);
        let before = performance.now();
        const solution = new Solver(elementCount).solve();
        let after = performance.now();
        const dataset = [];
        let pointCount = parseInt(pointInput.value);
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