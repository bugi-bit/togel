const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();

const port = 3000;

//menggunakan ejs
app.set("view engine", "ejs");

//thrd-party middleware

app.use(expressLayouts);

//Buil-in midleware
app.use(express.static("public")); //agar dapat mengambil file dari public. apabila dihapus file css dan gambar tidak akan muncul. karena sejatinya express melindungi file file diluar folder public
app.use(express.urlencoded({ extended: true })); //extended: true menghindari eror body-parser

//Konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "bugi nur rohman",
      email: "bugi@gmail.com",
    },
    {
      nama: "andika kangen",
      email: "andika@gmail.com",
    },
    {
      nama: "rohman",
      email: "rohman@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Bugi Nur Rohman",
    title: "Halaman home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

//Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

//proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(), //email harus sama dengan email di html
    check("nohp", "No HP tidak Valid!").isMobilePhone("id-ID"), //mohp harus sama dengan email di html
  ],
  (req, res) => {
    //data berhasil dikirim tetpi di terminal masih status undifined, maka harus di tambah middleware diatas

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body); //addContact membuat method baru di util/contact.js
      //kirimkan flash
      req.flash("msg", "Data contact berhasil ditambahkan");

      res.redirect("/contact"); //langsung menegmbalikan ke halaman contacts
    }
  }
);

//proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  //jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data contact berhasil dihapus!");

    res.redirect("/contact");
  }
});

//form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

//proses ubah data contact
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      //untuk mengatasi apabila yang di edit nohp atau email saja dengan nama yang sama, kareena menympan dengan nama yang sama akan membuat erorr validasinya
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(), //email harus sama dengan email di html
    check("nohp", "No HP tidak Valid!").isMobilePhone("id-ID"), //mohp harus sama dengan email di html
  ],
  (req, res) => {
    //data berhasil dikirim tetpi di terminal masih status undifined, maka harus di tambah middleware diatas

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      req.flash("msg", "Data contact berhasil ditambahkan");
      res.redirect("/contact"); //langsung menegmbalikan ke halaman contacts
    }
  }
);

//Halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama); //pastikan temen temen apabila menuliskan route sebelum code ini karena apapun yang ditulis sesudah contact/ akan ditangkap oleh route ini

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman detail contact",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
}); //akan selalu dijalankan. maka jangan taroh atas. Biasanya untuk menangani halaman yang tidak ada

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
