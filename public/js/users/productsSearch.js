// Search  Users in Db
// url para local y produccion
const urlUser = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/productosget/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/productosget/";

const urlSearchChecks = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/moda/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/moda/";

const urlSearchCategorys = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/buscar/"
  : "https://backend-nodejs-postgresql.up.railway.app/api/buscar/";


  // variables of form Search Productos
  const searchFaculties = document.querySelector("#formFaculties");
  
  // variables of form Searchs by checks
  const modaCheckbox = document.getElementById('moda-checkbox');
  const computacionCheckbox = document.getElementById('computacion-checkbox');

// Mostrar Productos
const showUserDate = async () => {
  // Show Produsct All start
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

  } catch (error) {
    console.error(error);
  }

  // Search products
  const searchUsers = document.querySelector("#formSearch");

  searchUsers.addEventListener("submit", async (event) => { 
    event.preventDefault();
    // for get cheks
    const moda = modaCheckbox.checked;
    const computacion = computacionCheckbox.checked;

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
      let results;
  
      if (moda && computacion) {
        // Si ambos checkboxes están marcados, buscar sin restricciones
        results = await fetch(urlSearchCategorys+`/general/${search}`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else if (moda) {
        // Si solo el checkbox de moda está marcado, buscar solo en esa categoría
        results = await fetch(urlSearchCategorys + `productocategoria01/${search}`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else if (computacion) {
        // Si solo el checkbox de computación está marcado, buscar solo en esa categoría
        results = await fetch(urlSearchCategorys + `productocategoria02/${search}`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else {
        // Si ninguno de los checkboxes está marcado, no hacer nada
        results = await fetch(urlSearchCategorys+`/general/${search}`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

        // return;
      }
      // Mostrar los resultados de la búsqueda 
      getUsers(results.results.rows, results.results.count);
      // console.log(results)

  } catch (error) {
    console.error(error);
  }

  });
};

  // Searchs by checks
  modaCheckbox.addEventListener('change', buscarProductos);
  computacionCheckbox.addEventListener('change', buscarProductos);
  async function buscarProductos() {
    // Obtener los valores de los checkboxes
    const moda = modaCheckbox.checked;
    const computacion = computacionCheckbox.checked;
  
    try {
      let results;
  
      if (moda && computacion) {
        // Si ambos checkboxes están marcados, buscar sin restricciones
        results = await fetch(urlUser+`res`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else if (moda) {
        // Si solo el checkbox de moda está marcado, buscar solo en esa categoría
        results = await fetch(urlSearchChecks + 'moda').then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else if (computacion) {
        // Si solo el checkbox de computación está marcado, buscar solo en esa categoría
        results = await fetch(urlSearchChecks + 'computacion').then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

      } else {
        // Si ninguno de los checkboxes está marcado, no hacer nada
        results = await fetch(urlUser+`res`).then(res => res.json());
        // getUsers(results.results.rows, results.results.count);

        // return;
      }
      // Mostrar los resultados de la búsqueda 
      getUsers(results.results.rows, results.results.count);
      console.log(results)

  } catch (error) {
    console.error(error);
  }
}
// Searchs by checks end

// Mostrar Productos
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
    id_producto = value[index].id_producto;

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
        <div class="d-flex justify-content-between">
          <!-- <a href="#" class="btn btn-primary">Comprar ahora</a> -->
          <a  class="btn btn-secondary ml-3" data-id="${id_producto}" onclick="addToCart(this.dataset.id)">Añadir al Carrito</a>
        </div>
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
