var img = 'https://image.tmdb.org/t/p/';

var lFavoritos = localStorage.getItem("Favoritos");
lFavoritos =  JSON.parse(lFavoritos);

var indice = -1;
var most = "";
var i;

for (i in lFavoritos) {
	var film = JSON.parse(lFavoritos[i]);

		most += '<div class="card" style="width: 18rem;">'
		most += '<img class="img-thumbnail" src="'+img+'w200/'+film.poster_path+'">';
		most += '<div class="card-body">';
		most += '<h3>'+film.title+'</h3>';
		most += '<p>'+film.overview+ '<p>';
		most += '<input id="btnAssistir" type="button" class="btn btn-dark" value="Assistir" onclick="assistir()">';
		most += '</div>';
		most += '</div>';
}
    document.getElementById('root').innerHTML = most;
    
function assistir() {
	lFavoritos.splice(indice, 1);
    localStorage.setItem("Favoritos", JSON.stringify(lFavoritos));
    alert("Assistido");
    document.location.href="";
}

