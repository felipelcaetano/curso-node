let mysql = require('mysql');
//DESIGN PATTERN FACTORY METHOD
function createDBConnection() {
    if (!process.env.NODE_ENV || process.env.node === 'dev') {
        return connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        return connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs_test'
        });
    }
};

//Wrapper
module.exports = () => {
    return createDBConnection;
};