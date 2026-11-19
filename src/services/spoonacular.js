// Servicio que se comunica con la API de Spoonacular
// La clave se lee del archivo .env (no se sube a GitHub)
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
const BASE_URL = 'https://api.spoonacular.com';
const CANTIDAD = 8;

// Es una cafetería: quitamos las recetas con alcohol (cócteles, licores)
const SIN_ALCOHOL = 'rum,vodka,gin,tequila,whiskey,bourbon,wine,beer,liqueur,brandy,kahlua,champagne,vermouth';

// Imagen local por si la receta no trae foto
const IMAGEN_RESPALDO = '/taza.svg';

// Función común: busca recetas con los filtros que le pasemos.
// Guarda el resultado en localStorage para no gastar puntos de la API:
// si ya se pidió hoy, devuelve lo guardado sin llamar a Spoonacular.
const buscarRecetas = async (clave, filtros) => {
    const hoy = new Date().toDateString(); // ej: "Wed Nov 18 2026"

    const guardado = localStorage.getItem(clave);
    if (guardado) {
        const cache = JSON.parse(guardado);
        if (cache.fecha === hoy) {
            return cache.datos;
        }
    }

    const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&${filtros}&excludeIngredients=${SIN_ALCOHOL}&number=${CANTIDAD}`;

    let respuesta;
    try {
        respuesta = await fetch(url);
    } catch {
        throw new Error('Error de conexión. Revisa tu internet.');
    }

    if (respuesta.status === 401) {
        throw new Error('API Key inválida. Revisa el archivo .env');
    }
    if (respuesta.status === 402) {
        throw new Error('Se acabaron los puntos del día de Spoonacular. Intenta mañana.');
    }
    if (!respuesta.ok) {
        throw new Error('Error en la petición a la API.');
    }

    const datos = await respuesta.json();

    // Adaptamos la respuesta de la API a nuestro propio objeto
    const recetas = datos.results.map((receta) => ({
        id: receta.id,
        titulo: receta.title,
        imagen: receta.image || IMAGEN_RESPALDO
    }));

    // Lo guardamos con la fecha de hoy
    localStorage.setItem(clave, JSON.stringify({ fecha: hoy, datos: recetas }));

    return recetas;
};

// Bebidas más populares (sin alcohol)
export const obtenerBebidas = () => {
    return buscarRecetas('menu-bebidas', 'type=beverage&sort=popularity');
};

// Postres que llevan café entre sus ingredientes
export const obtenerPostres = () => {
    return buscarRecetas('menu-postres', 'type=dessert&includeIngredients=coffee&sort=popularity');
};
