// Ingat yah dalam fungsi callback umumnya ditulis dengan
// parameter yang bernama `callback`, `cb`, atau `next`
// di sini penulis menggunakan `callback`
const gabungKata = (kataYangInginDigabung, callback) => {
  // Di sini juga kita asumsikan dalam fungsi yang akan kita buat
  // asumsikan apabila kataYangInginDigabung adalah null makan fungsi 
  // ini error
  if(kataYangInginDigabung === null) {
    callback("Maaf, katanya Error !", null);
  }
  else {
    callback(null, kataYangInginDigabung);
  }
};

// driver code dimulai di sini
gabungKata("Hello", (err, data) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
});