import mysql from 'mysql2'
const psswd = process.env.password

const pool = mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password: psswd,
    database: 'notes_app',
    port: 0
}).promise()

async function getNotes() {
    const result = await pool.query("SELECT * FROM notes;");

    const rows = result[0];
    return rows;
}

const notes= await getNotes();
console.log(notes);

