let titleHeader = ["Home", "Agents", "Maps"];
let hrefHeader = ["index.html", "agents.html", "maps.html"];
const urlApi = "https://valorant-api.com/v1/agents";
let agents = [];
let numeroAgentes = 0;

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
    div1.classList.add("basis-1/4", "mb-2");
    div2.classList.add("basis-1/2", "flex", "justify-center");
    ul.classList.add("flex", "list-none", "m-0", "p-0");
}
function mostrarAgentes(array) {
    let section = document.querySelector("section");
    if (!section) {
        section = document.createElement("section");
        section.classList.add("container", "mx-auto", "px-4", "py-6");
        document.body.appendChild(section);
    }
    section.innerHTML = "";
    section.classList.add("grid", "gap-6", "grid-cols-1", "sm:grid-cols-1", "lg:grid-cols-2");

    array.map(agent => {
        let card = document.createElement("div");
        card.classList.add("bg-gray-800", "rounded-lg", "overflow-hidden", "shadow-lg", "shadow-gray-800", "p-4", "flex", "lg:gap-4", "gap-1", "items-start", "mb-2");

        let iconContainer = document.createElement("div");
        iconContainer.classList.add("flex-shrink-0");

        let icon = document.createElement("img");
        if (agent.displayIcon) {
            icon.src = agent.displayIcon;
        } else {
            icon.src = "ruta/por/defecto.jpg"; // Ruta por defecto
        }
        icon.alt = agent.displayName;
        icon.classList.add("w-16", "h-16", "rounded-lg", "lg:hidden");
        iconContainer.appendChild(icon);

        let photo = document.createElement("img");
        photo.src = agent.fullPortrait;
        photo.alt = agent.displayName;
        photo.classList.add("hidden", "lg:block", "w-64", "h-auto", "rounded-lg", "object-cover");
        iconContainer.appendChild(photo);

        let divContentText = document.createElement("div");
        divContentText.classList.add("flex-grow");

        let name = document.createElement("h2");
        name.classList.add("text-lg", "font-bold", "text-white");
        name.textContent = agent.displayName;
        divContentText.appendChild(name);

        let description = document.createElement("p");
        description.classList.add("text-gray-400", "text-sm", "mb-2");
        description.textContent = agent.description || "Sin descripción disponible.";
        divContentText.appendChild(description);

        let role = document.createElement("p");
        role.classList.add("text-gray-300", "font-semibold", "mb-2");
        role.textContent = agent.role && agent.role.displayName ? `Rol: ${agent.role.displayName}` : "Rol no disponible";
        divContentText.appendChild(role);

        let habilidades = document.createElement("p");
        habilidades.classList.add("text-gray-300", "font-semibold", "mb-2");
        habilidades.textContent = "Habilidades:";
        divContentText.appendChild(habilidades);

        let listaHabilidades = document.createElement("div");
        listaHabilidades.classList.add("flex", "gap-1", "mt-2", "mb-3");

        agent.abilities.map(ability => {
            let abilityCard = document.createElement("div");
            abilityCard.classList.add("text-center");

            let abilityIcon = document.createElement("img");
            abilityIcon.src = ability.displayIcon || "https://via.placeholder.com/64";
            abilityIcon.alt = ability.displayName || "Sin icono disponible";
            abilityIcon.classList.add("w-16", "h-16", "mx-auto", "rounded-lg", "mb-2");
            abilityCard.appendChild(abilityIcon);

            let abilityName = document.createElement("p");
            abilityName.classList.add("text-gray-300", "font-semibold");
            abilityName.textContent = ability.displayName;
            abilityCard.appendChild(abilityName);

            listaHabilidades.appendChild(abilityCard);
        });

        divContentText.appendChild(listaHabilidades);

        card.appendChild(iconContainer);
        card.appendChild(divContentText);

        // Crear el botón para guardar en el localStorage
        let botonGuardar = document.createElement("button");
        botonGuardar.textContent = "Guardar Agente";
        botonGuardar.classList.add("text-white", "bg-red-400/60", "hover:bg-red-400", "focus:ring-4", "focus:ring-slate-300", "font-medium", "rounded-sm", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800");

        // Guardar agente en localStorage
        botonGuardar.addEventListener("click", () => {
            guardarAgenteEnLocalStorage(agent);

        });

        divContentText.appendChild(botonGuardar);

        section.appendChild(card);
    });
}

function guardarAgenteEnLocalStorage(agent) {
    // Obtener el array de agentes guardados desde el localStorage
    let agentesGuardados = JSON.parse(localStorage.getItem('agentesGuardados')) || [];

    // Verificar si el agente ya está en el localStorage
    if (!agentesGuardados.some(a => a.displayName === agent.displayName)) {
        // Verificar si ya hay 5 agentes guardados
        if (agentesGuardados.length < 5) {
            agentesGuardados.push(agent);
            localStorage.setItem('agentesGuardados', JSON.stringify(agentesGuardados));
            alert(`${agent.displayName} ha sido guardado en localStorage.`);
        } else {
            // Si ya hay 5 agentes, mostrar un mensaje de alerta sin deshabilitar el botón
            alert("Solo se puede guardar hasta 5 agentes por partida.");
        }
    } else {
        alert(`${agent.displayName} ya está guardado.`);
    }
}



function crearFiltros() {
    if (!agents || agents.length === 0) {
        console.error("No hay agentes disponibles para crear filtros");
        return;
    }

    let rolesUnicos = [];
    // Crear contenedor para los filtros
    let filtrosContainer = document.createElement("div");
    filtrosContainer.classList.add("flex", "gap-4", "p-4", "bg-red-900/65", "mb-4", "flex-wrap", "justify-center");

    // Crear input de texto para filtrar por nombre
    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Buscar por nombre...";
    inputNombre.classList.add("bg-slate-100", "p-2", "rounded-sm", "text-black", "flex-grow", "lg:w-96", "lg:flex-grow-0");

    // Crear select para filtrar por rol
    let selectRol = document.createElement("select");
    selectRol.classList.add("bg-slate-100", "text-black", "p-2", "rounded-sm", "flex-grow", "lg:w-96", "lg:flex-grow-0");

    // Agregar la opción "Seleccione un rol" al principio del select
    let opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Seleccione un rol";
    selectRol.appendChild(opcionDefault);
    // Crear los roles únicos a partir de los agentes cargados
    agents.forEach(agent => {
        if (agent.role && agent.role.displayName) {  // Solo agregar si tiene rol
            let roleName = agent.role.displayName;
            if (!rolesUnicos.includes(roleName)) {
                rolesUnicos.push(roleName);
            }
        }
    });

    // Agregar las opciones al select
    rolesUnicos.forEach(role => {
        let option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        selectRol.appendChild(option);
    });

    let botonFiltro = document.createElement("button");
    botonFiltro.classList.add("text-white", "bg-blue-500", "hover:bg-blue-600", "focus:ring-4", "focus:ring-blue-300", "font-medium", "rounded-sm", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800");
    botonFiltro.textContent = "Aplicar Filtro";

    let botonEliminar = document.createElement("button");
    botonEliminar.classList.add("text-white", "bg-red-500", "hover:bg-red-600", "focus:ring-4", "focus:ring-red-300", "font-medium", "rounded-sm", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800");
    botonEliminar.textContent = "Eliminar Agentes Guardados";
    // Insertar los filtros en el formulario
    let formulario = document.querySelector('form');
    if (!formulario) {
        formulario = document.createElement("form");
        document.body.appendChild(formulario);
    }
    formulario.appendChild(filtrosContainer);
    filtrosContainer.appendChild(inputNombre);
    filtrosContainer.appendChild(selectRol);
    filtrosContainer.appendChild(botonFiltro);
    filtrosContainer.appendChild(botonEliminar);


    botonFiltro.addEventListener("click", function (e) {
        e.preventDefault();
        let nombreFiltro = inputNombre.value.toLowerCase();
        let rolFiltro = selectRol.value;

        let agentesFiltrados = agents.filter(agent => {
            let nombreCoincide = agent.displayName.toLowerCase().includes(nombreFiltro);

            let rolCoincide = rolFiltro ? (agent.role && agent.role.displayName === rolFiltro) : true;

            return nombreCoincide && rolCoincide;
        });

        mostrarAgentes(agentesFiltrados);
    });
    botonEliminar.addEventListener("click", function (e) {
        e.preventDefault();

        localStorage.removeItem('agentesGuardados');
        alert('Se han borrado todos los agentes guardados.');
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
            agents = data.data;
            crearFiltros();
            mostrarAgentes(agents);

        })
        .catch((error) => {
            console.error("Error en la llamada a la API:", error);
        });
}

header();
accederAPI(); 
