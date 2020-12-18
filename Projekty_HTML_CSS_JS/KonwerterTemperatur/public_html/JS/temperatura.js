//zamiana Celcjuszy na Kelviny
function fromCelcjuszToKelvin(wartosc) {
    return wartosc + 273.15;
}
//zamiana Kelviny na Celcjusze
function fromKelvinToCelcjusz(wartosc) {
    return wartosc - 273.15;
}
//zamiana Celcjusze na Farenheity
function fromCelcjuszToFarenheit(wartosc) {
    return wartosc * 1.8 + 32;
}
//zamiana Farenheity na Celcjusze
function fromFarenheitToCelcjusz(wartosc) {
    return (wartosc - 32) * 5 / 9;
}
//zamiana Kelviny na Farenheity
function fromKelvinToFarenheit(wartosc) {
    return fromCelcjuszToFarenheit(fromKelvinToCelcjusz(wartosc));
}
//zamiana Farenheity na Kelviny
function fromFarenheitToKelvin(wartosc) {
    return fromCelcjuszToKelvin(fromFarenheitToCelcjusz(wartosc));
}
//dodanie porównania temperatur do zawartości panelu
function zapiszTemperature(wartosc,jednostkaOd,jednostkaDo) {
    if(jednostkaOd.toString()==="Celcjusz"){
        if(jednostkaDo.toString()==="Farenheit"){
            return "&degC = "+wartosc+"&degF";
        }
        else if(jednostkaDo.toString()==="Kelvin"){
            return "&degC = "+wartosc+" K";
        }
    }
    if(jednostkaOd.toString()==="Kelvin"){
        if(jednostkaDo.toString()==="Farenheit"){
            return " K = "+wartosc+"&degF";
        }
        else if(jednostkaDo.toString()==="Celcjusz"){
            return " K = "+wartosc+"&degC";
        }
    }
    if(jednostkaOd.toString()==="Farenheit"){
        if(jednostkaDo.toString()==="Kelvin"){
            return "&degF = "+wartosc+" K";
        }
        else if(jednostkaDo.toString()==="Celcjusz"){
            return "&degF = "+wartosc+"&degC";
        }
    }
}
//dodanie informacji o błędnych obliczeniach dla Kelvinów
function errorKelvin(jednostkaOd,jednostkaDo) {
    if(jednostkaOd.toString()==="Celcjusz" || jednostkaOd.toString()==="Farenheit" && jednostkaDo.toString()==="Kelvin"){
        return " wartość w Kelvinach będzie mniejsza od 0.";
    }
    else if(jednostkaOd.toString()==="Kelvin"){
        return "Nie można obliczyć temperatury w Kelvinach dla wartości mniejszej od 0.";
    }
}
//sprawdzanie jednostek
function sprawdzJednostki(wartosc, jednostki) {
    if (jednostki.length === 2) {
        var jednostkaOd, jednostkaDo;
        //wartość jednostki
        jednostkaOd = jednostki[0].value.toString();
        jednostkaDo = jednostki[1].value.toString();
        //informacje dla formularzy
        var komunikatOd = document.getElementById("komunikatOd");
        var komunikatDo = document.getElementById("komunikatDo");
        //elementy z wartościami jednostek
        var inputOd = document.getElementById("jednostka_od");
        var inputDo = document.getElementById("jednostka_do");
        var wartoscStyle = document.getElementById("wartosc");
        var wynik = document.getElementById("wynik");
        var panelWynikowy = document.getElementById("panelWyniku");
        var optionList = document.getElementsByTagName("option");
        //czyszczenie klas css dla elementów
        wartoscStyle.classList.remove('error');
        panelWynikowy.classList.remove('error','correct');
        komunikatDo.classList.remove('error');
        komunikatOd.classList.remove('error');
        inputOd.classList.remove('error');
        inputDo.classList.remove('error');
        //tablica wartości elementu DATALIST
        const tablicaOpcji = [];
        for (var o = 0; o < optionList.length; o++) {
            tablicaOpcji[o] = optionList[o].value;
        }
        //sprawdzanie warunków wartości w inputach
        if (wartosc) {
            if (tablicaOpcji.indexOf(jednostkaOd) !== -1) {
                if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                    if (jednostkaOd === jednostkaDo) {
                        //dodanie klasy do elementu z własnościami CSS
                        panelWynikowy.classList.add('error');
                        inputOd.classList.add('error');
                        inputDo.classList.add('error');
                        wynik.innerHTML = "Jednostka wejściowa jest taka sama jak wyjściowa";
                    } else {
                        //przejsćie do przeliczania wartości
                        przeliczTemperature(wartosc, jednostkaOd, jednostkaDo);
                    }
                } else {
                    komunikatDo.classList.add('error');
                    inputDo.classList.add('error');
                    if (jednostkaDo === "") {
                        komunikatDo.innerHTML = "Brak jednostki wyjściowej";
                    } else {
                        komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                    }
                }
            } else {
                if (jednostkaOd === "") {
                    inputOd.classList.add('error');
                    if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                        komunikatOd.classList.add('error');
                        komunikatOd.innerHTML = "Brak jednostki wejściowej";  
                    } else {
                        inputDo.classList.add('error');
                        if (jednostkaDo === "") {
                            panelWynikowy.classList.add('error');
                            wynik.innerHTML = "Brak jednostki wejściowej i wyjściowej";
                        } else {
                            komunikatDo.classList.add('error');
                            komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                            komunikatOd.classList.add('error');
                            komunikatOd.innerHTML = "Brak jednostki wejściowej"; 
                        }
                    }
                } else {
                    inputOd.classList.add('error');
                    if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                        komunikatOd.classList.add('error');
                        komunikatOd.innerHTML = "Nieprawidłowa jednostka: " + jednostkaOd;
                    } else {
                        inputDo.classList.add('error');
                        if (jednostkaDo === "") {
                            komunikatOd.classList.add('error');
                            komunikatOd.innerHTML = "Nieprawidłowa jednostka: " + jednostkaOd;
                            komunikatDo.classList.add('error');
                            komunikatDo.innerHTML = "Brak jednostki wyjściowej"; 
                        } else {
                            if(jednostkaOd===jednostkaDo){
                                panelWynikowy.classList.add('error');
                                wynik.innerHTML = "Nieprawidłowa jednostka wejściowa i wyjściowa: "+ jednostkaOd;
                            }
                            else{
                                komunikatDo.classList.add('error');
                                komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                                komunikatOd.classList.add('error');
                                komunikatOd.innerHTML = "Nieprawidłowa jednostka: " + jednostkaOd;
                            }
                        }
                    }
                }

            }
        } else {
            wartoscStyle.classList.add('error');
            if (tablicaOpcji.indexOf(jednostkaOd) !== -1) {
                komunikatOd.classList.add('error');
                komunikatOd.innerHTML = "Brak wartości do przeliczenia";
                if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                    if (jednostkaOd === jednostkaDo) {
                        panelWynikowy.classList.add('error');
                        wynik.innerHTML = "Jednostka wejściowa jest taka sama jak wyjściowa";
                        inputDo.classList.add('error');
                        inputOd.classList.add('error');
                    } else {
                        wartoscStyle.classList.add('error');
                    }
                } else {
                    komunikatDo.classList.add('error');
                    inputDo.classList.add('error');
                    if (jednostkaDo === "") {
                        komunikatDo.innerHTML = "Brak jednostki wyjściowej";
                    } else {
                        komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                    }
                }
            } else {
                if (jednostkaOd === "") {
                    komunikatOd.classList.add('error');
                    inputOd.classList.add('error');
                    if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                        komunikatOd.innerHTML = "Brak wartości do przeliczenia i jednostki wejściowej";
                    } else {
                        inputOd.classList.add('error');
                        inputDo.classList.add('error');
                        if (jednostkaDo === "") {
                            komunikatOd.innerHTML = "Brak wartości do przeliczenia";
                            panelWynikowy.classList.add('error');
                            wynik.innerHTML = "Brak jednostki wejściowej i wyjściowej";
                            
                        } else {
                            komunikatDo.classList.add('error');
                            komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                            komunikatOd.innerHTML = "Brak wartości do przeliczenia i jednostki wejściowej";
                        }
                    }
                } else {
                    komunikatOd.classList.add('error');
                    inputOd.classList.add('error');
                    if (tablicaOpcji.indexOf(jednostkaDo) !== -1) {
                        komunikatOd.innerHTML = "Brak wartości do przeliczenia i nieprawidłowa jednostka: " + jednostkaOd; 
                    } else {
                        komunikatDo.classList.add('error');
                        inputDo.classList.add('error');
                        if (jednostkaDo === "") {
                            komunikatOd.innerHTML = "Brak wartości do przeliczenia i nieprawidłowa jednostka: " + jednostkaOd;
                            komunikatDo.innerHTML = "Brak jednostki wyjściowej"; 
                        } else {
                            if(jednostkaOd===jednostkaDo){
                                komunikatOd.innerHTML = "Brak wartości do przeliczenia";
                                panelWynikowy.classList.add('error');
                                wynik.innerHTML = "Nieprawidłowa jednostka wejściowa i wyjściowa: "+ jednostkaOd;
                            }
                            else{
                                komunikatDo.innerHTML = "Nieprawidłowa jednostka: " + jednostkaDo;
                                komunikatOd.innerHTML = "Brak wartości do przeliczenia i nieprawidłowa jednostka: " + jednostkaOd; 
                           }
                        }
                    }
                }

            }
        }
    }
};
//funkcja do przeliczania temperatur
function przeliczTemperature(wartosc, jednostkaOd, jednostkaDo) {
    var jednostkaWejsciowa = jednostkaOd.toString();
    var jednostkaWyjsciowa = jednostkaDo.toString();
    var wartoscTemperatury = parseFloat(wartosc);
    var wartoscStyle = document.getElementById("wartosc");
    var wynik = document.getElementById("wynik");
    var panelWynikowy = document.getElementById("panelWyniku");
    wartoscStyle.classList.remove('error');
    panelWynikowy.classList.add('correct');
    //dla Celcjuszy
    if (jednostkaWejsciowa.includes("Celcjusz")) {
        if (jednostkaWyjsciowa.includes("Kelvin")) {
            wartoscTemperatury = Math.round(fromCelcjuszToKelvin(wartoscTemperatury)*100)/100;
            //gdy wartość w Kelvinach jest mniejsza od 0
            if (wartoscTemperatury < 0) {
                //zawartośc z wartością funkcji o błędzie
                wynik.innerHTML="Dla temperatury "+wartosc+"&degC"+errorKelvin(jednostkaWejsciowa,jednostkaWyjsciowa);
                wartoscStyle.classList.add('error');
                //usuwanie klasy z elementu
                panelWynikowy.classList.remove('correct');
                panelWynikowy.classList.add('error');
            } else {
                wynik.innerHTML="Zamiana Celcjuszy na Kelviny: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
            }
        } else if (jednostkaWyjsciowa.includes("Farenheit")) {
            wartoscTemperatury = Math.round(fromCelcjuszToFarenheit(wartoscTemperatury)*100)/100;
            wynik.innerHTML="Zamiana Celcjuszy na Farenheity: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
            
        }
    }
    //dla Kelvinów
    else if (jednostkaWejsciowa.includes("Kelvin")) {
        //gdy wartość w Kelvinach jest mniejsza od 0
        if (wartoscTemperatury < 0) {
            wartoscStyle.classList.add('error');
            wynik.innerHTML=errorKelvin(jednostkaWejsciowa,jednostkaWyjsciowa);
            wynik.classList.add('error');
            panelWynikowy.classList.remove('correct');
            panelWynikowy.classList.add('error');
        } else {
            if (jednostkaWyjsciowa.includes("Celcjusz")) {
                wartoscTemperatury = Math.round(fromKelvinToCelcjusz(wartoscTemperatury)*100)/100;
                wynik.innerHTML="Zamiana Kelviny na Celcjusze: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
            } else if (jednostkaWyjsciowa.includes("Farenheit")) {
                wartoscTemperatury = Math.round(fromKelvinToFarenheit(wartoscTemperatury)*100)/100;
                wynik.innerHTML="Zamiana Kelviny na Farenheity: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
            }
        }
    } 
    //dla Farenheitów
    else if (jednostkaWejsciowa.includes("Farenheit")) {
        if (jednostkaWyjsciowa.includes("Celcjusz")) {
            wartoscTemperatury = Math.round(fromFarenheitToCelcjusz(wartoscTemperatury)*100)/100;
            wynik.innerHTML="Zamiana Farenheity na Celcjusze: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
        } else if (jednostkaWyjsciowa.includes("Kelvin")) {
            wartoscTemperatury = Math.round(fromFarenheitToKelvin(wartoscTemperatury)*100)/100;
            //gdy wartość w Kelvinach jest mniejsza od 0
            if (wartoscTemperatury < 0) {
                wartoscStyle.classList.add('error');
                wynik.innerHTML="Dla temperatury "+wartosc+"&degF"+errorKelvin(jednostkaWejsciowa,jednostkaWyjsciowa);
                wynik.classList.add('error');
                panelWynikowy.classList.remove('correct');
                panelWynikowy.classList.add('error');
            } else {
                wynik.innerHTML="Zamiana Farenheity na Kelviny: "+wartosc+zapiszTemperature(wartoscTemperatury,jednostkaWejsciowa,jednostkaWyjsciowa);
            }
        }
    }

}
//wczytanie okna
window.onload = function () {
    var oblicz = document.getElementById("oblicz");
    var wartosc = document.getElementById("wartosc");
    const jednostki = document.getElementsByClassName("lista");
    //zdarzenie kliknięcie na przycisk
    oblicz.onclick = function () {
        sprawdzJednostki(wartosc.value, jednostki);
    };
};
