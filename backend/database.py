import sqlite3
from datetime import date

def create_daily_use_table():
    #here it creates the database
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    
    #Creates a table named daily_use if it doesn't exisist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS daily_use (
            date TEXT PRIMARY KEY,
            count INTEGER DEFAULT 0
        )
    ''')
    
    conn.commit()
    conn.close()

def get_use_today():
    #todays date represented like 2025-08-30
    today = date.today().isoformat()
    
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT count FROM daily_use WHERE date = ?', (today,))
    # this returns the first row as a tuple
    result = cursor.fetchone()
    
    conn.close()
    
    return result[0] if result else 0

def increase_use():
    # getting todays date
    today = date.today().isoformat()
    
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    
    # Insert or update today's count
    cursor.execute('''
        INSERT INTO daily_use (date, count)
        VALUES (?, 1)
        ON CONFLICT(date) DO UPDATE SET count = count + 1
    ''', (today,))
    
    conn.commit()
    conn.close()

def limit_exceeded():
    #checking if the use today has exceeded 1000
    return get_use_today() >= 1000
