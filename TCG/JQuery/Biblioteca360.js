$(document).ready(function () {
  var item, tile, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  //escucha del botón de búsqueda
  $("#search").click(function () {
    outputList.innerHTML = ""; // salida html vacía
    document.body.style.backgroundImage = "url('')";
    searchData = $("#search-box").val();
    //manejando el campo de entrada de búsqueda vacío
    if (searchData === "" || searchData === null) {
      displayError();
    }
    else {
      // console.log(searchData);
      // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function (response) {
          console.log(response)
          if (response.totalItems === 0) {
            alert("No Hay Resultados!.. intenta otre vez")
          }
          else {
            $("#title").animate({ 'margin-top': '5px' }, 1000); //animación del cuadro de búsqueda

            $(".book-list").css("visibility", "visible");
            displayResults(response);
          }
        },
        error: function () {
          alert("Biblioteca360 dice : Algo Salio.. <br>" + "Intentalo de nuevo!");
        }
      });
    }
    $("#search-box").val(""); //limpiar cuadro de búsqueda
  });

  /*
* función para mostrar el resultado en index.html
  * @param respuesta del parámetro
  */
  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
      bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

      // en el código de producción, item.text debería tener escape las entidades HTML.
      outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
        formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
        '</div>';

      console.log(outputList);
    }
  }

  /*
 * formateador de elementos de tarjeta usando comillas invertidas y plantillas de es6 (tarjeta individual)
  * @param bookImg título autor editor bookLink
  * @return htmlCard
  */
  function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
    // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
    var viewUrl = 'book.html?isbn=' + bookIsbn; //construyendo enlace para bookviewer
    var htmlCard = `<div class="col-lg-6">
         <div class="card" style="">
           <div class="row no-gutters">
             <div class="col-md-4">
               <img src="${bookImg}" class="card-img" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Author: ${author}</p>
                 <p class="card-text">Publisher: ${publisher}</p>
                 <a target="_blank" href="${viewUrl}" class="btn btn-secondary"> Leer Libro </a>
               </div>
             </div>
           </div>
         </div>
       </div>`
    return htmlCard;
  }

  //error de manejo para el cuadro de búsqueda vacío
  function displayError() {
    alert("El término de búsqueda no puede estar vacío.!")
  }

});
