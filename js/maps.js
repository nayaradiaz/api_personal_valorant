let titleHeader = ["Home", "Agents", "Maps"];
let hrefHeader = ["index.html", "agents.html", "maps.html"];
const urlApi = "https://valorant-api.com/v1/maps";
let maps = [];
function header() {
    // Crear elementos
    let header = document.createElement("header");
    let nav = document.createElement("nav");
    let h1 = document.createElement("h1");
    let ul = document.createElement("ul");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    // Configurar contenido
    h1.textContent = "Valorant";
    let li, a;
    for (let i = 0; i < titleHeader.length; i++) {
        li = document.createElement("li");
        a = document.createElement("a");
        a.textContent = titleHeader[i];
        a.href = hrefHeader[i];

        ul.appendChild(li);
        li.appendChild(a);
        a.classList.add("text-white", "px-4", "font-thin", "text-slate-100", "lg:px-6", "lg:font-light", "lg:text-md");
        li.classList.add("transition", "ease-in-out", "delay-150", "hover:-translate-y-1", "hover:scale-110", "hover:bg-blue-500", "duration-300", "rounded-sm");
    }

    // Insertar en el DOM
    document.body.appendChild(header);
    header.appendChild(nav);
    nav.appendChild(div1);
    nav.appendChild(div2);
    div1.appendChild(h1);
    div2.appendChild(ul);

    // Estilos
    header.classList.add("bg-neutral-800", "text-white", "h-20", "flex", "items-center", "px-4", "font-mono", "md:h-24", "lg:h-32");
    h1.classList.add("font-semibold", "uppercase", "text-3xl", "text-white", "tracking-widest", "md:text-4xl", "lg:text-6xl");
    nav.classList.add("flex", "flex-col", "items-center", "w-full", "lg:gap-y-2");
    div1.classList.add("basis-1/4","mb-2");
    div2.classList.add("basis-1/2", "flex", "justify-center");
    ul.classList.add("flex", "list-none", "m-0", "p-0");
}
header()
function mostrarMapas(array) {
    let section = document.querySelector("section");
    if (!section) {
        section = document.createElement("section");
        section.classList.add("container", "mx-auto", "px-4", "py-6");
        document.body.appendChild(section);
    }
    section.innerHTML = "";
    section.classList.add("grid", "gap-6", "grid-cols-1", "sm:grid-cols-1", "lg:grid-cols-2");

    array.map(maps => {
        let card = document.createElement("div");
        card.classList.add("flex", "justify-center","flex-col","items-center")
        let divPhoto = document.createElement("div");
        divPhoto.classList.add("border-double", "border-4", "border-slate-600")

        let photo = document.createElement("img");
        photo.src = maps.splash;
        photo.alt = maps.displayName;
        photo.classList.add("block", "relative", "w-96", "md:w-auto", "lg:w-auto", "h-auto", "object-cover");
        

        let name = document.createElement("h2");
        name.classList.add("font-extrabold","mb-4", "uppercase", "text-2xl", "text-slate-600", "tracking-widest","md:text-3xl", "lg:text-4xl");
        name.textContent = maps.displayName;

       


        section.appendChild(card);
        card.appendChild(name);
        card.appendChild(divPhoto)
        divPhoto.appendChild(photo)

    });

}
function guardarMapaEnLocalStorage(map) {
    // Obtener el array de mapas guardados desde el localStorage
    let mapasGuardados = JSON.parse(localStorage.getItem('mapasGuardados')) || [];

    // Verificar si el mapa ya está en el localStorage
    if (!mapasGuardados.some(m => m.displayName === map.displayName)) {
        // Verificar si ya hay un mapa guardado
        if (mapasGuardados.length < 1) {
            console.log(`Guardando mapa: ${map.displayName}`);

            mapasGuardados.push(map);
            localStorage.setItem('mapasGuardados', JSON.stringify(mapasGuardados));
            alert(`${map.displayName} ha sido guardado en localStorage.`);
        } else {
            alert(`Solo se puede seleccionar un mapa por partida.`);
        }
    } else {
        alert(`${map.displayName} ya está guardado.`);
    }
}

function crearFiltros() {
    if (!maps || maps.length === 0) {
        console.error("No hay mapas disponibles para crear filtros");
        return;
    }
    let formulario = document.querySelector('form');
    if (!formulario) {
        formulario = document.createElement("form");
        document.body.appendChild(formulario);
    }
    let mapasUnicos = [];
    // Crear contenedor para los filtros
    let filtrosContainer = document.createElement("div");
    filtrosContainer.classList.add("flex", "gap-4", "p-4", "bg-red-900/65", "mb-4", "flex-wrap", "justify-center");

    // Crear select para filtrar por rol
    let selectRol = document.createElement("select");
    selectRol.classList.add("bg-slate-100", "text-black", "p-2", "rounded", "flex-grow", "lg:w-96", "lg:flex-grow-0");

    // Agregar la opción "Seleccione un rol" al principio del select
    let opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Seleccione un mapa";
    selectRol.appendChild(opcionDefault);

    // Crear los roles únicos a partir de los mapes cargados
    maps.forEach(map => {
        if (map.displayName && map.displayName) {  // Solo agregar si tiene rol
            let mapName = map.displayName;
            if (!mapasUnicos.includes(mapName)) {
                mapasUnicos.push(mapName);
            }
        }
    });

    // Agregar las opciones al select
    mapasUnicos.forEach(role => {
        let option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        selectRol.appendChild(option);
    });

    let botonFiltro = document.createElement("button");
    botonFiltro.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:ring-blue-300", "font-medium", "rounded-sm", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800","sm:flex-grow-0");
    botonFiltro.textContent = "Guardar Mapa";

    let botonEliminar = document.createElement("button");
    botonEliminar.classList.add("text-white", "bg-red-500", "hover:bg-red-600", "focus:ring-4", "focus:ring-red-300", "font-medium", "rounded-sm", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800");
    botonEliminar.textContent = "Eliminar Mapa Seleccionado";
    // Insertar los filtros en el formulario
   
    formulario.appendChild(filtrosContainer);
    filtrosContainer.appendChild(selectRol);
    filtrosContainer.appendChild(botonFiltro);
    filtrosContainer.appendChild(botonEliminar);

    botonFiltro.addEventListener("click", function (e) {
        e.preventDefault();
        let nameFiltro = selectRol.value;
    
        let mapasFiltrados = maps.filter(map => {
            let mapaCoincide = nameFiltro ? (map.displayName && map.displayName === nameFiltro) : true;
            return mapaCoincide;
        });
        console.log(mapasFiltrados);
    
        // Guardar solo el primer mapa filtrado
        if (mapasFiltrados.length > 0) {
            guardarMapaEnLocalStorage(mapasFiltrados[0]);  // Guardamos solo el primer mapa
        }
        mostrarMapas(mapasFiltrados);
    });
    botonEliminar.addEventListener("click", function (e) {
        e.preventDefault();
    
        localStorage.removeItem('mapasGuardados');  // Aquí se elimina el localStorage de mapas
        alert('Se han borrado el mapa guardados.');
    });
}

function accederAPI() {
    fetch(urlApi)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Error al acceder a la API: ${resp.statusText}`);
            }
            return resp.json();
        })
        .then((data) => {
            maps = data.data;
            crearFiltros();
            console.log(data.data)
            mostrarMapas(data.data);
        })
        .catch((error) => {
            console.error("Error en la llamada a la API:", error);
        });
}
accederAPI()