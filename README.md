## Table of Content
1. [Recap Callback](#recap-callback)
1. [Callback Doom or Hell](#callback-doom-or-hell)
1. [Prelude to Promise](#prelude-to-promise)
1. [Promise How To](#promise-how-to)
1. [Promise Chaining](#promise-chaining)

## Recap Callback
Pada pembelajaran ini, kita akan belajar tentang membuat `Janji` atau `Promise` pada
Javascript, tapi sebelumnya, kita akan mengingat kembali dulu, `callback` dan cara
membuatnya.

Misalnya kita ingin membuat sebuah fungsi yang ingin menggabungkan kata dengan
cara callback, kode dapat dilihat pada [Code 01](#code-01)

### Code 01
```javascript
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
```

Di sini penulis tidak menjelaskan lebih detil mengenai callback karena sudah
pernah dipelajari pada pembelajaran sebelumnya.

## Callback Doom or Hell
Berdasarkan kode di atas, kita bisa melihat bahwa kita sudah berhasil untuk
membuat sebuah callback sederhana, namun kode di atas belum menjelaskan fungsi
sesuai namanya bukan? yaitu untuk menggabungkan kata.

Misalkan ada 5 buah kata dalam di dalam array yang akan kita gabungkan secara manual.

Bagaimana cara kita menggabungkannya? caranya adalah dengan membuat callback,
di dalam callback atau yang disebut dengan `nested callback`. Untuk itu kita akan 
coba untuk memodifikasi kode untuk dapat menggabungkan kata yang ada di dalam array.
Contoh kode dapat dilihat pada [Code 02](#code-02)

### Code 02
```javascript
const gabungKata = (kataYangInginDigabung, callback) => {
  if(kataYangInginDigabung === null) {
    callback("Maaf, katanya Error !", null);
  }
  else {
    callback(null, kataYangInginDigabung);
  }
};

// driver code dimulai di sini
const arrayKata = ['Hello', 'World', 'Coba', 'Gabung', 'Kata'];

gabungKata(arrayKata[0], (err, data1) => {
  if(err) {
    console.log(err);
  }
  else {
    gabungKata(arrayKata[1], (err, data2) => {
      if(err) {
        console.log(err);
      }
      else {
        gabungKata(arrayKata[2], (err, data3) => {
          if(err) {
            console.log(err);
          }
          else {
            gabungKata(arrayKata[3], (err, data4) => {
              if(err) {
                console.log(err);
              }
              else {
                gabungKata(arrayKata[4], (err, data5) => {
                  if(err) {
                    console.log(err)
                  }
                  else {
                    console.log(`${data1} ${data2} ${data3} ${data4} ${data5}`);
                  }
                })
              }
            });
          }
        });
      }
    });
  }
});
```

Cukup pusing dengan adanya banyak jorokan ke dalam bukan?
Hal ini disebut dengan istilah `callback hell` atau dikarenakan banyaknya jorokan
ke dalam dan keluar sehingga membentuk piramida (kalau kita miringkan kepala kita
90 derajat) sering juga disebut dengan `pyramid of doom`.

Untuk itu, diperlukan suatu solusi untuk menghadapi `callback hell`, bisa saja dengan
melakukan membuat sebuah fungsi untuk meng-handle callback nya, namun tetap saja
akan menjorok ke dalam seperti contoh di atas.

Solusinya diperkenalkan dalam ES6 yaitu dengan menggunakan `Promise`

## Prelude to Promise
Sesuai namanya, `Promise` adalah suatu konsep yang membuat aplikasi untuk `Berjanji`
akan melakukan sesuatu yang tidak diketahui akan dijalankannya kapan (sama dengan 
kita membuat janji pada diri kita sendiri, misal Saya berjanji akan berusaha 
tidak marah ketika nonton `World of the Marriage (WotM)` !).

`Promise` di dalam javascript ini merepresentasikan operasi atau aksi yang belum 
diselesaikan sekarang, tapi akan diselesaikan nanti di masa depan dan bersifat
asynchronous.

`Promise` juga memiliki beberapa kondisi yang bisa disamakan dengan kondisi dunia
nyata:

Misalnya:  
Premis `Janji` - Saya berjanji akan berusaha tidak marah ketika 
menonton `World of the Marriage`

Di sini saya baru membuat janji, saya belum menjalankan janji saya, kondisi ini
dijalankan ketika
* Kondisi `Janji` diuji coba - Saya menonton `WotM`
* `Janji` terpenuhi - Ketika nonton tidak emosi
* `Janji` ditolak - Ketika nonton emosi dan banting banting gara-gara si pelakor.

Sama seperti di `Promise` nya ES6 ini.

Ada beberapa kondisi atau *state* dalam `Promise`:
1. *pending* - Merupakan kondisi awal, ketika kita `Berjanji`, belum terpenuhi 
/ ditolak.
2. *fulfilled* - Merupakan kondisi dimana `Promise` sudah terpenuhi
3. *rejected* - Merupakan kondisi dimana `Promise` gagal terpenuhi.

Nah setelah mengetahui konsep dari `Promise` ini barulah kita belajar membuat 
`Promise` nya bagaimana.

## Promise How To
Cara sederhana membuat `Promise` adalah dengan:

```javascript
// Cara deklarasi Promise
const namaFungsi = new Promise((resolve, reject) => {
  ...
  // Sebenarnya resolve dan reject ini adalah CALLBACK !
  // baik resolve dan reject ini hanya menerima satu buah parameter saja.
  ...
  if(kondisiErrorTerjadi) {
    reject(errorMessage);
  }
  resolve(dataYangAkanDilempar)
});

// Cara pakai Promise
namaFungsi
  // Apabila kondisi terpenuhi 
  .then()
  // Apabila kondisi ditolak
  .catch()
```

Apabila kita ingin membuat kode sederhana yang ingin mencetak sesuatu dengan timeout
dan menggunakan `Promise` based, kita bisa menulisnya seperti [Code 03](#code-03)

### Code 03
```javascript
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
```

Cara di atas adalah cara sederhana untuk membuat fungsi yang `Promise` based yang
tidak menerima parameter sama sekali.

Bagaimana caranya kalau kita mau ada parameter di dalam fungsi kita?

Untuk lebih jelasnya mari kita coba konversi code yang ada di atas dengan menggunakan
`Promise`, contoh kode dapat dilihat pada [Code 04](#code-04)

### Code 04
```javascript
// Disini kita akan membuat sebuah function yang memiliki sebuah paramter
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
```

Dari kode yang sudah dibuat ini, terlihat perbedaan dari penggunaan callback dan
promise lebih mudah ditangkap yang mana bukan?

Dengan promise, kita bisa membuat alur aplikasi yang kita buat *seakan-akan* bisa
bertindak sebagai sesuatu yang `sequential` / `synchronous`, padahal di balik
layarnya adalah `asynchronous`.

Kemudian sebagai pelengkap mari kita coba menyederhanakan `callback hell` yang
ada pada kode sebelumnya dengan menggunakan `Promise`

## Promise Chaining
Penyederhanaan callback pada `Promise` ini bisa diselesaikan dengan satu cara yang
bernama `Promise Chaining`, di mana kita membuat janji berantai yang akan diselesaikan
berurutan. Jadi sekarang mari kita mengubah kode `callback hell` di atas, dan dapat
dilihat pada [Code 05](#code-05)

### Code 05
```javascript
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
```

Dari kode di atas, terlihat jelas bahwa dengan membungkus hasil kembalian
dalam `Promise` lagi, kita bisa membuat sebuah rantai `Promise` sehingga
kode dapat lebih mudah terbaca karena alurnya se-`akan-akan` terjadi secara
berurutan, sehingga Flow dari coding akan lebih mudah dibaca dan di-*trace* 
kesalahan code ada dimana.

Selamat Anda sudah berhasil mempelajari `Promise` !
dan semoga mulai dari pembelajaran ini, kita bisa mencoba menggunakan semua yang 
`Promise` based, termasuk `fs` dan `db Client / Pool` !

## Referensi
* [Promise - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Promise - State](https://media.prod.mdn.mozit.cloud/attachments/2018/04/18/15911/32e79f722e83940fdaea297acdb5df92/promises.png)