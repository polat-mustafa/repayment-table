import React from 'react'
import InputGroup from './Input/InputGroup';
import '../Bodystyle.css'
import ModalView from './ModalView';

const Body = () => {

  return (
    <div className='body'>
      <h3>GERİ ÖDEME PLANI OLUŞTURUCU</h3>
      <InputGroup />
      <ModalView />
    </div>

  )
}

export default Body;