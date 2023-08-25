import mysql from 'mysql2';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0128Zhu!',
  database: 'react_blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Handle connection errors
db.on('connection', connection => {
  connection.on('error', err => {
    console.error('Database connection error:', err);
  });
});

const oneMinute = 60000;
setInterval(() => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Keep-alive query error:', err);
    }
  });
}, oneMinute * 60);
