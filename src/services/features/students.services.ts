import { IHttpRequest } from 'models';
import { IStudent } from 'models/students.model';
import { queryString } from 'utils';
import httpRequest from '../core/httpRequest';
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
    delete(id: string) {
        return httpRequest.deleteMethod<IStudent>({
            url: `students/${id}`,
        });
    },
};
