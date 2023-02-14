// Login Google
// url para local y produccion
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/auth/';

let usuario = null;


// Validar el token del localStorage
const validarJWT = async() => {
    // extrayendo token
    const token = localStorage.getItem('token' || '' );

    // Validación si viene token - Mejorar
    if( token <= 9 ) {
        // retornar al index.html
        window.location = '../../../index.html';
        console.log(token);
        throw new Error('Token no valido');
    }

    // Url of production or  developer
    // Extraigo en token del backen de la route auth/
    // y se adigna el token al localStorage
    const resp = await fetch( url, { 
        headers: { 'x-token': token }
    });
    // console.log(token);
    
    //Obtengo toda la información del route y controller auth 
    // const datosUserAuth = await resp.json();
    // console.log(datosUserAuth);

    const { usuario: userDb, token: tokenDb } = await resp.json();
    // establezco el nuevo JWT 
    localStorage.setItem( 'token', tokenDb );
    // Save information of user
    usuario = userDb;
    // Title in page
    document.title = usuario.nombre;
    // console.log( usuario )

    displayUserDates(userDb);
}

//Display users dates
const displayUserDates = ({nombre, apellidos, email, img }) => {
    let img01 = '';
    let nombre01 = '';
    let apellidos01 = '';
    let email01 = '';

    // Nombre
    nombre01 = `
        <h5 class="card-title">Nombre :</h5>
        <p class="card-text">${nombre}</p>
        <hr>
    `
    document.getElementById('nombre').innerHTML = nombre01;

    // Apellidos
    apellidos01 = `
        <h5 class="card-title">Apellidos :</h5>
        <p class="card-text">${apellidos}</p>
        <hr>
    `
    document.getElementById('apellidos').innerHTML = apellidos01;

    // Apellidos
    email01 = `
        <h5 class="card-title">Email :</h5>
        <p class="card-text">${email}</p>
        <hr>
    `
    document.getElementById('email').innerHTML = email01;
    
    // Img
    img01 = `
    <img src="${img}"  alt="" class="avatar">
    `
    // Validación de img null
    if(img===null){
        const imgMoment = '../../../assets/hjspg9m7n6a51.jpg'
        document.getElementById('img').innerHTML = imgMoment;
    }else{
        document.getElementById('img').innerHTML = img01;
    }

    // console.log(nombre);

}

function getUsersAll(value=[]) {
        let  message = '';
        let nombre = [];
        let email = [];

        for (let index = 0; index < value.length; index++) {
                nombre = value[index].nombre;
                email = value[index].email;
                
                message += `
                <p class="card-text"> Usuario: ${nombre} </p>
                <p class="card-text"> Email: ${email} </p>
                <hr>
                `;
                document.getElementById('getUsers').innerHTML = message;
                // console.log(nombre);
                // console.log(email);
                // console.log(message[index]);

            }
            
    }

// login ejecutandose
const main = async() => {
    // Validar JWT
    await validarJWT();
};

main();