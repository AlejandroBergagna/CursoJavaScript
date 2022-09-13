
const tirosRuleta = [];
const apuestas = [];

let numApostados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const numNegros = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,3,33,35];

let apuesta = {};

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
// O CHANCE

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



// FUNCION PARA VALIDAR EL NUMERO APOSTADO

function validarNumero(n){
    if (((n >= 0) && (n <= 36)) || (n == "*")){
        return true;
        }
        else{
            return false;
        }
    }


function inicializarNumApostados(){
    for (let i=0; i<=36; i++){
        numApostados[i] = 0;
    }
}

let importeApuesta = 0;
let numeroApuesta = 0;


// ESTA FUNCION RECIBE LA APUESTA DE NUMEROS Y CHANCES DEL JUGADOR

// LA IDEA MAS ADELANTE ES QUE EL JUGADOR PUEDA CLICKEAR LAS OPCIONES
// EN EL PAÑO DE LA RULETA



// let numerosApostados = document.getElementsByClassName("nrosApostados");

// let nuevoNumApos = document.createElement("div");

// nuevoNumApos.innerHTML = `<input type="text"><button id="numApos" value="numero"></button>
//                               <input type="text"><button id="fichasApos" value="fichas"></button>`;

// numerosApostados.append(nuevoNumApos);

function controlarPagar(){

    chequeoTiroRuleta();

    tiroRuleta = new Tiro(numeroAleatorio,color,par,doce);
    tirosRuleta.push(tiroRuleta);

    alert(`Este es el número que salio en la ruleta: ${tiroRuleta.numero}
                el color es ${tiroRuleta.color}
                es ${tiroRuleta.paridad}
                y pertenece a la ${tiroRuleta.docena}`);
     
    
    
    let pagaNum = pagaNumeros(apuesta.numApostados, numeroAleatorio);

    if (pagaNum != 0){
        
        alert(`Ganaste ${pagaNum} por haber apostado al ${numeroAleatorio}`);
    }


    if (tiroRuleta.color == "rojo"){
        let pagaColR = pagaColorRojo(apuesta.rojo);
        if (pagaColR != 0){
            alert(`Ganaste ${pagaColR} por haber apostado ${apuesta.rojo} pesos al ${tiroRuleta.color}`);
        }
    }else if (tiroRuleta.color == "negro"){
        let pagaColN = pagaColorNegro(apuesta.negro);
        if (pagaColN != 0){
            alert(`Ganaste ${pagaColN} por haber apostado ${apuesta.negro} pesos al ${tiroRuleta.color}`);
        }
        }


    let pagaParidad = pagaParImpar(apuesta.par, apuesta.impar, tiroRuleta.paridad);

    if (pagaParidad != 0){
        alert(`Ganaste ${pagaParidad} por haber apostado ${tiroRuleta.paridad}`)
    }

    let pagaDoc = pagaDocena(apuesta.doce1, apuesta.doce2, apuesta.doce3, tiroRuleta.docena);

    if (pagaDoc != 0){
        alert(`Ganaste ${pagaDoc} por haber acertado la docena ${tiroRuleta.docena}`)
    }

    mostrarApuesta();

}


function apostarChances(){
    let rojoApuesta = document.getElementById("fichasRojo");
    let negroApuesta = document.getElementById("fichasNegro");
    let parApuesta = document.getElementById("fichasPar");
    let imparApuesta = document.getElementById("fichasImpar");
    let doce1Apuesta = document.getElementById("fichasDoce1");
    let doce2Apuesta = document.getElementById("fichasDoce2");
    let doce3Apuesta = document.getElementById("fichasDoce3");

    apuesta = new Apuesta (numApostados, rojoApuesta.value, negroApuesta.value, parApuesta.value, imparApuesta.value, doce1Apuesta.value, doce2Apuesta.value, doce3Apuesta.value);
    apuestas.push(apuesta);

    console.log(apuesta);
    controlarPagar();



    // chequeoTiroRuleta();

    // tiroRuleta = new Tiro(numeroAleatorio,color,par,doce);
    // tirosRuleta.push(tiroRuleta);

    // alert(`Este es el número que salio en la ruleta: ${tiroRuleta.numero}
    //             el color es ${tiroRuleta.color}
    //             es ${tiroRuleta.paridad}
    //             y pertenece a la ${tiroRuleta.docena}`);
     
    
    
    // let pagaNum = pagaNumeros(apuesta.numApostados, numeroAleatorio);

    // if (pagaNum != 0){
    //     alert(`Ganaste ${pagaNum} por haber apostado al ${numeroAleatorio}`);
    // }


    // if (tiroRuleta.color == "rojo"){
    //     let pagaColR = pagaColorRojo(apuesta.rojo);
    //     if (pagaColR != 0){
    //         alert(`Ganaste ${pagaColR} por haber apostado ${apuesta.rojo} pesos al ${tiroRuleta.color}`);
    //     }
    // }else if (tiroRuleta.color == "negro"){
    //     let pagaColN = pagaColorNegro(apuesta.negro);
    //     if (pagaColN != 0){
    //         alert(`Ganaste ${pagaColN} por haber apostado ${apuesta.negro} pesos al ${tiroRuleta.color}`);
    //     }
    //     }


    // let pagaParidad = pagaParImpar(apuesta.par, apuesta.impar, tiroRuleta.paridad);

    // if (pagaParidad != 0){
    //     alert(`Ganaste ${pagaParidad} por haber apostado ${tiroRuleta.paridad}`)
    // }

    // let pagaDoc = pagaDocena(apuesta.doce1, apuesta.doce2, apuesta.doce3, tiroRuleta.docena);

    // if (pagaDoc != 0){
    //     alert(`Ganaste ${pagaDoc} por haber acertado la docena ${tiroRuleta.docena}`)
    // }


}


function apostar(){
    
    
    do{
        numeroApuesta = prompt("Ingrese número a apostar (0 al 36) o * para salir: ");
    }while(validarNumero(numeroApuesta) == false);


    while(numeroApuesta != "*"){

        importeApuesta = parseInt(prompt("Ingrese dinero a apostar: "));

        i = numeroApuesta;

        numApostados[i] = numApostados[i] + importeApuesta;

        do{
            numeroApuesta = prompt("Ingrese número a apostar (0 al 36) o * para salir: ");
        }while(validarNumero(numeroApuesta) == false);
    
    }

//     let botonRojo = document.getElementById("botRojo");
//     let fichasRojo = document.getElementById("fichasR");

//     let rojoApuesta = 0;

//     botonRojo.onclick = () => {rojoApuesta = fichasRojo.value};


    
//     //botonRojo.onclick = emparentar(fichasRojo.value);
    let btnConfApuesta = document.getElementById("confApuesta"); 
    btnConfApuesta.addEventListener("click", apostarChances);

    // let rojoApuesta = parseInt(prompt("ingrese dinero a apostar al rojo: "));
    // let negroApuesta = parseInt(prompt("ingrese dinero a apostar al negro: "));
    // let parApuesta = parseInt(prompt("Ingrese dinero a par: "));
    // let imparApuesta = parseInt(prompt("ingrese dinero a impar: "));
    // let doce1Apuesta = parseInt(prompt("Ingrese dinero primera docena: "));
    // let doce2Apuesta = parseInt(prompt("ingrese dinero segunda docena: "));
    // let doce3Apuesta = parseInt(prompt("Ingrese dinero tercera docena: "));

    // apuesta = new Apuesta (numApostados, rojoApuesta.value, negroApuesta.value, parApuesta.value, imparApuesta.value, doce1Apuesta.value, doce2Apuesta.value, doce3Apuesta.value);
    // apuestas.push(apuesta);
        
}







// FUNCIÓN PARA CHEQUEAR SI EL NÚMERO QUE SALIÓ EN LA RULETA ES PAR O IMPAR

function chequeoPar(nro){
    if (nro % 2 == 0){
        return true;
    }else{
        return false;
    }
}

// FUNCIÓN PARA CHEQUEAR A QUÉ DOCENA PERTNECE EL NÚMERO QUE SALIÓ EN LA RULETA

function chequeoDocena(nro){
    if (nro >= 1 && nro <= 12){
        let doc = 1;
        return doc;
    }else if(nro >= 13 && nro <=24){
        let doc = 2;
        return doc;
    }else{
        let doc = 3;
        return doc;
    }
    
}

// FUNCIÓN QUE DEVUELVE EL COLOR DE NÚMERO QUE SALIÓ EN LA RULETA

function chequeoColor(nro){
    if (numNegros.includes(nro)){
        let col = "negro";
        return col;
    }else{
        let col = "rojo";
        return col;
    }
}


function chequeoTiroRuleta(){
    if (numeroAleatorio == 0){
        par = "cero";
        color = "cero";
        doce = "cero";
    }else{
        if (chequeoPar(numeroAleatorio)){
            par = "par";
        }else{
            par = "impar";
        }
        doce = chequeoDocena(numeroAleatorio);
        color = chequeoColor(numeroAleatorio);
    }
}


// FUNCION QUE DEVUELVE CUANTO GANA SI ACIERTA EL NÚMERO

function pagaNumeros(nros, nroAle){
    let ganaNro = nros[nroAle] * 36;
    return ganaNro;
}

// FUNCION QUE DEVUELVE CUANTO GANA SI ACIERTA EL COLOR ROJO

function pagaColorRojo(col){
    if (col != 0){
        let ganaCol = col * 2;
        return ganaCol;
    }else{
        let ganaCol = 0;
        return ganaCol;
    }
}

// FUNCION QUE DEVUELVE CUANTO GANA SI ACIERTA EL COLOR NEGRO

function pagaColorNegro(col){
    if (col != 0){
        let ganaCol = col * 2;
        return ganaCol;
    }else{
        ganaCol = 0;
        return ganaCol;
    }
}

// FUNCION QUE DEVUELVE CUANTO GANA SI ACIERTA PAR O IMPAR

let ganaParImpar = 0;

function pagaParImpar(parApo, imparApo, paridadAle){
 
    if (paridadAle == "par"){
        if (parApo != 0){
            ganaParImpar = parApo * 2;
            return ganaParImpar;
        }else{
            ganaParImpar = 0;
            return ganaParImpar;
        }
    }else if (paridadAle == "impar"){
        if (imparApo != 0){
            ganaParImpar = imparApo * 2;
            return ganaParImpar;
        }else{
            ganaParImpar = 0;
            return ganaParImpar;
        }
    }else{
        ganaParImpar = 0;
        return ganaParImpar;

    }
}

// FUNCION QUE DEVUELVE CUANTO GANA SI ACIERTA LA DOCENA

let ganaDoc = 0;

function pagaDocena(docApo1, docApo2, docApo3, docNroAle){
    if (docNroAle == 1){
        if (docApo1 != 0){
            ganaDoc = docApo1 * 3;
            return ganaDoc;
        }else{
            ganaDoc = 0;
            return ganaDoc;
        }
    }else if (docNroAle == 2){
        if (docApo2 != 0){
            ganaDoc = docApo2 * 3;
            return ganaDoc;
        }else{
            ganaDoc = 0;
            return ganaDoc;
        }
    }else if (docNroAle == 3){
        if (docApo3 != 0){
            ganaDoc = docApo3 * 3;
            return ganaDoc;
        }else{
            ganaDoc = 0;
            return ganaDoc;
        }
    }else{
        ganaDoc = 0;
        return ganaDoc;
    }
}

// FUNCIÓN QUE MUESTRA LA APUESTA REALIZADA POR EL JUGADOR

function mostrarApuesta(){
    let i = 0;
    
    for (let fichas of numApostados) {
        if (fichas != 0){
           console.log(`Apostaste ${fichas} al nro ${i}`);
        }

        i += 1;
    }


    for (const prop in apuesta) {
        console.log(`${prop}: ${apuesta[prop]}`);
      }



}



let numeroAleatorio = 0;
let rta = "s";



//do{

    apostar();
   
    // GENERO UN NÚMERO ALEATORIO

    numeroAleatorio = Math.floor(Math.random() * 36);
//    console.log(`salio el numero ${numeroAleatorio}`);

    // numeroAleatorio = 0;
    //mostrarApuesta(apuesta);

    //console.log(apuesta);
    
  //  inicializarNumApostados(); // VUELVO EL ARRAY A CERO

//    rta = prompt("Desea hacer otro tiro (s/n)?");

// }while(rta.toLowerCase() == "s");

// tirosRuleta.forEach(element => console.log(element));



