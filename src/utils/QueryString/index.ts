import { IHttpRequest } from 'src/models';

export const queryString = ({ filter }: IHttpRequest) => {
    if (typeof filter === 'string') {
        return filter;
    } else {
        let queryString = '';
        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (queryString.length > 0) {
                    queryString += '&';
                }
                queryString += `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`;
            }
        }
        return `?${queryString}`;
    }
};
