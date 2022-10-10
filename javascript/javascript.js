import { getPromos, getData } from "./api.js";

// TRAIGO LAS PROMOS DEL JSON

let promociones = await getData();



//console.log(getPromos());

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
const numNegros = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

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


fichasDisponibles == 0 && (fichasDisponibles = 100);

// JUGANDO UN POCO CON OPERADORES TERNARIOS EN LAS CLASES DE CSS

jugadorActual.innerHTML = `<p>Jugador: ${nombreJugador}</p>
                           <p class="${fichasDisponibles <= 10 ? "pocasFichas" : "muchasFichas"}">Fichas Disponibles: ${fichasDisponibles}</p>`



// SI EL JUGADOR POSEE 0 FICHAS, LE REINICIO EL VALOR EN 100 PARA QUE EMPIECE DE VUELTA

// if (fichasDisponibles == 0){
//     fichasDisponibles = 100;
// }



let numeroRuleta = document.getElementById("tiroActual");

let fichasGanadas = document.getElementById("fichasGanadas");


// FUNCIÓN INVOCADA POR EL BOTÓN APOSTAR

function crearApuesta(){

    fichasGanadas.innerText = "";
    numeroRuleta.innerText = "";
    
    // APARECE LA RULETA

    let gifRuleta = document.getElementById("gifRuleta");
    gifRuleta.classList.remove("gif");

    // SACO LA RULETA

    setTimeout(()=>{
        gifRuleta.classList.add("gif");
      
    },5000)

    // BORRO EL TEXTO DE LOS BOTONES QUE INDICA LA CANTIDAD DE FICHAS APOSTADAS

    setTimeout(()=>{
        let borrarFichasApostadas = document.getElementsByClassName("FichasApostadas");
        for(let borrar of borrarFichasApostadas){
            borrar.innerHTML = `<div></div>`;
        }
      
    },8000)

    
    // CREO UN OBJETO CON LA PRIMER APUESTA
    apuesta = new Apuesta (numApostados, apuestaRojo, apuestaNegro, apuestaPar, apuestaImpar, apuestaPDoc, apuestaSDoc, apuestaTDoc);
 
    // PUSHEO EL OBJETO AL ARRAY DE APUESTAS
    apuestas.push(apuesta);

    numeroAleatorio = generarNumeroAleatorio();
    
    //numeroAleatorio = 3;

    capturarTiroRuleta();

    tiroRuleta = new Tiro(numeroAleatorio, colorAleatorio, paridadAleatorio, docenaAleatorio);
    tirosRuleta.push(tiroRuleta);

    // MUESTRO EN EL HTML EL TIRO QUE SALIÓ EN LA RULETA

    
    // DESESTRUCTURO EL OBJETO TIRO RULETA
    
    let {numero, color, paridad, docena} = tiroRuleta;
    
//    let numeroRuleta = document.getElementById("tiroActual");
    
    

// MUESTRO EL NÚMERO QUE SALIÓ CON UN SWEETALERT

    setTimeout(()=>{
  
        let timerInterval
        Swal.fire({
          
          
          title: 'Salió el Número:' + tiroRuleta.numero,
          html: '',
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
  
    },5000
    )
    
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

    // MUESTRO LO QUE GANÓ SEGUN SU APUESTA
    
    
    setTimeout(()=>{    
        Swal.fire({
            html: 'Ganaste: ' + gananciaNumero + ' fichas por haber apostado ' + numApostados[tiroRuleta.numero] + ' fichas al ' + tiroRuleta.numero +
            '<br>'+'Ganaste: ' + gananciaColor + ' fichas por haber apostado ' + (gananciaColor / 2) + ' fichas al ' + tiroRuleta.color +
            '<br>'+'Ganaste: ' + gananciaParidad + ' fichas por haber apostado ' + (gananciaParidad / 2) + ' fichas al ' + tiroRuleta.paridad +
            '<br>'+'Ganaste: ' + gananciaDocena + ' fichas por haber apostado ' + (gananciaDocena / 3) + ' fichas al ' + tiroRuleta.docena + 'docena',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });

        fichasDisponibles = fichasDisponibles + totalFichasGanadas;
        console.log(`Te quedan ${fichasDisponibles} Fichas Disponibles`);
                           
                            
        jugadorActual.innerText = `Jugador: ${nombreJugador}
                                   Fichas Disponibles: ${fichasDisponibles}`
                           
                               

        inicializarVariablesApuesta();                        }

    ,7000)

    
    totalFichasGanadas = gananciaNumero + gananciaColor + gananciaParidad + gananciaDocena;
    console.log(`Ganaste ${totalFichasGanadas} Fichas`);
    
    totalFichasApuesta = totalFichasApostadas();
    console.log(`Apostaste un total de ${totalFichasApuesta} Fichas`);
        
    
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
    //let numAle = 0;
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
let col = "cero";

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
        let ganaFichasColor = 0;
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



let botonImpar = document.getElementById("btnImpar");
botonImpar.addEventListener("click", ()=>{apuestaImpar = probandoChances(apuestaImpar,fichitaImpar,botonImpar, "impar")});



let botonRojo = document.getElementById("btnRojo");
botonRojo.addEventListener("click", ()=>{apuestaRojo = probandoChances(apuestaRojo,fichitaRojo,botonRojo,"rojo")});


let botonNegro = document.getElementById("btnNegro");
botonNegro.addEventListener("click", ()=>{apuestaNegro = probandoChances(apuestaNegro,fichitaNegro,botonNegro,"negro")});

let botonPrimeraDocena = document.getElementById("btnPDoc");
botonPrimeraDocena.addEventListener("click", ()=>{apuestaPDoc = probandoChances(apuestaPDoc,fichitaPDoc,botonPrimeraDocena,"1° docena")});


let botonSegundaDocena = document.getElementById("btnSDoc");
botonSegundaDocena.addEventListener("click", ()=>{apuestaSDoc = probandoChances(apuestaSDoc,fichitaSDoc,botonSegundaDocena,"2° docena")});



let botonTerceraDocena = document.getElementById("btnTDoc");
botonTerceraDocena.addEventListener("click", ()=>{apuestaTDoc = probandoChances(apuestaTDoc,fichitaTDoc,botonTerceraDocena,"3° docena")});



let botonComprarFichas = document.getElementById("btnComprarFichas");
botonComprarFichas.addEventListener("click", loadPromos);

let botonApostar = document.getElementById("btnApostar");
botonApostar.addEventListener("click", crearApuesta);

let botonSalir = document.getElementById("btnSalir");
botonSalir.addEventListener("click", salir);


// FUNCIÓN QUE TRAE LAS PROMOS DEL JSON Y LAS MUESTRA AL CLICKEAR EN COMPRAR FICHAS

let contenedorPromos = document.getElementById("contenedorPromos");

function loadPromos(){

    promociones.forEach(p =>{
        let card = document.createElement("div");
        card.innerHTML = `  

           <div class="card cardTama" style="width: 18rem;">
                    <img class="imgPromo" src="${p.img}" class="card-img-top" alt="Imagen Fichas">
                    <div class="card-body">
                      <h5 class="card-title">${p.name}</h5>
                      <p class="card-text">${p.desc}</p>
                      <button class="btnPromo" id="${p.id}" value="${p.id}">Comprar</button>
                    </div>
                </div>
        `
        contenedorPromos.appendChild(card);
    
   //     console.log(p.name);
    }

    );

    
    // CAPTURO LOS BOTONES DE COMPRA DE PROMOCIONES

    let botonPromo = document.getElementsByClassName("btnPromo");
    let bot = 0;

    for (let pr of botonPromo){
        pr.addEventListener("click", ()=>{
            fichasDisponibles=fichasDisponibles+(pr.value*1000);
          //  console.log("que onda maestro " + pr.value + fichasDisponibles);
            contenedorPromos.innerHTML = "";
            jugadorActual.innerHTML = `<p>Jugador: ${nombreJugador}</p>
            <p class="${fichasDisponibles <= 10 ? "pocasFichas" : "muchasFichas"}">Fichas Disponibles: ${fichasDisponibles}</p>`

        })
    
    }

    //<a href="#" class="btn btn-primary">Go somewhere</a>

//console.log(promos);    
}



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
// CAPTURO TODOS LOS BOTONES DE NUMEROS POR CLASE

let botonNumero = document.getElementsByClassName("btnNumero");
let boton;

for (let fichitas of botonNumero){
    fichitas.addEventListener("click", ()=>{
        boton = document.getElementById(fichitas.id);
        probando(boton, fichitas.value);
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


    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    location.reload();

}



