import { IHttpRequest } from 'src/models';
import { ITask } from 'src/models/tasks.model/tasks.model';
import httpRequest from '../core/httpRequest';

export const taskServices = {
    create({ url, payload, headers }: IHttpRequest<ITask>) {
        return httpRequest.post<ITask, ITask>({
            url,
            payload,
            headers,
        });
    },
    getStudentsTask(id: string) {
        return httpRequest.get<ITask[]>({
            url: `students/${id}/tasks`,
        });
    },
};