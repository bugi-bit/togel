const express = require("express");
const app = express();
const port = 3000;

//menggunakan ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Hello World!");

  // res.json({
  //   nama: "Sandhika",
  //   email: "bugi@gmail.com",
  //   noHp: "09876",
  // });

  // res.sendFile("./index.html", { root: __dirname }); //harus ngasih tahu lokasi file berada, dirname adala lokasi root index.html berada
  //kita tidak perlu buka file seperti diatas
  res.render("index");
});

app.get("/about", (req, res) => {
  // res.send("Ini Halaman About!");

  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  // res.send("Ini Halaman Contact!");

  res.sendFile("./contact.html", { root: __dirname }); //dapat mengirim css dan sebagainya
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
