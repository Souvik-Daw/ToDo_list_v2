//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ToDoList', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//const items = ["Buy Food", "Cook Food", "Eat Food"];
//const workItems = [];

//Creating Schema
const Ischema = new mongoose.Schema({
  name: String
});

//Creating Collection
const Item = mongoose.model("Item", Ischema);

//Inserting Data in Fruit collection
const i1 = new Item({
  name: "To Do list"
});
const i2 = new Item({
  name: "Click + to add"
});
const i3 = new Item({
  name: "Click the checkbox to delete"
});

var defaultItems = [i1, i2, i3];

//insert many
/*

*/

app.get("/", function (req, res) {

  //const day = date.getDate();
  Item.find({},function (err, data) {
    if (err) {
      //console.log(err);
    }
    else {
      if(data.length===0)
      {
        Item.insertMany(defaultItems,function(err1){
          if(err1)
            console.log(err1);
          else
            console.log("inserted 3 items");
        });
        res.redirect("/");
      }
      else
      {
        res.render("list", { listTitle: "Today", newListItems: data });
      }
    }
  })
});
//delete data
app.post("/delete",function(req,res){
  const cb=req.body.checkbox;
  Item.findByIdAndRemove(cb,function(err){
    if(!err)
      console.log("deleted an item");
  })
  res.redirect("/");
})

//insert data
app.post("/", function (req, res) {

  const item = req.body.newItem;
  const i4 = new Item({
    name: item
  });
 i4.save();
 res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
