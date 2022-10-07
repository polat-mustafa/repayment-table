import { Input } from 'antd'
import React, { forwardRef, useImperativeHandle, useReducer } from 'react'
//CONTEXT
import inputReducer from '../../../context/input/inputReducer'
import { useInput } from '../../../context/input/index';
import { useCredit } from '../../../context/credit/CreditContext';



const Inputs = forwardRef((props, ref) => {

    const { paymentTable, PersonalFinanceCredit, table } = useCredit()

    const [state, dispatch] = useReducer(inputReducer, {
        
    })

    const { setOpen, setTableList} = useInput();

    useImperativeHandle(ref, () => {
        return {
            handleChange: () => {
                const { krediTutari, faizOrani, taksitSayisi, kkdf, bsmv, durationType } = state;
                krediTutari && faizOrani && taksitSayisi && kkdf && bsmv ? setOpen(true) : alert('Lütfen tüm alanları doldurunuz.')
                paymentTable( new PersonalFinanceCredit(krediTutari, faizOrani, taksitSayisi, kkdf, bsmv, durationType) );
                setTableList(table);
                console.log(krediTutari, faizOrani, taksitSayisi, kkdf, bsmv, durationType );
            }

        }
    })


    
  return (
    <>

        <Input className='inputs' placeholder="Kredi Miktarı" onChange={(e) => dispatch({ type: 'krediTutari', payload: Number(e.target.value) })} />
        <Input className='inputs' placeholder="Faiz Oranı" onChange={(e) => dispatch({ type: 'faizOrani', payload: Number(e.target.value) })} />
        <Input className='inputs' placeholder="Taksit Sayısı" onChange={(e) => dispatch({ type: 'taksitSayisi', payload: Number(e.target.value) })} />
        <Input className='inputs' placeholder="KKDF" onChange={(e) => dispatch({ type: 'kkdf', payload: Number(e.target.value) })} />
        <Input className='inputs' placeholder="BSMV" onChange={(e) => dispatch({ type: 'bsmv', payload: Number(e.target.value) })} />
        <Input className='inputs' placeholder="Süre Tipi (monthly, yearly, weekly)" onChange={(e) => dispatch({ type: 'durationType', payload: String(e.target.value) })} />
    </>
  )
})


export default Inputs