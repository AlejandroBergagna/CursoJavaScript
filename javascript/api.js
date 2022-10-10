const promos = [
    {
    id: 1,
    img: '../img/ficha1-removebg-preview.png',
    name: 'promo1',
    price: 1000,
    desc: '1000 fi por 1000 pe',
    fichas: 1000
    },

    {
    id: 2,
    img: '../img/ficha5-removebg-preview.png',
    name: 'promo2',
    price: 1500,
    desc: '2000 fi por 1500 pe',
    fichas: 2000
    },
 
    {
    id: 3,
    img: '../img/ficha7-removebg-preview.png',
    name: 'promo3',
    price: 2000,
    desc: '3000 fi por 2000 pe',
    fichas: 3000
    }
        
]

export const getPromos = () => {
    return promos;
}

const API = 'javascript/promociones.json'


export const getData = async () =>{
    const response = await fetch(API);
    const data = await response.json();
    return data;
}