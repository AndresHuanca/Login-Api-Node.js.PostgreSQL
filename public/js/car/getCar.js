
// validarJWT url para local y produccion 
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/auth/';
// url car
const urlCar = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/carritos/get/'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/carritos/get/';

// url car
const urlProCar = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/productos_x_carritos'
            : 'https://backend-nodejs-postgresql.up.railway.app/api/productos_x_carritos';

// Get Car by user
const carData = async() => {
    // extrayendo token
    const token1 = localStorage.getItem('token' || '' );

    // Extraigo en token del backen de la route auth/
    const resp = await fetch( url, { 
        headers: { 'x-token': token1 }
    });
    
    const { usuario } = await resp.json();
    // get id_usuario
    const id_usuario = usuario.id_usuario;
    
    // Display car 
    try {

        const respCar = await fetch( urlCar + `${ id_usuario }` , { 
            method: 'GET',
        });
        // car data 
        const {showCar} = await respCar.json();
        let total = showCar.total;
        let cars = showCar.cars;


        // sending car data
        car(cars, total);

    } catch (msg) {
        console.log(msg)
        displayAlert01();
    }  
        
}

// Car
const car = async (cars=[], total) => {
    const car = cars;
    let result = "";
    let cantidadTotal = 0;

    car.forEach( (ca) => {
        const cantidad = ca.cantidad;
        const id_proCar = ca.id_producto_x_carrito;
        const producto = ca.productsProducts.nombre;
        const precio = ca.productsProducts.precio;
        const img = ca.productsProducts.img;
        const subtotal = ca.subtotal;

        cantidadTotal += cantidad;

        result += `
        <hr />
        <h5 class="card-title">${producto}</h5>
        <div class="d-flex align-items-center">
          <img
            src="${img}"
            alt=""
            class="card-img-top"
          />
          <p class="card-text ms-3" id="precio">S/${subtotal}</p>
          <div class="ms-auto">
            <select
              class="form-select form-select-sm miSelect"
              aria-label=".form-select-sm example"
              onchange="addProduct()" 
            >
              <option data-id="${id_proCar}" selected>${cantidad}</option>
              <option value="1" data-id="${id_proCar}">1</option>
              <option value="2" data-id="${id_proCar}">2</option>
              <option value="3" data-id="${id_proCar}">3</option>
              <option value="4" data-id="${id_proCar}">4</option>
              <option value="5" data-id="${id_proCar}">5</option>
              <option value="6" data-id="${id_proCar}">6</option>
              <option value="7" data-id="${id_proCar}">7</option>
              <option value="8" data-id="${id_proCar}">8</option>
              <option value="9" data-id="${id_proCar}">9</option>
              <option value="10" data-id="${id_proCar}">10</option>
            </select>
          </div>
        </div>
        <div class="d-flex align-items-end justify-content-end">
            <a data-id="${id_proCar}"  class="text-danger eliminar"  onclick="removeProduct(this.dataset.id)">Eliminar</a>
        </div>
        `
    })

    // sending car
    document.getElementById("car").innerHTML = result;
    
    // sending subtotal
    let resSub = "";
        resSub = `
        <p class="card-text">Sub Total (${cantidadTotal}) : ${total}</p>
    `
    document.getElementById("subtotal").innerHTML = resSub;

    // sending total
    let resTotal = "";
    resTotal = `
        <p class="card-text">Total : ${total}</p>
    `
    document.getElementById("total").innerHTML = resTotal;
    
}

// Messages
function displayAlert01() {

        message = `
            <div class="alert alert-danger" role="alert">
                <div class="text-center ">
                    Carrito Vacío   
                </div>
            </div> 
        `;
        document.getElementById('messageError01').innerHTML = message;       
}

const mainCar = async () => {
    // Show car
    await carData();
};

mainCar();
