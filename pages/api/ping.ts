import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../utils/database';

type Data = {
    message: string;
    time?: string;
};

const ping = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { rows } = await connection.query('SELECT NOW()');

    console.log(rows);

    if (rows) {
        return res.json({ message: 'pong', time: rows[0].now });
    } else {
        return res.status(500).json({
            message: 'Error connecting to the database',
        });
    }
};

export default ping;
