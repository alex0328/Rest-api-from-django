
document.addEventListener("DOMContentLoaded", function() {
    console.log('Ok');

    var url = 'http://127.0.0.1:8000/book/';

var button = document.getElementById('button');
button.addEventListener('click',ajax);


function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('hej');
            var result = JSON.parse(xhr.responseText);
            action(result);

        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
    button.removeEventListener("click",ajax);

}


function action(result) {
    var abz = document.getElementById('addDiv');
    for (var i = 0; i < result.length; i++) {
        var created_div = document.createElement('div');
        abz.appendChild(created_div);
            for (var s in result[i]) {
                var wiersz = document.createElement('h3');
                var wartosc = document.createElement('p');
                var wiersz_calosc = document.createElement('div');
                wiersz_calosc.setAttribute('class', 'wiersz_calosc');
                wiersz.setAttribute('class','wiersz');
                wartosc.setAttribute('class','wartosc');
                created_div.setAttribute('class', 'created_div');
                wiersz.innerHTML = [s]+':';
                wartosc.innerHTML = result[i][s];
                created_div.appendChild(wiersz_calosc);
                wiersz_calosc.appendChild(wiersz);
                wiersz_calosc.appendChild(wartosc);
            }
        }
    }
});