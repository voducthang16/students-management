export interface IStudent {
    id?: string;
    name: string;
    avatar: string;
    email: string;
    age: number;
    sex: string;
    math: string;
    physic: string;
    chemical: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IStudentList {
    list: IStudent[];
}
