import { 
        displayUserDates,
        updateUserDates } from "./profile.js";
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

    // Url of production or  developer
    // Extraigo en token del backen de la route auth/
    // y se adigna el token al localStorage
    const resp = await fetch( url, { 
        headers: { 'x-token': token }
    });

    console.log(resp.status);

    // Validación de estancia en los html
    if( resp.status >= 300 ){
        window.location = '../../../index.html';
        console.log(token);
        throw new Error('Token no valido');
    }
    

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
    // console.log( userDb )

    //Llamo el profile.js
    displayUserDates(userDb);
    // Update user
    updateUserDates(userDb);
}


// login ejecutandose
const main = async() => {
    // Validar JWT
    await validarJWT();
};

main();

// export 

