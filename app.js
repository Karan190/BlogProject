//jshint esversion:6

import express from "express";
import ejs from "ejs";
import  mongoose  from "mongoose";
import pkg from "./controllers/middleware.cjs"

const { homeMiddleware,aboutMiddleware,contactMiddleware,composeMiddleware,composePost,idMiddleware,deleteMiddleware }=pkg;

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));




app.get('/',homeMiddleware);
app.get('/about',aboutMiddleware);
app.get('/contact',contactMiddleware);
app.get("/compose",composeMiddleware);
app.get("/posts/:id",idMiddleware);

app.post("/compose",composePost);
app.post("/delete/:id",deleteMiddleware);






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
