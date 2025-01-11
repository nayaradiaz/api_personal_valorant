let titleHeader = ["Home", "Agents", "Maps"];
let hrefHeader = ["index.html", "agents.html", "maps.html"];


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

function mostrarInformacion() {
    // Crear el cuadro de texto con información sobre Valorant
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("bg-red-900/65", "text-white", "p-6", "shadow-lg", "text-center", "text-wrap", "my-10", "mx-auto", "w-4/5", "lg:w-3/5", "md:my-20", "transform", "transition-transform", "duration-300", "hover:scale-110");

    let infoTitle = document.createElement("h2");
    infoTitle.textContent = "Información sobre Valorant";
    infoTitle.classList.add("text-2xl", "font-bold", "mb-4", "tracking-widest");

    let infoText = document.createElement("p");
    infoText.textContent = "Valorant es un juego de disparos táctico por equipos, desarrollado y publicado por Riot Games. El juego se centra en las habilidades y estrategias, y ofrece una experiencia competitiva única.";
    infoText.classList.add("text-md", "tracking-widest", "text-white/80", "font-medium", "italic", "lg:text-lg");

    // Añadir título y texto al contenedor
    infoContainer.appendChild(infoTitle);
    infoContainer.appendChild(infoText);
    section.appendChild(infoContainer);
}

function mostrarInicio() {
    let container = document.createElement("div");
    container.classList.add("h-3/6", "grid", "grid-cols-1", "sm:grid-cols-2", "gap-6", "p-7", "mb-10", "lg:mb-20");
    section.appendChild(container);

    let cards = [
        { title: "Agents", imageUrl: "https://assets.xboxservices.com/assets/4e/bc/4ebcb533-e184-42f3-833b-9aa47a81f39e.jpg?n=153142244433_Poster-Image-1084_1920x720.jpg", hrefUrl: "agents.html" },
        { title: "Map", imageUrl: "https://cdn.prod.website-files.com/66d76c1602926f9431ab4fb6/66f2b677fb8ccd4c281b6ae2_mapas.jpg", hrefUrl: "maps.html" },
    ];

    cards.forEach(card => {
        let cardDiv = document.createElement("div");
        cardDiv.id = card.title.toLowerCase();
        cardDiv.classList.add("relative", "overflow-hidden", "h-40", "lg:h-64", "shadow-lg", "shadow-lg", "shadow-gray-800", "transform", "transition-transform", "duration-300", "hover:scale-105");
        cardDiv.style.backgroundImage = `url(${card.imageUrl})`;
        cardDiv.style.backgroundSize = "cover";
        cardDiv.style.backgroundPosition = "center";
        cardDiv.addEventListener("click", () => {
            window.location.href = card.hrefUrl;
        });
        let overlay = document.createElement("div");
        overlay.classList.add("absolute", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center");

        let cardTitle = document.createElement("h2");
        cardTitle.textContent = card.title;
        cardTitle.classList.add("text-white", "font-bold", "text-lg", "lg:text-2xl");

        overlay.appendChild(cardTitle);
        cardDiv.appendChild(overlay);
        container.appendChild(cardDiv);
    });
}
//h-[50vh]
function panelGrupo() {
    let divPanel = document.createElement("div");
    section.appendChild(divPanel);

    divPanel.innerHTML = `
        <div class="relative flex justify-center items-center h-[25vh] sm:h-[50vh] w-full">
            <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
                <source src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/f6ccf20dfe3f6a24ea9216bb8afaaa66740c715d.mp4" type="video/mp4">
            </video>
            <div class="border-2 border-white relative transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-white">
                <button
                    id="toggleOffcanvas"
                    class="relative z-10 bg-red-500 px-8 py-3 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-blue-500 hover:text-white">
                    Ver Partida
                </button>
            </div>
        </div>
        <div
            id="offcanvasTop"
            class="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full max-w-full -translate-y-full flex-col bg-white text-black shadow-lg transition duration-300 ease-in-out">
            <div class="flex items-center justify-between p-4 bg-gray-800 text-white">
                <h5 class="mb-0 font-semibold leading-normal" id="offcanvasTopLabel">
                    Datos de la partida
                </h5>
                <button
                    type="button"
                    id="closeOffcanvas"
                    class="text-white bg-gray-700 rounded-full p-2"
                    aria-label="Close">
                    <span class="text-2xl">&times;</span>
                </button>
            </div>
            <div class="flex-grow overflow-y-auto p-4">
                <div id="mapaGuardado"></div>
                <div id="agentesGuardados"></div>
            </div>
        </div>
    `;

    let toggleButton = document.getElementById('toggleOffcanvas');
    let offcanvas = document.getElementById('offcanvasTop');
    let closeButton = document.getElementById('closeOffcanvas');

    toggleButton.addEventListener('click', () => {
        offcanvas.classList.toggle('-translate-y-full');
    });

    closeButton.addEventListener('click', () => {
        offcanvas.classList.add('-translate-y-full');
    });

    // Obtener el mapa guardado desde localStorage
    let mapaGuardado = JSON.parse(localStorage.getItem('mapasGuardados')) || [];
    let mapaDiv = document.getElementById('mapaGuardado');
    if (mapaGuardado.length > 0) {
        let mapa = mapaGuardado[0]; // Suponiendo que solo se guarda un mapa
        mapaDiv.innerHTML = `
            <h3 class="font-extrabold mb-4 uppercase text-3xl text-red-800/75 tracking-widest md:text-4xl  text-center mt-4 mb-4 lg:mt-1 text-center">Mapa Seleccionado</h3>
            <div class="flex items-center justify-center flex-col">
                <div>
                    <p class="font-extrabold mb-4 uppercase text-2xl text-slate-600 tracking-widest md:text-3xl ">${mapa.displayName}</p>
                </div>
                <div class="w-full md:w-3/6 flex justify-center">
                    <img src="${mapa.splash}" alt="${mapa.displayName}" class="w-full h-auto object-cover border-double border-4 border-slate-600" />
                </div>
            </div>
            
        `;
    } else {
        mapaDiv.innerHTML = `<p>No hay mapa guardado.</p>`;
    }

    // Obtener los agentes guardados desde localStorage
    let agentesGuardados = JSON.parse(localStorage.getItem('agentesGuardados')) || [];
    let agentesDiv = document.getElementById('agentesGuardados');
    if (agentesGuardados.length > 0) {
        let agentesList = `<h3 class="font-extrabold mb-4 uppercase text-3xl text-red-800/75 tracking-widest md:text-4xl  text-center mt-4">
        Agentes Seleccionados</h3>
        <div class="grid grid-cols-2 lg:grid-cols-5 ">`;
        agentesGuardados.forEach(agent => {
            agentesList += `
                <div class="mb-4 justify-items-center	">
                    <p class="font-extrabold mb-4 uppercase text-xl text-slate-600 tracking-widest md:text-2xl">${agent.displayName}</p>
                    <img src="${agent.killfeedPortrait}" alt="${agent.displayName}" class="w-32 h-auto object-cover flex-cols-2 border-2 border-solid border-gray-600 rounded-sm shadow-xl shadow-gray-500/50" />
                </div>
            `;
        });
        agentesList += `</div>`;
        agentesDiv.innerHTML = agentesList;
    } else {
        agentesDiv.innerHTML = `<p>No hay agentes guardados.</p>`;
    }
}


function mostrarMapaGuardado() {
    let mapasGuardados = JSON.parse(localStorage.getItem('mapasGuardados')) || [];
    if (mapasGuardados.length > 0) {
        mostrarMapas([mapasGuardados[0]]);  // Mostrar solo el mapa guardado
    }
}


function obtenerAgentesDeLocalStorage() {
    // Obtener los agentes desde localStorage
    let agentsJSON = localStorage.getItem('agentes');

    if (agentsJSON) {
        // Convertir el string JSON de nuevo a un array de objetos
        let agents = JSON.parse(agentsJSON);
        console.log('Agentes recuperados:', agents);
        return agents;
    } else {
        console.log('No hay agentes guardados en localStorage');
        return [];
    }
}
function footer() {
    let footer = document.createElement("footer");
    let p = document.createElement("p");
    p.textContent = "Nayara Diaz Leon";

    // Agregar elementos al DOM
    document.body.appendChild(footer);
    footer.appendChild(p);

    // Estilos opcionales
    footer.classList.add("h-16", "bg-neutral-800", "text-white", "py-4", "text-center", "font-mono", "mt-auto", "sm:py-0");
    p.classList.add("text-sm", "uppercase");
}

// Establecer el cuerpo como un contenedor flex para mantener el footer abajo
document.body.classList.add("flex", "flex-col", "min-h-screen");

header();
let section = document.createElement("section");
document.body.appendChild(section);
section.classList.add("justify-center")
mostrarInformacion();
mostrarInicio();
panelGrupo();
footer();
