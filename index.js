import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"voyage",
  password:"wh0@m!?.",
  port:5432,
});
db.connect();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
  res.render("index.ejs");
})

app.get("/mystery", async (req, res) => {
  try {
  const tn = "MYSTERY & THRILLER"
  const result = await db.query("SELECT work_id FROM mystery ORDER BY id ASC");
  const workIds = result.rows.map(row => row.work_id);
  const data = await db.query("SELECT*FROM mystery ORDER BY id ASC");
  const con = data.rows;

  const apiResults = await Promise.all(workIds.map(async (workId) => {
    const response = await axios.get(workId);
    return response.data;
  }));

  res.render("main.ejs",{
    content : apiResults,
    book : con,
    tableName : tn,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
    
});

app.get("/history", async (req, res) => {
  try {
  const tn = "HISTORY & MYTHOLOGY"  
  const result = await db.query("SELECT work_id FROM history ORDER BY id ASC");
  const workIds = result.rows.map(row => row.work_id);
  const data = await db.query("SELECT*FROM history ORDER BY id ASC");
  const con = data.rows;

  const apiResults = await Promise.all(workIds.map(async (workId) => {
    const response = await axios.get(workId);
    return response.data;
  }));

  res.render("main.ejs",{
    content : apiResults,
    book : con,
    tableName : tn,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
    
});

app.get("/fantasy", async (req, res) => {
  try {
  const tn = "FANTASY"  
  const result = await db.query("SELECT work_id FROM fantasy ORDER BY id ASC");
  const workIds = result.rows.map(row => row.work_id);
  const data = await db.query("SELECT*FROM fantasy ORDER BY id ASC");
  const con = data.rows;

  const apiResults = await Promise.all(workIds.map(async (workId) => {
    const response = await axios.get(workId);
    return response.data;
  }));

  res.render("main.ejs",{
    content : apiResults,
    book : con,
    tableName : tn,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
    
});

app.get("/romance", async (req, res) => {
  try {
  const tn = "ROMANCE"
  const result = await db.query("SELECT work_id FROM romance ORDER BY id ASC");
  const workIds = result.rows.map(row => row.work_id);
  const data = await db.query("SELECT*FROM romance ORDER BY id ASC");
  const con = data.rows;

  const apiResults = await Promise.all(workIds.map(async (workId) => {
    const response = await axios.get(workId);
    return response.data;
  }));

  res.render("main.ejs",{
    content : apiResults,
    book : con,
    tableName : tn,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
    
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
