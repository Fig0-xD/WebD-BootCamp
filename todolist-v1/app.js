const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", (req, res)=>{
    let day = date.getDate();

    res.render("list", {listTitle: day, itemList: items});
});

app.post("/", (req,res)=>{

    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", (req, res)=>{
   res.render("list", {listTitle: "Work List", itemList: workItems});
});

app.post("/work", (req, res)=>{
    let workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
});

app.get("/about", (req, res)=>{
   res.render("about");
});



app.listen(3000, ()=>{
   console.log("Server running on port 3000.");
});