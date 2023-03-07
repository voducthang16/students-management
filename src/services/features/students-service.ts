import httpRequest from '../core/httpRequest';
import { AxiosRequestConfig } from 'axios';
import { IDataProducts, IDataCreate, IDataResponse, IHttpRequest } from 'src/models';
export const studentsService = {
    getAll({ payload, headers }: IHttpRequest) {
        return httpRequest.get<IDataProducts>({
            url: '/products',
            payload,
            headers,
        });
    },
    create({ payload, headers }: IHttpRequest<IDataCreate>) {
        return httpRequest.post<IDataCreate, IDataResponse>({
            url: '/products/add',
            payload,
            headers,
        });
    },
};
