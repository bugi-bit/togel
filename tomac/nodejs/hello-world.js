//module system
//export ke os.js
//dapat berupa function, variable, object, maupun class
function cetakNama(nama) {
  return `Hallo, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
  nama: "Bugi Nurrohman",
  umur: 20,
  cetakMhs() {
    return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun`;
  },
};

class Orang {
  constructor() {
    console.log("Objek orang telah dibuat!!");
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

//atau

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };

//atau apabila nama properti sama dengan value
module.exports = { cetakNama, PI, mahasiswa, Orang };
