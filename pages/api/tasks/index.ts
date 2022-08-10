import { NextApiRequest, NextApiResponse } from 'next';
// import connection from '../../../utils/database';

// baseUrl
import connection from 'utils/database';

const tasks = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            try {
                const query = 'SELECT * FROM tasks';
                const response = await connection.query(query);

                return res.status(200).json(response.rows);
            } catch (error) {
                return res.status(400).json({
                    message: 'Something went wrong',
                });
            }

        case 'POST':
            try {
                const { title, description } = body;

                const query: string =
                    'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
                const values: string[] = [title, description];

                const response = await connection.query(query, values);

                return res.status(200).json({
                    message: 'Task saved',
                    dataSaved: response.rows[0],
                });
            } catch (error) {
                console.log(error);
            }

        default:
            return res.status(400).json({
                message: 'Invalid Request',
            });
    }
};

export default tasks;
