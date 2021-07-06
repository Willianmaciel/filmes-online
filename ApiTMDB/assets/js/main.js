var url = 'https://api.themoviedb.org/3/';
var img = 'https://image.tmdb.org/t/p/';
var key = '539b297a019c7ed8eb6ae89dd302fec5';

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        resultado(data.results);
    }
};
xmlhttp.open("GET", url+"trending/movie/week?api_key="+key+"&language=pt-BR", true);
xmlhttp.send();

function resultado(filme) {
	var mostrar = "";
	var i;
	var title ="";

	title += '<h1>Filmes da semana</h1>';

	for (var i = 0; i < filme.length; i++) {
		mostrar += '<div class="card" style="width: 20rem;">'
		mostrar += '<img class="img-thumbnail" src="'+img+'w200/'+filme[i].poster_path+'">';
		mostrar += '<div class="card-body">';
		mostrar += '<h3>'+filme[i].title+'</h3>';
		mostrar += '<p>'+filme[i].overview+ '<p>';
		mostrar += '<input id="btnFavorito" type="button" class="btn btn-dark" value="Favoritos" onClick="filmeid('+filme[i].id+')">';
		mostrar += '</div>';
		mostrar += '</div>';
	}

	document.getElementById('resultado').innerHTML = mostrar;
	document.getElementById('title').innerHTML = title;
}

//_______________________________________________________________________________

var botao = document.getElementById('btnPesquisa');

botao.onclick = function() {
	var valr = document.getElementById('valor').value;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        pesquisa(data.results);
    }
	};
xmlhttp.open("GET", url+"search/movie?api_key="+key+"&query="+valr+"&language=pt-BR", true);

document.getElementById('form').addEventListener('submit', console);

    function console(e){
        e.preventDefault();
    }

function pesquisa(filme) {
	var mostrar = "";
	var i;
	var title ="";

	title += '<h1>Resultado da Pesquisa</h1>';

	for (var i = 0; i < filme.length; i++) {
		mostrar += '<div class="card" style="width: 20rem;">'
		mostrar += '<img class="img-thumbnail" src="'+img+'w200/'+filme[i].poster_path+'">';
		mostrar += '<div class="card-body">';
		mostrar += '<h3>'+filme[i].title+'</h3>';
		mostrar += '<p>'+filme[i].overview+ '<p>';
		mostrar += '<input id="btnFavorito" type="button" class="btn btn-dark" value="Favoritos" onClick="filmeid('+filme[i].id+')">';
		mostrar += '</div>';
		mostrar += '</div>';
	}

	document.getElementById('resultado').innerHTML = mostrar;
	document.getElementById('title').innerHTML = title;

}

xmlhttp.send();
}

//_______________________________________________________________________________
function filmeid(id) {
    filmeID = (id);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            favorito(data);
        }
    };
    xmlhttp.open("GET", url+"movie/"+filmeID+"?api_key="+key+"&language=pt-BR", true);
    xmlhttp.send();

function favorito(filme) {
    var favoritos = [];
    favoritos = localStorage.getItem("Favoritos");
    favoritos = JSON.parse(favoritos);
    if (favoritos == null) {
        favoritos = [];
    }
    var filmeFavorito = JSON.stringify({
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        release_date: filme.release_date,
        overview: filme.overview,
        vote_average: filme.vote_average
    });
    favoritos.push(filmeFavorito);
    localStorage.setItem("Favoritos", JSON.stringify(favoritos));
    alert("Filme Adicionado aos Favoritos");
    return true;
  }
}
//__________________________________________________________________________________________