import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Button, Card, Form, Grid, Icon, Confirm } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import ITask from 'interfaces/Task';
import Layout from 'components/Layout';

const NewTask = () => {
    const [task, setTask] = useState<ITask>({
        title: '',
        description: '',
    });
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

    const router = useRouter();
    const isEdit = router.query.id;

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [name]: value,
        });
    };

    const createTask = async (task: ITask) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    };

    const updateTask = async (task: ITask) => {
        await fetch(`http://localhost:3000/api/tasks/${isEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    };

    const deleteTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${isEdit}`, {
                method: 'DELETE',
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateTask(task);
            } else {
                await createTask(task);
            }

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const loadTask = async (id: string) => {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
        const { task: taskDetails } = await response.json();

        setTask({
            title: taskDetails.title,
            description: taskDetails.description,
        });
    };

    useEffect(() => {
        if (typeof isEdit === 'string') {
            loadTask(isEdit);
        }
    }, [isEdit]);

    return (
        <Layout>
            <Grid
                centered
                columns={3}
                verticalAlign="middle"
                style={{
                    height: '70%',
                }}
            >
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Write a title"
                                        onChange={handleChange}
                                        value={task.title}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="description">
                                        Description:
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={2}
                                        placeholder="Write a description"
                                        onChange={handleChange}
                                        value={task.description}
                                    />
                                </Form.Field>
                                <Button color={isEdit ? 'teal' : 'blue'}>
                                    <Icon name="save" />
                                    {isEdit ? 'Update' : 'Save'}
                                </Button>
                            </Form>
                        </Card.Content>
                    </Card>
                    {isEdit && (
                        <Button
                            color="red"
                            onClick={() => {
                                setIsOpenConfirm(true);
                            }}
                        >
                            <Icon name="delete" />
                            Delete
                        </Button>
                    )}
                </Grid.Column>
            </Grid>
            <Confirm
                header="Delete a task"
                content={`Are you sure that you want to delete task ${isEdit}?`}
                open={isOpenConfirm}
                onConfirm={() => {
                    deleteTask();
                }}
                onCancel={() => {
                    setIsOpenConfirm(false);
                }}
            />
        </Layout>
    );
};

export default NewTask;
