import httpRequest from '../core/httpRequest';
import { IStudent } from 'src/models/students.model';
import { IHttpRequest } from 'src/models';
export const studentsService = {
    getAll({ url = '' }: IHttpRequest) {
        return httpRequest.get<IStudent[]>({
            url: `students${url}`,
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
