// Search  Users in Db
// url para local y produccion
const urlUser = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/usuarios/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/usuarios/";

const urlFaculties = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/facultades/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/facultades/";

// variables of form Search Facultades
const searchFaculties = document.querySelector("#formFaculties");

const showUserDate = async () => {
  // Show Users All 
  try {
      //Obtengo toda la información del route y controller buscar
      const searchUser = await fetch(urlUser + `@`, {
        method: "GET",
      });
    
    // Sending json   
      const { results } = await searchUser.json();
      let numberUsers = results.count;
      let numberRows = results.rows;

    //  Sending searchs users    
      getUsers(numberRows,numberUsers);

    } catch (error) {
      console.error(error);
    }
  // Show Users All
  
  // Search Users
  // variables of form Search User
  const searchUsers = document.querySelector("#formSearch");

  searchUsers.addEventListener("submit", async (event) => {
    event.preventDefault();

    // leer formulario - mediante el name en el form
    const formData = {};
    // leer formulario - mediante el name en el form
    for (let el of searchUsers.elements) {
      if (el.name.length > 0) {
        formData[el.name] = el.value;
      }
    }
    const search = formData.nombre;
    // console.log(search);

    try {
      //Obtengo toda la información del route y controller buscar
      const searchUser = await fetch(urlUser + `${search}`, {
        method: "GET",
      });
    
    // Sending json   
      const { results } = await searchUser.json();
      let numberUsers = results.count;
      let numberRows = results.rows;

    //  Sending searchs users    
      getUsers(numberRows,numberUsers);

    } catch (error) {
      console.error(error);
    }
  });
};

const getUsers = (value=[], numberUsers) => {
    let message = [];
    let nombre1 = [];
    let email1 = [];
    let apellidos1 = [];
    let img1 = [];  


    for (let index = 0; index < value.length; index++) {
        nombre1 = value[index].nombre;
        apellidos1 = value[index].apellido;
        email1 = value[index].correo;
        img1 = value[index].id_usuario;

        message += `
        <div class="col">
          <div class="card >
            </div>
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
            </ul>
          </div>
          <div class="my-2"></div>  
          </div>
        
        `;

        document.getElementById('showUser').innerHTML = message;
        
        
    }
    
    // Recargar
    if(numberUsers == 0){
        message=``;
        document.getElementById('showUser').innerHTML = message;
        // console.log(message);
    }
    // Sending numbers users
    numberUsers = `<p>Total : ${numberUsers}</p>`
    document.getElementById('totalUsers').innerHTML = numberUsers;
}

const mainSearch = async () => {
  // Validar Admin
  await showUserDate();
};

mainSearch();
