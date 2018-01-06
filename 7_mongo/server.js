const { MongoClient } = require("mongodb");
// 같은 의미 const MongoClient = require('mongodb').MongoClient;

const URL = "mongodb://localhost:27017";

// MongoClient.connect(URL, (err, db) => {
//   if (err) {
//     console.log("Error");
//   }
//   // console.log(db);
//   console.log("connected to test db");
//
//   db.close();
// });

//
// MongoClient.connect(URL, (err, db) => {
//
//     const database=db.db('test');
//
//     database.collection('Cars').insertOne({
//         model: "HYUNDAI",
//         year: 2017
//     }, (err, res)=>{
//         if(err){
//             return console.log(`Cannot insert: ${err}`)
//         }
//         console.log(res.ops );
//     });
//
//     console.log("connected to test db");
//     db.close();
// });
//
//
// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//
//     const cars=
//         // {model: "chevy", year : 2017},
//         // {model: "hyundai", year : 2017},
//         {model: "kia", year : 2000}
//     ;
//
//     database.collection('Cars').insert(cars, (err, res)=>{
//         if(err){
//             return console.log(err);
//         }
//         console.log(res.ops);
//     });
//
//
//
//     console.log("connected to test db");
//     db.close();
// });

//
//
// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//
//     const cars=[
//         {model: "chevy", year : 2017},
//         {model: "hyundai", year : 2017},
//         {model: "audi", year : 2018},
//         {model: "nissan", year : 2000}];
//
//     database.collection('Cars').insertMany(cars, (err, res)=>{
//         if(err){return console.log(err);}
//         console.log(res.ops);
//     });
//
//
//
//     console.log("connected to test db");
//     db.close();
// });
//
// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//     //
//     // database.collection('Cars').find().toArray()
//     //     .then((data)=>{
//     //         console.log(data);
//     //     });
//
//     database.collection('Cars').findOne({year: 2017}).sort({'_id': 1}).toArray((err, docs)=>{
//         if(err){
//             return console.log(`Cannot get: ${err}`)
//         }
//         console.log(docs)
//     });
//
//     console.log("connected to test db");
//     db.close();
// });
//
// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//     //
//     // database.collection('Cars').find().toArray()
//     //     .then((data)=>{
//     //         console.log(data);
//     //     });
//
//     database.collection('Cars').findOne({ },{model: false }, (err, doc)=>{
//         console.log(doc);
//     });
//     console.log("connected to test db");
//     db.close();
// });


// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//
//    // database.collection("Cars").deleteMany({year: 2000}, (err, doc)=>{
//    //      console.log(doc);
//    // });
//
//     database.collection("Cars").deleteMany({year: 2017})
//         .then((res)=>{
//             console.log(res);
//         });
//     console.log("connected to test db");
//     db.close();
// });
//
// MongoClient.connect(URL, (err, db) => {
//     const database=db.db('test');
//
//
//     database.collection("Cars").deleteOne({model: 'audi'}), (err, doc)=>{
//         consle.log(doc);
//     };
//     console.log("connected to test db");
//     db.close();
// });

MongoClient.connect(URL, (err, db) => {
    const database=db.db('test');

    database.collection("Cars").findOneAndUpdate({
        model: "hyundai"
    }, {
        $inc: {
            year:+2
        }
    }, {
        upsert: true
    }, (err, doc)=>{
            console.log(doc)
    });
    console.log("connected to test db");
    db.close();
});