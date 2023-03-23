import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { TablePagination } from 'config/TablePagination';
import { PaginationConfig } from 'const';
import { IPagination, ITableData } from 'models';
import { memo, useMemo } from 'react';

interface ITableCustom<T> extends TableProps<T> {
    IColumns: ColumnsType<T>;
    IData: T[];
    pagination?: TablePaginationConfig;
    onTableChange: (filter: IPagination) => void;
    // onChange: (filter: IPagination) => void;
    filter: IPagination;
    totalItem: number;
}

const genericMemo: <T>(component: T) => T = memo;

function TableCustom<T extends ITableData>({
    IColumns,
    IData,
    pagination,
    onTableChange: handlePageSizeChange,
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
                total: totalItem,
                onChange: (page, pageSize) => {
                    const newQueryString = { ...newParams, page, limit: pageSize };
                    handlePageSizeChange(newQueryString);
                    const offset = (page - 1) * pageSize;
                },
            }}
            scroll={{ x: 'max-content', y: '400px' }}
        />
    );
}
export const TableMemoComponent = genericMemo(TableCustom);
