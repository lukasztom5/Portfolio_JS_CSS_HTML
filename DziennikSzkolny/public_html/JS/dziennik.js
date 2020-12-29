//wybranie rodzaju oceny, a następnie oceny
function scrollSizeKategoria(select, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {
    var selectList = document.getElementById("listaOcen");
    select.size = 2;
       select.onchange = function () {
            this.size = 0;
            selectList.onmousedown = function () {
                selectList.size = 2;
                selectList.onchange = function () {
                    selectList.size = 0;
                    selectValues(select.value, selectList.value, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
                };
            };
        }; 
        select.onblur = function () {
            this.size = 0;
        };
}
;
//wybranie oceny, a następnie rodzaju
function scrollSizeOcena(select, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {
    var selectList = document.getElementById("listaKategorii");
    select.size = 2;
        select.onchange = function () {
            this.size = 0;
            selectList.onmousedown = function () {
                selectList.size = 2;
                selectList.onchange = function () {
                    selectList.size = 0;
                    selectValues(selectList.value, select.value, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
                };
            };
        };
        select.onblur = function () {
            this.size = 0;
        };
}
;
//dodanie oceny do listy i ponowny wybór rodzaju i oceny
function selectValues(wartoscKategoria, wartoscOcena, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {

    var oceny = [];
    var kategorie = [];
    var listaKategorii = document.getElementById("listaKategorii");
    var listaOcen = document.getElementById("listaOcen");
    var dodajOcene = document.getElementById("dodajOceneButton");
    var opcjaPierwszaKategoria = document.querySelector("div#kategoria select#listaKategorii option:first-of-type");
    var opcjaPierwszaOcena = document.querySelector("div#oceny select#listaOcen option:first-of-type");
    //dodanie ocen z selectu do listy
    for (var i = 1; i < listaOcen.length; i++) {
        oceny[i - 1] = listaOcen[i].value;
    }
    //dodanie kategorii z selectu do kategorii
    for (var i = 1; i < listaKategorii.length; i++) {
        kategorie[i - 1] = listaKategorii[i].value;
    }
    //co jeśli ocena i kategoria są wybrane
    if (kategorie.indexOf(wartoscKategoria) !== -1 && oceny.indexOf(wartoscOcena) !== -1) {
        dodajOcene.removeAttribute("disabled");
        opcjaPierwszaKategoria.setAttribute("disabled", true);
        opcjaPierwszaOcena.setAttribute("disabled", true);
        //co się stanie po kliknięciu przycisku "Dodaj ocenę"
        dodajOcene.onclick = function () {
            let opisOcena = listaOcen[oceny.indexOf(wartoscOcena) + 1].innerHTML;
            dodajDoListyOcen(wartoscKategoria, wartoscOcena, opisOcena, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
            dodajOcene.setAttribute("disabled", true);
            opcjaPierwszaKategoria.removeAttribute("disabled");
            opcjaPierwszaOcena.removeAttribute("disabled");
            listaKategorii.selectedIndex = 0;
            listaOcen.selectedIndex = 0;
            //ponowny wybór kategorii
            listaKategorii.onmousedown = function () {
                scrollSizeKategoria(listaKategorii, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
            };
            //ponowny wybór oceny
            listaOcen.onmousedown = function () {
                scrollSizeOcena(listaOcen, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
            };
        };
    }
}
//ustawienia po kliknięciu przycisk "Dodaj Ocenę"
function ocenySemestr(button, idOceny, idWartosc, listItem1, listItem2) {
    button.removeAttribute("disabled");
    var ocenaLista = document.getElementById(idOceny);
    var wartoscLista = document.getElementById(idWartosc);
    ocenaLista.appendChild(listItem1);
    wartoscLista.appendChild(listItem2);
}
//usuwanie wartości z listy, po kliknięciu przycisku "Resetuj Oceny"
function resetListaOcenySemestr(lista, listaSemestr, wartoscOcena) {
    var index = listaSemestr.indexOf(wartoscOcena);
    for (let o = 0; o < lista.length; o++) {
        if (index !== -1)
            listaSemestr.splice(index, 1);
        lista.shift();
    }
}
//usuwanie ocen z panelu np. Sprawdziany
function resetOcenySemestr(ocenaLista, wartoscLista, button) {
    var listaLi1 = document.querySelector(ocenaLista);
    var listaLi2 = document.querySelector(wartoscLista);
    var child1 = listaLi1.lastElementChild;
    var child2 = listaLi2.lastElementChild;
    while (child1) {
        listaLi1.removeChild(child1);
        child1 = listaLi1.lastElementChild;
    }
    while (child2) {
        listaLi2.removeChild(child2);
        child2 = listaLi2.lastElementChild;
    }
    button.setAttribute("disabled", true);
}
//dezaktywowanie przycisku i inputy typu radio
function disableSemestrButton(button) {
    button.setAttribute("disabled", true);
    disableRadios();
}
//ustawienie disabled na inputy, które mają wartość atrybutu checked false.
function disableRadios() {
    var radioList = document.getElementsByClassName("radioSrednia");
    for (let o = 0; o < radioList.length; o++) {
        if (radioList[o].checked === false) {
            radioList[o].setAttribute("disabled", true);
        }
    }
}
//liczenie średniej ważonej
function obliczWazonaSredniaSemestr(sprawdzian, kartkowka, inne) {
    let sumaSprawdzian = 0.0;
    let sumaKartkowka = 0.0;
    let sumaInne = 0.0;
    //liczenie sumy ocen za sprawdziany
    for (let o = 0; o < sprawdzian.length; o++) {
        sumaSprawdzian += parseFloat(sprawdzian[o]);
    }
    //liczenie sumy ocen za kartkówki
    for (let o = 0; o < kartkowka.length; o++) {
        sumaKartkowka += parseFloat(kartkowka[o]);
    }
    //liczenie sumy ocen za inne np. aktywność lub odpowiedź
    for (let o = 0; o < inne.length; o++) {
        sumaInne += parseFloat(inne[o]);
    }
    var sumaCalkowita = sumaSprawdzian * 0.5 + sumaKartkowka * 0.3 + sumaInne * 0.2;
    var iloscCalkowita = sprawdzian.length * 0.5 + kartkowka.length * 0.3 + inne.length * 0.2;
    return Math.round(sumaCalkowita / iloscCalkowita * 100) / 100;
}
//obliczanie średniej arytmetycznej
function obliczArytmetycznaSredniaSemestr(lista) {
    let suma = 0.0;
    for (let o = 0; o < lista.length; o++) {
        suma += parseFloat(lista[o]);
    }
    return Math.round(suma / lista.length * 100) / 100;
}
//dokładna wartość oceny
function dokladnaWartoscOCeny(ocena) {
    if (ocena < 1.6) {
        return 1;
    } else if (ocena >= 1.6 && ocena < 2.6) {
        return 2;
    } else if (ocena >= 2.6 && ocena < 3.6) {
        return 3;
    } else if (ocena >= 3.6 && ocena < 4.6) {
        return 4;
    } else if (ocena >= 4.6 && ocena < 5.6) {
        return 5;
    } else if (ocena >= 5.6) {
        return 6;
    }
}
//resetowanie panelu z rodzajem i ocenami
function resetOcenaKategoriaPanel(){
            var listaKategorii = document.getElementById("listaKategorii");
            var listaOcen = document.getElementById("listaOcen");
            var dodajOcene = document.getElementById("dodajOceneButton"); 
            var opcjaPierwszaKategoria = document.querySelector("div#kategoria select#listaKategorii option:first-of-type");
            var opcjaPierwszaOcena = document.querySelector("div#oceny select#listaOcen option:first-of-type");
            dodajOcene.setAttribute("disabled", true);
            opcjaPierwszaKategoria.removeAttribute("disabled");
            opcjaPierwszaOcena.removeAttribute("disabled");
            listaKategorii.selectedIndex = 0;
            listaOcen.selectedIndex = 0;
 }
 //dodawanie oceny na panel, a potem na panel z ocenami semestralnymi
function dodajDoListyOcen(kategoria, wartoscOcena, ocenaOpis, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {
    var radioWazona = document.getElementById("wazona");
    var radioArytmetyczna = document.getElementById("arytmetyczna");
    var semestrButton = document.querySelector("div#ocenaSemestr>button");
    var listItem1 = document.createElement("li");
    var listItem2 = document.createElement("li");
    var resetSprawdzian = document.querySelector("div#sprawdzianReset button");
    var resetKartkowka = document.querySelector("div#kartkowkaReset button");
    var resetInne = document.querySelector("div#inneReset button");
    var liSprawdziany = document.querySelectorAll("ul.sprawdzianyOceny");
    var liKartkowki = document.querySelectorAll("ul.kartkowkiOceny");
    var liInne = document.querySelectorAll("ul.pozostaleOceny");
    listItem1.innerHTML = ocenaOpis;
    listItem2.innerHTML = wartoscOcena;
    if(listaRok.length===0){
       radioWazona.removeAttribute("disabled");
        radioArytmetyczna.removeAttribute("disabled"); 
    }
    else{
        semestrButton.removeAttribute("disabled");
    }
    //dodanie oceny do konkretnego panelu zależnie od kategorii
    if (kategoria === "Sprawdzian") {
        ocenySemestr(resetSprawdzian, "ocenySprawdzian", "wartoscSprawdzian", listItem1, listItem2);
        listaOcenySprawdzian.push(wartoscOcena);
        listaSemestr.push(wartoscOcena);
    } else if (kategoria === "Kartkówka") {
        ocenySemestr(resetKartkowka, "ocenyKartkowka", "wartoscKartkowka", listItem1, listItem2);
        listaKartkowka.push(wartoscOcena);
        listaSemestr.push(wartoscOcena);
    } else if (kategoria === "Inne") {
        ocenySemestr(resetInne, "ocenyInne", "wartoscInne", listItem1, listItem2);
        listaInne.push(wartoscOcena);
        listaSemestr.push(wartoscOcena);
    }
    //resetowanie ocen za sprawdziany
    resetSprawdzian.onclick = function () {
        resetOcenySemestr('#ocenySprawdzian', '#wartoscSprawdzian', resetSprawdzian);
        resetListaOcenySemestr(listaOcenySprawdzian, listaSemestr, wartoscOcena);
        disableRadios();
        if(listaKartkowka.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
        resetOcenaKategoriaPanel();
    };
    //resetowanie ocen za kartkówki
    resetKartkowka.onclick = function () {
        resetOcenySemestr('#ocenyKartkowka', '#wartoscKartkowka', resetKartkowka);
        resetListaOcenySemestr(listaKartkowka, listaSemestr, wartoscOcena);
        disableRadios();
        if(listaOcenySprawdzian.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
        resetOcenaKategoriaPanel();
    };
    //resetowanie ocen za inne
    resetInne.onclick = function () {
        resetOcenySemestr('#ocenyInne', '#wartoscInne', resetInne);
        resetListaOcenySemestr(listaInne, listaSemestr, wartoscOcena);
        disableRadios();
        if(listaOcenySprawdzian.length===0 && listaKartkowka.length===0)
                    disableSemestrButton(semestrButton);
        resetOcenaKategoriaPanel();
    };
    //gdy wybrano opcję "Średnia ważona"
    radioWazona.onclick = function () {
        if (listaOcenySprawdzian.length > 0 || listaKartkowka.length > 0 || listaInne.length > 0) {
            semestrButton.removeAttribute("disabled");
            resetSprawdzian.onclick = function () {
                resetOcenySemestr('#ocenySprawdzian', '#wartoscSprawdzian', resetSprawdzian);
                resetListaOcenySemestr(listaOcenySprawdzian, listaSemestr, wartoscOcena);
                if(listaKartkowka.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            resetKartkowka.onclick = function () {
                resetOcenySemestr('#ocenyKartkowka', '#wartoscKartkowka', resetKartkowka);
                resetListaOcenySemestr(listaKartkowka, listaSemestr, wartoscOcena);
                if(listaOcenySprawdzian.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            resetInne.onclick = function () {
                resetOcenySemestr('#ocenyInne', '#wartoscInne', resetInne);
                resetListaOcenySemestr(listaInne, listaSemestr, wartoscOcena);
                if(listaOcenySprawdzian.length===0 && listaKartkowka.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            //kliknięcie na przycisk "Ocena na semestr"
            semestrButton.onclick = function () {
                let ocena = obliczWazonaSredniaSemestr(listaOcenySprawdzian, listaKartkowka, listaInne);
                let dokladnaOcena = dokladnaWartoscOCeny(ocena);
                listaRok.push(dokladnaOcena);
                dodajOceneNaListeSemestralnych(dokladnaOcena, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
                resetOcenaKategoriaPanel();
                radioWazona.setAttribute("disabled",true);
            };
        }
    };
    //gdy wybrano opcję "Średnia arytmetyczna"
    radioArytmetyczna.onclick = function () {
        if (liSprawdziany.length > 0 || liKartkowki.length > 0 || liInne.length > 0) {
            semestrButton.removeAttribute("disabled");
            resetSprawdzian.onclick = function () {
                resetOcenySemestr('#ocenySprawdzian', '#wartoscSprawdzian', resetSprawdzian);
                resetListaOcenySemestr(listaOcenySprawdzian, listaSemestr, wartoscOcena);
                if(listaKartkowka.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            resetKartkowka.onclick = function () {
                resetOcenySemestr('#ocenyKartkowka', '#wartoscKartkowka', resetKartkowka);
                resetListaOcenySemestr(listaKartkowka, listaSemestr, wartoscOcena);
                if(listaOcenySprawdzian.length===0 && listaInne.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            resetInne.onclick = function () {
                resetOcenySemestr('#ocenyInne', '#wartoscInne', resetInne);
                resetListaOcenySemestr(listaInne, listaSemestr, wartoscOcena);
                if(listaOcenySprawdzian.length===0 && listaKartkowka.length===0)
                    disableSemestrButton(semestrButton);
                resetOcenaKategoriaPanel();
            };
            semestrButton.onclick = function () {
                let ocena = obliczArytmetycznaSredniaSemestr(listaSemestr);
                let dokladnaOcena = dokladnaWartoscOCeny(ocena);
                listaRok.push(dokladnaOcena);
                dodajOceneNaListeSemestralnych(dokladnaOcena, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
                resetOcenaKategoriaPanel();
                radioArytmetyczna.setAttribute("disabled",true);
            };
        }
    };
}
;
//czyszczenie panelów
function removeAllOcenySemestr() {
    var buttons = document.querySelectorAll("div.reset button");
    var liList = document.querySelectorAll("ul");
    for (let i = 0; i < liList.length; i++) {
        var child = liList[i].lastElementChild;
        while (child) {
            liList[i].removeChild(child);
            child = liList[i].lastElementChild;
        }
    }
    for (let b = 0; b < buttons.length; b++) {
        buttons[b].setAttribute("disabled", true);
    }
}
;
//usuwanie ocen semestralnych
function removeOcenyAll() {
    removeAllOcenySemestr();
    var button = document.querySelector("div#semestrReset button");
    var liList = document.querySelector("ol");
    var child = liList.lastElementChild;
    while (child) {
        liList.removeChild(child);
        child = liList.lastElementChild;
    }
    button.setAttribute("disabled", true);
}
;
//usuwanie ocen semestralnych po wyliczeniu oceny rocznej
function removeFromSemestrLabel() {
    var liList = document.querySelector("ol");
    var child = liList.lastElementChild;
    while (child) {
        liList.removeChild(child);
        child = liList.lastElementChild;
    }
}
//usuwanie ocen z list
function removeFromOcenySemestrLista(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr) {
    for (let o = 0; o < listaOcenySprawdzian.length; o++) {
        listaOcenySprawdzian.shift();
    }
    for (let o = 0; o < listaKartkowka.length; o++) {
        listaKartkowka.shift();
    }
    for (let o = 0; o < listaInne.length; o++) {
        listaInne.shift();
    }
    for (let o = 0; o < listaSemestr.length; o++) {
        listaSemestr.shift();
    }
}
//usuwanie ocen cd.
function removeFromOcenyAll(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {
    removeFromOcenySemestrLista(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr);
    while(listaRok.length>0){
        listaRok.pop();
    }
}
//liczenie oceny rocznej
function ocenaRoczna(listaRok) {
    var radioWazona = document.getElementById("wazona");
    var radioArytmetyczna = document.getElementById("arytmetyczna");
    if (radioWazona.checked === true) {
        return 0.4 * listaRok[0] + 0.6 * listaRok[1];
    } else if (radioArytmetyczna.checked === true) {
        let suma = listaRok[0] + listaRok[1];
        return Math.round((suma) / 2 * 100) / 100;
    }
}
;
//ocena wypisana słownie
function ocenaSlowna(ocena) {
    switch (ocena) {
        case 1:
            return "niedostateczny";
            break;
        case 2:
            return "dopuszczający";
            break;
        case 3:
            return "dostateczny";
            break;
        case 4:
            return "dobry";
            break;
        case 5:
            return "bardzo dobry";
            break;
        case 6:
            return "celujący";
            break;
    }
}
//obsługa panelu dla ocen semestralnych
function dodajOceneNaListeSemestralnych(ocena, listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok) {
    
    var semestrButton = document.querySelector("div#ocenaSemestr>button");
    var rokButton = document.querySelector("div#ocenaRoczna>button");
    var resetSemestrButton = document.querySelector("div#semestrReset>button");
    var dodajOcene = document.querySelector("div#dodajOcene>button");
    var selectKategoria = document.getElementById("listaKategorii");
    var selectOcena = document.getElementById("listaOcen");
    resetSemestrButton.removeAttribute("disabled");
    disableSemestrButton(semestrButton);
    disableRadios();
    removeAllOcenySemestr();
    removeFromOcenySemestrLista(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr);
    //co jeśli panel nie ma lub ma 1 ocenę semestralną
    if (listaRok.length >= 0 && listaRok.length < 2) {
        var listItem1 = document.createElement("li");
        listItem1.innerHTML = ocena + " (" + ocenaSlowna(ocena) + ")";
        var lista = document.querySelector("div#panelSemestr ol");
        lista.appendChild(listItem1);
        //resetowanie panelu na oceny semestralne
        resetSemestrButton.onclick = function () {
            removeFromOcenyAll(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
            resetSemestrButton.setAttribute("disabled", true);
            disableSemestrButton(semestrButton);
            dodajOcene.setAttribute("disabled", true);
            disableRadios();
            resetRadios();
            removeOcenyAll();
        };
        //co jeśli panel ma 2 oceny semestralne
    } else if (listaRok.length === 2) {
        var listItem1 = document.createElement("li");
        listItem1.innerHTML = ocena + " (" + ocenaSlowna(ocena) + ")";
        var lista = document.querySelector("div#panelSemestr ol");
        lista.appendChild(listItem1);
        rokButton.removeAttribute("disabled");
        dodajOcene.setAttribute("disabled", true);
        selectKategoria.setAttribute("disabled", true);
        selectOcena.setAttribute("disabled", true);
        resetSemestrButton.onclick = function () {
            removeFromOcenyAll(listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
            resetSemestrButton.setAttribute("disabled", true);
            dodajOcene.setAttribute("disabled", true);
            rokButton.setAttribute("disabled", true);
            selectKategoria.removeAttribute("disabled");
            selectOcena.removeAttribute("disabled");
            disableSemestrButton(semestrButton);
            disableRadios();
            removeOcenyAll();
            resetRadios();
        };
        //kliknięcie przycisku "Ocena Roczna"
        rokButton.onclick = function () {
            var ocenaKoncowa = ocenaRoczna(listaRok);
            var dokladnaOcenaKoncowa = dokladnaWartoscOCeny(ocenaKoncowa);
            wyswietlOcene(listaRok, dokladnaOcenaKoncowa);
            disableRadios();
            disableSemestrButton(semestrButton);
            rokButton.setAttribute("disabled", true);
            dodajOcene.setAttribute("disabled", true);
            resetSemestrButton.setAttribute("disabled", true);
            removeFromSemestrLabel();
        };
    }
}
//ustawienie domyślnych ustawień dla radio
function resetRadios() {
    var radioList = document.getElementsByClassName("radioSrednia");
    for (let o = 0; o < radioList.length; o++) {
        radioList[o].setAttribute("disabled",true);
        radioList[o].checked=false;
    }
}
//wyświetlanie oceny i ewentualne resetowanie
function wyswietlOcene(listaRok, ocenaKoncowa) {
    var panel = document.querySelector("div#panelWynikowy div#wynik>p");
    var odNowaButton = document.querySelector("div#panelWynikowy div#odnowa>button");
    odNowaButton.removeAttribute("disabled");
    panel.innerHTML = "I semestr: " + listaRok[0] + " (" + ocenaSlowna(listaRok[0]) + "), II semestr: " + listaRok[1] + " (" + ocenaSlowna(listaRok[1])
            + "). Końcowa ocena: " + ocenaKoncowa + " (" + ocenaSlowna(ocenaKoncowa) + ").";
    //co jeśli kliknięto przycisk "Przelicz jeszcze raz"
    odNowaButton.onclick = function () {
        odNowaButton.setAttribute("disabled", true);
        resetRadios();
        panel.innerHTML = "";
    };
};
//wczytanie oceny
window.onload = function () {
    var selectLists = document.getElementsByClassName("selectList");
    //listy ocen
    const listaOcenySprawdzian = [];
    const listaKartkowka = [];
    const listaInne = [];
    const listaSemestr = [];
    const listaRok = [];
    //otwarcie listy opcji rodzajów
    selectLists[0].onmousedown = function () {
        scrollSizeKategoria(selectLists[0], listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
    };
    //otwarcie listy ocen
    selectLists[1].onmousedown = function () {
        scrollSizeOcena(selectLists[1], listaOcenySprawdzian, listaKartkowka, listaInne, listaSemestr, listaRok);
    };

};

