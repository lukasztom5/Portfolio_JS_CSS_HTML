//wybór kontynentu
function continentChoice(kontynent, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    kontynent.size = 5;
    kontynent.onchange = function () {
        this.size = 0;
        if (kontynent.id === "kontynentOd") {
            //przejście do funkcji z walutami
            currenciesListOd(kontynent.value, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        } else if (kontynent.id === "kontynentDo") {
            currenciesListDo(kontynent.value, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        }
    };
    kontynent.onblur = function () {
        this.size = 0;
    };
}
;
//wybór waluty
function currencyChoice(listaKontynent, kontynent, walutaLista, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    walutaLista.size = 5;
    walutaLista.onchange = function () {
        this.size = 0;
        if (listaKontynent.id === "kontynentOd") {
            //funkcja do listy krajów z walutą
            countryListOd(kontynent, walutaLista.value, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        } else if (listaKontynent.id === "kontynentDo") {
            countryListDo(kontynent, walutaLista.value, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        }
    };
    walutaLista.onblur = function () {
        this.size = 0;
    };
}
//usuwanie wartości z listy
function removeFromList(lista1) {
    while (lista1.length > 0) {
        lista1.pop();
    }
}
//usuwanie listy walut i elementów typu option
function removeCurrencyList(listaIdWalut, walutaLista) {
    for (let o = 0; o < listaIdWalut.length; o++) {
        removeFromList(listaIdWalut[o]);
    }
    if (walutaLista) {
        while (walutaLista.firstChild) {
            walutaLista.removeChild(walutaLista.firstChild);
        }
    }
}
//przywrócenie pierwszego elementu dla selecta dotyczącego walut
function createFirstOption(walutaLista) {
    var optionWaluta = document.createElement("option");
    optionWaluta.text = "Wybierz walutę";
    walutaLista.add(optionWaluta);
    optionWaluta.value = "wybierzWalute";
    optionWaluta.selected = true;
}
//funkcja do opisu czynności po wyborze kontynentu
function selectOdAfterChoosingContinent(listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    walutaListaOd.onmousedown = function () {
        currencyChoice(listaKontynentOd, listaKontynentOd.value, walutaListaOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
    listaKontynentOd.onmousedown = function () {
        removeCurrencyList(listaIdWalutOd, walutaListaOd);
        createFirstOption(walutaListaOd);
        continentChoice(listaKontynentOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
}
function selectDoAfterChoosingContinent(listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    walutaListaDo.onmousedown = function () {
        currencyChoice(listaKontynentDo, listaKontynentDo.value, walutaListaDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
    listaKontynentDo.onmousedown = function () {
        removeCurrencyList(listaIdWalutDo, walutaListaDo);
        createFirstOption(walutaListaDo);
        continentChoice(listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
}
//wczytanie listy walut
function currenciesListOd(kontynent, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    var walutaListaOd = document.getElementById("walutaOd");
    var listaKontynentOd = document.getElementById("kontynentOd");
    var walutaListaDo = document.getElementById("walutaDo");
    var listaKontynentDo = document.getElementById("kontynentDo");
    var opcjaKontynent1 = document.querySelector("div#formularzWalutyOd div div.kontynenty select#kontynentOd option:first-of-type");
    opcjaKontynent1.setAttribute("disabled", true);
    walutaListaOd.removeAttribute("disabled");
    var xmlhttp = new XMLHttpRequest();
    //plik jscon z walutami
    var url = "./JSON/currencies.json";
    //wczytywanie pliku json
    xmlhttp.onreadystatechange = function () {
        //status wczytywania pliku (4-Done) i czy jest ok (200 - OK)
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //zamiana JSON na obiekt
            var myArr = JSON.parse(xmlhttp.responseText);
            for (const o in myArr) {
                if (myArr[o].continent === kontynent) {
                    //dodanie do listy id waluty i nazwy
                    listaIdWalutOd[0].push(myArr[o].id);
                    listaIdWalutOd[1].push(myArr[o].currencyName);
                }
            }
            //tworzenie listy option dla selecta walut
            for (var o = 0; o < listaIdWalutOd[0].length; o++) {
                var optionWaluta = document.createElement("option");
                optionWaluta.text = listaIdWalutOd[0][o];
                walutaListaOd.add(optionWaluta);
            }

            selectOdAfterChoosingContinent(listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            selectDoAfterChoosingContinent(listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function currenciesListDo(kontynent, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    var walutaListaDo = document.getElementById("walutaDo");
    var listaKontynentDo = document.getElementById("kontynentDo");
    var walutaListaOd = document.getElementById("walutaOd");
    var listaKontynentOd = document.getElementById("kontynentOd");
    var opcjaKontynent1 = document.querySelector("div#formularzWalutyDo div div.kontynenty select#kontynentDo option:first-of-type");
    opcjaKontynent1.setAttribute("disabled", true);
    walutaListaDo.removeAttribute("disabled");
    var xmlhttp = new XMLHttpRequest();
    var url = "./JSON/currencies.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            for (const o in myArr) {
                if (myArr[o].continent === kontynent) {
                    listaIdWalutDo[0].push(myArr[o].id);
                    listaIdWalutDo[1].push(myArr[o].currencyName);
                }
            }
            for (var o = 0; o < listaIdWalutDo[0].length; o++) {
                var optionWaluta = document.createElement("option");
                optionWaluta.text = listaIdWalutDo[0][o];
                walutaListaDo.add(optionWaluta);
            }
            selectOdAfterChoosingContinent(listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            selectDoAfterChoosingContinent(listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//usuwanie elementów z ul i listy walut
function removeFromUl(ulOd, lista1) {
    removeFromList(lista1);
    if (ulOd) {
        while (ulOd.firstChild) {
            ulOd.removeChild(ulOd.firstChild);
        }
    }
}
//wybór kontynentu lub innej waluty po innym wyborze waluty
function continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia) {
    walutaListaOd.onmousedown = function () {
        removeFromUl(ulOd, lista1);
        removeFromList(lista1);
        button.setAttribute("disabled", true);
        h3Od.innerHTML = "Lista Krajów";
        currencyChoice(listaKontynentOd, listaKontynentOd.value, walutaListaOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
    listaKontynentOd.onmousedown = function () {
        removeFromUl(ulOd, lista1);
        removeCurrencyList(listaIdWalutOd, walutaListaOd);
        createFirstOption(walutaListaOd);
        button.setAttribute("disabled", true);
        h3Od.innerHTML = "Lista Krajów";
        continentChoice(listaKontynentOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
}
function continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia) {
    walutaListaDo.onmousedown = function () {
        removeFromList(lista1);
        removeFromUl(ulDo, lista1);
        button.setAttribute("disabled", true);
        h3Do.innerHTML = "Lista Krajów";
        currencyChoice(listaKontynentDo, listaKontynentDo.value, walutaListaDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
    listaKontynentDo.onmousedown = function () {
        removeCurrencyList(listaIdWalutDo, walutaListaDo);
        removeFromUl(ulDo, lista1);
        createFirstOption(walutaListaDo);
        removeFromList(lista1);
        button.setAttribute("disabled", true);
        h3Do.innerHTML = "Lista Krajów";
        continentChoice(listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
}
//funkcja do listy krajów z daną walutą
function countryListOd(kontynent, waluta, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    var walutaListaOd = document.getElementById("walutaOd");
    var listaKontynentOd = document.getElementById("kontynentOd");
    var walutaListaDo = document.getElementById("walutaDo");
    var listaKontynentDo = document.getElementById("kontynentDo");
    var ulOd = document.getElementById("krajeWalutaOd");
    var ulDo = document.getElementById("krajeWalutaDo");
    var h3Od = document.getElementById("walutaKrajeOd");
    var h3Do = document.getElementById("walutaKrajeDo");
    //wyświetlenie nazwy waluty w nagłówku ul
    if (listaIdWalutOd[0].indexOf(walutaListaOd.value) !== -1) {
        let s = "Lista Krajów - " + listaIdWalutOd[1][listaIdWalutOd[0].indexOf(walutaListaOd.value)];
        h3Od.innerHTML = s;
    }
    var opcjaWaluta1 = document.querySelector("div#formularzWalutyOd div div.waluty select#walutaOd option:first-of-type");
    opcjaWaluta1.setAttribute("disabled", true);
    //przycisk do przeliczania walut
    var button = document.getElementById("oblicz");
    var xmlhttp = new XMLHttpRequest();
    var url = "./JSON/countries.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            for (const o in myArr) {
                //lista krajów z daną walutą
                if (myArr[o].continent === kontynent && myArr[o].currencyId === waluta) {
                    lista1.push(myArr[o].name);
                }
            }
            //sortowanie listy
            lista1.sort();
            //dodanie elementów li do ul
            for (var o = 0; o < lista1.length; o++) {
                var liKraj = document.createElement("li");
                liKraj.innerHTML = lista1[o];
                ulOd.appendChild(liKraj);
            }
            continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia);
            continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia);
            //dodanie id walut do listy
            listaDoObliczenia[0] = walutaListaOd.value.substr(0, 3);
            listaDoObliczenia[1] = walutaListaDo.value;
            //przejście do funkcji przeliczania walut
            przeliczWaluty(listaDoObliczenia, listaIdWalutOd, listaIdWalutDo, lista1);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function countryListDo(kontynent, waluta, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    var walutaListaDo = document.getElementById("walutaDo");
    var listaKontynentDo = document.getElementById("kontynentDo");
    var walutaListaOd = document.getElementById("walutaOd");
    var listaKontynentOd = document.getElementById("kontynentOd");
    var ulDo = document.getElementById("krajeWalutaDo");
    var ulOd = document.getElementById("krajeWalutaOd");
    var button = document.getElementById("oblicz");
    var opcjaWaluta1 = document.querySelector("div#formularzWalutyDo div div.waluty select#walutaDo option:first-of-type");
    var h3Od = document.getElementById("walutaKrajeOd");
    var h3Do = document.getElementById("walutaKrajeDo");
    if (listaIdWalutDo[0].indexOf(walutaListaDo.value) !== -1) {
        let s = "Lista Krajów - " + listaIdWalutDo[1][listaIdWalutDo[0].indexOf(walutaListaDo.value)];
        h3Do.innerHTML = s;
    }
    opcjaWaluta1.setAttribute("disabled", true);
    var xmlhttp = new XMLHttpRequest();
    var url = "./JSON/countries.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            for (const o in myArr) {
                if (myArr[o].continent === kontynent && myArr[o].currencyId === waluta) {
                    lista1.push(myArr[o].name);
                }
            }
            lista1.sort();
            for (var o = 0; o < lista1.length; o++) {
                var liKraj = document.createElement("li");
                liKraj.innerHTML = lista1[o];
                ulDo.appendChild(liKraj);
            }
            continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia);
            continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia);

            listaDoObliczenia[1] = walutaListaDo.value.substr(0, 3);
            listaDoObliczenia[0] = walutaListaOd.value;
            przeliczWaluty(listaDoObliczenia, listaIdWalutOd, listaIdWalutDo, lista1);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//funkcja do przeliczania walut
function przeliczWaluty(listaDoObliczenia, listaIdWalutOd, listaIdWalutDo, lista1) {
    var button = document.getElementById("oblicz");
    var poleWartosci = document.getElementById("wartosc");
    //panel podsumowujący obliczenia
    var poleWynik = document.getElementById("wynik");
    var selectWaluty = document.querySelectorAll("div#glownyPanel div#panel div#panele div.paneleWalut div.formularze div div.waluty select");
    //licznik dla sytuacji, gdy if (myArr[o].id === idStopa)===false
    var liczbaFail = 0;
    //tworzenie id dla pliku JSON
    var idStopa = listaDoObliczenia[0] + "_" + listaDoObliczenia[1];
    var walutaListaOd = document.getElementById("walutaOd");
    var walutaListaDo = document.getElementById("walutaDo");
    var listaKontynentOd = document.getElementById("kontynentOd");
    var listaKontynentDo = document.getElementById("kontynentDo");
    var ulDo = document.getElementById("krajeWalutaDo");
    var ulOd = document.getElementById("krajeWalutaOd");
    var h3Od = document.getElementById("walutaKrajeOd");
    var h3Do = document.getElementById("walutaKrajeDo");
    var xmlhttp = new XMLHttpRequest();
    var url = "./JSON/valuesCurrency.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            for (const o in myArr) {
                //co jeśli idstopy jest w pliku JSON
                if (myArr[o].id === idStopa) {
                    //co jeśli są wartości
                    if (listaDoObliczenia[0] && listaDoObliczenia[1] && poleWartosci.value) {
                        button.removeAttribute("disabled");
                        button.onclick = function () {
                            //co jeśli wartość w inpucie istnienie i jest większa lub równa 0;
                            if (poleWartosci.value >= 0 && poleWartosci.value.length > 0) {
                                poleWartosci.classList.remove('error');
                                //wzór do przeliczania walut
                                var wartoscWalut = Math.round(poleWartosci.value * myArr[o].val * 1000) / 1000;
                                //opis w panelu podsumowującym
                                var opis = poleWartosci.value + " " + listaDoObliczenia[0] + " = " + (wartoscWalut + " " + listaDoObliczenia[1]);
                                poleWynik.innerHTML = opis;
                                continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia);
                                continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia);
                            } 
                            //co jeśli wartość w inpucie; istnieje, ale jest mniejsze od 0;
                            else if (poleWartosci.value.length > 0 && poleWartosci.value < 0) {
                                poleWartosci.classList.add('error');
                                poleWynik.innerHTML = "Nie można obliczyć dla wartości poniżej 0.";
                                continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia);
                                continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia);

                            } 
                            //co jeśli nie ma wartości w inpucie;
                            else if (poleWartosci.value.length === 0) {
                                poleWartosci.classList.add('error');
                                poleWynik.innerHTML = "Brak wartości do obliczenia";
                                continentWalutaOd(button, h3Od, listaKontynentOd, walutaListaOd, listaIdWalutOd, listaIdWalutDo, ulOd, lista1, listaDoObliczenia);
                                continentWalutaDo(button, h3Do, listaKontynentDo, walutaListaDo, listaIdWalutOd, listaIdWalutDo, ulDo, lista1, listaDoObliczenia);
                            }
                        };
                    }
                }
                //co jeśli nie ma danej idstopy
                else {
                    liczbaFail++;
                }
            }
            //co jeśli nie ma idstopy w pliku JSON, ale są wartości i wartość liczbaFail jest równa wartości wielkości obiektu
            if (liczbaFail === Object.keys(myArr).length && (listaDoObliczenia[0] !== "wybierzWalute" && listaDoObliczenia[1] !== "wybierzWalute")) {
                poleWynik.innerHTML = "Dla walut: " + listaDoObliczenia[0] + " i " + listaDoObliczenia[1] + " nie można obliczyć. Brak stopy";
                for (let o = 0; o < selectWaluty.length; o++) {
                    selectWaluty[o].classList.add('error');
                }

            }
            //co jeśli nie ma idstopy w pliku JSON i wartości, a wartość liczbaFail jest równa wartości wielkości obiektu
            else {
                poleWynik.innerHTML = "";
                for (let o = 0; o < selectWaluty.length; o++) {
                    selectWaluty[o].classList.remove('error');
                }
            }
        }
        ;
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//funkcja do opisu czynności po wpisaniu lub zmianie wartości
function afterChangeOrInputValue(poleWartosci, listaKontynentOd, listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia) {
    if (poleWartosci.value !== "") {
        listaKontynentOd.removeAttribute("disabled");
        listaKontynentDo.removeAttribute("disabled");
        poleWartosci.classList.remove('error');
        //kliknięcie na select z listą kontynentów
        listaKontynentOd.onmousedown = function () {
            continentChoice(listaKontynentOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            listaKontynentDo.onmousedown = function () {
                continentChoice(listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            };
        };
        listaKontynentDo.onmousedown = function () {
            continentChoice(listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            listaKontynentOd.onmousedown = function () {
                continentChoice(listaKontynentOd, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
            };
        };
    }
}
//Akcja po wczytaniu aplikacji
window.onload = function () {
    //lista walut i nazw walut dla obszaru z "Z jakiej waluty?";
    var listaIdWalutOd = [[], []];
    //lista id walut do przeliczenia
    var listaDoObliczenia = [];
    //lista walut i nazw walut dla obszaru z "Na jaką walutę?";
    var listaIdWalutDo = [[], []];
    var lista1 = [];
    //select z nazwami kontynentów
    var listaKontynentOd = document.getElementById("kontynentOd");
    var listaKontynentDo = document.getElementById("kontynentDo");
    //pole do wpisania wartości
    var poleWartosci = document.getElementById("wartosc");
    //co się stanie po zmianie wartości w inpucie
    poleWartosci.onchange = function () {
        afterChangeOrInputValue(poleWartosci, listaKontynentOd, listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
    //co się stanie po wstawieniu wartości w inpucie
    poleWartosci.oninput = function () {
        afterChangeOrInputValue(poleWartosci, listaKontynentOd, listaKontynentDo, listaIdWalutOd, listaIdWalutDo, lista1, listaDoObliczenia);
    };
};




