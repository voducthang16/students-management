import { memo } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { TablePagination } from 'src/config/TablePagination';
import { ITableData, IPagination } from 'src/models';

interface ITableCustom<T> {
    IColumns: ColumnsType<T>;
    IData: T[];
    pagination?: TablePaginationConfig;
    onChange: (filter: IPagination) => void;
    filter: IPagination;
}

// function TableCustom<T extends ITableData>({ IColumns, IData, pagination = PaginationConfig }: ITableCustom<T>) {
//     console.log(true);
//     return <Table columns={IColumns} dataSource={IData} rowKey={'id'} pagination={pagination} />;
// }
//
function TableCustom<T extends ITableData>({
    IColumns,
    IData,
    pagination,
    onChange: handleChangePage,
    filter,
}: ITableCustom<T>) {
    return (
        <Table
            columns={IColumns}
            dataSource={IData}
            rowKey={'id'}
            pagination={{
                ...TablePagination,
                ...pagination,
                onChange: (page, pageSize) => {
                    const newQueryString = { ...filter, page: page, limit: pageSize };
                    const offset = (page - 1) * pageSize;
                    // const params = `?offset=${offset}&limit=${pageSize}`;
                    // console.log(offset);
                    // console.log(params);

                    handleChangePage(newQueryString);
                },
            }}
        />
    );
}
export default TableCustom;
