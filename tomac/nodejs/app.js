const { argv } = require("yargs");
const yargs = require("yargs");
const contacts = require("./contacts");
//mengambil argumen dari command line
yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

//menampilkan daftar semua nama dan norom kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan no HP contact ",

  handler() {
    contacts.listContact();
  },
});

//menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

//menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

// const contacts = require("./contacts");
// //atau
// // const { tulisPertanyaan, simpanContact } = require("./contacts");
// //membuat function
// const main = async () => {
//   //memberitahu kalau kita menggunakan asynchrounus
//   const nama = await contacts.tulisPertanyaan("Masukkan nama anda :");
//   const email = await contacts.tulisPertanyaan("Masukkan email anda : ");
//   const noHp = await contacts.tulisPertanyaan("Masukkan No HP anda : ");

//   contacts.simpanContact(nama, email, noHp);
// };

// main();
