const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust the connection limit as needed
  host: '209.182.202.254',
  port: 3306,
  user: 'skahme5_skuser',
  password: 'skdigitech123321@',
  database: 'skahme5_skdigitech',
  dateStrings: 'date',
});

const selectID = (id) => {
  return new Promise((resolve, reject) => {
    const sql1 = 'SELECT s_name FROM student WHERE s_id = ?';
    pool.query(sql1, [id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
      if (err) {
        req.flash(
          'error_msg',
          'You need to login as STUDENT in order to view that source! ==> '
        );
        res.redirect('/unauthorized');
      } else {
        const data = await selectID(result.id);
        if (data.length === 0) {
          req.flash(
            'error_msg',
            'You need to login as STUDENT in order to view that source! abc k'
          );
          res.redirect('/unauthorized');
        } else {
          req.user = result.id;
          next();
        }
      }
    });
  } else {
    req.flash(
      'error_msg',
      'You need to login as STUDENT in order to view that source! kkk'
    );
    res.redirect('/unauthorized');
  }
};

const forwardAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
      if (err) {
        next();
      } else {
        const data = await selectID(result.id);
        if (data.length === 0) {
          next();
        } else {
          req.user = result.id;
          res.redirect('/student/dashboard');
        }
      }
    });
  } else {
    next();
  }
};

module.exports = { requireAuth, forwardAuth };
