const pool = require('../config/db');

const getGames = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getGames };