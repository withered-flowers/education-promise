const gabungKata = (kataYangInginDigabung) => {
  return new Promise((resolve, reject) => {
    if (kataYangInginDigabung === null) {
      reject("Maaf, katanya Error !");
    }
    else {
      resolve(kataYangInginDigabung);
    }
  });
};

const arrayKata = ['Hello', 'World', 'Coba', 'Gabung', 'Kata'];

// Jangan lakukan ini !
// Ini namanya Promise Hell
gabungKata(arrayKata[0])
  .then((dataHasilResolve) => {

    gabungKata((dataHasilResolve) + " " + arrayKata[1])
      .then((dataHasilResolve) => {
        gabungKata(dataHasilResolve + " " + arrayKata[2])
          .then((dataHasilResolve) => {
            console.log(dataHasilResolve)
          })
          .catch((rejectMessage) => {
            console.log(rejectMessage);
          })
      })
      .catch((rejectMessage) => {
        console.log(rejectMessage);
      });

  })
  .catch((rejectMessage) => {
    console.log(rejectMessage);
  });

// Lakukanlah seperti ini
// Tidak jorok ke dalam lagi.
gabungKata(arrayKata[0])
  .then((dataHasilResolve) => {

    // Kita bungkus lagi dalam suatu promise, untuk mengembalikan
    // data selanjutnya
    return new Promise((resolve, reject) => {
      gabungKata(dataHasilResolve + " " + arrayKata[1])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    });

  })
  .then((dataHasilResolve) => {

    // Tinggal copas dari atas, lalu kita ganti parameter yang digabungkan saja
    return new Promise((resolve, reject) => {
      gabungKata(dataHasilResolve + " " + arrayKata[2])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    });

  })
  .then((dataHasilResolve) => {

    // Sama dengan atas
    return new Promise((resolve, reject) => {
      gabungKata(dataHasilResolve + " " + arrayKata[3])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    });

  })
  .then((dataHasilResolve) => {

    // Sama dengan atas
    // return new Promise((resolve, reject) => {
    //   gabungKata(dataHasilResolve + " " + arrayKata[4])
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     })
    // });

    // Karena sama sama dibungkus dalam promise
    // sama-sama me-return new promise
    // dan akan di-"passing" ke parameter selanjutnya,
    // Maka kita bisa menulisnya seperti ini saja.
    return gabungKata(dataHasilResolve + " " + arrayKata[4]);

  })
  .then((dataHasilResolve) => {

    // Karena semua sudah berhasil dikombinasikan
    // Cetak hasil akhir
    console.log(dataHasilResolve);

  })
  .catch((rejectMessage) => {
    console.log(rejectMessage);
  });