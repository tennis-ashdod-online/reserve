# app.py - אתר הזמנת מכרשי טניס
from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'tennis_court_secret_key_2025'

# רשימת מכרשים לדוגמה
COURTS = [
    {"id": 1, "name": "מגרש מרכזי", "price_per_hour": 120, "available": True},
    {"id": 2, "name": "מגרש צדדי 1", "price_per_hour": 100, "available": True},
    {"id": 3, "name": "מגרש צדדי 2", "price_per_hour": 100, "available": False},
    {"id": 4, "name": "מגרש VIP", "price_per_hour": 180, "available": True},
]

# הזמנות (בזיכרון - לשימוש בפיתוח)
bookings = []

@app.route('/')
def index():
    return render_template('index.html', courts=COURTS)

@app.route('/book/<int:court_id>', methods=['GET', 'POST'])
def book_court(court_id):
    court = next((c for c in COURTS if c["id"] == court_id), None)
    if not court:
        flash('מגרש לא נמצא!', 'error')
        return redirect(url_for('index'))
    
    if not court["available"]:
        flash('המגרש אינו זמין כרגע.', 'error')
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        date = request.form['date']
        time = request.form['time']
        duration = int(request.form['duration'])
        
        # בדיקה פשוטה של תאריך
        try:
            booking_datetime = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
            if booking_datetime < datetime.now():
                flash('לא ניתן להזמין תאריך שעבר.', 'error')
                return render_template('book.html', court=court)
        except ValueError:
            flash('תאריך או שעה לא תקינים.', 'error')
            return render_template('book.html', court=court)
        
        total_price = court["price_per_hour"] * duration
        
        booking = {
            "court_id": court_id,
            "court_name": court["name"],
            "name": name,
            "phone": phone,
            "date": date,
            "time": time,
            "duration": duration,
            "total_price": total_price,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        bookings.append(booking)
        
        flash(f'ההזמנה בוצעה בהצלחה! סה"כ: ₪{total_price}', 'success')
        return redirect(url_for('index'))
    
    return render_template('book.html', court=court)

@app.route('/bookings')
def view_bookings():
    return render_template('bookings.html', bookings=bookings)

if __name__ == '__main__':
    # יצירת תיקיית templates אם לא קיימת
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    app.run(debug=True)