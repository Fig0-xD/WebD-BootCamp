const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-figo:Figodutta1@cluster0.js8mh.mongodb.net/todoListDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemSchema = new mongoose.Schema({
    name: String
});


const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to do your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete a item."
});


const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const defaultItems = [item1, item2, item3];

const List = mongoose.model("List", listSchema);


app.get("/", async (req, res) => {

    const items = await Item.find({});

    if (items.length === 0) {
        try {
            await Item.insertMany(defaultItems);
            console.log("Successfully inserted default items.");
        } catch (err) {
            console.log(err);
        }
        return res.redirect("/");
    }

    res.render("list", {listTitle: "Today", itemList: items});
});


app.get("/:customList", async (req, res) => {
    const customList = _.capitalize(req.params.customList);

    try {
        const query = await List.findOne({name: customList}).exec();
        if (!query) {
            // Create a new list
            const list = new List({
                name: customList,
                items: defaultItems
            });
            try {
                await list.save();
                console.log(`Added a ${customList} List in the DB`);
            } catch (err) {
                console.log(err);
            }
            return res.redirect(`/${customList}`);

        } else {
            // Show an existing list
            res.render("list", {listTitle: query.name, itemList: query.items});
        }

    } catch (err) {
        console.log(err);
    }

});


app.post("/", async (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        try {
            await item.save();
            console.log("New item added to ITEM collection");
        } catch (err) {
            console.log(err);
        }
        return res.redirect("/");
    } else {
        const query = await List.findOne({name: listName}).exec();
        query.items.push(item);

        try {
            await query.save();
            console.log(`New item pushed into ${query.name} list.`);
        } catch (err) {
            console.log(err);
        }
        return res.redirect(`/${listName}`);
    }
});

app.post("/delete", async (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.hiddenInput;

    if (listName === "Today") {
        try {
            await Item.deleteOne({_id: checkedItemId});
            console.log("Successfully deleted the checked item from ITEM collection.")
        } catch (err) {
            console.log(err);
        }
        return res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if (!err) {
                res.redirect(`/${listName}`);
            }
        });
    }


});


app.listen(3000, () => {
    console.log("Server running on port 3000.");
});