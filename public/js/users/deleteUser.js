// Show profile data
// url para local y produccion
const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/usuarios/"
  : "https://portafolio-andres-huanca-namuche-production.up.railway.app/api/usuarios/";

// Delete User
const deleteUsers = (user) => {
  // variables of form
  const userDelete = document.querySelectorAll("#deleteUser");

  // Atento a cambios en el formulario de update profile
  userDelete.addEventListener("click", function() {
    // evita el refersh del navegador
    // event.preventDefault();
    // Reinicia los alerts
    // document.getElementById("messageError").innerHTML = "";
    console.log('hola')
    console.log(userDelete)
    // const formData = '';
    // // leer formulario - mediante el name en el form
    // for (let el of userDelete.elements) {
    //   if (el.name.length > 0) {
    //     formData[el.name] = el.value;
    //   }
    // }
    console.log(event)
    console.log(user)
    console.log(token)
    // console.log(codusuario);

        // fetch(url +`${formDatas}`, {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "x-token" : token1 
        //   },
        // })
        // .then( resp => resp.json())
        // .then( ({errors,msg}) => {
        //     // Mostrar los errores del backend
        //     if( errors ) {        
        //         // displayAlert(errors);
        //         return console.error( errors );
        //     }
        //     if( msg ) {
        //         displayAlert(msg);
        //         // return console.error( msg );
        //     }

        //     // console.log(RESP=erros-msg);
        //     // A vez autenticado - recargar la pagina
        //     // window.location = '/views/users/ingresoExitoso.html';
    
        // })
        // .catch( err => {
            
        //     console.log(err);
        // });

  });
};

// Validación de existencia de email y password
// function displayAlert(value) {
//   let message = "";

//   message = `
//                 <div class="alert alert-danger" role="alert">
//                     <div class="text-center ">
//                         ${value[0].msg}
//                     </div>
//                 </div> 
//                 `;
//   document.getElementById("messageError").innerHTML = message;

//   // console.log(value[0].msg);
// }

// Exports
export { deleteUsers };