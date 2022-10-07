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

export default Credit;