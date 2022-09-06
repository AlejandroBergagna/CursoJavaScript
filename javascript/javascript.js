//EJERCICIO PROMEDIO DE NOTAS

/*let nombre = prompt("Ingrese nombre del alumno: ");
console.log(nombre);

let nota1  = prompt("Ingrese nota 1: ");

let nota2 = prompt("Ingrese nota 2: ");

let nota3 = prompt("Ingrese nota 3: ");


let promedio = parseFloat((parseInt(nota1) + parseInt(nota2) + parseInt(nota3)) / 3);

console.log(promedio);

alert(`El promedio de ${nombre} es ${promedio}`);
*/

//EJERCICIO CICLO FOR
/*let nro = parseInt(prompt("Ingrese un numero"));

for (let i = 0; i <=10; i++){
    console.log(`${nro} * ${i} = ${nro*i}`);
}
*/

//DESAFÍO APLICANDO FUNCIONES

// let nota1;
// let nota2;
// let nota3;
// let promedio;
// let mejorPromedio = 0;
// let mejorAlumno;

// let nombreAlumno = prompt("Ingrese el nombre del alumno o * para salir:");

// function validarNota(nota){
//     if ( (isNaN(nota)) || (nota < 1) || (nota > 10) ){
//         return true;
//     }else{
//         return false;
//     }
// }

// function calcularPromedio(a, b, c){
//     promedio = (a + b + c) / 3;
//     return promedio;
// }

// function validarNombre(nombre){
//     if ( (nombre != "*") && (nombre != "") ){
//         return true;
//     }else{
//         return false;
//     }
// }


// while(validarNombre(nombreAlumno)){

//     do{
//         nota1 = parseInt(prompt("Ingrese primera nota (entre 1 y 10)"));
//     }while(validarNota(nota1));

//     do{
//         nota2 = parseInt(prompt("Ingrese segunda nota (entre 1 y 10)"));
//     }while(validarNota(nota2));

//     do{
//         nota3 = parseInt(prompt("Ingrese tercera nota (entre 1 y 10)"));
//     }while(validarNota(nota3));
    
//     promedio = calcularPromedio(nota1, nota2, nota3);

//     if(promedio > mejorPromedio){
//         mejorPromedio = promedio;
//         mejorAlumno = nombreAlumno;
//     }

//     console.log(`El promedio de ${nombreAlumno} es: ${promedio}`);
    
//     nombreAlumno = prompt("Ingrese nombre del alumno o * para salir:");
// }

// if(mejorPromedio != 0){

//     alert(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);
//     console.log(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);

// }else{
//     console.log("No se ha cargado ningun alumno");
//     alert("No se ha cargado ningun alumno");
// }


let nota1;
let nota2;
let nota3;
let promedio;
let mejorPromedio = 0;
let mejorAlumno;

const alumno={nombre:"", notaUno:0, notaDos:0, notaTres:0};

const listAlumnos=[];

let nombreAlumno = prompt("Ingrese el nombre del alumno o * para salir:");

function validarNota(nota){
    if ( (isNaN(nota)) || (nota < 1) || (nota > 10) ){
        return true;
    }else{
        return false;
    }
}

function validarNombre(nombre){
    if ( (nombre != "*") && (nombre != "") ){
        return true;
    }else{
        return false;
    }
}

function CrearAlumno(nombre, n1, n2, n3){
    this.nombre = nombre,
    this.notaUno = n1,
    this.notaDos = n2,
    this.notaTres = n3,

    this.calcProm = () => {
        return ((n1+n2+n3)/3);
    } 
}

while(validarNombre(nombreAlumno)){

    do{
        nota1 = parseInt(prompt("Ingrese primera nota (entre 1 y 10)"));
    }while(validarNota(nota1));

    do{
        nota2 = parseInt(prompt("Ingrese segunda nota (entre 1 y 10)"));
    }while(validarNota(nota2));

    do{
        nota3 = parseInt(prompt("Ingrese tercera nota (entre 1 y 10)"));
    }while(validarNota(nota3));
    
    const alumno = new CrearAlumno(nombreAlumno,nota1,nota2,nota3);
    
    listAlumnos.push(alumno);
    
    promedio = alumno.calcProm();

    if(promedio > mejorPromedio){
        mejorPromedio = promedio;
        mejorAlumno = nombreAlumno;
    }

 
    nombreAlumno = prompt("Ingrese nombre del alumno o * para salir:");
}

for(let prop of listAlumnos){
    console.log(`Nombre del Alumno: ${prop.nombre}`);
    console.log(`Nota 1: ${prop.notaUno}`);
    console.log(`Nota 2: ${prop.notaDos}`);
    console.log(`Nota 3: ${prop.notaTres}`);
    console.log(`Promedio: ${prop.calcProm()}`);
   
}

if(mejorPromedio != 0){

    alert(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);
    console.log(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);

}else{
    console.log("No se ha cargado ningun alumno");
    alert("No se ha cargado ningun alumno");
}





