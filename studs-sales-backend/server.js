var db = require('./db.js');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(), express.json());

const port = 3005;
//---------//
const COMPANIES_QUERY =
  'SELECT ' +
  'company.company_id AS id, ' +
  'company.name AS company_name, ' +
  'company.status, ' +
  'user.name AS responsible_name ' +
  'FROM company AS company ' +
  'LEFT JOIN user AS user ' +
  'ON company.responsible_user = user.user_id;';

app.get('/api/companies', async (req, res) => {
  results = await db.query(COMPANIES_QUERY);
  res.send(results[0]);
});

//---------//

const INSERT_COMPANY_QUERY =
  'INSERT INTO company ' + '(name, status)' + 'VALUES (?, "EJ KONTAKTAT")';

app.post('/api/companies', async (req, res) => {
  const companyName = req.body.name;
  results = await db.query(INSERT_COMPANY_QUERY, companyName);
  res.sendStatus(200);
});

//---------//

const COMPANY_INFO_QUERY =
  'SELECT ' +
  'company.company_id AS id, ' +
  'company.name AS company_name, ' +
  'company.status, ' +
  'user.user_id AS responsible_user ' +
  'FROM company AS company ' +
  'LEFT JOIN user AS user ' +
  'ON company.responsible_user = user.user_id ' +
  'WHERE company.company_id = ? ';

app.get('/api/companies/:id/info', async (req, res) => {
  const id = req.params.id;
  const info_results = await db.query(COMPANY_INFO_QUERY, id);
  const info = info_results[0][0];

  const response = {
    info
  };

  res.send(response);
});

//---------//

const CONTACT_INFO_QUERY =
  'SELECT ' +
  'contact.name AS name, ' +
  'contact.phone_number AS phone_number, ' +
  'contact.email AS email, ' +
  'contact.comment AS comment ' +
  'FROM company AS company ' +
  'JOIN contact_info AS contact ' +
  'ON company.company_id = contact.company_key ' +
  'WHERE company.company_id = ? ';

app.get('/api/companies/:id/contacts', async (req, res) => {
  const id = req.params.id;
  const contact_result = await db.query(CONTACT_INFO_QUERY, id);
  const contacts = contact_result[0];

  const response = {
    contacts
  };

  res.send(response);
});

//---------//

const INSERT_CONTACT_QUERY =
  'INSERT INTO contact_info ' +
  '(company_key, name, phone_number, email, comment) ' +
  'VALUES (?, ?, ?, ?, ?)';

app.post('/api/companies/:id/contacts', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const comment = req.body.comment;

  const results = await db.query(INSERT_CONTACT_QUERY, [
    id,
    name,
    phone_number,
    email,
    comment
  ]);
  res.sendStatus(200);
});

//---------//

const COMMENTS_QUERY =
  'SELECT ' +
  'comment.comment_id AS id, ' +
  'comment.text AS text, ' +
  'comment.timestamp AS timestamp, ' +
  'user.name AS name ' +
  'FROM comment AS comment ' +
  'JOIN company AS company ' +
  'ON comment.company_key = company.company_id ' +
  'JOIN user AS user ' +
  'ON comment.user_key = user.user_id ' +
  'WHERE company.company_id = ? ';

app.get('/api/companies/:id/comments', async (req, res) => {
  const id = req.params.id;
  const comments_result = await db.query(COMMENTS_QUERY, id);
  const comments = comments_result[0];

  const response = {
    comments
  };

  res.send(response);
});

//---------//

const UPDATE_COMPANY_QUERY =
  'UPDATE company ' +
  'SET ' +
  'status = ?, ' +
  'responsible_user = ? ' +
  'WHERE company.company_id = ?';

app.put('/api/companies/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const responsible_user = req.body.responsible_user;

  const results = await db.query(UPDATE_COMPANY_QUERY, [
    status,
    responsible_user,
    id
  ]);
  res.sendStatus(200);
});

//---------//

const INSERT_COMMENT_QUERY =
  'INSERT INTO comment ' +
  '(company_key, user_key, text, timestamp) ' +
  'VALUES (?, ?, ?, ?)';

app.post('/api/companies/:id/comments', async (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  const text = req.body.text;
  const timestamp = Date.now();

  const results = await db.query(INSERT_COMMENT_QUERY, [
    id,
    user,
    text,
    timestamp
  ]);
  res.sendStatus(200);
});

//---------//

const UPDATE_COMMENT_QUERY =
  'UPDATE comment ' + 'SET text = ? ' + 'WHERE comment.comment_id = ?';

app.put('/api/comments/:id', async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;

  const results = await db.query(UPDATE_COMMENT_QUERY, [text, id]);
  res.sendStatus(200);
});

//---------//

const DELETE_COMMENT_QUERY = 'DELETE FROM comment WHERE comment.comment_id = ?';

app.delete('/api/comments/:id', async (req, res) => {
  const id = req.params.id;

  const results = await db.query(DELETE_COMMENT_QUERY, id);
  res.sendStatus(200);
});

//---------//

const USERS_QUERY =
  'SELECT ' + 'user.user_id AS id, ' + 'user.name AS name ' + 'FROM user;';

app.get('/api/users', async (req, res) => {
  const users_results = await db.query(USERS_QUERY);

  const users = users_results[0];

  const response = {
    users
  };

  res.send(response);
});

//---------//

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
