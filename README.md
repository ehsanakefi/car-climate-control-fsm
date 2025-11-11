# Complete Project Report: Car Climate Control System Finite State Machine

## 📋 Project Specifications

**Project Name:** Car Climate Control System with Finite State Machine (FSM)  
**Completion Date:** November 12, 2025  
**Languages Used:** HTML, CSS, JavaScript  
**Project Type:** Interactive Web Application
**Creator project:** Ehsan Akefi

## 🎯 Objective and Introduction

This project is a complete simulator for a car's climate control system, designed using the concept of a **Finite State Machine (FSM)**. The main goal of this project is to teach the concepts of Cyber-Physical Systems (CPS) and demonstrate the functionality of an FSM in an interactive and visual environment.

## ⚙️ Key Project Features

### 🔧 Technical Features:

- **Three-State FSM:** IDLE, COOLING, HEATING
- **Interactive Temperature Control:** Slider for temperature adjustment (0 to 50°C)
- **Graphical FSM Display:** Interactive diagram with states and transitions
- **Car Animation:** Visual representation of the car changing color based on its state
- **Road Animation:** Moving road lines to simulate motion

### 🎮 Interactive Features:

- **Slider Control:** Adjust the ambient temperature
- **Keyboard Shortcuts:** H (Hot), C (Cold), N (Normal)
- **Real-time Status Display:** Current temperature and system state
- **Transition Highlighting:** Visual display of transitions between states

## 🔄 FSM Logic

### System States:

#### 1️⃣ IDLE State

- **Description:** The system's default state when the temperature is within the suitable range.
- **Condition:** 15°C ≤ Temp ≤ 35°C
- **System Status:** Neither heating nor cooling systems are active.
- **Car Color:** Gray (Normal state)

#### 2️⃣ COOLING State

- **Description:** Activates the air conditioning system to reduce the temperature.
- **Entry Condition:** Temp > 35°C
- **Exit Condition:** Temp < 25°C
- **Car Color:** Blue (Representing cooling)

#### 3️⃣ HEATING State

- **Description:** Activates the heating system to increase the temperature.
- **Entry Condition:** Temp < 15°C
- **Exit Condition:** Temp ≥ 30°C
- **Car Color:** Red (Representing heating)

### Transition Rules:
```

## 🏗️ Project File Architecture

 
## 💻 Code Analysis

### 🌐 HTML File (index.html)

#### General Structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Car Climate Control FSM</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    </body>
</html>

#### Key HTML Sections:

**۱.Temperature Control:**

```html
<div class="temperature-control">
  <label for="tempSlider">دمای فعلی:</label>
  <input
    type="range"
    id="tempSlider"
    class="temperature-slider"
    min="0"
    max="50"
    value="25"
    step="1"
  />
  <div class="temperature-display" id="tempDisplay">25°C</div>
</div>
```

**۲. Status Panel::**

```html
<div class="status-panel">
  <div class="status-item">
    <h3>حالت فعلی</h3>
    <div class="status-value state-idle" id="currentState">IDLE</div>
  </div>
  <div class="status-item">
    <h3>دمای فعلی</h3>
    <div class="status-value" id="statusTemp">25°C</div>
  </div>
</div>
```

**۳. FSM Diagram::**

```html
<div class="fsm-diagram">
  <h3 class="fsm-title">نمایش گرافیکی ماشین حالت محدود</h3>
  <div class="fsm-states">
    <div class="fsm-state cooling" id="fsm-cooling">سرمایش</div>
    <div class="fsm-state active" id="fsm-idle">اولیه</div>
    <div class="fsm-state heating" id="fsm-heating">گرمایش</div>
  </div>
  <!-- فلش‌ها و برچسب‌های انتقال -->
</div>
```

**۴.Car Animation:**

```html
<div class="road-container">
  <div class="road">
    <div class="road-lines"></div>
    <div class="car car-idle" id="car">
      <!-- SVG خودرو -->
    </div>
    <div class="climate-effect cooling-effect" id="coolingEffect"></div>
    <div class="climate-effect heating-effect" id="heatingEffect"></div>
  </div>
</div>
```

### 🎨 CSS File (styles.css)

#### Key Styles:

**۱. General Page Design:**

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(to bottom, #87ceeb 0%, #98fb98 100%);
  min-height: 100vh;
  overflow-x: hidden;
}
```

**۲. Road Animation:**

```css
@keyframes movingRoad {
  0% {
    transform: translateX(0) translateY(-50%);
  }
  100% {
    transform: translateX(-60px) translateY(-50%);
  }
}

.road-lines {
  animation: movingRoad 2s linear infinite;
}
```

**۳. Car States:**

```css
.car-idle .car-body {
  background: #888;
}
.car-cooling .car-body {
  background: linear-gradient(135deg, #2196f3, #64b5f6);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
}
.car-heating .car-body {
  background: linear-gradient(135deg, #f44336, #ef5350);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.4);
}
```

**۴. FSM Diagram:**

```css
.fsm-state {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #6c757d;
  background: #fff;
  transition: all 0.3s ease;
}

.fsm-state.active {
  border-color: #007bff;
  background: #007bff;
  color: white;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
  transform: scale(1.1);
}
```

### ⚙️JavaScript File - State Machine (fsm.js)

#### Main FSM Class:

**۱. Class Constructor::**

```javascript
class ClimateControlFSM {
  constructor() {

    this.states = {
      IDLE: "IDLE",
      COOLING: "COOLING",
      HEATING: "HEATING",
    };

   
    this.currentState = this.states.IDLE;
    this.currentTemperature = 25;


    this.tempSlider = null;
    this.tempDisplay = null;
    this.currentStateDisplay = null;

  }
}
```

**۲. DOM Element Binding Method::**

```javascript
attachElements(selectors = {}) {

    this.tempSlider = document.getElementById('tempSlider');
    this.tempDisplay = document.getElementById('tempDisplay');
    // ...


    if (this.tempSlider) {
        this.tempSlider.addEventListener('input', (e) => {
            this.currentTemperature = parseInt(e.target.value, 10);
            this.processTemperatureChange();
            this.updateDisplay();
        });
    }


    this.updateDisplay();
    this.updateCarVisuals();
    this.updateStateDescription();
    this.updateFSMDiagram();
}
```

**۳.Main FSM Logic:**

```javascript
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
```

**۴. State Transition Management:**

```javascript
transitionTo(newState) {

    if (newState === this.currentState) return;

    console.log(`State transition: ${this.currentState} → ${newState}`);

    
    this.highlightTransition(this.currentState, newState);

    
    this.currentState = newState;

    
    this.updateCarVisuals();
    this.updateStateDescription();
    this.updateFSMDiagram();
}
```

**۵. Update Car Visuals:**

```javascript
updateCarVisuals() {
    if (!this.car || !this.carsvg) return;


    this.car.className = 'car';
    this.carsvg.setAttribute('class', 'carsvg');

   
    if (this.coolingEffect) this.coolingEffect.classList.remove('effect-active');
    if (this.heatingEffect) this.heatingEffect.classList.remove('effect-active');

    
    switch (this.currentState) {
        case this.states.IDLE:
            this.carsvg.classList.add('car-idle');
            break;
        case this.states.COOLING:
            this.carsvg.classList.add('car-cooling');
            if (this.coolingEffect) this.coolingEffect.classList.add('effect-active');
            break;
        case this.states.HEATING:
            this.carsvg.classList.add('car-heating');
            if (this.heatingEffect) this.heatingEffect.classList.add('effect-active');
            break;
    }
}
```

**۶. Update FSM Diagram:**

```javascript
updateFSMDiagram() {

    if (this.fsmIdleState) this.fsmIdleState.classList.remove('active');
    if (this.fsmCoolingState) this.fsmCoolingState.classList.remove('active');
    if (this.fsmHeatingState) this.fsmHeatingState.classList.remove('active');

   
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
```

**۷. Highlight Transitions:**

```javascript
highlightTransition(fromState, toState) {
       let activeArrow = null;
    let activeLabel = null;

    if (fromState === this.states.IDLE && toState === this.states.COOLING) {
        activeArrow = this.arrowIdleCooling;
        activeLabel = this.labelIdleCooling;
    }
    

    if (activeArrow && activeLabel) {
        activeArrow.classList.add('active');
        activeLabel.classList.add('active');

       
        setTimeout(() => {
            activeArrow.classList.remove('active');
            activeLabel.classList.remove('active');
        }, 2000);
    }
}
```

### 🎮 JavaScript File - Event Management(script.js)

```javascript
document.addEventListener("DOMContentLoaded", function () {
  
  window.climateControl = new window.ClimateControlFSM();
  window.climateControl.attachElements();

  console.log("Car Climate Control State Machine initialized");

 
  document.addEventListener("keydown", function (e) {
    const climate = window.climateControl;
    if (!climate) return;

    switch (e.key) {
      case "h": // H for hot - 
        climate.currentTemperature = 40;
        if (climate.tempSlider) climate.tempSlider.value = 40;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
      case "c": // C for cold - 
        climate.currentTemperature = 10;
        if (climate.tempSlider) climate.tempSlider.value = 10;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
      case "n": // N for normal - 
        climate.currentTemperature = 25;
        if (climate.tempSlider) climate.tempSlider.value = 25;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
    }
  });
});
```

## 🔄 System Operation Algorithm  

### Program Execution Steps:

1. **Initialization:**

   - Create an instance of the `ClimateControlFSM` class
   - Set the initial state to `IDLE`
   - Set the default temperature to ۲۵ 

2. **DOM Binding:**

   - Find the required HTML elements.
   - Set up Event Listeners.
   - Perform an initial update of the display.

3. **Main Operation Loop**

   ```
  Temperature Change Event → processTemperatureChange() → Check Transition Conditions →
  transitionTo() → Update Display (Car + Diagram + Status)
   ```

4. **Transition Management:**
   - Check the current state.
   - Compare the temperature with the defined thresholds.
   - Decide whether to transition.
   - Execute the transition and update the display.

## 🎯 User Features

### User Interaction:

1. **Slider Control:**

   - Range: 0 to 50°C
   - Real-time Change: Every change is applied immediately.
   - Numerical Display: The exact temperature value is shown.

2. **Keyboard Shortcuts:**

   - `H`: Set temperature to 40°C (Hot)
   - `C`: Set temperature to 10°C (Cold)
   - `N`: Set temperature to 25°C (Normal)

3. **Visual Display**
   - **Status Panel**: Shows the current state and temperature.
   - **FSM Diagram**: Provides a graphical view of states and transitions.
   - **Moving Car**: Changes color based on the state.
   - **Climate Effects**: Visual representation of cooling or heating.

## 📊Performance Analysis

### Project Strength:

1. **Correct FSM Implementation**:State machine logic follows scientific principles.
2. **Attractive User Interface**: Visual and interactive design.
3. **Clean and Organized Code**: Separation of concerns in different files.
4. **Extensibility**: Scalable structure for adding more states.
5. **Real-time Responsiveness**: Changes are applied instantly.
 
