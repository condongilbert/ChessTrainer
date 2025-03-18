const pool = require('../config/db');

const createGamesTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS games (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                moves TEXT NOT NULL
            );
        `);
        console.log('Games table created');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

createGamesTable();