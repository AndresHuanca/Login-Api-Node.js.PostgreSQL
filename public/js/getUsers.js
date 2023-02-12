// Display USERS

    //Register Manual    
    // variables 

    const url02 = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:8080/api/usuarios/'
                : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/usuarios/';
                

    fetch( url02 , { 
        method: 'GET',
    })
    .then( resp => resp.json())
    .then( ({usuarios}) => {
    // Viene los usuarios 
    console.log(usuarios);
    getUsersAll(usuarios);

    })
    .catch( err => {
        console.log(err);
    });

    // Display all users
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
                console.log(nombre);
                console.log(email);
                console.log(message[index]);

            }
            
    }

