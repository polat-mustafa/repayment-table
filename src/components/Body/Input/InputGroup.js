import React, { useRef } from 'react'
import { Button } from 'antd';
import Inputs from './Inputs';

const InputGroup = () => {

  
  const ref = useRef();

  return (
    <div>
      <Inputs ref={ref} />
      <Button onClick={ () => ref.current.handleChange() }>Hesapla</Button>
    </div>
  )
}

export default InputGroup