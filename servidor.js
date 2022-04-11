const mongoose = require("mongoose")
//const conn = mongoose.connection
//configurando o mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/loja").then(() => {
    console.log("sucesso ao se conectar com o mongoDB!")
}).catch((err) => {
     console.log("houve um erro ao se conectar ao mongoDB: " +err)
})

//definindo o model

const productSchema = mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    price: { 
        type: Number,
        require: true
    }
})


//Collection
mongoose.model('produtos', productSchema)
module.exports = { Mongoose: mongoose, ProductSchema: productSchema }


    const Celular = mongoose.model('produtos')
 /*
new Celular({
    name: "Samsung Galaxy S21",
    price: 3500
}).save().then(() => {
    console.log("salvo")
}).catch((err) => { 
    console.log("erro: " +err)
})

new Celular({
    name: "Moto G10",
    price: 1000.00
}).save().then(() => {
    console.log("salvo")
}).catch((err) => {
    console.log("erro: " +err)
})

new Celular({
    name: "Iphone 12",
    price: 12500.00
}).save().then(() => {
    console.log("salvo")
}).catch((err) => {
    console.log("erro: " +err)
})

new Celular({
    name: "Galaxy Fold",
    price: 12000
}).save().then(() => {
    console.log("salvo")
}).catch((err) => {
    console.log("erro: " +err)
})
*/