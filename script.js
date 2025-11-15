// === Firebase ===
let db;
if (typeof firebase !== 'undefined') {
  db = firebase.firestore();
}

// === תרגומים ===
const translations = { /* ... כולל כל הטקסטים מהקוד הקודם ... */ };

// === פונקציות כלליות ===
function getNext7Days(lang) {
  const days = [];
  const weekdays = lang === 'he' 
    ? ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = weekdays[date.getDay()];
    const dateStr = date.toLocaleDateString('he-IL');
    days.push({ name: `${dayName} ${dateStr}`, date: date.toISOString().split('T')[0] });
  }
  return days;
}

// === index.html ===
if (document.getElementById('courtsWrapper')) {
  // ... כל הקוד של index.html (עם תאריכים, quick days, וכו') ...
  // כולל שמירה ב-Firestore במקום localStorage
}

// === booking-details.html ===
if (document.getElementById('personalDetailsForm')) {
  // ... שליחה ל-Firestore + אפקטים ...
}

// === my-bookings.html ===
if (document.getElementById('phoneSearch')) {
  // ... חיפוש לפי טלפון ...
}
