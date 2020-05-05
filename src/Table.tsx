import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { FormInstance } from 'antd/lib/form';


export interface TableListItem {
  title: string;
  type: string;
}
const tableListDataSource: TableListItem[] = [];

const columns: ProColumns<TableListItem>[] = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  }
];

const TableContainer = (resultSet) => {
  const ref = useRef<FormInstance>();
  const [collapsed, setCollapsed] = useState(false);
  for (let i = 0; i < resultSet.loadResponse.data.length; i += 1) {
    tableListDataSource.push({
      title: resultSet.loadResponse.data[i]['Channels.title'],
      type: resultSet.loadResponse.data[i]['Channels.type']
    });
  }
  console.info(tableListDataSource)
  console.info(resultSet.loadResponse.data)
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() =>
        Promise.resolve({
          data: tableListDataSource,
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          onClick={() => {
            if (ref.current) {
              ref.current.setFieldsValue({
                name: 'test-xxx',
              });
            }
          }}
        >
          赋值
        </Button>,
      ]}
      dateFormatter="string"
      headerTitle="表单赋值"
    />
  );
};

const Burak = (isim: any) => {
    console.info(isim)
}

export default TableContainer