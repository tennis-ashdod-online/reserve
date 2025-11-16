document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const court = document.getElementById('court').value;

  const message = `הזמנה חדשה - טניס אשדוד!\n\nשם: ${name}\nטלפון: ${phone}\nתאריך: ${date}\nשעה: ${time}\nמגרש: ${court}`;
  const whatsappUrl = `https://wa.me/972501234567?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
  document.getElementById('successMessage').classList.remove('d-none');
  this.reset();
});