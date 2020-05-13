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