import { AxiosResponse } from 'axios';
import { IStudent } from './students.model';
import { ITask } from './tasks.model';

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
}

export interface IDataProducts {
    limit: number;
    products: IProduct[];
    skip: number;
    total: number;
}

export interface IHttpRequest<T = any> {
    url?: string;
    payload?: T;
    headers?: {
        [key: string]: string | number;
    };
    filter?:
        | {
              [key: string]: string | number;
          }
        | string;
}

export interface NewResponse<T> extends AxiosResponse<T> {
    total: number;
}

export interface IDataCreate {
    title: string;
}

export interface IDataResponse extends IDataCreate {
    id: number;
}

export interface IModal {
    showModal: () => void;
    hideModal?: () => void;
    getStudentInfo?: (record: IStudent) => void;
    getTaskInfo?: (record: ITask) => void;
}

export interface ITableData {
    id: string;
}

export interface IPagination {
    [key: string]: string | number;
}
