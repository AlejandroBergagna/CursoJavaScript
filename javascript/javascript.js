//EJERCICIO PROMEDIO DE NOTAS

let nombre = prompt("Ingrese nombre del alumno: ");
console.log(nombre);

let nota1 = prompt("Ingrese nota 1: ");

let nota2 = prompt("Ingrese nota 2: ");

let nota3 = prompt("Ingrese nota 3: ");


let promedio = parseFloat((parseInt(nota1) + parseInt(nota2) + parseInt(nota3)) / 3);

console.log(promedio);

alert(`El promedio de ${nombre} es ${promedio}`);

//EJERCICIO CICLO FOR
let nro = parseInt(prompt("Ingrese un numero"));

for (let i = 0; i <=10; i++){
    console.log(`${nro} * ${i} = ${nro*i}`);
}

