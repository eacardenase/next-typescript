import { NextApiRequest, NextApiResponse } from 'next';
import connection from 'utils/database';

import ITask from 'interfaces/Task';

const singleTask = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, body } = req;

    switch (method) {
        case 'GET':
            try {
                const pgQuery = 'SELECT * FROM tasks WHERE id = $1';
                const values = [query.id];

                const { rows } = await connection.query(pgQuery, values);

                if (rows.length === 0) {
                    return res.status(404).json({
                        message: 'The task does not exist',
                    });
                }

                return res.status(200).json({
                    task: rows[0],
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Something went wrong',
                    error: error,
                });
            }

        case 'PUT':
            try {
                const { title, description } = body;
                const pgQuery =
                    'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
                const values = [title, description, query.id];

                const { rows, rowCount } = await connection.query(
                    pgQuery,
                    values
                );

                if (rowCount === 0) {
                    return res.status(404).json({
                        message: 'The tasks to update does not exist',
                    });
                }

                return res.status(200).json({
                    message: 'Task Updated',
                    taskUpdated: rows[0],
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Something went wrong',
                    error: error,
                });
            }

        case 'DELETE':
            try {
                const pgQuery = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
                const values = [query.id];

                const { rowCount, rows } = await connection.query(
                    pgQuery,
                    values
                );

                if (rowCount === 0) {
                    return res.status(404).json({
                        message: 'The tasks to delete does not exist',
                    });
                }

                return res.status(200).json({
                    message: 'Task Deleted',
                    taskDeleted: rows[0],
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Something went wrong',
                    error: error,
                });
            }

        default:
            return res.status(400).json({
                message: 'Invalid Request',
            });
    }
};

export default singleTask;
