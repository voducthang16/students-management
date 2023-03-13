import httpRequest from '../core/httpRequest';
import { IStudent } from 'src/models/students.model';
export const studentsService = {
    getAll() {
        return httpRequest.get<IStudent[]>({
            url: '/students',
        });
    },
    // create({ payload, headers }: IHttpRequest<IDataCreate>) {
    //     return httpRequest.post<IDataCreate, IDataResponse>({
    //         url: '/products/add',
    //         payload,
    //         headers,
    //     });
    // },
};
