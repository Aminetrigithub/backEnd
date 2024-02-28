const express = require("express");
const app = express();

var cors = require('cors')

const mysql = require("mysql2");
const query = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopping",
});


app.use(cors())
app.use(express.json());

const port = 3500;




// ! add product --> .post
app.post("/", (req, res) => {
  const { name, price, description } = req.body;
  query.execute(
    `insert into products(name,price,description) values('${name}','${price}','${description}')`
  );
  res.json("product added with success🥼");
});

// ! get(select) all products --> .get
app.get("/", (req, res) => {
  query.execute(`select * from products`, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

// ! get(select) one product --> .get
app.get("/:id", (req, res) => {
  const { id } = req.params;
  query.execute(`select * from products where id = ${id}`, (err, data) => {
    if (err)
      res.json({ err });
    else res.json({ message: "the product that you search is:", data });
  });
});

// ! delete product --> .delete
app.delete("/", (req, res) => {
  const { id } = req.body;
  query.execute(`delete from products where id = ${id}`);
  res.json("product deleted");
});

// ! update product --> .put
app.put("/", (req, res) => {
  const { id, name, description, price } = req.body;
  query.execute(
    `update products set name='${name}', description='${description}', price='${price}' where id=${id}`
  );
  res.json(`the product '${name}' is updated`);
});

// ! update product --> .patch
app.patch("/", (req, res) => {
  const { id, name, description, price } = req.body;
  query.execute(
    `update products set name='${name}', description='${description}', price='${price}' where id=${id}`
  );
  res.json(`the product '${name}' is updated`);
});

app.listen(port, () => {
  console.log("Server is running............");
});
