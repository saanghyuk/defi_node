const mongoose = require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/App');


const carSchema = mongoose.Schema({
    brand : String,
    model : String,
    year : Number,
    avail : Boolean
});

const Car = mongoose.model('Car', carSchema);



// const addCar = new Car({
//     brand: 'Ford',
//     model: "Focus",
//     year: 2000,
//     avail: true
// });
//
//
// addCar.save((err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// });


// Car.find({brand: 'Ford'}, (err, doc)=>{
//    if(err) return console.log(err);
//
//    console.log(doc);
// });
//
//
// Car.findOne({brand: 'Ford'}, (err, doc)=>{
//     if(err) return console.log(err);
//    console.log(doc);
// });
//
// Car.findById("5a51924274d4e1bb79d37436", (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// });
//
// Car.findOneAndRemove({brand: 'nissan'}, (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// });

// Car.remove({brand: 'nissan'}, (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// });


// Car.update({_id: "5a519312d42699bb95511d30"}, {
//     $set: {
//         year: 2019
//     }
// }, (err, doc)=>{
//     if(err) return console.log(err)c;
//     console.log(doc);
// });
//
// Car.findByIdAndUpdate("5a519312d42699bb95511d30", {
//     $set: {
//         brand: "Sanghyuk"
//     }c
// }, {
//     new: false
// }, (err, doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// });
//
//

Car.findById("5a519312d42699bb95511d30", (err, car)=>{
    if(err) return console.log(err);

    car.set({
        brand: "whatever"
    });
    car.save((err, doc)=>{
       if(err) return console.log(err);
       console.log(doc)
    });
});
