const connection = require('../config/db');

const getAllUsers = (callback) => {
    connection.query(
        'SELECT users.idUser users.email, users.password, users.phone,province.province_name, district.name, address.diachi FROM users JOIN address ON users.idUser = address.idUser JOIN district ON address.idDistrict = district.idDistrict JOIN province ON district.idProvince = province.idProvince',
        function (error, results) {
            if (error) {
                console.log('err', error);
            }
            callback(results);
        },
    );
};

const getUserById = (id, callback) => {
    connection.query(
        'SELECT users.idUser, users.email, users.password, users.phone,province.province_name, district.name, address.diachi FROM users JOIN address ON users.idUser = address.idUser JOIN district ON address.idDistrict = district.idDistrict JOIN province ON district.idProvince = province.idProvince WHERE users.idUser = ?',
        id,
        function (error, results, fields) {
            if (error) throw error;
            callback(results);
        },
    );
};

const searchUserByName = (name, callback) => {
    q = `%${name}%`;
    connection.query(`SELECT * FROM users WHERE fullname LIKE ?`, q, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

const getProvince = (callback) => {
    connection.query('SELECT * FROM province', function (error, results) {
        if (error) {
            console.log('err', error);
        }
        callback(results);
    });
};

const getDistrict = (id, callback) => {
    connection.query('SELECT * FROM district WHERE idProvince = ?', id, function (error, results) {
        if (error) {
            console.log('err', error);
        }
        callback(results);
    });
};

const checkUser = (email, callback) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
        if (error) throw error;
        callback(results[0]);
    });
};

const createUser = (user, callback) => {
    connection.query(
        `INSERT INTO users SET fullname = "${user.fullname}", email = "${user.email}", password = "${user.password}", phone = "${user.phone}"`,
        function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                connection.query(
                    `INSERT INTO address SET idUser = "${results.insertId}", idDistrict = "${user.idDistrict}", diachi = "${user.diachi}"`,
                );
            }
            callback(results);
        },
    );
};

const updateUser = (id, user, callback) => {
    connection.query(
        `UPDATE users SET fullname = "${user.fullname}", email = "${user.email}", password = "${user.password}", phone = "${user.phone}" WHERE idUser = ?`,
        id,
        function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                connection.query(
                    `UPDATE address SET idUser = "${id}", idDistrict = "${user.idDistrict}", diachi = "${user.diachi}" WHERE idUser = "${id}"`,
                );
            }
            // callback(results.affectedRows);
            callback(results);
        },
    );
};

const deleteUser = (id, callback) => {
    connection.query(`DELETE FROM address WHERE idUser = ?`, id, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            connection.query('DELETE FROM users WHERE idUser = ?', id, function (error, results, fields) {
                if (error) throw error;
            });
        }
        callback(results.affectedRows);
    });
};

const loginUser = (user, callback) => {
    connection.query(`SELECT * FROM users WHERE email = '${user.email}'`, function (error, results, fields) {
        if (error) throw error;
        callback(results[0]);
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    getProvince,
    getDistrict,
    createUser,
    updateUser,
    deleteUser,
    searchUserByName,
    checkUser,
    loginUser,
};
