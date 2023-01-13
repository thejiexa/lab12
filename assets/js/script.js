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
