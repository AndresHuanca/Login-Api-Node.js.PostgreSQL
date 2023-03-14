
// User url
const urlUser = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/auth/';

// Delete productos_x_carritos
const urlProduct = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/productos_x_carritos/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/productos_x_carritos/';

// url car
const urlAmount = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/productos_x_carritos/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/productos_x_carritos/';

let primerClic = false;

// Get User Login
const userData = async() => {
    // extrayendo token
    const token1 = localStorage.getItem('token' || '' );

    // Extraigo en token del backen de la route auth/
    const resp = await fetch( urlUser, { 
        headers: { 'x-token': token1 }
    });
    
    const { usuario } = await resp.json();

    return usuario;  
        
}

// Patch car delete
const removeProduct = async (id_producto) => {
    console.log(id_producto);
    // Fetch Delete User
    fetch( urlProduct +`${id_producto}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        //   "x-token" : token 
        },
    })
    .then( resp => resp.json())
    .then( ({errors,msg}) => {
          // Mostrar los errores del backend
        if( errors ) {        
            // displayAlert(errors);
            return console.error( errors );
        }
        if( msg ) {
            // displayAlert(msg);
            console.log('eliminado')
            location.reload();
            return console.error( msg );
        }
        // Reiniciar html
    })
    .catch( err => {
        console.log(err);

    });
}

// Amount product
const addProduct = () => {
    const select = document.querySelectorAll('.miSelect');

    // Iterate over the list of elements
    select.forEach( (select) => {
        // Get value amount
        let product = select.value;
        // get data-id
        // id_product
        let id_product = select.options[select.selectedIndex].getAttribute("data-id");
        
        // para obviar el primer click
        if(product !== "" && id_product !=="") {
    
            // Assigning quantity
            const formData = {
                cantidad: product,
            }
    
            fetch( urlAmount + `${id_product}`, { 
                method: 'PATCH',
                body: JSON.stringify( formData ),
                headers: { 'Content-type': 'application/JSON' },
                
            })
            .then( resp => resp.json())
            .then( ({errors,msg}) => {
                // Mostrar los errores del backend
                if( errors ) {        
                    // displayAlert(errors);
                    return console.error( errors );
                }
                if( msg ) {
                    // displayAlert(msg);
                    return console.error( msg );
                }

                location.reload();    
            })
            .catch( err => {
                console.log(err);
            });
        };

    });

};

