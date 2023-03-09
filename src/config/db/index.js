const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    port: 3306,
    database: 'freedb_tts_saomai',
    user: 'freedb_tts_be_saomai',
    password: 'zxC#gX&$3D7Pb%@',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;
