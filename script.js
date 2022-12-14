/* En este script representaremos la vista de un administrador que se encargara de agregar y eliminar contenido de la plataforma multimedia,
optimizando la lógica del mismo con operadores avanzados*/

/* Consultamos a los elementos en el html segun su ID y lo almacenamos en una constante */

const divContenidos = document.getElementById("divContenidos")
const botonLight = document.getElementById("botonLight")
const botonDark = document.getElementById("botonDark")
const formularioId = document.getElementById("formularioId")
const mostrarContenidos = document.getElementById("mostrarContenidos")
let obscurito //Generamos la variable para el modo oscuro

// Generamos un darkmode para el administrador //

//OPERADOR TERNARIO//

(localStorage.getItem('obscurito')) ? obscurito = localStorage.getItem('obscurito') : localStorage.setItem('obscurito', 'light')//Analizo la existencia de la key

//AGREGO LA CLASE obscurito//

if(obscurito == 'dark'){
    document.body.classList.add('obscurito') //Para agregar una clase de css mediante JS ejecutamos classList.add()
}

// Escuchamos los botones del modo obscuro //

botonDark.addEventListener('click',()=>{ // Genero el evento de escucha 
    document.body.classList.add('obscurito')
    localStorage.setItem('obscurito', 'dark') // Asigno el valor dark a la key obscurito
})

botonLight.addEventListener('click',()=>{
    document.body.classList.remove('obscurito') // Remuevo la clase agregada
    localStorage.setItem('obscurito', 'light')// Asigno el valor light a la key obscurito
})

//######################################################################################################################################################################################################################################################################################################################

//UTILIZANDO EL OPERADOR nullish PARA CONSULTAR LA EXISTENCIA DE LA KEY DEL localStorage//

const arraycontenidos = JSON.parse(localStorage.getItem('contenidos')) ?? [] //Consulta con nullish: este metodo me permite generar el localstorage solo en el momento que se genere el evento. 

// FORMULARIO PARA AGREGAR CONTENIDO //

formularioId.addEventListener('submit',(event)=>{ //Inicializo el evento de escucha para el formulario
    event.preventDefault() // Capturamos el evento para que no redirija a otra página
    //Utilizamos el objeto FormData para consultar solo una vez el formulario
    const dataForm = new FormData(event.target)//Con el atributo target nos devuelve el formulario cuando presionan click en el boton
    const contenido = new Contenido(dataForm.get("titulo"), dataForm.get("categoria"),dataForm.get("genero"), dataForm.get("tipo"),dataForm.get("img")) // Creo el nuevo contenido
    contenidos.push(contenido) //Lo guardo en el array
    //Para actualizar el localstorage el mismo siempre tiene que ser igual al array contenidos.push(contenido)=='contenidos'
    localStorage.setItem('contenidos', JSON.stringify(contenidos))//Actualizo el localstorage pasando a formato JSON y pisando los valores anteriores con los nuevos
    formularioId.reset() // Borro el formulario para seguir cargando
})

//##########################################################################################################################################################################################

// Evento para escuchar al boton de mostrarContenidos, y consultar los contenidos guardados en el localstorage//

mostrarContenidos.addEventListener('click',()=>{
    const cardContenido = JSON.parse(localStorage.getItem('contenidos'))//Creamos una constante para de Json a objeto y recorrerlos mediante un forEach
    divContenidos.innerHTML = "" //Igualo a espacio bacio para que no se sumen los contenidos actuales con los recargados
    cardContenido.forEach((contenido, index) => {
        divContenidos.innerHTML += `
            <div class="card border-success mb-3" id="contenido${index}" style="max-width: 20rem;margin:5px;"><!--El elemento padre-->
                <div class="card-header"><h2>${contenido.nombre}<h2></div><!--Primer hijo-->
                <div class="card-body"><!--Segundo hijo-->
                    <p class="card-title">${contenido.genero}</p>
                    <p> <img src="${contenido.img}"></p>
                    <button class="btn btn-danger">ELIMINAR</button>
            </div>
        `
    })
    //Para eliminar el contenido debemos identificar el elemento padre, para ello ejecutamos un forEach
    cardContenido.forEach((contenido,index)=>{
        const tarjetaContenido = document.getElementById(`contenido${index}`)//Genero la constante para obtener al elemento padre
        tarjetaContenido.children[1].children[2].addEventListener('click',()=>{//LLamo al segundo hijo de tarjetaContenido, y dentro del mismo busco el segundo hijo, y le asigno un evento click
            tarjetaContenido.remove()//Elimino el elmento del DOM por su ID
            contenidos.splice(index,1)//Elimino el elemento del array por su indide
            localStorage.setItem('contenidos',JSON.stringify(contenidos)) //Actualizo el localstorage pasando a formato JSON y pisando los valores anteriores con los nuevos(Eliminar del localStorage)
        })
    })
})


