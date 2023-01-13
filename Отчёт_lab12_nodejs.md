<p align = "center">МИНИСТЕРСТВО НАУКИ И ВЫСШЕГО ОБРАЗОВАНИЯ<br>
РОССИЙСКОЙ ФЕДЕРАЦИИ<br>
ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ<br>
ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕГО ОБРАЗОВАНИЯ<br>
«САХАЛИНСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ»</p>
<br><br><br><br><br><br>
<p align = "center">Институт естественных наук и техносферной безопасности<br>Кафедра информатики<br>Григораш Алексей Владимирович</p>
<br><br><br>
<p align = "center">Лабораторная работа №12<br>«<strong>Node JS</strong>»<br>01.03.02 Прикладная математика и информатика</p>
<br><br><br><br><br><br><br><br><br><br><br><br>
<p align = "right">Научный руководитель<br>
Соболев Евгений Игоревич</p>
<br><br><br>
<p align = "center">г. Южно-Сахалинск<br>2022 г.</p>
<br><br><br><br><br><br><br><br>

## Введение

Node.js представляет среду выполнения кода на JavaScript, которая построена на основе движка JavaScript Chrome V8, который позволяет транслировать вызовы на языке JavaScript в машинный код. Node.js прежде всего предназначен для создания серверных приложений на языке JavaScript. Хотя также существуют проекты по написанию десктопных приложений (Electron) и даже по созданию кода для микроконтроллеров. Но прежде всего мы говорим о Node.js, как о платформе для создания веб-приложений.

Node.js является открытым проектом, исходники которого можно посмотреть на github.com.

## Задачи:

Задача (https://jsonplaceholder.typicode.com/):

Реализовать галерею на Node JS. Ваше приложение должно делать: 

-запрос к серверу, получать данные в формате json;

-обработка json и вывод пользователю информацию в виде веб-страницы;

-выводить список альбомов;

-выводить список фотографий;

-переход между альбомом и списком фотографий.

## Решение:
Файл app.js:
```js
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

```
index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link href="./style.css" rel="stylesheet">
    <script src="./assets/js/jquery-3.6.1.min.js"></script>
    <script src="./assets/js/script.js"></script>
    <title>lab 12</title>
    <script>
          
    </script>
</head>
<body>
  <h2 class="text-center" id="Header">albums</h2>
  <div class="d-flex flex-wrap" id="albums">
  </div>

    <button type="button" class="btn btn-primary" id="buttonback" onclick="GetAlbums()">back</button>
  <div class="d-flex flex-wrap" id="images">
  </div>
</body>
</html>
```
style.css:
```css
h2{
    margin-top: 15px;
    font-size: 50px;
    
}
body{
    background-image: url("./assets/image/bg.png");
    background-size: 100%;    
    background-repeat: repeat-y;
}
#album{
    background: url("./assets/image/album.png") rgba(0,0,0,0);
    background-size: 100% 100%;
    color: black;
    padding: 35px;
    margin: 10px;
    width: auto;
    height: auto;
    border: 0px;
}
#album:hover{
    border: 1px solid black;
}
#image{
    margin: 20px;
    height: 256px;
    width: 256px;
}
#buttonback{
    position: absolute;
    top: 2%;
    left: 2%;
    width: 100px;
    height: 50px;
    font-size: 20px;
}
```

script.js:
```js
async function GetAlbums() {
    const response = await fetch("/albums", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const albums = await response.json();
        var maindiv = document.getElementById("albums"); 
        images.innerHTML = "";
        document.getElementById("Header").innerText = "albums";
        document.getElementById("buttonback").style.display = "none";
        albums.forEach(album => {
            maindiv.innerHTML += `<button id="album" value="`+album.id+`"onclick="GetImage(this)">`+album.id+"</button>";
        });
    }
}
GetAlbums();

async function GetImage(button) {
    var id = button.value;
    document.getElementById("Header").innerText = "album: " + id;
    document.querySelectorAll("#album").forEach(a=>a.style.display = "none");
    document.getElementById("buttonback").style.display = "block";
    const response = await fetch("/images/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        var photos = await response.json();
        var images = document.getElementById("images"); 
        console.log(photos);
        photos.forEach(photo => {
            images.innerHTML += `<img src="`+photo.url+`" id="image">`;
            console.log(photo.url);
        });
    }
}

```
## Вывод:
В ходе выполнения задач .