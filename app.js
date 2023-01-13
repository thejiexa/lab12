const { json } = require('express');
const express = require('express')

const app = express()
const port = 3000;
const fs = require("fs");


app.use(express.static("."));

app.get((req, res) => {
    res.sendFile(".\\index.html")
 })
 
 app.get("/albums", function(req, res){
    var content = fs.readFileSync("./assets/json/albums.json","utf8");
    var listOfAlbms = JSON.parse(content);
    res.send(listOfAlbms);
});

app.get("/images/:id", function(req, res){
    var id = req.params.id; 
    var content = fs.readFileSync("./assets/json/photos.json","utf8");
    var ListOfPhotos = JSON.parse(content);
    var photos = [];
    for(var i=0; i<ListOfPhotos.length; i++){
        if(ListOfPhotos[i].albumId==id){
            photos.push(ListOfPhotos[i]);
        }
    }
    res.send(photos);
});

app.listen(port, () => console.info(`Server running on ${port}`));
