export interface ITask {
    studentId: string;
    studentName: string;
    task: string;
    description: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}
