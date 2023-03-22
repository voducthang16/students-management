import { ITableData } from '..';

export interface ITask extends ITableData {
    studentId: string;
    studentName: string;
    task: string;
    description: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}
