const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const port = 3000;

//menggunakan ejs
app.set("view engine", "ejs");

//thrd-party middleware
app.use(morgan("dev"));
app.use(expressLayouts);

//Buil-in midleware
app.use(express.static("public")); //agar dapat mengambil file dari public. apabila dihapus file css dan gambar tidak akan muncul. karena sejatinya express melindungi file file diluar folder public

//Application level middleware
//seperti app.use dibawah. function ini akan selalu dijalankan. bisa menggunakan declaration function atau arrow function
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next(); //setelah next yaitu function atau ,idleware apa yang akan dijalankan selanjutnya. tergantung URL yang kita ditulis. misalkan tidak ditulis apa apa maka akan ke path HOme
});

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
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
  });
});

app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Category : ${req.params.idCat}`); //jadi req. apa yang kita kirimkan ke express dan res. apa yang dikirmkan oleh express
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
}); //akan selalu dijalankan. maka jangan taroh atas. Biasanya untuk menangani halaman yang tidak ada

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
