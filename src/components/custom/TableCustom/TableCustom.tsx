import { Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PaginationConfig } from 'src/config/Pagination';
import { ITableData } from 'src/models';

interface ITableCustom<T> {
    IColumns: ColumnsType<T>;
    IData: T[];
    pagination?: TablePaginationConfig;
}

function TableCustom<T extends ITableData>({ IColumns, IData, pagination = PaginationConfig }: ITableCustom<T>) {
    return <Table columns={IColumns} dataSource={IData} rowKey={'id'} pagination={pagination} />;
}

export default TableCustom;
