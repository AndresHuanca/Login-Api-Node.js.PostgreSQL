
// validarJWT url para local y produccion 
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/auth/';
// url car
const urlCar = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/carritos/one/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/carritos/one/';

// url car
const urlProCar = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/productos_x_carritos'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/productos_x_carritos';

// Get User Login
const userData = async() => {
    // extrayendo token
    const token1 = localStorage.getItem('token' || '' );

    // Extraigo en token del backen de la route auth/
    const resp = await fetch( url, { 
        headers: { 'x-token': token1 }
    });
    
    const { usuario } = await resp.json();
    
    return usuario;  
        
}

// Agregar al amount the car
const addToCart = async (id) => {
    // amount
    const cantidad = 1;
    // get User
    const  {id_usuario} = await userData();

    // get car
    const resp = await fetch( urlCar +`${id_usuario}`, { 
    });

    const  {carrito}  = await resp.json();
    // Set id_carrito 
    const id_carrito = carrito.id_carrito;
    
    let formData = {
        cantidad,
        id_producto: id,
        id_carrito
    }

    fetch( urlProCar , { 
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-type': 'application/JSON' },
        
    })
    .then( resp => resp.json())
    .then( ({errors, msg}) => {

        // Mostrar los errores del backend
        if( errors ) {        
            // displayAlert01(errors);
            return console.error( errors );
        }
        if( msg ) {
            // displayAlert01(msg);
            alert("El producto ya esta en el carrito");
            // return console.error( msg );
        }
        alert("Producto Añadido al carrito");
        // A vez autenticado - redireccionar
        // window.location = '../../views/users/ingresoExitoso.html';

    })
    .catch( err => {
        console.log(err);
    });

    
}

