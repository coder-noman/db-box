updateAllData(200, 30, 9, 10, 10, 6);

// Chart array and variable Declare
let load = [6000, 1800, 2000, 2000];
let temperature = [10, 20, 5, 10];

//Gauge alert start
function gaugeAlert(data, status) {
    let ul = document.getElementById("alert-list");
    let li = document.createElement("li");
    li.classList.add("alert-list-card");
    li.textContent = `${data} is ${status}.`;
    ul.appendChild(li);
}

//Gauge alert end

// gauge data start
//getting color
function getColor(value, ranges) {
    if (value >= ranges.green[0] && value <= ranges.green[1]) {
        return "#2ecc71"; // Green
    } else if (
        ranges.orange &&
        value >= ranges.orange[0] &&
        value <= ranges.orange[1]
    ) {
        return "#f39c12"; // Orange
    } else {
        return "#e74c3c"; // Red
    }
}

// get status
function getStatus(value, ranges) {
    if (value >= ranges.green[0] && value <= ranges.green[1]) {
        return { text: "Normal", class: "status-normal" };
    } else if (
        ranges.orange &&
        value >= ranges.orange[0] &&
        value <= ranges.orange[1]
    ) {
        return { text: "Warning", class: "status-warning" };
    } else {
        return { text: "Danger", class: "status-danger" };
    }
}

// update circular gauge
function updateGauge(elementId, value, ranges) {
    const fillElement = document.getElementById(`${elementId}-fill`);
    const valueElement = document.getElementById(`${elementId}-value`);
    const statusElement = document.getElementById(`${elementId}-status`);

    // Prevent null error
    if (!fillElement || !valueElement || !statusElement) {
        return;
    }

    // Calculate rotation based on value (0 to 360 degrees for 0 to max value)
    const rotation = (value / ranges.max) * 360;

    // Get color and status
    const color = getColor(value, ranges);
    const status = getStatus(value, ranges);

    // Update gauge fill
    fillElement.style.background = `conic-gradient(${color} 0deg ${rotation}deg, transparent ${rotation}deg 360deg)`;
    fillElement.style.color = color;

    // Update value (keep the unit span)
    const unit = valueElement.querySelector(".gauge-unit")?.textContent || "";
    valueElement.innerHTML = `${value} <span class="gauge-unit">${unit}</span>`;

    // Update status
    statusElement.textContent = status.text;
    statusElement.className = `status ${status.class}`;

    // Add pulse animation for warning and danger statuses
    if (status.class !== "status-normal") {
        statusElement.classList.add("pulse");
    } else {
        statusElement.classList.remove("pulse");
    }
}

//update all gauge data
function updateAllData(a, b, c, d, e, f) {
    // Input Voltage (0-300V)
    const inputVoltage = a;
    updateGauge("input-voltage", inputVoltage, {
        green: [180, 260],
        orange: [0, 179],
        red: [261, 300],
        max: 300,
    });

    // Alert for inputVoltage
    if (inputVoltage >= 0 && inputVoltage <= 190) {
        gaugeAlert("Input Voltage", "low");
    } else if (inputVoltage >= 246 && inputVoltage <= 300) {
        gaugeAlert("Input Voltage", "high");
    }

    // Total Current (0-30A)
    const totalCurrent = b;
    updateGauge("current", totalCurrent, {
        green: [0, 30],
        max: 30,
    });

    // Alert for Total Current
    if (totalCurrent >= 0 && totalCurrent <= 210) {
        gaugeAlert("Total Current", "low");
    } else if (totalCurrent >= 231 && totalCurrent <= 300) {
        gaugeAlert("Total Current", "high");
    }

    // ups1 current (0-15A)
    const ups1Load = c;
    updateGauge("ups1-load", ups1Load, {
        green: [0, 9],
        red: [10, 15],
        max: 15,
    });

    // Alert for ups1 current
    if (ups1Load >= 0 && ups1Load <= 210) {
        gaugeAlert("UPS1 Current", "low");
    } else if (ups1Load >= 231 && ups1Load <= 300) {
        gaugeAlert("UPS1 Current", "high");
    }

    // ups2 current (0-15A)
    const ups2Load = d;
    updateGauge("ups2-load", ups2Load, {
        green: [0, 9],
        red: [10, 15],
        max: 15,
    });

    // Alert for ups2 current
    if (ups2Load >= 221 && ups2Load <= 240) {
        gaugeAlert("UPS2 Current", "low");
    } else if (ups2Load >= 0 && ups2Load <= 220) {
        gaugeAlert("UPS2 Current", "very Low");
    }

    // Air Cooler (0-20A)
    const cooler = e;
    updateGauge("cooler", cooler, {
        green: [3, 20],
        orange: [0, 2],
        max: 20,
    });

    // Alert for Air Cooler
    if (cooler >= 26 && cooler <= 31) {
        gaugeAlert("cooler", "high");
    } else if (cooler >= 32 && cooler <= 55) {
        gaugeAlert("cooler", "very high");
    }

    // Grounding Value (0-10V)
    const ground = f;
    updateGauge("ground", ground, {
        green: [0, 4],
        orange: [4.1, 6],
        red: [6.1, 10],
        max: 10,
    });

    // Alert for Grounding Value
    if (ground >= 0 && ground <= 40) {
        gaugeAlert("Grounding Value", "low");
    } else if (ground >= 81 && ground <= 100) {
        gaugeAlert("Grounding Value", "high");
    }
}
// gauge data end

// Chart data start
let color = "black";

// Initialize charts on page load
function initializeCharts() {
    // Amonia Chart (Bar Chart)
    const dbLoad = document.getElementById("db-load-chart").getContext("2d");
    barChart1 = new Chart(dbLoad, {
        type: "bar",
        data: {
            labels: ["Total Load", "UPS1 Load", "UPS2 Load", "Air Cooler Load"],
            datasets: [
                {
                    label: "Current (A)",
                    data: load,
                    backgroundColor: ["#3867D6", "#cd4e6eff", "#FE9B13", "#9b59b6"],
                    borderRadius: 10,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Current (A)",
                        color: `${color}`,
                    },
                    ticks: {
                        color: `${color}`,
                        font: {
                            size: 12,
                        },
                    },
                },
                x: {
                    ticks: {
                        color: `${color}`,
                        font: {
                            size: 12,
                        },
                    },
                },
            },
        },
    });
    // Db Temperature Chart (Bar Chart)
    const dbTemperature = document
        .getElementById("db-temperature-chart")
        .getContext("2d");
    barChart2 = new Chart(dbTemperature, {
        type: "bar",
        data: {
            labels: ["DB Air", "P (Bus Bar)", "N (Bus Bar)", "G (Bus Bar)"],
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temperature,
                    backgroundColor: ["#4ECDC4", "#e74c3c", "#3867D6", "#2ecc71"],
                    borderRadius: 10,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Temperature (C)",
                        color: `${color}`,
                    },
                    ticks: {
                        color: `${color}`,
                        font: {
                            size: 12,
                        },
                    },
                },
                x: {
                    ticks: {
                        color: `${color}`,
                        font: {
                            size: 12,
                        },
                    },
                },
            },
        },
    });
}

// Initialize charts when the page loads
window.addEventListener("load", initializeCharts);

// update Bar chart 1
function updateBarChart1() {
    // Update chart
    if (barChart1) {
        barChart1.data.datasets[0].data = load;
        barChart1.update("none");
    }
}
// update Bar chart 2
function updateBarChart2() {
    // Update chart
    if (barChart2) {
        barChart2.data.datasets[0].data = temperature;
        barChart2.update("none");
    }
}
// Chart data end
