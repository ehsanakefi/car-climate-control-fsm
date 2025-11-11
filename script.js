// Runtime wiring: instantiate the FSM (defined in fsm.js) and handle shortcuts
document.addEventListener('DOMContentLoaded', function() {
    // Create FSM instance and attach DOM elements
    window.climateControl = new window.ClimateControlFSM();
    window.climateControl.attachElements();

    console.log('Car Climate Control State Machine initialized (fsm.js + script.js)');

    // Keyboard shortcuts for quick testing
    document.addEventListener('keydown', function(e) {
        const climate = window.climateControl;
        if (!climate) return;
        switch (e.key) {
            case 'h': // H for hot
                climate.currentTemperature = 40;
                if (climate.tempSlider) climate.tempSlider.value = 40;
                climate.processTemperatureChange();
                climate.updateDisplay();
                break;
            case 'c': // C for cold
                climate.currentTemperature = 10;
                if (climate.tempSlider) climate.tempSlider.value = 10;
                climate.processTemperatureChange();
                climate.updateDisplay();
                break;
            case 'n': // N for normal
                climate.currentTemperature = 25;
                if (climate.tempSlider) climate.tempSlider.value = 25;
                climate.processTemperatureChange();
                climate.updateDisplay();
                break;
        }
    });
});
