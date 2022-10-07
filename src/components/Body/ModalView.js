import { Modal } from 'antd';
import React from 'react';
import TableView from './TableView';
import { useInput } from '../../context/input';


const ModalView = () => {
  const { open, setOpen, tableList } = useInput();

  return (
    <div className='modals'>
      <Modal
        title="GERİ ÖDEME PLANI TABLOSU"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        cancelButtonProps={{ style: { display: 'none' } }}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'black',
          borderRadius: '10px',
          padding: '10px',
          height: '100%',
          textAlign: 'center',
        }}
      
        bodyStyle={{ height: 400, overflow: 'auto', padding: 0.5 }}
      >
        <TableView data={tableList} />
      </Modal>
    </div>
  );
};

export default ModalView;