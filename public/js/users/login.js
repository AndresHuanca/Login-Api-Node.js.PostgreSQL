import { 
        displayUserDates,
        updateUserDates } from "./profile.js";
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
    const token = localStorage.getItem('token' || '' );

    // Url of production or  developer
    // Extraigo en token del backen de la route auth/
    // y se adigna el token al localStorage
    const resp = await fetch( url, { 
        headers: { 'x-token': token }
    });


    // Validación de estancia en los html
    if( resp.status >= 300 ){
        window.location = '../../../index.html';
        console.log(token);
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
    validarAdmin(userDb.id_usuario);

    // Show navbar
    // showNavbarAll();
    // console.log(showNavbarAll());

    // Show properties Admin
    // propertiesAdmin();
    
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

    // console.log(userDb.id_usuario);
    // Search user Admin
    for (let index = 0; index < usuarios.length; index++) {

        //User Admin
        if( user == usuarios[index].id_usuario ){
            if ( usuarios[index].rols.rol === 'ADMIN-ROL'  ) {
                // View for Admin
                let itemAdminAccount = `
                <li><a class="dropdown-item" href="adminAccounts.html">Administrar Cuentas</a></li>
                `
                document.getElementById('adminAdmin').innerHTML = itemAdminAccount;
                // console.log(usuarios[index].rols.rol);
            };
            // console.log(user);
            // console.log(usuarios[index].id_usuario);
        }
    }
    
}

// If Admins
// const propertiesAdmin =  () => {

// }

// Example of navbar global
// Show navbar all
// const showNavbarAll = () => {
//     let navbar = '';
//     navbar = `
//     <nav class="navbar navbar-expand-sm bg-body-tertiary">
//       <div class="container-fluid">
//         <div class="container">
//           <div class="row align-items-center">
//             <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-1">
//               <img
//                 src="../../assets/apple-logo-colorful-outline-black-background-ipad-hd-1179x2556-789.png"
//                 alt=""
//                 class="avatar"
//               />
//             </div>
//             <div class="col-5 col-sm-5 col-md-4 col-lg-3 col-xl-3">
 
//             <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo03"
//             aria-controls="navbarTogglerDemo03"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span class="navbar-toggler-icon"></span>
//           </button>

//           <div
//             class="collapse navbar-collapse "
//             id="navbarTogglerDemo03"
//             >
//             <form class="d-flex navbar-nav me-auto mb-2 mb-lg-0 searchForm" role="search">
//               <button
//                 class="btn btn-outline-success buttonSearch"
//                 type="submit"
//               >
//                 Search
//               </button>
//               <input
//                 class="form-control me-2 searchButton"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//             </form>
//           </div>
//         </div>
//             <div class="col-3 col-sm-5 col-md-6 col-lg-7 col-xl-8 ">
//               <div class="items" >

//                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                   <li class="nav-item">
                    
//                     <div class="dropdown" >
//                       <a
//                         class="btn btn-outline-primary  itemsProfile"
//                         type="button"
//                         data-bs-toggle="dropdown" 
//                         ><img
//                           src="../../assets/category.png"
//                           class="img-fluid img-thumbnail itemsProfile"
//                         />
//                       </a>
//                       <ul class="dropdown-menu">
//                         <li><a class="dropdown-item" href="#">Action</a></li>
//                         <li><a class="dropdown-item" href="#">Another action</a></li>
//                         <li><a class="dropdown-item" href="#">Something else here</a></li>
//                       </ul>
//                     </div>
  
//                   </li>
//                   <li class="nav-item">
//                     <div class="dropdown" >
//                       <a
//                         class="btn btn-outline-primary  itemsProfile"
//                         type="button"
//                         data-bs-toggle="dropdown" 
//                         ><img
//                           src="../../assets/chat.png"
//                           class="img-fluid img-thumbnail itemsProfile"
//                         />
//                       </a>
//                       <ul class="dropdown-menu">
//                         <li><a class="dropdown-item" href="#">Action</a></li>
//                         <li><a class="dropdown-item" href="#">Another action</a></li>
//                         <li><a class="dropdown-item" href="#">Something  here</a></li>
//                       </ul>
//                     </div>
//                   </li>
//                   <li class="nav-item">
//                     <div class="dropdown" >
//                       <a
//                         class="btn btn-outline-primary   itemsProfile"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                         data-bs-display="static"
//                         aria-expanded="false"
//                         ><img
//                           src="../../assets/bell-ring.png"
//                           class="img-fluid img-thumbnail  itemsProfile"
//                         />
//                       </a>
//                       <ul class="dropdown-menu dropdown-menu-end">
//                         <li><a class="dropdown-item" href="#">Action</a></li>
//                         <li><a class="dropdown-item" href="#">Another action</a></li>
//                         <li><a class="dropdown-item" href="#">Something  here</a></li>
//                       </ul>
//                     </div>
//                   </li>
//                   <li class="nav-item">
//                     <div class="dropdown" >
//                       <a
//                         class="btn btn-outline-primary  itemsProfile"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                         data-bs-display="static"
//                         aria-expanded="false"

//                         ><img
//                           src="../../assets/user (3).png  "
//                           class="img-fluid img-thumbnail itemsProfile"
//                         />
//                       </a>
//                       <ul class="dropdown-menu dropdown-menu-end">
//                         <li><a class="dropdown-item" href="ingresoExitoso.html">Mi Perfil</a></li>
//                         <li><a class="dropdown-item" href="#">Another action</a></li>
//                         <li><a class="dropdown-item" href="#">Something  here</a></li>
//                       </ul>
//                     </div>
//                   </li>
//                 </ul>
//               </div> 
              

//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>

//     `
//     document.getElementById('navbarProfile').innerHTML = navbar;
//     // console.log(navbar);
// }

// login ejecutandose

const main = async() => {
    // Validar JWT
    await validarJWT();

};

main();

// export 

