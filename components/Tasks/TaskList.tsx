import { useRouter } from 'next/router';

import { Card } from 'semantic-ui-react';

import ITask from 'interfaces/Task';

interface IProps {
    tasks: ITask[];
}

const TaskList = ({ tasks }: IProps) => {
    const router = useRouter();

    return (
        <Card.Group itemsPerRow={4}>
            {tasks.map((task) => {
                return (
                    <Card
                        key={task.id}
                        onClick={() => {
                            router.push(`/tasks/edit/${task.id}`);
                        }}
                    >
                        <Card.Content>
                            <Card.Header>{task.title}</Card.Header>
                            {task.created_on && (
                                <Card.Meta>
                                    {new Date(task.created_on).toLocaleString()}
                                </Card.Meta>
                            )}
                            <Card.Description>
                                {task.description}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
            })}
        </Card.Group>
    );
};

export default TaskList;
