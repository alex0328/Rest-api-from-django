
document.addEventListener("DOMContentLoaded", function() {
    console.log('Ok');

    var url = 'http://127.0.0.1:8000/book/';

    var button = document.getElementById('button');
    button.addEventListener('click', ajax);


    function ajax() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                action(result);

            } else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();


        function action(result) {
            var abz = document.getElementById('addDiv');
            var new_div = document.createElement('div');
            new_div.setAttribute('id','inside_div');
            abz.appendChild(new_div);
            for (var i = 0; i < result.length; i++) {
                var h3title = document.createElement("h4");
                h3title.setAttribute('class', 'tytul');
                var bid = document.createElement('p');
                bid.setAttribute('style', 'display:none');
                var emptyDiv = document.createElement('div');
                emptyDiv.setAttribute('class', 'empty_div');
                var but_delete = document.createElement('button_del');
                but_delete.setAttribute('class','del_button');
                var title = result[i].title;
                var id = result[i].id;
                h3title.innerHTML = '<p>Tytuł:</p> '+title;
                bid.innerHTML =id;
                new_div.appendChild(h3title);
                new_div.appendChild(bid);
                new_div.appendChild(emptyDiv);
                new_div.appendChild(but_delete);
                but_delete.innerHTML = 'Usuń';

        }
            daj_reszte_danych();
            var usun = document.getElementsByClassName('del_button');
            for (var i = 0; i<usun.length; i++) {
                usun[i].addEventListener('click', function () {
                    var book_position = this.previousElementSibling.previousElementSibling.textContent;
                    console.log(book_position);
                    url_del = 'http://127.0.0.1:8000/book/'+book_position;
                    function delete_book() {
                        if (confirm('Czy chcesz usunąć tę pozycję?')) {
                                                    var xhr = new XMLHttpRequest();
                        xhr.open('DELETE', url_del);
                        xhr.onload = function () {
                            if (xhr.status === 204){
                                alert('Usunięto książkę');
                                var abc = document.getElementById('inside_div')
                                if (abc) {
                                    abc.parentNode.removeChild(abc);
                                    ajax()
                                }
                                else {ajax()}
                            }
                            else {
                                alert('Chyba coś się zjebało');
                            }
                        }
                        xhr.send();

                        }
                        else {
                            alert('Nie to nie');
                        }

                        }
delete_book();

                    });
            }
    }
    button.removeEventListener("click", ajax);

}


function daj_reszte_danych() {
        var tytul_event_l = document.getElementsByClassName('tytul');
        for (var k = 0; k < tytul_event_l.length; k++) {
            var object_listener = tytul_event_l[k];
            object_listener.addEventListener('click', na_klik);
            function na_klik(object_listener) {
            var book_id = this.nextSibling.textContent;
            var book_id_tag = this.nextSibling;
            var url2 = 'http://127.0.0.1:8000/book/'+book_id;
            function get_book_info() {
                var xhr = new XMLHttpRequest();
                    xhr.open('GET', url2);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            var result2 = JSON.parse(xhr.responseText);
                            action2(result2, book_id_tag);
                        } else {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };
                    xhr.send();
            }
            get_book_info();
            this.nextSibling.nextSibling.setAttribute('style','display:block');
            this.removeEventListener('click',na_klik);
            var znikaj = this.nextSibling.nextSibling;
            this.addEventListener('click', function () {
                var wartosc_css = znikaj.getAttribute('style')
                if (wartosc_css === 'display:block') {
                    znikaj.setAttribute('style','display:none');
                }
                else {
                    znikaj.setAttribute('style','display:block');
                }

                });

            }
        }

    }


function action2(result2, book_id_tag) {
        var this_div = book_id_tag.nextSibling;
        var from_ajax_id = document.createElement('h3');
        var from_ajax_author = document.createElement('p');
        var from_ajax_isbn = document.createElement('p');
        var from_ajax_publisher = document.createElement('p');
        var from_ajax_genre = document.createElement('p');
        this_div.appendChild(from_ajax_id);
        this_div.appendChild(from_ajax_author);
        this_div.appendChild(from_ajax_isbn);
        this_div.appendChild(from_ajax_publisher);
        this_div.appendChild(from_ajax_genre);
        from_ajax_author.innerHTML='Autor: '+result2.author;
        from_ajax_isbn.innerHTML='ISBN: '+result2.isbn;
        from_ajax_publisher.innerHTML='Wydawca: '+result2.publisher;
        from_ajax_genre.innerHTML='Rodzaj: '+result2.genre;
        }


        /*form add data */

var submit = document.getElementById('submit_form');
submit.addEventListener('click', function (submit) {
    submit.preventDefault();
    console.log('naciśnięto');
    var tittle_form = document.getElementById('title').value;
    var author_form = document.getElementById('author').value;
    var isbn_form = document.getElementById('isbn').value;
    var publisher_form = document.getElementById('publisher').value;
    var genre_form = document.getElementById('genre').value;

    var object_before_json = {'author':author_form,
                        'title':tittle_form,
                        'isbn':isbn_form,
                        'publisher':publisher_form,
                        'genre':genre_form};
    console.log(object_before_json);
    var object_json = JSON.stringify(object_before_json);
    console.log(object_json);
            function send_new_book(jajcon) {
                var url_add = 'http://127.0.0.1:8000/book/';
                var xhr = new XMLHttpRequest();
                    xhr.open('POST', url_add);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jajcon);
            }
            send_new_book(object_json, status);
            var abc = document.getElementById('inside_div')
            if (abc) {
                abc.parentNode.removeChild(abc);
                ajax()
            }
            else {ajax()}
});
});




