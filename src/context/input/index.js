import { useState, createContext, useContext } from "react";

const inputContext = createContext();

export const InputProvider = ({ children }) => {
    const userInputs = [
        {
          no: 1,
          label: 'Kredi Tutarı',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'Kredi Tutarı',
        },
        {
          no: 2,
          label: 'Taksit sayısı',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'Taksit sayısı',
        },
        {
          no: 3,
          label: 'Kâr oranı',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'Kâr oranı',
        },
        {
          no: 4,
          label: 'Taksit aralığı seçimi',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'Taksit aralığı seçimi',
        },
        {
          no: 5,
          label: 'kkdf',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'kkdf',
        },
        {
          no: 6,
          label: 'bsmv',
          name: 'creditAmount',
          type: 'number',
          placeholder: 'bsmv',
        }
    ]

    // MODAL OPEN
    const [open, setOpen] = useState(false);
    const [tableList, setTableList] = useState([]);

    const [inputs, setInputs] = useState(userInputs);

    // reducer state 
    const [indexs, setIndexs] = useState({
      krediTutari: Number,
      faizOrani: Number,
      taksitSayisi: Number,
      kkdf: Number,
      bsmv: Number,
    });


    return (
        <inputContext.Provider value={{ inputs, setInputs, open, setOpen, tableList, setTableList, indexs, setIndexs }}>
            {children}
        </inputContext.Provider>
    )
}

export const useInput = () => useContext(inputContext);