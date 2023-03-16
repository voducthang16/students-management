import { TablePaginationConfig } from 'antd';

export const PaginationConfig: TablePaginationConfig = {
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total) => `Total ${total} items`,
};
