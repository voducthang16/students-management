import { TablePaginationConfig } from 'antd';
import { paginationConfig } from 'src/constants';

export const TablePagination: TablePaginationConfig = {
    pageSize: paginationConfig.limit,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total) => `Total ${total} items`,
};
