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
botonPar.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                        apuestaPar = sumarFichas(5, apuestaPar);
                                        
                                        console.log(`Apostando ${apuestaPar} a PAR`);
                                        
                                        fichitaPar.innerHTML = `<p class="FichasApostadas fichitas">${apuestaPar} fichas</p>`;
                                        botonPar.append(fichitaPar)
                                        
                                        jugadorActual.innerText = `Jugador: ${nombreJugador}
                                        Fichas Disponibles: ${fichasDisponibles}`}
                                        
                                        else{alert("te quedaste sin fichas")}});

let botonImpar = document.getElementById("btnImpar");
botonImpar.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                          apuestaImpar = sumarFichas(5, apuestaImpar);
                                          
                                          console.log(`Apostando ${apuestaImpar} a IMPAR`);
                                          
                                          fichitaImpar.innerHTML = `<p class="FichasApostadas fichitas">${apuestaImpar} fichas</p>`;
                                          botonImpar.append(fichitaImpar)
                                          
                                          jugadorActual.innerText = `Jugador: ${nombreJugador}
                                          Fichas Disponibles: ${fichasDisponibles}`}
                                          
                                          else{alert("te quedaste sin fichas")}});

let botonRojo = document.getElementById("btnRojo");
botonRojo.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                         apuestaRojo = sumarFichas(5, apuestaRojo)
                                         
                                         console.log(`Apostando ${apuestaRojo} a ROJO`)
                                         
                                         fichitaRojo.innerHTML = `<p class="FichasApostadas fichitas">${apuestaRojo} fichas</p>`;
                                         botonRojo.append(fichitaRojo)
                                         
                                         jugadorActual.innerText = `Jugador: ${nombreJugador}
                                         Fichas Disponibles: ${fichasDisponibles}`}
                                         
                                         else{alert("te quedaste sin fichas")}});

let botonNegro = document.getElementById("btnNegro");
botonNegro.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                          apuestaNegro = sumarFichas(5, apuestaNegro)
                                          
                                          console.log(`Apostando ${apuestaNegro} a NEGRO`)
                                          
                                          fichitaNegro.innerHTML = `<p class="FichasApostadas fichitas">${apuestaNegro} fichas</p>`;
                                          botonNegro.append(fichitaNegro)                              
                                          
                                          jugadorActual.innerText = `Jugador: ${nombreJugador}
                                          Fichas Disponibles: ${fichasDisponibles}`}
                                          
                                          else{alert("te quedaste sin fichas")}});

let botonPrimeraDocena = document.getElementById("btnPDoc");
botonPrimeraDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                                  apuestaPDoc = sumarFichas(5, apuestaPDoc)
                                                  
                                                  console.log(`Apostando ${apuestaPDoc} a PRIMERA DOCENA`)

                                                  fichitaPDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaPDoc} fichas</p>`;
                                                  botonPrimeraDocena.append(fichitaPDoc)                              

                                                  jugadorActual.innerText = `Jugador: ${nombreJugador}
                                                  Fichas Disponibles: ${fichasDisponibles}`}
                                                                  
                                                  else{alert("te quedaste sin fichas")}});

let botonSegundaDocena = document.getElementById("btnSDoc");
botonSegundaDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                                  apuestaSDoc = sumarFichas(5, apuestaSDoc)
                                                  
                                                  console.log(`Apostando ${apuestaSDoc} a SEGUNDA DOCENA`)

                                                  fichitaSDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaSDoc} fichas</p>`;
                                                  botonSegundaDocena.append(fichitaSDoc)                              

                                                  jugadorActual.innerText = `Jugador: ${nombreJugador}
                                                  Fichas Disponibles: ${fichasDisponibles}`}
                                                  
                                                  else{alert("te quedaste sin fichas")}});

let botonTerceraDocena = document.getElementById("btnTDoc");
botonTerceraDocena.addEventListener("click", ()=>{if(fichasDisponibles>=5){
                                                  apuestaTDoc = sumarFichas(5, apuestaTDoc)

                                                  console.log(`Apostando ${apuestaTDoc} a TERCERA DOCENA`)

                                                  fichitaTDoc.innerHTML = `<p class="FichasApostadas fichitas">${apuestaTDoc} fichas</p>`;
                                                  botonTerceraDocena.append(fichitaTDoc)                              

                                                  jugadorActual.innerText = `Jugador: ${nombreJugador}
                                                  Fichas Disponibles: ${fichasDisponibles}`}

                                                  else{alert("te quedaste sin fichas")}});

let boton1 = document.getElementById("btn1");
boton1.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                      numApostados[1] = sumarFichas(1, numApostados[1])
                                      console.log(`Apostando ${numApostados[1]} al NUMERO 1`)
                                      boton1.innerHTML = `1 <div class="FichasApostadas fichitas">${numApostados[1]} fichas</div>`}
                                      else{alert("te quedaste sin fichas")}});


let boton2 = document.getElementById("btn2");
boton2.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[2] = sumarFichas(1, numApostados[2])
                                        console.log(`Apostando ${numApostados[2]} al NUMERO 2`)
                                        boton2.innerHTML = `2 <div class="FichasApostadas fichitas">${numApostados[2]} fichas</div>`}
                                        else{alert("te quedaste sin fichas")}});

let boton3 = document.getElementById("btn3");
boton3.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[3] = sumarFichas(1, numApostados[3])
                                        console.log(`Apostando ${numApostados[3]} al NUMERO 3`)
                                        boton3.innerHTML = `3 <div class="FichasApostadas fichitas">${numApostados[3]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton4 = document.getElementById("btn4");
boton4.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[4] = sumarFichas(1, numApostados[4])
                                        console.log(`Apostando ${numApostados[4]} al NUMERO 4`)
                                        boton4.innerHTML = `4 <div class="FichasApostadas fichitas">${numApostados[4]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton5 = document.getElementById("btn5");
boton5.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[5] = sumarFichas(1, numApostados[5])
                                        console.log(`Apostando ${numApostados[5]} al NUMERO 5`)
                                        boton5.innerHTML = `5 <div class="FichasApostadas fichitas">${numApostados[5]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

                        

let boton6 = document.getElementById("btn6");
boton6.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[6] = sumarFichas(1, numApostados[6])
                                        console.log(`Apostando ${numApostados[6]} al NUMERO 6`)
                                        boton6.innerHTML = `6 <div class="FichasApostadas fichitas">${numApostados[6]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton7 = document.getElementById("btn7");
boton7.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[7] = sumarFichas(1, numApostados[7])
                                        console.log(`Apostando ${numApostados[7]} al NUMERO 7`)
                                        boton7.innerHTML = `7 <div class="FichasApostadas fichitas">${numApostados[7]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton8 = document.getElementById("btn8");
boton8.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[8] = sumarFichas(1, numApostados[8])
                                        console.log(`Apostando ${numApostados[8]} al NUMERO 8`)
                                        boton8.innerHTML = `8 <div class="FichasApostadas fichitas">${numApostados[8]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton9 = document.getElementById("btn9");
boton9.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[9] = sumarFichas(1, numApostados[9])
                                        console.log(`Apostando ${numApostados[9]} al NUMERO 9`)
                                        boton9.innerHTML = `9 <div class="FichasApostadas fichitas">${numApostados[9]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton10 = document.getElementById("btn10");
boton10.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[10] = sumarFichas(1, numApostados[10])
                                        console.log(`Apostando ${numApostados[10]} al NUMERO 10`)
                                        boton10.innerHTML = `10 <div class="FichasApostadas fichitas">${numApostados[10]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton11 = document.getElementById("btn11");
boton11.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[11] = sumarFichas(1, numApostados[11])
                                        console.log(`Apostando ${numApostados[11]} al NUMERO 11`)
                                        boton11.innerHTML = `11 <div class="FichasApostadas fichitas">${numApostados[11]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton12 = document.getElementById("btn12");
boton12.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[12] = sumarFichas(1, numApostados[12])
                                        console.log(`Apostando ${numApostados[12]} al NUMERO 12`)
                                        boton12.innerHTML = `12 <div class="FichasApostadas fichitas">${numApostados[12]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton13 = document.getElementById("btn13");
boton13.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[13] = sumarFichas(1, numApostados[13])
                                        console.log(`Apostando ${numApostados[13]} al NUMERO 13`)
                                        boton13.innerHTML = `13 <div class="FichasApostadas fichitas">${numApostados[13]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton14 = document.getElementById("btn14");
boton14.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[14] = sumarFichas(1, numApostados[14])
                                        console.log(`Apostando ${numApostados[14]} al NUMERO 14`)
                                        boton14.innerHTML = `14 <div class="FichasApostadas fichitas">${numApostados[14]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton15 = document.getElementById("btn15");
boton15.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[15] = sumarFichas(1, numApostados[15])
                                        console.log(`Apostando ${numApostados[15]} al NUMERO 15`)
                                        boton15.innerHTML = `15 <div class="FichasApostadas fichitas">${numApostados[15]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton16 = document.getElementById("btn16");
boton16.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[16] = sumarFichas(1, numApostados[16])
                                        console.log(`Apostando ${numApostados[16]} al NUMERO 16`)
                                        boton16.innerHTML = `16 <div class="FichasApostadas fichitas">${numApostados[16]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton17 = document.getElementById("btn17");
boton17.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[17] = sumarFichas(1, numApostados[17])
                                        console.log(`Apostando ${numApostados[17]} al NUMERO 17`)
                                        boton17.innerHTML = `17 <div class="FichasApostadas fichitas">${numApostados[17]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton18 = document.getElementById("btn18");
boton18.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[18] = sumarFichas(1, numApostados[18])
                                        console.log(`Apostando ${numApostados[18]} al NUMERO 18`)
                                        boton18.innerHTML = `18 <div class="FichasApostadas fichitas">${numApostados[18]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton19 = document.getElementById("btn19");
boton19.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[19] = sumarFichas(1, numApostados[19])
                                        console.log(`Apostando ${numApostados[19]} al NUMERO 19`)
                                        boton19.innerHTML = `19 <div class="FichasApostadas fichitas">${numApostados[19]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton20 = document.getElementById("btn20");
boton20.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[20] = sumarFichas(1, numApostados[20])
                                        console.log(`Apostando ${numApostados[20]} al NUMERO 20`)
                                        boton20.innerHTML = `20 <div class="FichasApostadas fichitas">${numApostados[20]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton21 = document.getElementById("btn21");
boton21.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[21] = sumarFichas(1, numApostados[21])
                                        console.log(`Apostando ${numApostados[21]} al NUMERO 21`)
                                        boton21.innerHTML = `21 <div class="FichasApostadas fichitas">${numApostados[21]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton22 = document.getElementById("btn22");
boton22.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[22] = sumarFichas(1, numApostados[22])
                                        console.log(`Apostando ${numApostados[22]} al NUMERO 22`)
                                        boton22.innerHTML = `22 <div class="FichasApostadas fichitas">${numApostados[22]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton23 = document.getElementById("btn23");
boton23.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[23] = sumarFichas(1, numApostados[23])
                                        console.log(`Apostando ${numApostados[23]} al NUMERO 23`)
                                        boton23.innerHTML = `23 <div class="FichasApostadas fichitas">${numApostados[23]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton24 = document.getElementById("btn24");
boton24.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[24] = sumarFichas(1, numApostados[24])
                                        console.log(`Apostando ${numApostados[24]} al NUMERO 24`)
                                        boton24.innerHTML = `24 <div class="FichasApostadas fichitas">${numApostados[24]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton25 = document.getElementById("btn25");
boton25.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[25] = sumarFichas(1, numApostados[25])
                                        console.log(`Apostando ${numApostados[25]} al NUMERO 25`)
                                        boton25.innerHTML = `25 <div class="FichasApostadas fichitas">${numApostados[25]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton26 = document.getElementById("btn26");
boton26.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[26] = sumarFichas(1, numApostados[26])
                                        console.log(`Apostando ${numApostados[26]} al NUMERO 26`)
                                        boton26.innerHTML = `26 <div class="FichasApostadas fichitas">${numApostados[26]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton27 = document.getElementById("btn27");
boton27.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[27] = sumarFichas(1, numApostados[27])
                                        console.log(`Apostando ${numApostados[27]} al NUMERO 27`)
                                        boton27.innerHTML = `27 <div class="FichasApostadas fichitas">${numApostados[27]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton28 = document.getElementById("btn28");
boton28.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[28] = sumarFichas(1, numApostados[28])
                                        console.log(`Apostando ${numApostados[28]} al NUMERO 28`)
                                        boton28.innerHTML = `28 <div class="FichasApostadas fichitas">${numApostados[28]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton29 = document.getElementById("btn29");
boton29.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[29] = sumarFichas(1, numApostados[29])
                                        console.log(`Apostando ${numApostados[29]} al NUMERO 29`)
                                        boton29.innerHTML = `29 <div class="FichasApostadas fichitas">${numApostados[29]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton30 = document.getElementById("btn30");
boton30.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[30] = sumarFichas(1, numApostados[30])
                                        console.log(`Apostando ${numApostados[30]} al NUMERO 30`)
                                        boton30.innerHTML = `30 <div class="FichasApostadas fichitas">${numApostados[30]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton31 = document.getElementById("btn31");
boton31.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[31] = sumarFichas(1, numApostados[31])
                                        console.log(`Apostando ${numApostados[31]} al NUMERO 31`)
                                        boton31.innerHTML = `31 <div class="FichasApostadas fichitas">${numApostados[31]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton32 = document.getElementById("btn32");
boton32.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[32] = sumarFichas(1, numApostados[32])
                                        console.log(`Apostando ${numApostados[32]} al NUMERO 32`)
                                        boton32.innerHTML = `32 <div class="FichasApostadas fichitas">${numApostados[32]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton33 = document.getElementById("btn33");
boton33.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[33] = sumarFichas(1, numApostados[33])
                                        console.log(`Apostando ${numApostados[33]} al NUMERO 33`)
                                        boton33.innerHTML = `33 <div class="FichasApostadas fichitas">${numApostados[33]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton34 = document.getElementById("btn34");
boton34.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[34] = sumarFichas(1, numApostados[34])
                                        console.log(`Apostando ${numApostados[34]} al NUMERO 34`)
                                        boton34.innerHTML = `34 <div class="FichasApostadas fichitas">${numApostados[34]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton35 = document.getElementById("btn35");
boton35.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[35] = sumarFichas(1, numApostados[35])
                                        console.log(`Apostando ${numApostados[35]} al NUMERO 35`)
                                        boton35.innerHTML = `35 <div class="FichasApostadas fichitas">${numApostados[35]} fichas`}
                                        else{alert("te quedaste sin fichas")}});

let boton36 = document.getElementById("btn36");
boton36.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                        numApostados[36] = sumarFichas(1, numApostados[36])
                                        console.log(`Apostando ${numApostados[36]} al NUMERO 36`)
                                                                       
                                        boton36.innerHTML = `36 <div class="FichasApostadas fichitas">${numApostados[36]} fichas`}
                                        else{alert("te quedaste sin fichas")}});


let cero = document.getElementById("cero");
let boton0 = document.getElementById("btn0");
boton0.addEventListener("click", ()=>{if (fichasDisponibles>=1){
                                       numApostados[0] = sumarFichas(1, numApostados[0])
                                       console.log(`Apostando ${numApostados[0]} al NUMERO 0`)
                                       
                                       boton0.innerHTML = `0 <div class="FichasApostadas fichitas">${numApostados[0]} fichas`}
                                       else{alert("te quedaste sin fichas")}});


let botonApostar = document.getElementById("btnApostar");
botonApostar.addEventListener("click", crearApuesta);

let botonSalir = document.getElementById("btnSalir");
botonSalir.addEventListener("click", salir);


// VOY RESTANDO Y MOSTRANDO AL JUGADOR SUS FICHAS DISPONIBLES


let botonNumero = document.getElementsByClassName("btnNumero");

for (let fichitas of botonNumero){
    fichitas.addEventListener("click", ()=>{
        jugadorActual.innerText = `Jugador: ${nombreJugador}
        Fichas Disponibles: ${fichasDisponibles}`
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



