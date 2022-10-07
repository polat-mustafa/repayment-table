import Credit from "./credit";

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
          return this.amount * (((this.#interestWithTax / 12) * (1 + this.#interestWithTax / 12) ** (this.duration)) / ((1 + this.#interestWithTax / 12) ** (this.duration) - 1));
        case "weekly":
          return this.amount * (((this.#interestWithTax / 4) * (1 + this.#interestWithTax / 4) ** (this.duration)) / ((1 + this.#interestWithTax / 4) ** (this.duration) - 1));
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

export default PersonalFinanceCredit;