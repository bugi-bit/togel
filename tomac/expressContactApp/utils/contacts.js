//file system
const fs = require("fs");

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

//ambil semua data di contact.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8"); //membaca isi file
  const contacts = JSON.parse(fileBuffer); //merubah menjadi json
  return contacts;
};

//cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
};

//menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

//menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

//cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

//hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContact = contacts.filter((contact) => contact.nama !== nama); //menelusuri semua data contact.json yang bukan nama. dan akan objek baru selain nama itu
  saveContacts(filteredContact);
};

//mengubah contact
const updateContacts = (contactBaru) => {
  const contacts = loadContact();
  //hilangkan contact lama yang namanya sama dengan oldnama
  const filteredContact = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama; //menghapus oldnama pada array
  filteredContact.push(contactBaru); //memasukkan objeck baru kedalam array contact.json
  saveContacts(filteredContact); //menimpa apapun yang ada di file json dengan contact baru
};

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts };
