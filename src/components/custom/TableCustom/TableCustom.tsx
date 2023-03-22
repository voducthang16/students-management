import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { memo, useMemo } from 'react';
import { TablePagination } from 'src/config/TablePagination';
import { PaginationConfig } from 'src/const';
import { IPagination, ITableData } from 'src/models';

interface ITableCustom<T> {
    IColumns: ColumnsType<T>;
    IData: T[];
    pagination?: TablePaginationConfig;
    onChange: (filter: IPagination) => void;
    filter: IPagination;
    totalItem: number;
}

const genericMemo: <T>(component: T) => T = memo;

function TableCustom<T extends ITableData>({
    IColumns,
    IData,
    pagination,
    onChange: handlePageSizeChange,
    filter,
    totalItem,
}: ITableCustom<T>) {
    const { page, limit } = filter;
    const newParams = useMemo(() => new PaginationConfig(+page, +limit), [filter]);
    return (
        <Table
            columns={IColumns}
            dataSource={IData}
            rowKey={'id'}
            pagination={{
                ...TablePagination,
                ...pagination,
                pageSize: +limit,
                total: totalItem,
                onChange: (page, pageSize) => {
                    const newQueryString = { ...newParams, page, limit: pageSize };
                    handlePageSizeChange(newQueryString);
                    const offset = (page - 1) * pageSize;
                },
            }}
            scroll={{ x: 'max-content' }}
        />
    );
}
export const TableMemoComponent = genericMemo(TableCustom);
