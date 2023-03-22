import { useRef } from 'react';
import { IModal } from 'src/models';
import TaskFormScene from 'src/scenes/tasks/TaskFormScene';

function TaskPage() {
    const taskFormScene = useRef<IModal>(null);
    return (
        <div>
            <TaskFormScene ref={taskFormScene} />
            <button
                onClick={() => {
                    taskFormScene.current!.showModal();
                }}
            >
                ADD TASK
            </button>
        </div>
    );
}

export default TaskPage;
