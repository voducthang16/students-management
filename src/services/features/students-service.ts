import httpRequest from '../core/httpRequest';
import { IStudent } from 'src/models/students.model';
import { IHttpRequest } from 'src/models';
export const studentsService = {
    getAll({ filter }: IHttpRequest) {
        let queryString = '';
        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (queryString.length > 0) {
                    queryString += '&';
                }
                queryString += `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`;
            }
        }
        return httpRequest.get<IStudent[]>({
            url: `students?${queryString}`,
        });
    },
    create({ payload, headers }: IHttpRequest<IStudent>) {
        return httpRequest.post<IStudent, IStudent>({
            url: '/students',
            payload,
            headers,
        });
    },
    put({ payload }: IHttpRequest<IStudent>) {
        return httpRequest.put<IStudent, IStudent>({
            url: `/students/${payload?.id}`,
            payload,
        });
    },
};
