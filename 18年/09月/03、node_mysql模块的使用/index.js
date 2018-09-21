const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    database: '001_koa_demo',
    user: 'root',
    password: '53693750'
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};

const queryField = ['name', 'id'];
const userId = 1;
query(`select ?? from user_info where id>?`, [['name', 'email'], userId]).then(function(data) {
    console.log(JSON.stringify(data));
});

query('select ?? from user_info where password=?', [queryField, '123456']).then(function(data) {
    console.log(JSON.stringify(data))
});
