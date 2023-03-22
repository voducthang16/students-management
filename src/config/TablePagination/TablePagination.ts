import { TablePaginationConfig } from 'antd';

export const TablePagination: TablePaginationConfig = {
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total) => `Total ${total} items`,
};
