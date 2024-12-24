import mysql from 'mysql2'
const psswd = process.env.password
const hosting = process.env.LHost
const user = process.env.UsedUSer
const MYSQL_nameDATABASE = process.env.DATABASENAME 

export const pool = mysql.createPool({
    host: hosting,
    user: user,
    password: psswd,
    database: MYSQL_nameDATABASE,
    port: 0
}).promise() 
  
export async function getNotes() {
    const result = await pool.query("SELECT * FROM notes;");

    const rows = result[0];
    return rows;
}

export async function getNote(id) {
    const [result] = await pool.query(
        `SELECT *
        FROM notes
        WHERE id = ?`, id
    );

    const rows = result;
    return rows;
}

export async function createNote(title,content) {
    const [result] = await pool.query(
        `INSERT INTO
        notes(title,content) 
        VALUES (?,?)`, [title,content] 
    );
    const id = result.insertId
    return getNote(id) 
}

const notes= await getNotes();
const note = await getNote(8);
const creation = await createNote("Fourth Note","This is text 4");


