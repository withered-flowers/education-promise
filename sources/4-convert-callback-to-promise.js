const gabungKata = (kataYangInginDigabung) => {

  // Hasil akhir dari fungsi ini adalah dengan 
  // mengembalikan Promise
  return new Promise((resolve, reject) => {
    // Kondisi gagal
    if(kataYangInginDigabung === null) {
      reject("Maaf, katanya Error !");
    }
    // Kondisi terpenuhi
    else {
      resolve(kataYangInginDigabung);
    }
  });
};

// Driver code
gabungKata("Hello")
  .then((dataHasilResolve) => {
    console.log(dataHasilResolve);
  })
  .catch((rejectMessage) => {
    console.log(rejectMessage);
  });