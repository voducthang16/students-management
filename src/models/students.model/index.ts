export interface IStudent {
    id?: string;
    name: string;
    avatar: string;
    email: string;
    age: number;
    hobbies: string[];
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
