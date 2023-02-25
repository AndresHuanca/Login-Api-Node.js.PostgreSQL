
// Show profile data
// url para local y produccion
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/usuarios/'
            : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/usuarios/';

const urlPhoto = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/uploads/usuarios/'
            : 'https://portafolio-andres-huanca-namuche-production.up.railway.app/api/uploads/usuarios/';          

const displayUserDates = ({ nombre, apellidos, email, img }) => {
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
        <img src="${img}"  alt="" class="avatarProfile"/>                        
    `
    // Validación de img null
    if(img===null){
        const imgMoment = `<img src="https://cdn.bhdw.net/im/majestic-astronaut-standing-in-front-of-moon-and-earth-wallpaper-91734_w635.webp"  alt="" class="avatarProfile">`
        document.getElementById('img').innerHTML = imgMoment;
    }else{
        document.getElementById('img').innerHTML = img01;
    }

    // console.log(nombre);

}


// Update User
// Function update
const updateUserDates = ({ nombre, apellidos, email, id_usuario }) => {
    
    // variables of form
    const  profileUpdate = document.querySelector('#formUpdateProfile');
    
    // Atento a cambios en el formulario de update profile
    profileUpdate.addEventListener( 'submit', event => {
        // evita el refersh del navegador
        event.preventDefault();
        // Reinicia los alerts
        document.getElementById('messageError').innerHTML = '';
    
        const formData = {};
        // leer formulario - mediante el name en el form
        for( let el of profileUpdate.elements ) {
            if( el.name.length > 0 ) {
                formData[el.name] = el.value;
            }         
        }
    
        let codusuario = id_usuario;
        // console.log(codusuario);
        
        fetch( url + `${codusuario}`, { 
            method: 'PATCH',
            body: JSON.stringify( formData ),
            headers: { 'Content-type': 'application/JSON' },
            
        })
        .then( resp => resp.json())
        .then( ({errors,msg}) => {
            // Mostrar los errores del backend
            if( errors ) {        
                displayAlert(errors);
                return console.error( errors );
            }
            if( msg ) {
                displayAlert(msg);
                return console.error( msg );
            }
    
            // console.log(RESP=erros-msg);
            // A vez autenticado - recargar la pagina
            window.location = '/views/users/ingresoExitoso.html';
    
        })
        .catch( err => {
            console.log(err);
        });
        
    
    })
}
// Validación de existencia de email y password
function displayAlert(value) {
    let  message = '';

            message = `
                <div class="alert alert-danger" role="alert">
                    <div class="text-center ">
                        ${value[0].msg}
                    </div>
                </div> 
                `;
            document.getElementById('messageError').innerHTML = message;
    
        // console.log(value[0].msg);  

}

// Update User
// Function update
const updateUserPhoto = ({ nombre, apellidos, email, id_usuario }) => {

const fileInput = document.getElementById('file-input');
const submitButton = document.getElementById('submit-button');
const loadingIndicator = document.querySelector('#loading-indicator');


submitButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  // Deshabilita el botón y muestra el indicador de carga
  submitButton.disabled = true;
  loadingIndicator.style.display = 'block';

  // Espera 2 segundos (2000 milisegundos) y luego habilita el botón y oculta el indicador de carga
  setTimeout(() => {
    submitButton.disabled = false;
    loadingIndicator.style.display = 'none';
  }, 1500);

  const formData = new FormData();
  formData.append('archivo', file);

  let codusuario = id_usuario;
  console.log(codusuario);
  console.log(urlPhoto+id_usuario);

    // Peticion para actualizar photo 
  fetch(urlPhoto+id_usuario, {
    method: 'PUT',
    body: formData
  })
  .then(response => {
    
    if (!response.ok) {
        throw new Error('Error al actualizar la imagen');
    }
    return response.json();
  })
  .then(data => {
    console.log('Imagen actualizada con éxito');
    location.reload();
    
  })
  .catch(error => {
    console.error('Error al actualizar la imagen:', error);
  });

});

        
}


// Exports
export {
        displayUserDates,
        updateUserDates, 
        updateUserPhoto
    };