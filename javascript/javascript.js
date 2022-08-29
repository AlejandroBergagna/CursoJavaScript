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

let nota1;
let nota2;
let nota3;
let promedio;
let mejorPromedio = 0;
let mejorAlumno;

let nombreAlumno = prompt("Ingrese el nombre del alumno o * para salir:");

function validarNota(nota){
    if ( (isNaN(nota)) || (nota < 1) || (nota > 10) ){
        return true;
    }else{
        return false;
    }
}

function calcularPromedio(a, b, c){
    promedio = (a + b + c) / 3;
    return promedio;
}

function validarNombre(nombre){
    if ( (nombre != "*") && (nombre != "") ){
        return true;
    }else{
        return false;
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
    
    promedio = calcularPromedio(nota1, nota2, nota3);

    if(promedio > mejorPromedio){
        mejorPromedio = promedio;
        mejorAlumno = nombreAlumno;
    }

    console.log(`El promedio de ${nombreAlumno} es: ${promedio}`);
    
    nombreAlumno = prompt("Ingrese nombre del alumno o * para salir:");
}

if(mejorPromedio != 0){

    alert(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);
    console.log(`El mejor alumno es ${mejorAlumno} y su promedio es ${mejorPromedio}`);

}else{
    console.log("No se ha cargado ningun alumno");
    alert("No se ha cargado ningun alumno");
}






