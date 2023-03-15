import httpRequest from '../core/httpRequest';
import { IStudent } from 'src/models/students.model';
import { IHttpRequest } from 'src/models';
export const studentsService = {
    getAll() {
        return httpRequest.get<IStudent[]>({
            url: '/students',
        });
    },
    create({ payload, headers }: IHttpRequest<IStudent>) {
        return httpRequest.post<IStudent, IStudent>({
            url: '/students',
            payload,
            headers,
        });
    },
};
