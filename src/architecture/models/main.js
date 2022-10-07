/*


Bu yapıda süre tipine göre hesaplamaları yaptım.
calculatePaymentByDurationType methodu ile süre tipine göre tek fonksiyonda hesapmaları yaptım.
Önceki yapıda ise hepsi için ayrı hesaplamalar varken burada tek bir fonksiyona durationType parametresi verdim, bu parametreye göre hesaplamaları yaptım.


*/



class Credit {

    constructor(amount, interest, duration, KKDF, BSMV, durationType, creditType) {
      this.amount = amount; // tutar
      this.interest = interest; // faiz
      this.duration = duration; // süre
      this.KKDF = KKDF; // KKDF
      this.BSMV = BSMV; // BSMV
      this.durationType = durationType; // süre tipi
      this.creditType = creditType || "personal"; // kredi türü
    }

}


class PersonalFinanceCredit extends Credit {

    // START ---------------------- PRİVATE STATIC FIELDS ---------------------- START //

    #BSMV = this.BSMV; // Banka ve Sigorta Muameleleri Vergisi (Bank and Insurance Transactions Tax) %10
    #KKDF = this.KKDF; // Kaynak Kullanım Desteği Fonu (Resource Utilization Support Fund) %15


    // durationType: "monthly", "weekly", "daily"
/*     calculatePaymentByDurationType(durationType) {
        let payment = 0;

        switch (durationType) {
          case "monthly":
            payment = this.interest / 100;
            break;
          case "yearly":
            payment = this.interest / 100 / 12;
            break;
          case "weekly":
            payment = this.interest / 100 / 52;
            break;
          default:
            payment = this.interest / 100;
            break;
      }
      return payment;
    } */
    


    // Toplam ödenecek faizi hesaplar, kar oranı + BSMV + KKDF

    /* #interestWithTax = this.calculatePaymentByDurationType(this.durationType) * (1 + this.#BSMV + this.#KKDF); */
    #interestWithTax = this.interest / 100 * (1 + this.#BSMV + this.#KKDF);

    // END ---------------------- PRİVATE STATIC FIELDS ---------------------- END //


    calculatePaymentDurationTypes() {
      switch (this.durationType) {
        case "monthly":
          return this.amount * ((this.#interestWithTax * (1 + this.#interestWithTax) ** this.duration) / ((1 + this.#interestWithTax) ** this.duration - 1));
        case "yearly":
          return this.amount * (((this.#interestWithTax / 12) * (1 + this.#interestWithTax / 12) ** (this.duration * 12)) / ((1 + this.#interestWithTax / 12) ** (this.duration * 12) - 1));
        case "weekly":
          return this.amount * (((this.#interestWithTax / 52) * (1 + this.#interestWithTax / 52) ** (this.duration * 52)) / ((1 + this.#interestWithTax / 52) ** (this.duration * 52) - 1));
        default:
          return this.amount * ((this.#interestWithTax * (1 + this.#interestWithTax) ** this.duration) / ((1 + this.#interestWithTax) ** this.duration - 1));
      }
    }

            


    // START ----------------------  TAKSİT HESAPLAMALARI ---------------------- START //

    calculateRePayment() {
        return this.amount * ((this.#interestWithTax * (1 + this.#interestWithTax) ** this.duration) / ((1 + this.#interestWithTax) ** this.duration - 1));
    }


    // END ----------------------  TAKSİT HESAPLAMALARI ---------------------- END //



    
    calculateTotalPayment() {
        return this.calculatePaymentDurationTypes() - this.duration;
    }

    calculateInterest() {
        return this.calculateTotalPayment() - this.amount;
    }



    // START ----------------------  TABLO HESAPLAMALARI ---------------------- START //



    // kar oranını hesaplar, başlangıçta gösterilecek kar oranı
    calculateRemainingInterest() {
        return this.amount * this.interest / 100;
    }

    // KAR ORANI ÜZERİNDEN BSMV VE KKDF HESAPLAMALARI

    calculateBSMV() {
        return this.calculateRemainingInterest() * this.#BSMV;
    }

    calculateKKDF() {
        return this.calculateRemainingInterest() * this.#KKDF;
    }


    // ---------------- TAKSİT VE ANA PARA HESAPLAMALARI ---------------- //

    calculateRemainingPayment() {
        return this.calculatePaymentDurationTypes() - this.calculateRemainingInterest() - this.calculateBSMV() - this.calculateKKDF();
    }
    
    calculateRemainingPrincipalPayment() {
        return this.amount - this.calculateRemainingPayment();
    }


    // END ----------------------  TABLO HESAPLAMALARI ---------------------- END //


}

class MortgageCredit extends Credit {


  // START ---------------------- PUBLIC STATIC FIELDS ---------------------- START //

  durationLimit = 120 // 120 aydan fazla süre girilirse hata verir, 

  // END ---------------------- PUBLIC STATIC FIELDS ---------------------- END //

  checkDurationLimit() {
    if (this.duration > this.durationLimit) {
        throw new Error(`Mortgage Credit duration limit is ${this.durationLimit} months`);
    }
  }



    // durationType: "monthly", "weekly", "daily"
    calculatePaymentByDurationType(durationType) {
      let payment = 0;
      switch (durationType) {
          case "monthly":
            payment = this.interest / 100;
            break;
          case "yearly":
            payment = this.interest / 100 / 12;
            break;
          case "weekly":
            payment = this.interest / 100 / 52;
            break;
          default:
            payment = this.interest / 100;
            break;
      }
      return payment;
  }


  // END ---------------------- PRİVATE STATIC FIELDS ---------------------- END //




  // START ----------------------  TAKSİT HESAPLAMALARI ---------------------- START //

  calculateRePayment() {
      return this.amount * ((this.calculatePaymentByDurationType(this.durationType) * (1 + this.calculatePaymentByDurationType(this.durationType)) ** this.duration) / ((1 + this.calculatePaymentByDurationType(this.durationType)) ** this.duration - 1));
  }


  // END ----------------------  TAKSİT HESAPLAMALARI ---------------------- END //



  
  calculateTotalPayment() {
      return this.calculateRePayment() - this.duration;
  }

  calculateInterest() {
      return this.calculateTotalPayment() - this.amount;
  }



  // START ----------------------  TABLO HESAPLAMALARI ---------------------- START //



  // kar oranını hesaplar, başlangıçta gösterilecek kar oranı
  calculateRemainingInterest() {
      return this.amount * this.interest / 100;
  }

  // KAR ORANI ÜZERİNDEN BSMV VE KKDF HESAPLAMALARI



  // ---------------- TAKSİT VE ANA PARA HESAPLAMALARI ---------------- //

  calculateRemainingPayment() {
      return this.calculateRePayment() - this.calculateRemainingInterest() - this.calculateBSMV() - this.calculateKKDF();
  }
  
  calculateRemainingPrincipalPayment() {
      return this.amount - this.calculateRemainingPayment();
  }


  // END ----------------------  TABLO HESAPLAMALARI ---------------------- END //


}


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
            
            installment: i + 1,                                                                                                     // taksit numarası
            rePayment: rePayment,                                                                                                   // taksit tutarı
            calculateRemainingPayment: calculateRemainingPayment,                                                                   // kalan ödeme tutarı
            calculateRemainingPrincipalPayment: calculateRemainingPrincipalPayment < 0 ? 0 : calculateRemainingPrincipalPayment,    // kalan ana para tutarı
            remainingInterest: remainingInterest,                                                                                   // kalan faiz tutarı
            KKDF: KKDF ? KKDF : 0,                                                                                                  // kaynak kullanım desteği fonu
            BSMV: BSMV ? BSMV : 0,                                                                                                  // banka ve sigorta muameleleri vergisi

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


/* console.log(paymentTable(new MortgageCredit(100000, 1.5, 12, "mortgage"))); */



// ----------------------------- TABLE DİZİSİ DEĞERLERİ ----------------------------- //

paymentTable(new PersonalFinanceCredit(100000, 2.28, 12, 0.1, 0.15, "yearly", "personalFinance"));

console.log(table);
console.log( table[table.length - 1].rePayment );
/* 

[
    {
      installment: 1,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 7106.464862764484,
      calculateRemaningPrincipalPayment: 92893.53513723552,
      remainingInterest: 2279.9999999999995,
      KKDF: 341.99999999999994,
      BSMV: 227.99999999999997
    },
    {
      installment: 2,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 7308.999111353272,
      calculateRemaningPrincipalPayment: 85584.53602588225,
      remainingInterest: 2117.9726011289695,
      KKDF: 317.69589016934543,
      BSMV: 211.79726011289696
    },
    {
      installment: 3,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 7517.30558602684,
      calculateRemaningPrincipalPayment: 78067.23043985541,
      remainingInterest: 1951.327421390115,
      KKDF: 292.69911320851725,
      BSMV: 195.1327421390115
    },
    {
      installment: 4,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 7731.548795228605,
      calculateRemaningPrincipalPayment: 70335.6816446268,
      remainingInterest: 1779.9328540287033,
      KKDF: 266.9899281043055,
      BSMV: 177.99328540287036
    },
    {
      installment: 5,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 7951.897935892619,
      calculateRemaningPrincipalPayment: 62383.78370873419,
      remainingInterest: 1603.653541497491,
      KKDF: 240.54803122462363,
      BSMV: 160.36535414974912
    },
    {
      installment: 6,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 8178.527027065558,
      calculateRemaningPrincipalPayment: 54205.25668166863,
      remainingInterest: 1422.3502685591395,
      KKDF: 213.35254028387092,
      BSMV: 142.23502685591396
    },
    {
      installment: 7,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 8411.615047336929,
      calculateRemaningPrincipalPayment: 45793.6416343317,
      remainingInterest: 1235.8798523420446,
      KKDF: 185.3819778513067,
      BSMV: 123.58798523420447
    },
    {
      installment: 8,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 8651.34607618603,
      calculateRemaningPrincipalPayment: 37142.29555814568,
      remainingInterest: 1044.0950292627626,
      KKDF: 156.61425438941438,
      BSMV: 104.40950292627628
    },
    {
      installment: 9,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 8897.909439357332,
      calculateRemaningPrincipalPayment: 28244.386118788345,
      remainingInterest: 846.8443387257213,
      KKDF: 127.0266508088582,
      BSMV: 84.68443387257213
    },
    {
      installment: 10,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 9151.499858379017,
      calculateRemaningPrincipalPayment: 19092.88626040933,
      remainingInterest: 643.9720035083742,
      KKDF: 96.59580052625613,
      BSMV: 64.39720035083742
    },
    {
      installment: 11,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 9412.31760434282,
      calculateRemaningPrincipalPayment: 9680.56865606651,
      remainingInterest: 435.3178067373327,
      KKDF: 65.2976710105999,
      BSMV: 43.53178067373327
    },
    {
      installment: 12,
      monthlyPayment: 9956.464862764484,
      remainingMonthlyPrincipalPayment: 9680.568656066587,
      calculateRemaningPrincipalPayment: 0,
      remainingInterest: 220.7169653583164,
      KKDF: 33.10754480374746,
      BSMV: 22.07169653583164
    }
] 

*/


