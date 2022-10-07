import { Table } from 'antd';
import React from 'react';


const columns = [
  {
    title: 'Taksit No',
    dataIndex: 'installment',
    key: 'Taksit No',
  },
  {
    title: 'Taksit Tutarı',
    dataIndex: 'rePayment',
    key: 'Taksit Tutarı',
  },
  {
    title: 'Ana Para',
    dataIndex: 'calculateRemainingPayment',
    key: 'Ana Para',
  },
  {
    title: 'Kalan Ana Para',
    dataIndex: 'calculateRemainingPrincipalPayment',
    key: 'Kalan Ana Para',
  },
  {
    title: 'Kâr Tutarı',
    dataIndex: 'remainingInterest',
    key: 'Kâr Tutarı',
  },
  {
    title: 'KKDF',
    dataIndex: 'KKDF',
    key: 'KKDF',
  },
  {
    title: 'BSMV',
    dataIndex: 'BSMV',
    key: 'BSMV',
  },
];


const TableView = ({ data }) => <Table columns={columns} dataSource={data} size={
  'small'
} style={{
  width: '100%',
  height: '100%',
  overflow: 'auto',

}}

/>;

export default TableView;