import { IHttpRequest } from 'src/models';
import { ITask } from 'src/models/tasks.model/tasks.model';
import httpRequest from '../core/httpRequest';

export const taskServices = {
    create({ payload, headers }: IHttpRequest<ITask>) {
        return httpRequest.post<ITask, ITask>({
            url: 'tasks',
            payload,
            headers,
        });
    },
};
