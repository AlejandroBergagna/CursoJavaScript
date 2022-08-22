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

//DESAFÍO COMPLEMENTARIO 1

let nota1;
let nota2;
let nota3;
let promedio;
let mejorPromedio = 0;
let mejorAlumno;
let nombreAlumno = prompt("Ingrese el nombre del alumno o * para salir:");

while(nombreAlumno != "*"){

    do{
        nota1 = parseInt(prompt("Ingrese primera nota (entre 1 y 10)"));
    }while( (isNaN(nota1)) || (nota1 < 1) || (nota1 > 10) );

    do{
        nota2 = parseInt(prompt("Ingrese segunda nota (entre 1 y 10)"));
    }while( (isNaN(nota2)) || (nota2 < 1) || (nota2 > 10) );

    do{
        nota3 = parseInt(prompt("Ingrese tercera nota (entre 1 y 10)"));
    }while( (isNaN(nota3)) || (nota3 < 1) || (nota3 > 10) );
    
    promedio = (nota1 + nota2 + nota3) / 3;

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






