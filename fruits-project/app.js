const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    rating: 10,
    review: "Peaches are so yummy!"
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit"
});

// pineapple.save();

const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "Sweetest and juiciest fruit ever!"
});

// mango.save();

const person = new Person({
    name: "Amy Long",
    age: 21,
    favouriteFruit: pineapple
});

// person.save();

// const kiwi = new Fruit({
//     name: "kiwi",
//     rating: 10,
//     review: "The best fruit"
// });
//
// const orange = new Fruit({
//     name: "orange",
//     rating: 4,
//     review: "Too sour for me"
// });
//
// const banana = new Fruit({
//     name: "banana",
//     rating: 3,
//     review: "Weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits in fruitsDB.")
//     }
// });


Fruit.find((err, fruits) => {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();

        fruits.forEach((fruit) => {
            console.log(fruit.name);
        });
    }
});

// Fruit.updateOne({_id:"609f5cdc   d019472f4493c8b3"}, {name: "Banana"}, (err)=>{
//    if(err){
//        console.log(err);
//    } else{
//        console.log("Successfully updated the document.");
//    }
// });

// Fruit.deleteOne({_id: "609f6206bb6b8b1af016ca91"}, (err)=>{
//    if(err){
//        console.log(err);
//    } else {
//        console.log("Successfully delete the document.");
//    }
// });

// Fruit.deleteMany({name: "Mango"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully delete the document.");
//     }
// });

Person.updateOne({name: "Jack Beauer"}, {favouriteFruit: mango}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document.");
    }
});
