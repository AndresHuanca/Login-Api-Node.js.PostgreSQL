import { 
        displayUserDates,
        updateUserDates, 
        updateUserPhoto} from "./profile.js";


// Login Google

// validarJWT url para local y produccion 
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/auth/';

// validarAdmin url para local y produccion 
const urlAdmin = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/usuarios/'
            : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/usuarios/';

let usuario = null;


// Validar el token del localStorage
const validarJWT = async() => {
    // extrayendo token
    const token1 = localStorage.getItem('token' || '' );

    // Url of production or  developer
    // Extraigo en token del backen de la route auth/
    // y se adigna el token al localStorage
    const resp = await fetch( url, { 
        headers: { 'x-token': token1 }
    });


    // Validación de estancia en los html
    if( resp.status >= 300 ){
        window.location = '../../../index.html';
        console.log(token1);
        throw new Error('Token no valido');
    }    
    
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
    
    // Validar Admin
    validarAdmin(userDb);
        
    // Update photo user 
    updateUserPhoto(userDb);

    //Llamo el profile.js
    displayUserDates(userDb);
    
    // Update user
    updateUserDates(userDb); 

}

// Validar Admin
const validarAdmin = async(user) => {

    const resp = await fetch( urlAdmin, { 
    });
    //Obtengo toda la información del route y controller auth 
    const  {usuarios}  = await resp.json();
    // Search user Admin
    for (let index = 0; index < usuarios.length; index++) {
        
        //User Admin
        if( user.id_usuario == usuarios[index].id_usuario ){
            if ( usuarios[index].rols.rol === 'ADMIN-ROL'  ) {
                // View for Admin
                let itemAdminAccount = `
                <li><a class="dropdown-item" href="adminAccounts.html">Administrar Cuentas</a></li>
                `
                document.getElementById('adminAdmin').innerHTML = itemAdminAccount;

            };

        }

    }

};

const main = async() => {
    // Validar JWT
    await validarJWT();

};

main();

// export 

