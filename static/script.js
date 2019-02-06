
document.addEventListener("DOMContentLoaded", function() {
    console.log('Ok aaa');


    var url = 'http://127.0.0.1:8000/book/';

/*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log('hej');
        if (xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);

            /*var div = document.getElementById('addDiv');
            for (var i = 0; i < result.length; i++) {
                var para = document.createElement("p");
                var title = result[i].title;
                div.appendChild(para);
            }
            onSuccess(result);

        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }

        xhr.send();

    }*/

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('hej');
        var result = JSON.parse(xhr.responseText);
        var abz = document.getElementById('addDiv');
        console.log('amenej');
        for (var i = 0; i < result.length; i++) {
            var h3author = document.createElement("h3");
            var h3title = document.createElement("h3");
            var pisbn = document.createElement("p");
            var ppublisher = document.createElement("p");
            var pgenre = document.createElement("p");
            var idd = result[i].id;
            var authorr = result[i].author;
            var title = result[i].title;
            var isbn = result[i].isbn;
            var publisher = result[i].publisher;
            var genre = result[i].genre;
            
            h3author.innerHTML = authorr;
            h3title.innerHTML = title;
            pisbn.innerHTML = isbn;
            ppublisher.innerHTML = publisher;
            pgenre.innerHTML = genre;
            abz.appendChild(h3author);
            abz.appendChild(h3title);
            abz.appendChild(pisbn);
            abz.appendChild(ppublisher);
            abz.appendChild(pgenre);
        }
    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();




});