import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Grid, Button } from 'semantic-ui-react';

import ITask from 'interfaces/Task';
import TaskList from 'components/Tasks/TaskList';
import Layout from 'components/Layout';
interface IProps {
    tasks: ITask[];
}

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/tasks');
    const tasks = await response.json();

    return {
        props: {
            tasks,
        },
    };
};

const Index = ({ tasks }: IProps) => {
    const router = useRouter();

    return (
        <Layout>
            {tasks.length === 0 ? (
                <Grid
                    columns={3}
                    centered
                    verticalAlign="middle"
                    style={{
                        height: '70%',
                    }}
                >
                    <Grid.Row>
                        <Grid.Column>
                            <h1>There are no tasks, yet...</h1>
                            <Button
                                onClick={() => {
                                    router.push('/tasks/new');
                                }}
                            >
                                Create one!
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            ) : (
                <TaskList tasks={tasks} />
            )}
        </Layout>
    );
};

export default Index;
