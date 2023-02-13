    //Auth Manual    
    // variables of form
    const  miFormulario = document.querySelector('#formLogin');

    const url = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:8080/api/auth/'
                : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/auth/';
                

   miFormulario.addEventListener( 'submit', event => {
        // evita el refersh del navegador
        event.preventDefault();
        // Reinicia los alerts
        document.getElementById('messageError').innerHTML = '';
        
        const formData = {};
        // leer formulario - mediante el name en el form
        for( let el of miFormulario.elements ) {
            if( el.name.length > 0 ) {
                formData[el.name] = el.value;
            }         
        }        
        
        fetch( url + 'login', { 
            method: 'POST',
            body: JSON.stringify( formData ),
            headers: { 'Content-type': 'application/JSON' },
            
        })
        .then( resp => resp.json())
        .then( ({errors, token, msg}) => {
            // Mostrar los errores del backend
            if( errors ) {        
                displayAlert(errors);
                return console.error( errors );
            }
            if( msg ) {
                displayAlert(msg);
                return console.error( msg );
            }

            // Guardo el token en localStorage
            localStorage.setItem( 'token', token );
            // console.log(token );
            // A vez autenticado - redireccionar
            window.location = '/views/users/ingresoExitoso.html';

        })
        .catch( err => {
            console.log(err);
        });


    });
    
    // Validación de existencia de email y password
    function displayAlert(value) {
        let  message = '';

                message = `
                    <div class="alert alert-danger" role="alert">
                        <div class="text-center ">
                            ${value}
                        </div>
                    </div> 
                    `;
                document.getElementById('messageError').innerHTML = message;
        
            console.log(value);  
    
    }
