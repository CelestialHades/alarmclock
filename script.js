// 1. Get DOM elements
const currentTimeDisplay = document.getElementById('currentTime');
const alarmTimeInput = document.getElementById('alarmTime');

// 2. Initialize variables
let alarmTime = null;
let intervalId = null;
const alarmSound = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3'); // Simple beep sound

// 3. Function to update current time
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  
  // 4. Check if alarm should trigger
  if (alarmTime) {
    const [alarmHours, alarmMinutes] = alarmTime.split(':');
    if (
      now.getHours() === Number(alarmHours) &&
      now.getMinutes() === Number(alarmMinutes) &&
      now.getSeconds() === 0
    ) {
      alarmSound.play();
      alert('Alarm ringing!');
      clearAlarm(); // Auto-clear after ringing
    }
  }
}

// 5. Function to set the alarm
function setAlarm() {
  const time = alarmTimeInput.value;
  if (!time) {
    currentTimeDisplay.textContent = 'Please set a time!';
    return;
  }
  
  alarmTime = time;
  alarmTimeInput.value = ''; // Clear input
  alert(`Alarm set for ${alarmTime}`);
}

// 6. Function to clear the alarm
function clearAlarm() {
  alarmTime = null;
  alarmSound.pause();
  alarmSound.currentTime = 0; // Reset sound
}

// 7. Start the clock
intervalId = setInterval(updateTime, 1000);

// 8. Initial time update
updateTime();