import { IHttpRequest } from 'src/models';
import { ITask } from 'src/models/tasks.model/tasks.model';
import { queryString } from 'src/utils';
import httpRequest from '../core/httpRequest';

export const taskServices = {
    create({ url, payload, headers }: IHttpRequest<ITask>) {
        return httpRequest.post<ITask, ITask>({
            url,
            payload,
            headers,
        });
    },
    getStudentsTask(id: string, { filter }: IHttpRequest) {
        const query = queryString({ filter });
        return httpRequest.get<ITask[]>({
            url: `students/${id}/tasks${query}`,
        });
    },
    getDetailTask(studentId: string, taskId: string) {
        return httpRequest.get<ITask>({
            url: `students/${studentId}/tasks/${taskId}`,
        });
    },
    updateStudentTask({ payload }) {
        return httpRequest.put<ITask, ITask>({
            url: `students/${payload.studentId}/tasks/${payload.id}`,
            payload,
        });
    },
    deleteStudentTask(studentId: string, taskId: string) {
        return httpRequest.deleteMethod<ITask>({
            url: `students/${studentId}/tasks/${taskId}`,
        });
    },
};
