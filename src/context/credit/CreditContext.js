import { createContext, useContext } from "react";

// Credit packages
import Credit from "./credit";
import PersonalFinanceCredit from "./PersonalFinanceCredit";
import MortgageCredit from "./MortgageCredit";

const CreditContext = createContext();

export const CreditProvider = ({ children }) => {


// ödeme tablosunu oluşturur
const table = [];


const paymentTable = (credit) => {

  let rePayment = credit.calculatePaymentDurationTypes();
  let calculateRemainingPayment = credit.calculateRemainingPayment();
  let calculateRemainingPrincipalPayment = credit.calculateRemainingPrincipalPayment();
  let remainingInterest = credit.calculateRemainingInterest();

  // kredi tipine göre vergi hesaplamaları
  let BSMV;
  credit.creditType === "mortgage" ? BSMV = 0 : BSMV = credit.calculateBSMV();
  let KKDF;
  credit.creditType === "mortgage" ? KKDF = 0 : KKDF = credit.calculateKKDF();
  credit.creditType === "mortgage" && credit.checkDurationLimit() ;

  /* 

  Taksit sayısı kadar döngü oluşturur, ilk değerlerini oluşturması ve her döngüde değiştirmek için döngünün dışında tanımladım, 
  böylece değerleri hesaplayıp i= 0 anında hesaplanır.
  i = 1 olduğunda table.push fonksiyonu altında tanımladığım ifadelerle güncelleme işlemi yapılıyor. 
  
  */

  for (let i = 0; i < credit.duration; i++) {

      table.push({
          key: i,
          installment: i + 1,                                                                                                     // taksit numarası
          rePayment: rePayment.toFixed(2),                                                                                                   // taksit tutarı
          calculateRemainingPayment: calculateRemainingPayment.toFixed(2),                                                                   // kalan ödeme tutarı
          calculateRemainingPrincipalPayment: calculateRemainingPrincipalPayment < 0 ? 0 : calculateRemainingPrincipalPayment.toFixed(2),    // kalan ana para tutarı
          remainingInterest: remainingInterest.toFixed(2),                                                                                   // kalan faiz tutarı
          KKDF: KKDF ? KKDF.toFixed(2) : 0,                                                                                                  // kaynak kullanım desteği fonu
          BSMV: BSMV ? BSMV.toFixed(2) : 0,                                                                                                  // banka ve sigorta muameleleri vergisi

      });

      // BSMV VE KKDF HESAPLAMALARI İÇİN KONUT KREDİSİNDE VERGİ OLAMAYACAĞI İÇİN TABLODAKİ DEĞERİNİ SIFIRLADIM.

      remainingInterest = calculateRemainingPrincipalPayment * credit.interest / 100;
      BSMV ? BSMV = remainingInterest * 0.1 : BSMV = 0;
      KKDF ? KKDF = remainingInterest * 0.15 : KKDF = 0;
      credit.amount = credit.calculateRemainingPrincipalPayment();
      calculateRemainingPayment = rePayment - remainingInterest - BSMV - KKDF;
      calculateRemainingPrincipalPayment -= calculateRemainingPayment;

  }

  return table;

};



  return (
    <CreditContext.Provider value={{ 
        Credit,
        paymentTable,
        PersonalFinanceCredit,
        MortgageCredit,
        table
    }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => useContext(CreditContext);
