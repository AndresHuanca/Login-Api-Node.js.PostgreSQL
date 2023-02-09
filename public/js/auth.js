    //Auth Manual    
    // variables of form
    const  miFormulario = document.querySelector('#formLogin');

    const url = ( window.location.hostname.includes('localhost') )
                ? 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/auth/'
                : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/auth/';
                

   miFormulario.addEventListener( 'submit', event => {
        // evita el refersh del navegador
        event.preventDefault();
        const formData = {};
        // leer formulario - mediante el name en el form
        for( let el of miFormulario.elements ) {
            if( el.name.length > 0 ) {
                formData[el.name] = el.value;
            }
        }

        console.log(formData);
        
        fetch( url + 'login', { 
            method: 'POST',
            body: JSON.stringify( formData ),
            headers: { 'Content-type': 'application/JSON' },
            
        })
        .then( resp => resp.json())
        .then( ({errors, token}) => {

            if( errors ) {
                return console.error( errors )
            }
            localStorage.setItem( 'token', token );
            console.log(token );
            // A vez autenticado - redireccionar
            window.location = 'ingresoExitoso.html';

        })
        .catch( err => {
            console.log(err);
        });


    });
    
    //Auth Google

