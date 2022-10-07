import Credit from "./credit";

// Mortgagae kredi hesaplamalarında creditType  mutlaka "mortgage" olarak tanımlanmalıdır.
class MortgageCredit extends Credit {


    // START ---------------------- PUBLIC STATIC FIELDS ---------------------- START //
  
    durationLimit = 120; // 120 aydan fazla süre girilirse hata verir, 
    // END ---------------------- PUBLIC STATIC FIELDS ---------------------- END //
    
    // duration limiti aşılırsa hata verir
    checkDurationLimit() {
        if (this.duration > this.durationLimit) {
            throw new Error(`Mortgage Credit duration limit is ${this.durationLimit} months`);
        }
    }

  
  
    // START ----------------------  TAKSİT HESAPLAMALARI ---------------------- START //
  
    // Aylık taksit tutarını hesaplar
    calculateMonthlyPayment() {
      const monthlyPayment = this.amount * ((this.interest / 100) * (1 + this.interest / 100) ** this.duration) / ((1 + this.interest / 100) ** this.duration - 1);
      return monthlyPayment;
    }
  
    // Haftalık taksit tutarını hesaplar
    calculateWeeklyPayment() {
      const weeklyPayment = this.amount * ((this.interest / 100) * (1 + this.interest / 100) ** this.duration) / ((1 + this.interest / 100) ** this.duration - 1) / 4;
      return weeklyPayment;
    }
  
    // Günlük taksit tutarını hesaplar
  
    calculateDailyPayment() {
      const dailyPayment = this.amount * ((this.interest / 100) * (1 + this.interest / 100) ** this.duration) / ((1 + this.interest / 100) ** this.duration - 1) / 30;
      return dailyPayment;
    }
  
    // END ----------------------  TAKSİT HESAPLAMALARI ---------------------- END //
  
  
  
  
    // Toplam ödenecek tutarı hesaplar - Anapara + Faiz
  
    calculateTotalPayment() {
      return this.calculateMonthlyPayment() * this.duration;
    }
  
    // Toplam ödenecek faiz tutarını hesaplar - Anapara hariç
  
    calculateInterest() {
      return this.calculateTotalPayment() - this.amount;
    }
  
  
  
    // START ----------------------  TABLO HESAPLAMALARI ---------------------- START //
  
    // kar oranını hesaplar, başlangıçta gösterilecek kar oranı
  
    calculateRemainingInterest() {
      return this.amount * this.interest / 100;
    }
  
  
    // ---------------- TAKSİT VE ANA PARA HESAPLAMALARI ---------------- //
  
    // Kalan ana para: taksit tutarından ana paraya ödenen miktar
  
    calculateRemaningMonthlyPrincipalPayment() {
      return this.calculateMonthlyPayment() - this.calculateRemainingInterest();
    }
  
    // Kalan ana para tutarı: toplam ödemeden sonra kalan ana para miktarı
  
    calculateRemaningPrincipalPayment() {
      return this.amount - this.calculateRemaningMonthlyPrincipalPayment();
    }
  
    // END ----------------------  TABLO HESAPLAMALARI ---------------------- END //
  
  
}

export default MortgageCredit;