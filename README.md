# گزارش کامل پروژه: ماشین حالت محدود سیستم تنظیم هوای خودرو

## 📋 مشخصات پروژه

**نام پروژه:** سیستم تنظیم هوای خودرو با ماشین حالت محدود (FSM)  
**تاریخ تکمیل:** ۲۱ آبان ۱۴۰۴  
**زبان‌های استفاده شده:** HTML, CSS, JavaScript  
**نوع پروژه:** وب اپلیکیشن تعاملی

## 🎯 هدف و معرفی پروژه

این پروژه یک شبیه‌ساز کامل سیستم تنظیم هوای خودرو است که با استفاده از مفهوم **ماشین حالت محدود (Finite State Machine)** طراحی شده است. هدف اصلی این پروژه آموزش مفاهیم سیستم‌های سایبرفیزیک و نمایش عملکرد FSM در یک محیط تعاملی و بصری است.

## ⚙️ ویژگی‌های کلیدی پروژه

### 🔧 ویژگی‌های فنی:

- **ماشین حالت محدود سه حالته:** IDLE، COOLING، HEATING
- **کنترل دمای تعاملی:** اسلایدر برای تنظیم دما (۰ تا ۵۰ درجه سانتی‌گراد)
- **نمایش گرافیکی FSM:** دیاگرام تعاملی با حالات و انتقالات
- **انیمیشن خودرو:** نمایش بصری خودرو با تغییر رنگ بر اساس حالت
- **انیمیشن جاده:** خطوط متحرک جاده برای شبیه‌سازی حرکت

### 🎮 ویژگی‌های تعاملی:

- **کنترل با اسلایدر:** تنظیم دمای محیط
- **میانبرهای صفحه‌کلید:** H (گرم)، C (سرد)، N (عادی)
- **نمایش وضعیت بلادرنگ:** دما و حالت فعلی سیستم
- **هایلایت انتقالات:** نمایش بصری انتقال بین حالات

## 🔄 منطق ماشین حالت محدود (FSM Logic)

### حالات سیستم:

#### 1️⃣ حالت اولیه (IDLE)

- **توضیح:** حالت پیش‌فرض سیستم زمانی که دما در محدوده مناسب قرار دارد
- **شرط:** ۱۵°C ≤ دما ≤ ۳۵°C
- **وضعیت سیستم:** هیچ‌یک از سیستم‌های گرمایش یا سرمایش فعال نیست
- **رنگ خودرو:** خاکستری (حالت عادی)

#### 2️⃣ حالت سرمایش (COOLING)

- **توضیح:** فعال‌سازی سیستم تهویه مطبوع برای کاهش دما
- **شرط ورود:** دما > ۳۵°C
- **شرط خروج:** دما < ۲۵°C
- **رنگ خودرو:** آبی (نمایش سرمایش)

#### 3️⃣ حالت گرمایش (HEATING)

- **توضیح:** فعال‌سازی سیستم بخاری برای افزایش دما
- **شرط ورود:** دما < ۱۵°C
- **شرط خروج:** دما ≥ ۳۰°C
- **رنگ خودرو:** قرمز (نمایش گرمایش)

### قوانین انتقال (Transition Rules):

```
IDLE → COOLING: زمانی که دما از ۳۵ درجه بالاتر رود
IDLE → HEATING: زمانی که دما از ۱۵ درجه پایین‌تر بیاید
COOLING → IDLE: زمانی که دما به زیر ۲۵ درجه برسد
HEATING → IDLE: زمانی که دما به ۳۰ درجه یا بالاتر برسد
```

## 🏗️ معماری فایل‌های پروژه

### 📁 ساختار پروژه:

```
tamrin1/
├── index.html              # فایل HTML اصلی
├── styles.css              # استایل‌های CSS
├── fsm.js                  # کلاس ماشین حالت محدود
├── script.js               # منطق اجرا و میانبرهای صفحه‌کلید
├── car.png                 # تصویر خودرو
├── coupe-car-svgrepo-com.svg  # فایل SVG خودرو
└── گزارش_کار.md            # این گزارش
```

## 💻 تحلیل کد برنامه

### 🌐 فایل HTML (index.html)

#### ساختار کلی:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- متادیتا و لینک به CSS -->
    <title>ماشین حالت تنظیم هوای خودرو</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- محتوای اصلی برنامه -->
  </body>
</html>
```

#### بخش‌های کلیدی HTML:

**۱. کنترل دما:**

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

**۲. پنل وضعیت:**

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

**۳. دیاگرام FSM:**

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

**۴. انیمیشن خودرو:**

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

### 🎨 فایل CSS (styles.css)

#### استایل‌های کلیدی:

**۱. طراحی کلی صفحه:**

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

**۲. انیمیشن جاده:**

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

**۳. حالت‌های خودرو:**

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

**۴. دیاگرام FSM:**

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

### ⚙️ فایل JavaScript - ماشین حالت (fsm.js)

#### کلاس اصلی FSM:

**۱. سازنده کلاس:**

```javascript
class ClimateControlFSM {
  constructor() {
    // تعریف سه حالت اصلی
    this.states = {
      IDLE: "IDLE",
      COOLING: "COOLING",
      HEATING: "HEATING",
    };

    // تنظیم حالت اولیه
    this.currentState = this.states.IDLE;
    this.currentTemperature = 25;

    // متغیرهای DOM برای تعامل با صفحه
    this.tempSlider = null;
    this.tempDisplay = null;
    this.currentStateDisplay = null;
    // ... سایر متغیرها
  }
}
```

**۲. متد اتصال به عناصر DOM:**

```javascript
attachElements(selectors = {}) {
    // اتصال به عناصر HTML
    this.tempSlider = document.getElementById('tempSlider');
    this.tempDisplay = document.getElementById('tempDisplay');
    // ...

    // تنظیم Event Listener برای اسلایدر
    if (this.tempSlider) {
        this.tempSlider.addEventListener('input', (e) => {
            this.currentTemperature = parseInt(e.target.value, 10);
            this.processTemperatureChange();
            this.updateDisplay();
        });
    }

    // به‌روزرسانی اولیه نمایش
    this.updateDisplay();
    this.updateCarVisuals();
    this.updateStateDescription();
    this.updateFSMDiagram();
}
```

**۳. منطق اصلی FSM:**

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

**۴. مدیریت انتقال حالات:**

```javascript
transitionTo(newState) {
    // جلوگیری از انتقال غیرضروری
    if (newState === this.currentState) return;

    console.log(`State transition: ${this.currentState} → ${newState}`);

    // هایلایت انتقال در دیاگرام
    this.highlightTransition(this.currentState, newState);

    // تغییر حالت
    this.currentState = newState;

    // به‌روزرسانی نمایش
    this.updateCarVisuals();
    this.updateStateDescription();
    this.updateFSMDiagram();
}
```

**۵. به‌روزرسانی نمایش خودرو:**

```javascript
updateCarVisuals() {
    if (!this.car || !this.carsvg) return;

    // ریست کردن کلاس‌ها
    this.car.className = 'car';
    this.carsvg.setAttribute('class', 'carsvg');

    // حذف افکت‌های قبلی
    if (this.coolingEffect) this.coolingEffect.classList.remove('effect-active');
    if (this.heatingEffect) this.heatingEffect.classList.remove('effect-active');

    // اعمال استایل مناسب برای هر حالت
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

**۶. به‌روزرسانی دیاگرام FSM:**

```javascript
updateFSMDiagram() {
    // ریست کردن همه حالات
    if (this.fsmIdleState) this.fsmIdleState.classList.remove('active');
    if (this.fsmCoolingState) this.fsmCoolingState.classList.remove('active');
    if (this.fsmHeatingState) this.fsmHeatingState.classList.remove('active');

    // فعال‌سازی حالت جاری
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

**۷. هایلایت انتقالات:**

```javascript
highlightTransition(fromState, toState) {
    // پیدا کردن فلش و برچسب مناسب
    let activeArrow = null;
    let activeLabel = null;

    if (fromState === this.states.IDLE && toState === this.states.COOLING) {
        activeArrow = this.arrowIdleCooling;
        activeLabel = this.labelIdleCooling;
    }
    // ... سایر حالات

    if (activeArrow && activeLabel) {
        activeArrow.classList.add('active');
        activeLabel.classList.add('active');

        // حذف هایلایت بعد از ۲ ثانیه
        setTimeout(() => {
            activeArrow.classList.remove('active');
            activeLabel.classList.remove('active');
        }, 2000);
    }
}
```

### 🎮 فایل JavaScript - مدیریت رویدادها (script.js)

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // ایجاد نمونه از FSM
  window.climateControl = new window.ClimateControlFSM();
  window.climateControl.attachElements();

  console.log("Car Climate Control State Machine initialized");

  // میانبرهای صفحه‌کلید
  document.addEventListener("keydown", function (e) {
    const climate = window.climateControl;
    if (!climate) return;

    switch (e.key) {
      case "h": // H for hot - گرم
        climate.currentTemperature = 40;
        if (climate.tempSlider) climate.tempSlider.value = 40;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
      case "c": // C for cold - سرد
        climate.currentTemperature = 10;
        if (climate.tempSlider) climate.tempSlider.value = 10;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
      case "n": // N for normal - عادی
        climate.currentTemperature = 25;
        if (climate.tempSlider) climate.tempSlider.value = 25;
        climate.processTemperatureChange();
        climate.updateDisplay();
        break;
    }
  });
});
```

## 🔄 الگوریتم عملکرد سیستم

### مراحل اجرای برنامه:

1. **مقداردهی اولیه:**

   - ایجاد نمونه از کلاس `ClimateControlFSM`
   - تنظیم حالت اولیه به `IDLE`
   - تنظیم دمای پیش‌فرض ۲۵ درجه

2. **اتصال به DOM:**

   - پیدا کردن عناصر HTML مورد نیاز
   - تنظیم Event Listenerها
   - به‌روزرسانی اولیه نمایش

3. **حلقه اصلی عملکرد:**

   ```
   رویداد تغییر دما → processTemperatureChange() → بررسی شرایط انتقال →
   transitionTo() → به‌روزرسانی نمایش (خودرو + دیاگرام + وضعیت)
   ```

4. **مدیریت انتقالات:**
   - بررسی حالت فعلی
   - مقایسه دما با حدود تعریف شده
   - تصمیم‌گیری برای انتقال
   - اجرای انتقال و به‌روزرسانی نمایش

## 🎯 ویژگی‌های کاربری

### تعامل با کاربر:

1. **کنترل اسلایدر:**

   - محدوده: ۰ تا ۵۰ درجه سانتی‌گراد
   - تغییر بلادرنگ: هر تغییر فوری اعمال می‌شود
   - نمایش عددی: مقدار دقیق دما نمایش داده می‌شود

2. **میانبرهای صفحه‌کلید:**

   - `H`: تنظیم دما روی ۴۰ درجه (گرم)
   - `C`: تنظیم دما روی ۱۰ درجه (سرد)
   - `N`: تنظیم دما روی ۲۵ درجه (عادی)

3. **نمایش بصری:**
   - **پنل وضعیت**: نمایش حالت فعلی و دما
   - **دیاگرام FSM**: نمایش گرافیکی حالات و انتقالات
   - **خودروی متحرک**: تغییر رنگ بر اساس حالت
   - **افکت‌های اقلیمی**: نمایش بصری سرمایش یا گرمایش

## 📊 تحلیل عملکرد

### نقاط قوت پروژه:

1. **پیاده‌سازی صحیح FSM**: منطق ماشین حالت طبق اصول علمی
2. **رابط کاربری جذاب**: طراحی بصری و تعاملی
3. **کد تمیز و منظم**: تفکیک وظایف در فایل‌های مختلف
4. **قابلیت توسعه**: ساختار قابل گسترش برای حالات بیشتر
5. **پاسخ‌دهی بلادرنگ**: تغییرات فوری اعمال می‌شود

### کاربردهای آموزشی:

1. **آموزش مفاهیم FSM**: نمایش عملی ماشین حالت محدود
2. **سیستم‌های سایبرفیزیک**: مثالی از تعامل دنیای فیزیک و دیجیتال
3. **برنامه‌نویسی رویدادمحور**: Event-driven programming
4. **طراحی رابط کاربری**: UX/UI design principles

## 🔧 راهنمای استفاده

### مراحل اجرا:

1. **باز کردن فایل:** `index.html` را در مرورگر باز کنید
2. **کنترل دما:** از اسلایدر برای تغییر دما استفاده کنید
3. **مشاهده انتقالات:** تغییرات در دیاگرام FSM و خودرو را ببینید
4. **استفاده از میانبرها:** کلیدهای H، C، N را امتحان کنید

### نکات مهم:

- دما بالای ۳۵ درجه: سیستم سرمایش فعال می‌شود
- دما زیر ۱۵ درجه: سیستم گرمایش فعال می‌شود
- دما بین ۱۵-۳۵ درجه: سیستم در حالت IDLE قرار می‌گیرد
- انتقالات با انیمیشن فلش‌ها نمایش داده می‌شود

## 📈 امکانات توسعه آینده

### پیشنهادات بهبود:

1. **حالات بیشتر:** اضافه کردن حالت‌هایی مثل AUTO، ECO
2. **کنترل رطوبت:** اضافه کردن بعد رطوبت به سیستم
3. **صفحه تنظیمات:** امکان تنظیم حدود دما
4. **گزارش‌گیری:** ذخیره تاریخچه تغییرات
5. **صدا:** اضافه کردن جلوه‌های صوتی
6. **موبایل:** بهینه‌سازی برای دستگاه‌های همراه

## 🎓 نتیجه‌گیری

این پروژه نمونه‌ای کامل و جامع از پیاده‌سازی **ماشین حالت محدود** در محیط وب است که علاوه بر جنبه آموزشی، قابلیت‌های تعاملی و بصری جذابی دارد. کد برنامه به شیوه‌ای منظم و قابل توسعه نوشته شده و می‌تواند به عنوان پایه‌ای برای پروژه‌های پیچیده‌تر استفاده شود.

### دستاوردهای کلیدی:

✅ پیاده‌سازی صحیح و کامل FSM  
✅ رابط کاربری زیبا و تعاملی  
✅ کد تمیز و مستندسازی شده  
✅ قابلیت آموزشی بالا  
✅ عملکرد بلادرنگ و پایدار

---

**توسعه‌دهنده:** Assistant  
**تاریخ:** ۲۱ آبان ۱۴۰۴  
**نسخه:** 1.0.0
