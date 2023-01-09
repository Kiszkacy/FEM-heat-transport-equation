
let graph = null;

function createChart(data, elem) {
    if (graph) graph.destroy(); // redraw
    let chart = new Chart(elem, {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Heat Transport Equation",
                    data: data,
                    fill: false,
                    borderColor: "#d84c4c",
                    backgroundColor: "#d84c4c"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        type: "linear",
                    },
                ],
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            tooltips: {
                enabled: false,
            },
            animation: false,
            hover: { mode: null },
            elements: {
                point: {
                    radius: 3,
                },
            },
        }
    })
    graph = chart;
    return chart;
}