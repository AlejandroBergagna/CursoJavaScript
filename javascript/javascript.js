// ARRAY DE OBJETOS DE LOS TIROS DE LA RULETA
const tirosRuleta = [];

// ARRAY DE OBJETOS DE TODAS LAS APUESTAS
const apuestas = [];

// ARRAY QUE CONTIENE CANTIDADES DE FICHAS APOSTADAS POR NÚMERO
let numApostados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ARRAY DE LOS NÚMEROS NEGROS
const numNegros = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,3,33,35];

// OBJETO APUESTA FORMADO POR ARRAY DE NUMEROS APOSTADOS, Y FICHAS APOSTADAS POR CHANCE
let apuesta = {};

// OBJETO FORMADO POR CADA TIRO ALEATORIO DE RULETA: NRO, COLOR, PARIDAD, DOCENA
let tiroRuleta = {};


// CLASE PARA INSTANCIAR EL TIRO QUE SALIO EN LA RULETA EN UN OBJETO

// RECBE COMO VALOR UN NUMERO, UN COLOR, PAR O IMPAR Y A QUE DOCENA
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


function crearApuesta(){

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

    let numeroRuleta = document.getElementById("tiroActual");
    numeroRuleta.innerText = `Salió el número: ${tiroRuleta.numero}
                              Su color es: ${tiroRuleta.color}
                              Es: ${tiroRuleta.paridad}
                              Pertenece a la ${tiroRuleta.docena} docena`

    
    
    
    
    
    // LLAMO A LA FUNCIÓN QUE ME DEVUELVE CUÁNTAS FICHAS GANÓ POR ACERTAR EL NÚMERO
    
    gananciaNumero = gananciasPorNumeros();

    if (gananciaNumero != 0){
        console.log(`Ganaste ${gananciaNumero} fichas por haber apostado ${numApostados[tiroRuleta.numero]} fichas al ${tiroRuleta.numero}`);
    }

    gananciaColor = gananciasPorColor(); 

    if (gananciaColor != 0){    
        console.log(`Ganaste ${gananciaColor} fichas por haber apostado ${gananciaColor / 2} fichas al ${tiroRuleta.color}`);   
    }
    
    gananciaParidad = gananciasPorParidad();
   
    if (gananciaParidad != 0){
        console.log(`Ganaste ${gananciaParidad} fichas por haber apostado ${gananciaParidad / 2} fichas al ${tiroRuleta.paridad}`);          
    }
    
    gananciaDocena = gananciasPorDocena();
    console.log(gananciaDocena);
    console.log(tiroRuleta.docena);

    if (gananciaDocena != 0){
        console.log(`Ganaste ${gananciaDocena} fichas por haber apostado ${gananciaDocena / 3} fichas al ${tiroRuleta.docena}`);          
    }

 
    let fichasGanadas = document.getElementById("fichasGanadas");
    fichasGanadas.innerText = `Ganaste ${gananciaNumero} fichas por haber apostado ${numApostados[tiroRuleta.numero]} fichas al ${tiroRuleta.numero}
                               Ganaste ${gananciaColor} fichas por haber apostado ${gananciaColor / 2} fichas al ${tiroRuleta.color}
                               Ganaste ${gananciaParidad} fichas por haber apostado ${gananciaParidad / 2} fichas al ${tiroRuleta.paridad}
                               Ganaste ${gananciaDocena} fichas por haber apostado ${gananciaDocena / 3} fichas al ${tiroRuleta.docena} docena`
 
 
    inicializarVariablesApuesta();

    console.log(apuesta);
    console.log(tiroRuleta);


}

// FUNCION QUE LE SUMA LA CANTIDAD DE FICHAS A CADA OPCION ELEGIDA POR EL JUGADOR

function sumarFichas(n, opcion){
    opcion += n;
    return opcion;
}

// FUNCION QUE GENERE UN NÚMERO ALEATORIO ENTRE 0  36

function generarNumeroAleatorio(){
    let numAle = Math.floor(Math.random() * 36);
    return numAle;
}


// DECLARO VARIABLES PARA CAPTURAR EL NÚMERO ALEATORIO  SUS CARACTERÍSTICAS

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
    if (numeroAleatorio % 2 == 0){
        return true;
    }else{
        return false;
    }
}

// FUNCIÓN PARA CAPTURAR EL COLOR DEL NÚMERO ALEATORIO

function capturarColorAleatorio(){
    if (numNegros.includes(numeroAleatorio)){
        let col = "negro";
        return col;
    }else{
        let col = "rojo";
        return col;
    }
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

let botonPar = document.getElementById("btnPar");
botonPar.addEventListener("click", ()=>{apuestaPar = sumarFichas(5, apuestaPar)
                                        console.log(`Apostando ${apuestaPar} a PAR`)});

let botonImpar = document.getElementById("btnImpar");
botonImpar.addEventListener("click", ()=>{apuestaImpar = sumarFichas(5, apuestaImpar)
                                          console.log(`Apostando ${apuestaImpar} a IMPAR`)});

let botonRojo = document.getElementById("btnRojo");
botonRojo.addEventListener("click", ()=>{apuestaRojo = sumarFichas(5, apuestaRojo)
                                         console.log(`Apostando ${apuestaRojo} a ROJO`)});

let botonNegro = document.getElementById("btnNegro");
botonNegro.addEventListener("click", ()=>{apuestaNegro = sumarFichas(5, apuestaNegro)
                                          console.log(`Apostando ${apuestaNegro} a NEGRO`)});

let botonPrimeraDocena = document.getElementById("btnPDoc");
botonPrimeraDocena.addEventListener("click", ()=>{apuestaPDoc = sumarFichas(5, apuestaPDoc)
                                                  console.log(`Apostando ${apuestaPDoc} a PRIMERA DOCENA`)});

let botonSegundaDocena = document.getElementById("btnSDoc");
botonSegundaDocena.addEventListener("click", ()=>{apuestaSDoc = sumarFichas(5, apuestaSDoc)
                                                  console.log(`Apostando ${apuestaSDoc} a SEGUNDA DOCENA`)});

let botonTerceraDocena = document.getElementById("btnTDoc");
botonTerceraDocena.addEventListener("click", ()=>{apuestaTDoc = sumarFichas(5, apuestaTDoc)
                                                  console.log(`Apostando ${apuestaTDoc} a TERCERA DOCENA`)});

let boton1 = document.getElementById("btn1");
boton1.addEventListener("click", ()=>{numApostados[1] = sumarFichas(1, numApostados[1])
                                        console.log(`Apostando ${numApostados[1]} al NUMERO 1`)});

let boton2 = document.getElementById("btn2");
boton2.addEventListener("click", ()=>{numApostados[boton2.innerText] = sumarFichas(1, numApostados[boton2.innerText])
                                        console.log(`Apostando ${numApostados[boton2.innerText]} al NUMERO 2`)});

let boton3 = document.getElementById("btn3");
boton3.addEventListener("click", ()=>{numApostados[boton3.innerText] = sumarFichas(1, numApostados[boton3.innerText])
                                        console.log(`Apostando ${numApostados[boton3.innerText]} al NUMERO 3`)});

let boton4 = document.getElementById("btn4");
boton4.addEventListener("click", ()=>{numApostados[boton4.innerText] = sumarFichas(1, numApostados[boton4.innerText])
                                        console.log(`Apostando ${numApostados[boton4.innerText]} al NUMERO 4`)});

let boton5 = document.getElementById("btn5");
boton5.addEventListener("click", ()=>{numApostados[boton5.innerText] = sumarFichas(1, numApostados[boton5.innerText])
                                        console.log(`Apostando ${numApostados[boton5.innerText]} al NUMERO 5`)});

let boton6 = document.getElementById("btn6");
boton6.addEventListener("click", ()=>{numApostados[boton6.innerText] = sumarFichas(1, numApostados[boton6.innerText])
                                        console.log(`Apostando ${numApostados[boton6.innerText]} al NUMERO 6`)});

let boton7 = document.getElementById("btn7");
boton7.addEventListener("click", ()=>{numApostados[boton7.innerText] = sumarFichas(1, numApostados[boton7.innerText])
                                        console.log(`Apostando ${numApostados[boton7.innerText]} al NUMERO 7`)});

let boton8 = document.getElementById("btn8");
boton8.addEventListener("click", ()=>{numApostados[boton8.innerText] = sumarFichas(1, numApostados[boton8.innerText])
                                        console.log(`Apostando ${numApostados[boton8.innerText]} al NUMERO 8`)});

let boton9 = document.getElementById("btn9");
boton9.addEventListener("click", ()=>{numApostados[boton9.innerText] = sumarFichas(1, numApostados[boton9.innerText])
                                        console.log(`Apostando ${numApostados[boton9.innerText]} al NUMERO 9`)});

let boton10 = document.getElementById("btn10");
boton10.addEventListener("click", ()=>{numApostados[boton10.innerText] = sumarFichas(1, numApostados[boton10.innerText])
                                        console.log(`Apostando ${numApostados[boton10.innerText]} al NUMERO 10`)});

let boton11 = document.getElementById("btn11");
boton11.addEventListener("click", ()=>{numApostados[boton11.innerText] = sumarFichas(1, numApostados[boton11.innerText])
                                        console.log(`Apostando ${numApostados[boton11.innerText]} al NUMERO 11`)});

let boton12 = document.getElementById("btn12");
boton12.addEventListener("click", ()=>{numApostados[boton12.innerText] = sumarFichas(1, numApostados[boton12.innerText])
                                        console.log(`Apostando ${numApostados[boton12.innerText]} al NUMERO 12`)});

let boton13 = document.getElementById("btn13");
boton13.addEventListener("click", ()=>{numApostados[boton13.innerText] = sumarFichas(1, numApostados[boton13.innerText])
                                        console.log(`Apostando ${numApostados[boton13.innerText]} al NUMERO 13`)});

let boton14 = document.getElementById("btn14");
boton14.addEventListener("click", ()=>{numApostados[boton14.innerText] = sumarFichas(1, numApostados[boton14.innerText])
                                        console.log(`Apostando ${numApostados[boton14.innerText]} al NUMERO 14`)});

let boton15 = document.getElementById("btn15");
boton15.addEventListener("click", ()=>{numApostados[boton15.innerText] = sumarFichas(1, numApostados[boton15.innerText])
                                        console.log(`Apostando ${numApostados[boton15.innerText]} al NUMERO 15`)});

let boton16 = document.getElementById("btn16");
boton16.addEventListener("click", ()=>{numApostados[boton16.innerText] = sumarFichas(1, numApostados[boton16.innerText])
                                        console.log(`Apostando ${numApostados[boton16.innerText]} al NUMERO 16`)});

let boton17 = document.getElementById("btn17");
boton17.addEventListener("click", ()=>{numApostados[boton17.innerText] = sumarFichas(1, numApostados[boton17.innerText])
                                        console.log(`Apostando ${numApostados[boton17.innerText]} al NUMERO 17`)});
let boton18 = document.getElementById("btn18");
boton18.addEventListener("click", ()=>{numApostados[boton18.innerText] = sumarFichas(1, numApostados[boton18.innerText])
                                        console.log(`Apostando ${numApostados[boton18.innerText]} al NUMERO 18`)});

let boton19 = document.getElementById("btn19");
boton19.addEventListener("click", ()=>{numApostados[boton19.innerText] = sumarFichas(1, numApostados[boton19.innerText])
                                        console.log(`Apostando ${numApostados[boton19.innerText]} al NUMERO 19`)});

let boton20 = document.getElementById("btn20");
boton20.addEventListener("click", ()=>{numApostados[boton20.innerText] = sumarFichas(1, numApostados[boton20.innerText])
                                        console.log(`Apostando ${numApostados[boton20.innerText]} al NUMERO 20`)});

let boton21 = document.getElementById("btn21");
boton21.addEventListener("click", ()=>{numApostados[boton21.innerText] = sumarFichas(1, numApostados[boton21.innerText])
                                        console.log(`Apostando ${numApostados[boton21.innerText]} al NUMERO 21`)});

let boton22 = document.getElementById("btn22");
boton22.addEventListener("click", ()=>{numApostados[boton22.innerText] = sumarFichas(1, numApostados[boton22.innerText])
                                        console.log(`Apostando ${numApostados[boton22.innerText]} al NUMERO 22`)});

let boton23 = document.getElementById("btn23");
boton23.addEventListener("click", ()=>{numApostados[boton23.innerText] = sumarFichas(1, numApostados[boton23.innerText])
                                        console.log(`Apostando ${numApostados[boton23.innerText]} al NUMERO 23`)});

let boton24 = document.getElementById("btn24");
boton24.addEventListener("click", ()=>{numApostados[boton24.innerText] = sumarFichas(1, numApostados[boton24.innerText])
                                        console.log(`Apostando ${numApostados[boton24.innerText]} al NUMERO 24`)});

let boton25 = document.getElementById("btn25");
boton25.addEventListener("click", ()=>{numApostados[boton25.innerText] = sumarFichas(1, numApostados[boton25.innerText])
                                        console.log(`Apostando ${numApostados[boton25.innerText]} al NUMERO 25`)});

let boton26 = document.getElementById("btn26");
boton26.addEventListener("click", ()=>{numApostados[boton26.innerText] = sumarFichas(1, numApostados[boton26.innerText])
                                        console.log(`Apostando ${numApostados[boton26.innerText]} al NUMERO 26`)});

let boton27 = document.getElementById("btn27");
boton27.addEventListener("click", ()=>{numApostados[boton27.innerText] = sumarFichas(1, numApostados[boton27.innerText])
                                        console.log(`Apostando ${numApostados[boton27.innerText]} al NUMERO 27`)});

let boton28 = document.getElementById("btn28");
boton28.addEventListener("click", ()=>{numApostados[boton28.innerText] = sumarFichas(1, numApostados[boton28.innerText])
                                        console.log(`Apostando ${numApostados[boton28.innerText]} al NUMERO 28`)});

let boton29 = document.getElementById("btn29");
boton29.addEventListener("click", ()=>{numApostados[boton29.innerText] = sumarFichas(1, numApostados[boton29.innerText])
                                        console.log(`Apostando ${numApostados[boton29.innerText]} al NUMERO 29`)});

let boton30 = document.getElementById("btn30");
boton30.addEventListener("click", ()=>{numApostados[boton30.innerText] = sumarFichas(1, numApostados[boton30.innerText])
                                        console.log(`Apostando ${numApostados[boton30.innerText]} al NUMERO 30`)});

let boton31 = document.getElementById("btn31");
boton31.addEventListener("click", ()=>{numApostados[boton31.innerText] = sumarFichas(1, numApostados[boton31.innerText])
                                        console.log(`Apostando ${numApostados[boton31.innerText]} al NUMERO 31`)});

let boton32 = document.getElementById("btn32");
boton32.addEventListener("click", ()=>{numApostados[boton32.innerText] = sumarFichas(1, numApostados[boton32.innerText])
                                        console.log(`Apostando ${numApostados[boton32.innerText]} al NUMERO 32`)});

let boton33 = document.getElementById("btn33");
boton33.addEventListener("click", ()=>{numApostados[boton33.innerText] = sumarFichas(1, numApostados[boton33.innerText])
                                        console.log(`Apostando ${numApostados[boton33.innerText]} al NUMERO 33`)});

let boton34 = document.getElementById("btn34");
boton34.addEventListener("click", ()=>{numApostados[boton34.innerText] = sumarFichas(1, numApostados[boton34.innerText])
                                        console.log(`Apostando ${numApostados[boton34.innerText]} al NUMERO 34`)});

let boton35 = document.getElementById("btn35");
boton35.addEventListener("click", ()=>{numApostados[boton35.innerText] = sumarFichas(1, numApostados[boton35.innerText])
                                        console.log(`Apostando ${numApostados[boton35.innerText]} al NUMERO 35`)});

let boton36 = document.getElementById("btn36");
boton36.addEventListener("click", ()=>{numApostados[boton36.innerText] = sumarFichas(1, numApostados[boton36.innerText])
                                        console.log(`Apostando ${numApostados[boton36.innerText]} al NUMERO 36`)});

let boton0 = document.getElementById("btn0");
boton0.addEventListener("click", ()=>{numApostados[boton0.innerText] = sumarFichas(1, numApostados[boton0.innerText])
                                        console.log(`Apostando ${numApostados[boton0.innerText]} al NUMERO 0`)});



let botonApostar = document.getElementById("btnApostar");
botonApostar.addEventListener("click", crearApuesta);


function ingresarApuesta(){

}



