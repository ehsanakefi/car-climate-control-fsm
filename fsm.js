// ClimateControlFSM - Finite State Machine implementation
// This file contains the FSM class only. It's intentionally self-contained
// and exposes the class on the global window object so other scripts can
// instantiate and use it without module loaders.

/*
States:
 - IDLE
 - COOLING
 - HEATING

Transition rules:
 - IDLE -> COOLING when temperature > 35
 - IDLE -> HEATING when temperature < 15
 - COOLING -> IDLE when temperature < 25
 - HEATING -> IDLE when temperature >= 30
*/
class ClimateControlFSM {
    constructor() {
        this.states = { IDLE: 'IDLE', COOLING: 'COOLING', HEATING: 'HEATING' };
        this.currentState = this.states.IDLE;
        this.currentTemperature = 25;

        // DOM refs will be assigned by the runtime (or resolved when needed)
        this.tempSlider = null;
        this.tempDisplay = null;
        this.currentStateDisplay = null;
        this.statusTempDisplay = null;
        this.car = null;
        this.stateDescription = null;
        this.coolingEffect = null;
        this.heatingEffect = null;
        
        // FSM Diagram elements
        this.fsmIdleState = null;
        this.fsmCoolingState = null;
        this.fsmHeatingState = null;
        this.arrowIdleCooling = null;
        this.arrowIdleHeating = null;
        this.arrowCoolingIdle = null;
        this.arrowHeatingIdle = null;
        this.labelIdleCooling = null;
        this.labelIdleHeating = null;
        this.labelCoolingIdle = null;
        this.labelHeatingIdle = null;
    }

    // Wire DOM elements into the FSM instance. Call this after DOMContentLoaded.
    attachElements(selectors = {}) {
        this.tempSlider = document.getElementById(selectors.tempSlider || 'tempSlider');
        this.tempDisplay = document.getElementById(selectors.tempDisplay || 'tempDisplay');
        this.currentStateDisplay = document.getElementById(selectors.currentState || 'currentState');
        this.statusTempDisplay = document.getElementById(selectors.statusTemp || 'statusTemp');
        this.car = document.getElementById(selectors.car || 'car');
        this.carsvg = document.getElementById(selectors.carsvg || 'carsvg');
        this.stateDescription = document.getElementById(selectors.stateDescription || 'stateDescription');
        this.coolingEffect = document.getElementById(selectors.coolingEffect || 'coolingEffect');
        this.heatingEffect = document.getElementById(selectors.heatingEffect || 'heatingEffect');

        // Attach FSM diagram elements
        this.fsmIdleState = document.getElementById('fsm-idle');
        this.fsmCoolingState = document.getElementById('fsm-cooling');
        this.fsmHeatingState = document.getElementById('fsm-heating');
        this.arrowIdleCooling = document.getElementById('arrow-idle-cooling');
        this.arrowIdleHeating = document.getElementById('arrow-idle-heating');
        this.arrowCoolingIdle = document.getElementById('arrow-cooling-idle');
        this.arrowHeatingIdle = document.getElementById('arrow-heating-idle');
        this.labelIdleCooling = document.getElementById('label-idle-cooling');
        this.labelIdleHeating = document.getElementById('label-idle-heating');
        this.labelCoolingIdle = document.getElementById('label-cooling-idle');
        this.labelHeatingIdle = document.getElementById('label-heating-idle');

        if (this.tempSlider) {
            this.tempSlider.addEventListener('input', (e) => {
                this.currentTemperature = parseInt(e.target.value, 10);
                this.processTemperatureChange();
                this.updateDisplay();
            });
        }

        // Initial update to reflect starting values
        this.updateDisplay();
        this.updateCarVisuals();
        this.updateStateDescription();
        this.updateFSMDiagram();
    }

    // Core FSM decision logic
    processTemperatureChange() {
        const temp = this.currentTemperature;
        switch (this.currentState) {
            case this.states.IDLE:
                if (temp > 35) this.transitionTo(this.states.COOLING);
                else if (temp < 15) this.transitionTo(this.states.HEATING);
                break;
            case this.states.COOLING:
                if (temp < 25) this.transitionTo(this.states.IDLE);
                break;
            case this.states.HEATING:
                if (temp >= 30) this.transitionTo(this.states.IDLE);
                break;
        }
    }

    transitionTo(newState) {
        // No-op if same state
        if (newState === this.currentState) return;
        console.log(`State transition: ${this.currentState} → ${newState}`);
        
        // Highlight the transition arrow briefly
        this.highlightTransition(this.currentState, newState);
        
        this.currentState = newState;
        this.updateCarVisuals();
        this.updateStateDescription();
        this.updateFSMDiagram();
    }

    updateDisplay() {
        if (this.tempDisplay) this.tempDisplay.textContent = `${this.currentTemperature}°C`;
        if (this.statusTempDisplay) this.statusTempDisplay.textContent = `${this.currentTemperature}°C`;
        if (this.currentStateDisplay) {
            this.currentStateDisplay.textContent = this.currentState;
            this.currentStateDisplay.className = `status-value state-${this.currentState.toLowerCase()}`;
        }
        if (this.tempSlider) this.tempSlider.value = this.currentTemperature;
    }

    updateCarVisuals() {
        if (!this.car) return;
        if (!this.carsvg) return;
        // Reset
        this.car.className = 'car';
        // this.carsvg.className = 'carsvg';
        this.carsvg.setAttribute('class', 'carsvg');
        if (this.coolingEffect) this.coolingEffect.classList.remove('effect-active');
        if (this.heatingEffect) this.heatingEffect.classList.remove('effect-active');

        switch (this.currentState) {
            case this.states.IDLE:
                // this.car.classList.add('car-idle');
                this.carsvg.classList.add('car-idle');
                break;
            case this.states.COOLING:
                // this.car.classList.add('car-cooling');
                this.carsvg.classList.add('car-cooling');
                console.log('Car state changed to COOLING');

                if (this.coolingEffect) this.coolingEffect.classList.add('effect-active');
                break;
            case this.states.HEATING:
                this.carsvg.classList.add('car-heating');
                if (this.heatingEffect) this.heatingEffect.classList.add('effect-active');
                break;
        }
    }

    updateStateDescription() {
        if (!this.stateDescription) return;
        const descriptions = {
            [this.states.IDLE]: 'The climate control system is in IDLE state. Temperature is within comfortable range.',
            [this.states.COOLING]: '🧊 COOLING ACTIVE: Air conditioning is running to reduce temperature.',
            [this.states.HEATING]: '🔥 HEATING ACTIVE: Heater is running to increase temperature.'
        };
        this.stateDescription.textContent = descriptions[this.currentState] || '';
    }

    getCurrentState() {
        return { state: this.currentState, temperature: this.currentTemperature };
    }

    updateFSMDiagram() {
        // Reset all states
        if (this.fsmIdleState) this.fsmIdleState.classList.remove('active');
        if (this.fsmCoolingState) this.fsmCoolingState.classList.remove('active');
        if (this.fsmHeatingState) this.fsmHeatingState.classList.remove('active');

        // Activate current state
        switch (this.currentState) {
            case this.states.IDLE:
                if (this.fsmIdleState) this.fsmIdleState.classList.add('active');
                break;
            case this.states.COOLING:
                if (this.fsmCoolingState) this.fsmCoolingState.classList.add('active');
                break;
            case this.states.HEATING:
                if (this.fsmHeatingState) this.fsmHeatingState.classList.add('active');
                break;
        }
    }

    highlightTransition(fromState, toState) {
        // Clear all active arrows and labels
        const arrows = [this.arrowIdleCooling, this.arrowIdleHeating, this.arrowCoolingIdle, this.arrowHeatingIdle];
        const labels = [this.labelIdleCooling, this.labelIdleHeating, this.labelCoolingIdle, this.labelHeatingIdle];
        
        arrows.forEach(arrow => arrow && arrow.classList.remove('active'));
        labels.forEach(label => label && label.classList.remove('active'));

        // Highlight the specific transition
        let activeArrow = null;
        let activeLabel = null;

        if (fromState === this.states.IDLE && toState === this.states.COOLING) {
            activeArrow = this.arrowIdleCooling;
            activeLabel = this.labelIdleCooling;
        } else if (fromState === this.states.IDLE && toState === this.states.HEATING) {
            activeArrow = this.arrowIdleHeating;
            activeLabel = this.labelIdleHeating;
        } else if (fromState === this.states.COOLING && toState === this.states.IDLE) {
            activeArrow = this.arrowCoolingIdle;
            activeLabel = this.labelCoolingIdle;
        } else if (fromState === this.states.HEATING && toState === this.states.IDLE) {
            activeArrow = this.arrowHeatingIdle;
            activeLabel = this.labelHeatingIdle;
        }

        if (activeArrow && activeLabel) {
            activeArrow.classList.add('active');
            activeLabel.classList.add('active');
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                activeArrow.classList.remove('active');
                activeLabel.classList.remove('active');
            }, 2000);
        }
    }
}

// Expose globally for non-module environments
window.ClimateControlFSM = ClimateControlFSM;
