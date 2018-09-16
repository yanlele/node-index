const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    database: 'test',
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

const queryField = 'salary,userid';
const userId = 2;
query(`select ${queryField} from salary where userid=${2}`).then(function(data) {
    console.log(JSON.stringify(data[0]));
});

query('select * from salary').then(function(data) {
    console.log(JSON.stringify(data[0]))
});