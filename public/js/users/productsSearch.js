// Search  Users in Db
// url para local y produccion
const urlUser = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/productosget/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/usuariosget/";

const urlFaculties = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/facultades/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/facultades/";

// variables of form Search Facultades
const searchFaculties = document.querySelector("#formFaculties");

const showUserDate = async () => {
  // Show Users All
  try {
    //Obtengo toda la información del route y controller buscar
    const searchUser = await fetch(urlUser + `res`, {
      method: "GET",
    });

    // Sending json
    const { results } = await searchUser.json();
    let numberUsers = results.count;
    let numberRows = results.rows;

    //  Sending searchs users
    getUsers(numberRows, numberUsers);
    console.log(numberUsers);
    console.log(numberRows);
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
    console.log(search);

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
      getUsers(numberRows, numberUsers);
    } catch (error) {
      console.error(error);
    }
  });
};

const getUsers = (value = [], numberUsers) => {
  let message = [];
  let nombre1 = [];
  let descripcion = [];
  let precio = [];
  let img1 = [];

  for (let index = 0; index < value.length; index++) {
    nombre1 = value[index].nombre;
    descripcion = value[index].descripcion;
    img1 = value[index].img;
    precio = value[index].precio;

    message += `
    <div class="col">
    <div class="card h-100">
      <img
        src="${img1}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title mb-3">${nombre1}</h5>
        <p class="card-text mb-3">${descripcion}</p>
        <p class="card-text mb-3"><strong>Precio:</strong>${precio}</p>
        <a href="#" class="btn btn-primary">Comprar ahora</a>
      </div>
    </div>
  </div>
        `;

    document.getElementById("showUser").innerHTML = message;
  }

  // Recargar
  if (numberUsers == 0) {
    message = ``;
    document.getElementById("showUser").innerHTML = message;
    console.log(message);
  }
  // Sending numbers users
  numberUsers = `<p>Total : ${numberUsers}</p>`;
  document.getElementById("totalUsers").innerHTML = numberUsers;
};

const mainSearch = async () => {
  // Validar Admin
  await showUserDate();
};

mainSearch();
