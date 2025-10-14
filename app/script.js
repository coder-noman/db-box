//  // Initialize gauges
        function updateGauge(elementId, value, maxValue) {
            const fill = document.getElementById(elementId + '-fill');
            const valueElement = document.getElementById(elementId + '-value');
            
            // Update the displayed value
            if (valueElement) {
                valueElement.innerHTML = value + (elementId.includes('voltage') ? '<span class="gauge-unit">V</span>' : '<span class="gauge-unit">A</span>');
            }
            
            // Update the fill (visual representation)
            if (fill) {
                const percentage = (value / maxValue) * 100;
                const degrees = (percentage / 100) * 180; // Half circle gauge
                fill.style.background = `conic-gradient(transparent 0deg, currentColor ${degrees}deg, transparent ${degrees}deg)`;
            }
        }

        // Initialize charts
        function initializeCharts() {
            // Load Distribution Chart
            const loadCtx = document.getElementById('load-chart').getContext('2d');
            const loadChart = new Chart(loadCtx, {
                type: 'bar',
                data: {
                    labels: ['Total Load', 'UPS1 Load', 'UPS2 Load', 'Air Cooler Load'],
                    datasets: [{
                        label: 'Current (A)',
                        data: [75, 32, 28, 15],
                        backgroundColor: [
                            '#3867D6',
                            '#4ECDC4',
                            '#FE9B13',
                            '#9b59b6'
                        ],
                        borderColor: [
                            '#3867D6',
                            '#4ECDC4',
                            '#FE9B13',
                            '#9b59b6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Current (A)'
                            }
                        }
                    }
                }
            });

            // Temperature Chart
            const tempCtx = document.getElementById('temperature-chart').getContext('2d');
            const tempChart = new Chart(tempCtx, {
                type: 'bar',
                data: {
                    labels: ['DB', 'P', 'N', 'G'],
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: [42, 38, 35, 30],
                        backgroundColor: [
                            '#FC5C65',
                            '#FE9B13',
                            '#4ECDC4',
                            '#3867D6'
                        ],
                        borderColor: [
                            '#FC5C65',
                            '#FE9B13',
                            '#4ECDC4',
                            '#3867D6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Temperature (°C)'
                            }
                        }
                    }
                }
            });
        }

        // Simulate real-time updates
        function simulateUpdates() {
            // Randomly update gauge values
            setInterval(() => {
                updateGauge('voltage', 220 + Math.floor(Math.random() * 20), 300);
                updateGauge('total-load', 70 + Math.floor(Math.random() * 10), 100);
                updateGauge('ups1-current', 30 + Math.floor(Math.random() * 5), 50);
                updateGauge('ups2-current', 25 + Math.floor(Math.random() * 8), 50);
                updateGauge('air-cooler-current', 12 + Math.floor(Math.random() * 6), 30);
            }, 3000);
        }

        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial gauge values
            updateGauge('voltage', 230, 300);
            updateGauge('total-load', 75, 100);
            updateGauge('ups1-current', 32, 50);
            updateGauge('ups2-current', 28, 50);
            updateGauge('air-cooler-current', 15, 30);
            
            // Initialize charts
            initializeCharts();
            
            // Start simulation
            simulateUpdates();
        });