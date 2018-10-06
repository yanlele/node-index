/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-06 19:36
 */
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

/*
const queryField = ['name', 'id'];
const userId = 1;
query(`select ?? from user_info where id>?`, [['name', 'email'], userId]).then(function(data) {
    console.log(JSON.stringify(data));
});

query('select ?? from user_info where password=?', [queryField, '123456']).then(function(data) {
    console.log(JSON.stringify(data))
});

query(`select ?? from user_info where id = ?`, [['name'], userId]).then(function(data) {
    console.log(JSON.stringify(data));
});

const result =  query(`insert into user_info set ?`, {
    name: 'yanle',
    password: '123123123',
    email: '123123@qq.com'
});
async function getResult() {
    console.log(await result);
}*/


query('desc user_info').then(function(data) {
    let keys = [];
    data.map(function (item, index) {
        keys.push(item.Field)
    });
    console.log(data);
    console.log(keys);
});

