// === החלף בפרטי הפרויקט שלך מ-Firebase Console ===
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "court-booking-123.firebaseapp.com",
  projectId: "court-booking-123",
  storageBucket: "court-booking-123.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};

// אתחול Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
