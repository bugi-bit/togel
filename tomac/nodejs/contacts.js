//file system
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// import { writeFile } from "fs"; //menggunkana esm nama file harus format .mjs

//menuliskan string ke file (synchronous)
// try {
//   fs.writeFileSync("test.txt", "Hello world");
// } catch (e) {
//   console.log(e);
// }

//menuliskan string ke file (asynchronous)
// fs.writeFile("test.txt", "hello motherfucker", (e) => {
//   console.log(e);
// });

//membaca isi file (synchronous)
// const data = fs.readFileSync("test.txt");
// console.log(data.toString()); //hasilnya kana buffer maka diubah menjadi string
//atau
// const data = fs.readFileSync("test.txt", "utf8");
// console.log(data); //hasilnya kana buffer maka diubah menjadi string

// fs.readFile("test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//readline
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

//membuat folder data juka belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file juka belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// rl.question("masukkan nama anda :", (nama) => {
//   rl.question("masukkan no HP anda :", (noHP) => {
//     const contact = { nama, noHP }; //menangkap value dari command promtp
//     const file = fs.readFileSync("data/contacts.json", "utf-8"); //membaca isi file
//     const contacts = JSON.parse(file); //merubah menjadi json

//     contacts.push(contact); //push atau memasukkan object dalam array
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); //membaca dan menjadikan json menjadi string kembali
//     console.log("Terimakasih");
//     rl.close();

//   });
// });
//untuk mengatasi callback hell (ditandai kodingan semakin menjorok kedepan maka caranya menggunakan async await.)
//karena async await menggunakan promise maka data dirubah dulu menjadi promise

//membungkus satu pertanyaan kedalam promise
// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };

//dapat diringkas daripada menulis function setiap ada pertanyaan baru
// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("masukkan email anda :", (email) => {
//       resolve(email);
//     });
//   });
// };

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8"); //membaca isi file
  const contacts = JSON.parse(fileBuffer); //merubah menjadi json
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp }; //menangkap value dari command promtp //ini object bentuk baru karena parameter dan value sama maka ditulis satu saja
  // const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8"); //membaca isi file
  // const contacts = JSON.parse(fileBuffer); //merubah menjadi json
  const contacts = loadContact();
  //karena akan dipakai berulang maka dikeluarin ke loadcontact

  //cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse("contact sudah terdaftar, gunakan nama lain"));
    return false;
  }
  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse("Email tidak valid ajg"));
      return false;
    }
  }
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse("Nomor HP tidak valid"));
    return false;
  }

  contacts.push(contact); //push atau memasukkan object dalam array
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); //menambahkan, membaca dan menjadikan json menjadi string kembali
  console.log(chalk.green.inverse("Terimakasih"));
};
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse("Daftar kontol, ehh kontak maksudnya"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

//berbeda dengan detail, jadi harus membuat array baru tanpa nama yang ditemukan menggunakan filter
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
  //apabila nama yang mau dihapus tidak ada maka ukuran array lama(contacts) sama dengan array baru(newContacts) maka data tidak ditemukan
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts)); //menambahkan, membaca dan menjadikan json menjadi string kembali
  console.log(chalk.green.inverse(`data contact ${nama} berhasil dihapus!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
