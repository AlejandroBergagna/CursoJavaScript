
// ARRAY DE OBJETOS DE LOS TIROS DE LA RULETA
const tirosRuleta = [];

// ARRAY DE OBJETOS DE TODAS LAS APUESTAS
const apuestas = [];



// ARRAY DE JUGADORES Y SUS FICHAS ACUMULADAS
// REVISO SI EXISTE EL ARRAY EN EL LOCAL STORAGE Y LO TRAE

//let jugadores = [];


// OPERADOR LÓGICO OR PARA RECUPERAR JUGADORES DEL LOCAL STORAGE

let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

// if(localStorage.getItem("jugadores")){
//     //console.log("primera vez");
//     jugadores = JSON.parse(localStorage.getItem("jugadores"));
// }
// else{
//     //console.log("no es la primera vez");
//     localStorage.setItem("jugadores", JSON.stringify(jugadores));
// }

localStorage.setItem("jugadores", JSON.stringify(jugadores));


// ARRAY QUE CONTIENE CANTIDADES DE FICHAS APOSTADAS POR NÚMERO
let numApostados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ARRAY DE LOS NÚMEROS NEGROS
const numNegros = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,3,33,35];

// OBJETO APUESTA FORMADO POR ARRAY DE NUMEROS APOSTADOS, Y FICHAS APOSTADAS POR CHANCE
let apuesta = {};

// OBJETO FORMADO POR CADA TIRO ALEATORIO DE RULETA: NRO, COLOR, PARIDAD, DOCENA
let tiroRuleta = {};

// OBJETO FORMADO POR EL NOMBRE DEL JUGADOR Y CANTIDAD DE FICHAS DISPONIBLES
let jugador = {};


// CLASE PARA INTANCIAR JUGADOR 

class Jugadores{
    constructor(n,f){
        this.nombre = n;
        this.fichas = f;
    }

}


// CLASE PARA INSTANCIAR EL TIRO QUE SALIO EN LA RULETA EN UN OBJETO

// RECIBE COMO VALOR UN NUMERO, UN COLOR, PAR O IMPAR Y A QUE DOCENA
//PERTENECE

class Tiro{
    constructor(n,c,p,d){
        this.numero = n;
        this.color = c;
        this.paridad = p;
        this.docena = d;
    }

}

// CLASE PARA INSTANCIAR LA APUESTA DEL JUGADOR EN UN OBJETO

// RECIBE COMO VALORES LA CANTIDAD DE PLATA QUE APUESTA POR CADA NUMERO
// Y CHANCE

class Apuesta{
    constructor(nros,r,n,p,i,d1,d2,d3){
        this.numApostados = nros;
        this.rojo = r;
        this.negro = n;
        this.par = p;
        this.impar = i;
        this.doce1 = d1;
        this.doce2 = d2;
        this.doce3 = d3;
    }
}

// DECLARO VARIABLES PARA LA APUESTA DEL JUGADOR

let apuestaPar = 0;
let apuestaImpar = 0;
let apuestaRojo = 0;
let apuestaNegro = 0;
let apuestaPDoc = 0;
let apuestaSDoc = 0;
let apuestaTDoc = 0;

let gananciaNumero = 0;
let gananciaColor = 0;
let gananciaParidad = 0;
let gananciaDocena = 0;


// DECLARO VARIABLES PARA CALCULAR FICHAS DISPONIBLES

let totalFichasGanadas = 0;
let totalFichasApuesta = 0;

let check = false;
let subJug = 0;

let fichasDisponibles = 100;

let nombreJugador = prompt("ingrese su nombre: ");

// RECORRO EL ARRAY JUGADORES PARA RECUPERAR LAS FICHAS DISPONIBLES DEL JUGADOR EN CASO DE QUE EXISTA

// for(let i=0; i<jugadores.length; i++){
//     if (nombreJugador == jugadores[i].nombre){
//         fichasDisponibles = jugadores[i].fichas;
//         console.log(jugadores[i].nombre);
//         console.log(jugadores[i].fichas);
//         subJug = i;
//         check = true;
//     }
//     else{
//         //console.log("nuevo jugador");
//     }
// }


for(let i=0; i<jugadores.length; i++){
    
    // APLICO OPERADOR AND

    (nombreJugador == jugadores[i].nombre) && (
        fichasDisponibles = jugadores[i].fichas,
        console.log(jugadores[i].nombre),
        console.log(jugadores[i].fichas),
        subJug = i,
        check = true);
    
}

console.log(check);

// APLICO OPERADOR TERNARIO

check ? (alert(`Bienvenido nuevamente ${nombreJugador}`)) : (alert(`Bienvenido por primera vez ${nombreJugador}`))

// if (check){
//     alert(`Bienvenido nuevamente ${nombreJugador}`);

// }else{
//     alert(`Bienvenido por primera vez ${nombreJugador}`);
// }



let jugadorActual = document.getElementById("jugadorActual");

// JUGANDO UN POCO CON OPERADORES TERNARIOS EN LAS CLASES DE CSS

jugadorActual.innerHTML = `<p>Jugador: ${nombreJugador}</p>
                           <p class="${fichasDisponibles <= 10 ? "pocasFichas" : "muchasFichas"}">Fichas Disponibles: ${fichasDisponibles}</p>`



// SI EL JUGADOR POSEE 0 FICHAS, LE REINICIO EL VALOR EN 100 PARA QUE EMPIECE DE VUELTA

// if (fichasDisponibles == 0){
//     fichasDisponibles = 100;
// }

fichasDisponibles == 0 && (fichasDisponibles = 100);


// FUNCIÓN INVOCADA POR EL BOTÓN APOSTAR

function crearApuesta(){

    // BORRO EL TEXTO DE LOS BOTONES QUE INDICA LA CANTIDAD DE FICHAS APOSTADAS

    let borrarFichasApostadas = document.getElementsByClassName("FichasApostadas");
    for(let borrar of borrarFichasApostadas){
        borrar.innerHTML = `<div></div>`;
    }
    
    // CREO UN OBJETO CON LA PRIMER APUESTA
    apuesta = new Apuesta (numApostados, apuestaRojo, apuestaNegro, apuestaPar, apuestaImpar, apuestaPDoc, apuestaSDoc, apuestaTDoc);
 
    // PUSHEO EL OBJETO AL ARRAY DE APUESTAS
    apuestas.push(apuesta);

    numeroAleatorio = generarNumeroAleatorio();
    
   // numeroAleatorio = 32;

    capturarTiroRuleta();

    tiroRuleta = new Tiro(numeroAleatorio, colorAleatorio, paridadAleatorio, docenaAleatorio);
    tirosRuleta.push(tiroRuleta);

    // MUESTRO EN EL HTML EL TIRO QUE SALIÓ EN LA RULETA

    
    // DESESTRUCTURO EL OBJETO TIRO RULETA
    
    let {numero, color, paridad, docena} = tiroRuleta;
    
    let numeroRuleta = document.getElementById("tiroActual");
    
    numeroRuleta.innerText = `Salió el número: ${numero}
                              Su color es: ${color}
                              Es: ${paridad}
                              Pertenece a la ${docena} docena`

    
    // numeroRuleta.innerText = `Salió el número: ${tiroRuleta.numero}
    //                           Su color es: ${tiroRuleta.color}
    //                           Es: ${tiroRuleta.paridad}
    //                           Pertenece a la ${tiroRuleta.docena} docena`

                                  
    
    
    
    
    
    // LLAMO A LA FUNCIÓN QUE ME DEVUELVE CUÁNTAS FICHAS GANÓ POR ACERTAR EL NÚMERO
    
    gananciaNumero = gananciasPorNumeros();

    if (gananciaNumero != 0){
        console.log(`Ganaste ${gananciaNumero} fichas por haber apostado ${numApostados[tiroRuleta.numero]} fichas al ${tiroRuleta.numero}`);
    }

    // LLAMO A LA FUNCIÓN QUE ME DEVUELVE CUÁNTAS FICHAS GANÓ POR ACERTAR EL COLOR

    gananciaColor = gananciasPorColor(); 

    if (gananciaColor != 0){    
        console.log(`Ganaste ${gananciaColor} fichas por haber apostado ${gananciaColor / 2} fichas al ${tiroRuleta.color}`);   
    }
    
    // LLAMO A LA FUNCIÓN QUE ME DEVUELVE CUÁNTAS FICHAS GANÓ POR ACERTAR PARIDAD

    gananciaParidad = gananciasPorParidad();
   
    if (gananciaParidad != 0){
        console.log(`Ganaste ${gananciaParidad} fichas por haber apostado ${gananciaParidad / 2} fichas al ${tiroRuleta.paridad}`);          
    }
    
    // LLAMO A LA FUNCIÓN QUE ME DEVUELVE CUÁNTAS FICHAS GANÓ POR ACERTAR LA DOCENA

    gananciaDocena = gananciasPorDocena();

    if (gananciaDocena != 0){
        console.log(`Ganaste ${gananciaDocena} fichas por haber apostado ${gananciaDocena / 3} fichas al ${tiroRuleta.docena}`);          
    }

 
    let fichasGanadas = document.getElementById("fichasGanadas");
    fichasGanadas.innerText = `Ganaste ${gananciaNumero} fichas por haber apostado ${numApostados[tiroRuleta.numero]} fichas al ${tiroRuleta.numero}
                               Ganaste ${gananciaColor} fichas por haber apostado ${gananciaColor / 2} fichas al ${tiroRuleta.color}
                               Ganaste ${gananciaParidad} fichas por haber apostado ${gananciaParidad / 2} fichas al ${tiroRuleta.paridad}
                               Ganaste ${gananciaDocena} fichas por haber apostado ${gananciaDocena / 3} fichas al ${tiroRuleta.docena} docena`
 

    
    totalFichasGanadas = gananciaNumero + gananciaColor + gananciaParidad + gananciaDocena;
    console.log(`Ganaste ${totalFichasGanadas} Fichas`);
    
    totalFichasApuesta = totalFichasApostadas();
    console.log(`Apostaste un total de ${totalFichasApuesta} Fichas`);

    
    
    fichasDisponibles = fichasDisponibles + totalFichasGanadas;
    console.log(`Te quedan ${fichasDisponibles} Fichas Disponibles`);

 
    jugadorActual.innerText = `Jugador: ${nombreJugador}
                              Fichas Disponibles: ${fichasDisponibles}`
        
    
    // GUARDO LAS FICHAS DISPONIBLES EN EL STORAGE
    
    
 //   localStorage.setItem("Fichas", fichasDisponibles);


    inicializarVariablesApuesta();



}

// FUNCION QUE LE SUMA LA CANTIDAD DE FICHAS A CADA OPCION ELEGIDA POR EL JUGADOR

function sumarFichas(n, opcion){
    opcion += n;
    fichasDisponibles = fichasDisponibles - n; // LE VOY RESTANDO LAS FICHAS APOSTADAS A LAS DISPONIBLES
    return opcion;
}

// FUNCION QUE GENERE UN NÚMERO ALEATORIO ENTRE 0  36

function generarNumeroAleatorio(){
    let numAle = Math.floor(Math.random() * 36);
    return numAle;
}


// DECLARO VARIABLES PARA CAPTURAR EL NÚMERO ALEATORIO Y SUS CARACTERÍSTICAS

let numeroAleatorio = 0;
let colorAleatorio = "";
let paridadAleatorio = "";
let docenaAleatorio = "";

// FUNCION PARA CAPTURAR EL NUMERO QUE SALIÓ EN LA RULETA
// DENTRO DE ESTA SE VAN A LLAMAR A OTRAS FUNCIONES PARA CAPTURAR SU COLOR, PARIDAD Y DOCENA

function capturarTiroRuleta(){
    if (numeroAleatorio == 0){
        colorAleatorio = "cero";
        paridadAleatorio = "cero";
        docenaAleatorio = "cero";
    }else{
        if (capturarParidadNuemroAleatorio()){
            paridadAleatorio = "par"
        }else{
            paridadAleatorio = "impar" 
        }
        colorAleatorio = capturarColorAleatorio();
        docenaAleatorio = capturarDocenaAleatorio();
    }
}

// FUNCIÓN PARA CAPTURAR SI EL NÚMERO ALEATORIO ES PAR O IMPPAR

function capturarParidadNuemroAleatorio(){

    // OPERADOR TERNARIO

    let bool = (numeroAleatorio % 2 == 0) ? true : false;
    return bool;
    // if (numeroAleatorio % 2 == 0){
    //     return true;
    // }else{
    //     return false;
    // }
}

// FUNCIÓN PARA CAPTURAR EL COLOR DEL NÚMERO ALEATORIO

function capturarColorAleatorio(){
    
    // OPERADOR TERNARIO

    let bool = numNegros.includes(numeroAleatorio) ? true : false;
    bool ? col = "negro" : col = "rojo";
    
    return col;

    // if (numNegros.includes(numeroAleatorio)){
    //     let col = "negro";
    //     return col;
    // }else{
    //     let col = "rojo";
    //     return col;
    // }
}

// FUNCIÓN PARA CAPTURAR A QUÉ DOCENA PERTENECE EL NÚMERO ALEATORIO

function capturarDocenaAleatorio(){
    if (numeroAleatorio >= 1 && numeroAleatorio <= 12){
        let doc = "primera";
        return doc;
    }else if(numeroAleatorio >= 13 && numeroAleatorio <=24){
        let doc = "segunda";
        return doc;
    }else{
        let doc = "tercera";
        return doc;
    }
    
}


// DEVOLVER LAS GANANCIAS DEL APOSTADOR

// FUNCIÓN QUE DEVUELVE GANANCIAS POR NÚMERO ACERTADO

function gananciasPorNumeros(){
    let ganaFichasNumero = numApostados[numeroAleatorio] * 36;
    return ganaFichasNumero;
}

// FUNCION QUE ME DEVUELVE GANANCIA POR COLOR

function gananciasPorColor(){
    if (tiroRuleta.color == "rojo"){
        let ganaFichasColor = apuesta.rojo * 2;
        return ganaFichasColor;
    }else if (tiroRuleta.color == "negro"){
        let ganaFichasColor = apuesta.negro * 2;
        return ganaFichasColor;
    }else{
        ganaFichasColor = 0;
        return ganaFichasColor;
    }
}

// FUNCIÓN QUE DEVUELVE GANANCIAS POR PARIDAD

function gananciasPorParidad(){
    if (tiroRuleta.paridad == "par"){
        let ganaFichasParidad = apuesta.par * 2;
        return ganaFichasParidad;
    }else if (tiroRuleta.paridad == "impar"){
        let ganaFichasParidad = apuesta.impar * 2;
        return ganaFichasParidad;
    }else{
        let ganaFichasParidad = 0;
        return ganaFichasParidad;
    }
}

// FUNCIÓN QUE DEVUELVE GANANCIAS POR DOCENA

function gananciasPorDocena(){
    if (tiroRuleta.docena == "primera"){
        let ganaFichasDocena = apuesta.doce1 * 3;
        return ganaFichasDocena;        
        }else if (tiroRuleta.docena == "segunda"){
            let ganaFichasDocena = apuesta.doce2 * 3;
            return ganaFichasDocena;
        }else if (tiroRuleta.docena == "tercera"){
            let ganaFichasDocena = apuesta.doce3 * 3;
            return ganaFichasDocena;
        }else{
            let ganaFichasDocena = 0;
            return ganaFichasDocena;
        }
}

// FUNCIÓN QUE DEVUELVE EL TOTAL DE FICHAS APOSTADAS

function totalFichasApostadas(){
    let contadorFichas = 0;

    for (let i=0;i<37;i++){
        contadorFichas = contadorFichas + numApostados[i];
    }

    let totalFichas = contadorFichas + apuestaPar + apuestaImpar + apuestaRojo + apuestaNegro + apuestaPDoc + apuestaSDoc + apuestaTDoc;
    return totalFichas;
}


function inicializarVariablesApuesta(){
    
    apuestaPar = 0;
    apuestaImpar = 0;
    apuestaRojo = 0;
    apuestaNegro = 0;
    apuestaPDoc = 0;
    apuestaSDoc = 0;
    apuestaTDoc = 0;
    
    numApostados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    gananciaNumero = 0;
    gananciaColor = 0;
    gananciaParidad = 0;
    gananciaDocena = 0;
    
}

// VOY CREANDO LOS DIVS QUE VAN A APARECER DENTRO DE CADA BOTÓN CON LA CANTIDAD DE FICHAS APOSTADAS

let fichitaPar = document.createElement("div");
let fichitaImpar = document.createElement("div");
let fichitaRojo = document.createElement("div");
let fichitaNegro = document.createElement("div");
let fichitaPDoc = document.createElement("div");
let fichitaSDoc = document.createElement("div");
let fichitaTDoc = document.createElement("div");

let botonPar = document.getElementById("btnPar");
botonPar.addEventListener("click", ()=>{apuestaPar = probandoChances(apuestaPar,fichitaPar,botonPar, "par")});


// let botonPar = document.getElementById("btnPar");
// botonPar.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                         apuestaPar = sumarFichas(5, apuestaPar);
                                        
//                                         console.log(`Apostando ${apuestaPar} a PAR`);
                                        
//                                         fichitaPar.innerHTML = `<p class="FichasApostadas fichitas">${apuestaPar} fichas</p>`;
//                                         botonPar.append(fichitaPar)
                                        
//                                         jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                         Fichas Disponibles: ${fichasDisponibles}`}
                                        
//                                         else{alert("te quedaste sin fichas")}});

let botonImpar = document.getElementById("btnImpar");
botonImpar.addEventListener("click", ()=>{apuestaImpar = probandoChances(apuestaImpar,fichitaImpar,botonImpar, "impar")});


// botonImpar.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                           apuestaImpar = sumarFichas(5, apuestaImpar);
                                          
//                                           console.log(`Apostando ${apuestaImpar} a IMPAR`);
                                          
//                                           fichitaImpar.innerHTML = `<p class="FichasApostadas fichitas">${apuestaImpar} fichas</p>`;
//                                           botonImpar.append(fichitaImpar)
                                          
//                                           jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                           Fichas Disponibles: ${fichasDisponibles}`}
                                          
//                                           else{alert("te quedaste sin fichas")}});

let botonRojo = document.getElementById("btnRojo");
botonRojo.addEventListener("click", ()=>{apuestaRojo = probandoChances(apuestaRojo,fichitaRojo,botonRojo,"rojo")});

// botonRojo.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                          apuestaRojo = sumarFichas(5, apuestaRojo)
                                         
//                                          console.log(`Apostando ${apuestaRojo} a ROJO`)
                                         
//                                          fichitaRojo.innerHTML = `<p class="FichasApostadas fichitas">${apuestaRojo} fichas</p>`;
//                                          botonRojo.append(fichitaRojo)
                                         
//                                          jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                          Fichas Disponibles: ${fichasDisponibles}`}
                                         
//                                          else{alert("te quedaste sin fichas")}});

let botonNegro = document.getElementById("btnNegro");
botonNegro.addEventListener("click", ()=>{apuestaNegro = probandoChances(apuestaNegro,fichitaNegro,botonNegro,"negro")});


// botonNegro.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                           apuestaNegro = sumarFichas(5, apuestaNegro)
                                          
//                                           console.log(`Apostando ${apuestaNegro} a NEGRO`)
                                          
//                                           fichitaNegro.innerHTML = `<p class="FichasApostadas fichitas">${apuestaNegro} fichas</p>`;
//                                           botonNegro.append(fichitaNegro)                              
                                          
//                                           jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                           Fichas Disponibles: ${fichasDisponibles}`}
                                          
//                                           else{alert("te quedaste sin fichas")}});

let botonPrimeraDocena = document.getElementById("btnPDoc");
botonPrimeraDocena.addEventListener("click", ()=>{apuestaPDoc = probandoChances(apuestaPDoc,fichitaPDoc,botonPrimeraDocena,"1° docena")});

// botonPrimeraDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                                   apuestaPDoc = sumarFichas(5, apuestaPDoc)
                                                  
//                                                   console.log(`Apostando ${apuestaPDoc} a PRIMERA DOCENA`)

//                                                   fichitaPDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaPDoc} fichas</p>`;
//                                                   botonPrimeraDocena.append(fichitaPDoc)                              

//                                                   jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                                   Fichas Disponibles: ${fichasDisponibles}`}
                                                                  
//                                                   else{alert("te quedaste sin fichas")}});

let botonSegundaDocena = document.getElementById("btnSDoc");
botonSegundaDocena.addEventListener("click", ()=>{apuestaSDoc = probandoChances(apuestaSDoc,fichitaSDoc,botonSegundaDocena,"2° docena")});


// botonSegundaDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                                   apuestaSDoc = sumarFichas(5, apuestaSDoc)
                                                  
//                                                   console.log(`Apostando ${apuestaSDoc} a SEGUNDA DOCENA`)

//                                                   fichitaSDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaSDoc} fichas</p>`;
//                                                   botonSegundaDocena.append(fichitaSDoc)                              

//                                                   jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                                   Fichas Disponibles: ${fichasDisponibles}`}
                                                  
//                                                   else{alert("te quedaste sin fichas")}});

let botonTerceraDocena = document.getElementById("btnTDoc");
botonTerceraDocena.addEventListener("click", ()=>{apuestaTDoc = probandoChances(apuestaTDoc,fichitaTDoc,botonTerceraDocena,"3° docena")});


// botonTerceraDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
//                                                   apuestaTDoc = sumarFichas(5, apuestaTDoc)

//                                                   console.log(`Apostando ${apuestaTDoc} a TERCERA DOCENA`)

//                                                   fichitaTDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaTDoc} fichas</p>`;
//                                                   botonTerceraDocena.append(fichitaTDoc)                              

//                                                   jugadorActual.innerText = `Jugador: ${nombreJugador}
//                                                   Fichas Disponibles: ${fichasDisponibles}`}

//                                                   else{alert("te quedaste sin fichas")}});

// let boton1 = document.getElementById("btn1");
// boton1.addEventListener("click", ()=>{probando(boton1, 1)});

// let boton2 = document.getElementById("btn2");
// boton2.addEventListener("click", ()=>{probando(boton2, 2)});

// let boton3 = document.getElementById("btn3");
// boton3.addEventListener("click", ()=>{probando(boton3, 3)});

// let boton4 = document.getElementById("btn4");
// boton4.addEventListener("click", ()=>{probando(boton4, 4)});

// let boton5 = document.getElementById("btn5");
// boton5.addEventListener("click", ()=>{probando(boton5, 5)});                   

// let boton6 = document.getElementById("btn6");
// boton6.addEventListener("click", ()=>{probando(boton6, 6)});

// let boton7 = document.getElementById("btn7");
// boton7.addEventListener("click", ()=>{probando(boton7, 7)});

// let boton8 = document.getElementById("btn8");
// boton8.addEventListener("click", ()=>{probando(boton8, 8)});

// let boton9 = document.getElementById("btn9");
// boton9.addEventListener("click", ()=>{probando(boton9, 9)});

// let boton10 = document.getElementById("btn10");
// boton10.addEventListener("click", ()=>{probando(boton10, 10)});

// let boton11 = document.getElementById("btn11");
// boton11.addEventListener("click", ()=>{probando(boton11, 11)});

// let boton12 = document.getElementById("btn12");
// boton12.addEventListener("click", ()=>{probando(boton12, 12)});

// let boton13 = document.getElementById("btn13");
// boton13.addEventListener("click", ()=>{probando(boton13, 13)});

// let boton14 = document.getElementById("btn14");
// boton14.addEventListener("click", ()=>{probando(boton14, 14)});

// let boton15 = document.getElementById("btn15");
// boton15.addEventListener("click", ()=>{probando(boton15, 15)});

// let boton16 = document.getElementById("btn16");
// boton16.addEventListener("click", ()=>{probando(boton16, 16)});

// let boton17 = document.getElementById("btn17");
// boton17.addEventListener("click", ()=>{probando(boton17, 17)});

// let boton18 = document.getElementById("btn18");
// boton18.addEventListener("click", ()=>{probando(boton18, 18)});

// let boton19 = document.getElementById("btn19");
// boton19.addEventListener("click", ()=>{probando(boton19, 19)});

// let boton20 = document.getElementById("btn20");
// boton20.addEventListener("click", ()=>{probando(boton20, 20)});

// let boton21 = document.getElementById("btn21");
// boton21.addEventListener("click", ()=>{probando(boton21, 21)});

// let boton22 = document.getElementById("btn22");
// boton22.addEventListener("click", ()=>{probando(boton22, 22)});

// let boton23 = document.getElementById("btn23");
// boton23.addEventListener("click", ()=>{probando(boton23, 23)});

// let boton24 = document.getElementById("btn24");
// boton24.addEventListener("click", ()=>{probando(boton24, 24)});

// let boton25 = document.getElementById("btn25");
// boton25.addEventListener("click", ()=>{probando(boton25, 25)});

// let boton26 = document.getElementById("btn26");
// boton26.addEventListener("click", ()=>{probando(boton26, 26)});

// let boton27 = document.getElementById("btn27");
// boton27.addEventListener("click", ()=>{probando(boton27, 27)});

// let boton28 = document.getElementById("btn28");
// boton28.addEventListener("click", ()=>{probando(boton28, 28)});

// let boton29 = document.getElementById("btn29");
// boton29.addEventListener("click", ()=>{probando(boton29, 29)});

// let boton30 = document.getElementById("btn30");
// boton30.addEventListener("click", ()=>{probando(boton30, 30)});

// let boton31 = document.getElementById("btn31");
// boton31.addEventListener("click", ()=>{probando(boton31, 31)});

// let boton32 = document.getElementById("btn32");
// boton32.addEventListener("click", ()=>{probando(boton32, 32)});

// let boton33 = document.getElementById("btn33");
// boton33.addEventListener("click", ()=>{probando(boton33, 33)});

// let boton34 = document.getElementById("btn34");
// boton34.addEventListener("click", ()=>{probando(boton34, 34)});

// let boton35 = document.getElementById("btn35");
// boton35.addEventListener("click", ()=>{probando(boton35, 35)});

// let boton36 = document.getElementById("btn36");
// boton36.addEventListener("click", ()=>{probando(boton36, 36)});

// let cero = document.getElementById("cero");

// let boton0 = document.getElementById("btn0");
// boton0.addEventListener("click", ()=>{probando(boton0, 0)});

// let cero = document.getElementById("cero");
// let boton0 = document.getElementById("btn0");
// boton0.addEventListener("click", ()=>{if (fichasDisponibles>=1){
//                                        numApostados[0] = sumarFichas(1, numApostados[0])
//                                        console.log(`Apostando ${numApostados[0]} al NUMERO 0`)
                                       
//                                        boton0.innerHTML = `0 <div class="FichasApostadas fichitas">${numApostados[0]} fichas`}
//                                        else{alert("te quedaste sin fichas")}});


let botonApostar = document.getElementById("btnApostar");
botonApostar.addEventListener("click", crearApuesta);

let botonSalir = document.getElementById("btnSalir");
botonSalir.addEventListener("click", salir);

// FUNCIÓN QUE AGREGA FICHITAS EN LOS BOTONES DE LOS NUMEROS
// recibe como parámetro x : boton clickeado, y : numero (subíndice del array de nros apostados)

function probando(x,y){
    if (fichasDisponibles>=1){
        numApostados[y] = sumarFichas(1, numApostados[y])
        console.log(`Apostando ${numApostados[y]} al NUMERO ${y}`)
                               
        x.innerHTML = `${y} <div class="FichasApostadas fichitas">${numApostados[y]} fichas`}
    else{Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Te quedaste sin fichas!',
        footer: '<a href="">Why do I have this issue?</a>'
        })};
        

}

// FUNCIÓN QUE AGREGA FICHITAS EN LOS BOTONES DE LAS CHANCES
// recibe como parámetro x : cantidad de fichas apostadas, y : el div dentro del boton, z : el boton que estoy clickeando

function probandoChances(x,y,z,chance){

    if(fichasDisponibles>=5){
        x = sumarFichas(5, x);
        
        console.log(`Apostando ${x} a ${chance}`);
        
        y.innerHTML = `<p class="FichasApostadas fichitas">${x} fichas</p>`;
        z.append(y)
        
        jugadorActual.innerText = `Jugador: ${nombreJugador}
        Fichas Disponibles: ${fichasDisponibles}`}
        
        else{Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Te quedaste sin fichas!',
            footer: '<a href="">Why do I have this issue?</a>'
            })}
    
    return x;

    }

// VOY RESTANDO Y MOSTRANDO AL JUGADOR SUS FICHAS DISPONIBLES

let botonNumero = document.getElementsByClassName("btnNumero");
let boton;

for (let fichitas of botonNumero){
    fichitas.addEventListener("click", ()=>{
        boton = document.getElementById(fichitas.id);
        probando(boton, fichitas.value);
        jugadorActual.innerText = `Jugador: ${nombreJugador}
        Fichas Disponibles: ${fichasDisponibles}`
        // console.log(`existe ${botonNumero.item}`)
        // console.log(` que onda con ${pucha}`);

    })

}

// ESTA FUNCIÓN SI BIEN NO SALE ES PARA CAMBIAR DE JUGADOR
// PUSHEA EL ULTIMO JUGADOR CON SUS FICHAS DISPONIBLES AL ARRAY DE JUGADORES
// ACTUALIZA JUGADOR Y FICHAS DISPONIBLES EN EL LOCAL STORAGE

function salir(){
    
    if (check == false){
        jugador = new Jugadores(nombreJugador, fichasDisponibles);
        jugadores.push(jugador);
    }else{
        jugadores[subJug].fichas = fichasDisponibles;
    }

    //console.log(jugadores);

    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    location.reload();

}



