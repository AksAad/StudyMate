import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const API_URL = "https://zenquotes.io/api/random";
app.get("/", async(req, res) => {
  try{
    const response = await axios.get(API_URL);
    const quote = response.data[0].q;
    const author = response.data[0].a;
    console.log(quote);
    res.render("index.ejs",{quote,author});
  }catch(error){
    console.error(error);
    res.render("index.ejs", {quote: "could not load quote" , author: ""});
  }
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});