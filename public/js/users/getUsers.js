// Display USERS Admin
 
    // variables 
    const url02 = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:8080/api/usuarios/'
                : 'https://backend-nodejs-postgresql.up.railway.app/api/usuarios/';

                // validarJWT url para local y produccion 
    const url = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:8080/api/auth/'
                : 'https://backend-nodejs-postgresql.up.railway.app/api/auth/';

         
    // Validación de permanencia
    const validarAdmin = async() => {

      let cont = 0;

      // List Users
      //Obtengo toda la información del route y controller auth 
      const respUser = await fetch( url02 , { 
                  method: 'GET',
      });

      const { usuarios } = await respUser.json();    
      // console.log(usuarios);
      
      //Extraigo token 
      const token = localStorage.getItem('token' || '' );

      // Averiguar usuario autenticado
      const respUserAdmin = await fetch( url, { 
        headers: { 'x-token': token }
      });

      const { usuario: userDb} = await respUserAdmin.json();
      // console.log(usuario);

        // Search user Admin
        for (let index = 0; index < usuarios.length; index++) {
            
            //User Admin
            if( userDb.id_usuario == usuarios[index].id_usuario ){
                if ( usuarios[index].rols.rol === 'ADMIN-ROL'  ) {
                    // View for Admin
                    cont = cont + 1;
                    let itemAdminAccount = `
                    <li><a class="dropdown-item" href="adminAccounts.html">Administrar Cuentas</a></li>
                    `
                    document.getElementById('adminAdmin').innerHTML = itemAdminAccount;
                    // Show users solo Admins
                    getUsersAdminPanel(usuarios);

                    //Escuchando el boton 
                    document.querySelectorAll('#deleteUser').forEach(button => {
                    button.addEventListener('click', event =>{
                      // event.preventDefault();
                      // asignando los atributos con event
                      // Enviando id_usuario
                      const buttonName = event.target.name;
                      deleteUsers(buttonName, token);
                      });
                    });
                };
            }
            // validacion de permanencia de admin en adminAccounts
            if( index + 1 == usuarios.length){
                if(cont < 1 ){
                    window.location = '../../views/users/principal.html';
                    throw new Error('Token no valido');
                }
    
            }
    
        }
        
    };

    


    // Display all users Panel Admin
    function getUsersAdminPanel(value=[]) {
        let  message1 = '';
        let  showModal = '';
        let nombre1 = [];
        let email1 = [];
        let apellidos1 = [];
        let id_usuario = [];        
        // console.log(value);
        
        for (let index = 0; index < value.length; index++) {
                nombre1 = value[index].nombre;
                apellidos1 = value[index].apellido;
                email1 = value[index].correo;
                id_usuario = value[index].id_usuario;

                message1 += `
                <div class="card cardUser">
                <div class="card-header ">
                  <h5>Usuario : ${index + 1}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <div class="nombre">
                      <li class="list-group-item" name="${index+1}" >Nombre : ${nombre1}</li>
                    </div>
                    <div class="apellidos">
                      <li class="list-group-item" name="${index+2}" >Apellidos : ${apellidos1}</li>
                    </div>
                    <div class="email">
                      <li class="list-group-item" name="${index+3}">Email : ${email1}</li>
                    </div>
                    <!-- Button Modal -->
                    <button
                      type="button"
                      class="list-group-item list-group-item-action text-center"
                      data-bs-toggle="modal"
                      data-bs-target="#${index}"
                      modal="modal"
                    >
                      Eliminar
                    </button>
                </ul>
              </div>
                `;
                
              document.getElementById('showUser').innerHTML = message1;

              showModal += `
              <!-- Modal -->
              <div
                class="modal fade"
                id="${index}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Confirmación de Elimación de Usuario
                      </h1>
                      <button
                        type="button"
                        class="btn-close botonDelete"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>${nombre1}</p>
                        <button id="deleteUser"  class="btn btn-danger" name="${id_usuario}" >Eliminar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              `;

              document.getElementById('showModals').innerHTML = showModal;
  
        }
        // Total de usuarios
        let total = '';
        total = value.length;
        total = `<p>Total : ${total}</p>`
        document.getElementById('totalUsers').innerHTML = total;     
        
        
    }
       
      // listener User
      const deleteUsers = ( buttonName, token ) => {
        
        // Fetch Delete User
        fetch(url02 +`${buttonName}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-token" : token 
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
                // Reiniciar html
                // displayAlert(msg);
                  return console.error( msg );
              }
      
          })
          .catch( err => {
              
              console.log(err);
          });
  
      };
      
      const mainAdmin = async() => {
        // Validar Admin
        await validarAdmin();
        
      };
      
      mainAdmin();
      
 
