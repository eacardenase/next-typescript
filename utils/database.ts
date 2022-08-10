import { Pool } from 'pg';

let connection: any;

const myVariable = process.env.MY_VARIABLE;

if (!connection) {
    connection = new Pool({
        user: 'postgres',
        password: '***************',
        host: 'localhost',
        port: 5432,
        database: 'tasksdb',
    });
}

export default connection;
