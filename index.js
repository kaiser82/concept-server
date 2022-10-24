const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const port = process.env.port || 5000;

const productsCollection = require("./data/product.json")


app.get('/', (req, res) => {
    res.send("Now server is running")
});

app.get('/allProducts', (req, res) => {
    res.send(productsCollection)
});

app.get('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const singleProduct = productsCollection.find(p => p.id === id);
    if (!singleProduct) {
        res.send("No product for this ID.")
    }
    res.send(singleProduct);
});

app.get('/category/:name', (req, res) => {
    const name = req.params.name;
    console.log(name)
    const categoryProducts = productsCollection.filter(p => p.category === name);
    res.send(categoryProducts);
})


app.listen(port, () => {
    console.log("server is running on port:", port);
});

module.exports = app;