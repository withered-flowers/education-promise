const janjiPertamaKu = new Promise((resolve, reject) => {
  // Di sini karena tidak ada kondisi gagal, maka reject tidak digunakan
  setTimeout( () => {
    resolve("Hore Janjiku Berhasil !");
  }, 250);
});

// Cara pakai Promisenya
janjiPertamaKu
  .then((dataHasilResolve) => {
    console.log(dataHasilResolve);
  });