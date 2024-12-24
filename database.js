import mysql from 'mysql2'
const psswd = process.env.password
const hosting = process.env.LHost
const user = process.env.UsedUSer
const MYSQL_nameDATABASE = process.env.DATABASENAME 

const pool = mysql.createPool({
    host: hosting,
    user: user,
    password: psswd,
    database: MYSQL_nameDATABASE,
    port: 0
}).promise() 

async function getNotes() {
    const result = await pool.query("SELECT * FROM notes;");

    const rows = result[0];
    return rows;
}

async function getNote(id) {
    const [result] = await pool.query(
        `SELECT *
        FROM notes
        WHERE id = ?`, id
    );

    const rows = result;
    return rows;
}

async function createNote(title,content) {
    const result = await pool.query(
        `INSERT INTO
        notes(title,content) 
        VALUES (?,?)`, [title,content]
    );

    return {
        id: result.insertId,
        title,
        content
    }
}

const notes= await getNotes();
const note = await getNote(4);
const creation = await createNote("Fourth Note","This is text 4");
console.log(notes);
console.log(note)
console.log(creation)