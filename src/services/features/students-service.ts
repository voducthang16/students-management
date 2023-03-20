import httpRequest from '../core/httpRequest';
import { IStudent } from 'src/models/students.model';
import { IHttpRequest } from 'src/models';
import { queryString } from 'src/utils';
export const studentsService = {
    getAll({ filter }: IHttpRequest) {
        const query = queryString({ filter });
        return httpRequest.get<IStudent[]>({
            url: `students${query}`,
        });
    },
    getOne(id: string | number) {
        return httpRequest.get<IStudent>({
            url: `students/${id}`,
        });
    },
    create({ payload, headers }: IHttpRequest<IStudent>) {
        return httpRequest.post<IStudent, IStudent>({
            url: 'students',
            payload,
            headers,
        });
    },
    put({ payload }: IHttpRequest<IStudent>) {
        return httpRequest.put<IStudent, IStudent>({
            url: `students/${payload?.id}`,
            payload,
        });
    },
};
