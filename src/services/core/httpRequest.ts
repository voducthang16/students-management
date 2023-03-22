import { IHttpRequest, NewResponse } from 'src/models';
import instance from './instance';

const get = <Type>({ url, payload, headers }: IHttpRequest) => {
    return instance.get<Type, NewResponse<Type>>(url!, {
        params: payload,
        headers,
    });
};

const post = <TypeReq, TypeRes>({ url, payload, headers }: IHttpRequest<TypeReq>) => {
    return instance.post<TypeRes, NewResponse<TypeRes>, TypeReq>(url!, payload, {
        headers,
    });
};

const put = <TypeReq, TypeRes>({ url, payload, headers }: IHttpRequest<TypeReq>) => {
    return instance.put<TypeRes, NewResponse<TypeRes>, TypeReq>(url!, payload, {
        headers,
    });
};

const deleteMethod = <Type>({ url, payload, headers }: IHttpRequest) => {
    return instance.delete<Type, NewResponse<Type>>(url!, {
        params: payload,
        headers,
    });
};

const httpRequest = {
    get,
    post,
    put,
    deleteMethod,
};

export default httpRequest;
