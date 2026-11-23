// servicio que llama a la api de spoonacular
// la clave se lee del archivo env
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
const BASE_URL = 'https://api.spoonacular.com';
const CANTIDAD = 8;

// ingredientes con alcohol que no queremos
const SIN_ALCOHOL = 'rum,vodka,gin,tequila,whiskey,bourbon,wine,beer,liqueur,brandy,kahlua,champagne,vermouth';

// imagen por si la receta no trae foto
const IMAGEN_RESPALDO = '/taza.svg';

// busca recetas con los filtros que le pasamos
const buscarRecetas = async (clave, filtros) => {
    const hoy = new Date().toDateString();

    // si ya se pidio hoy usa lo guardado
    const guardado = localStorage.getItem(clave);
    if (guardado) {
        const cache = JSON.parse(guardado);
        if (cache.fecha === hoy) {
            return cache.datos;
        }
    }

    // arma la url con los parametros
    const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&${filtros}&excludeIngredients=${SIN_ALCOHOL}&number=${CANTIDAD}`;

    // pide los datos a la api
    let respuesta;
    try {
        respuesta = await fetch(url);
    } catch {
        throw new Error('Error de conexión. Revisa tu internet.');
    }

    // revisa los errores de la api
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

    // adapta la respuesta a nuestro objeto
    const recetas = datos.results.map((receta) => ({
        id: receta.id,
        titulo: receta.title,
        imagen: receta.image || IMAGEN_RESPALDO
    }));

    // guarda las recetas con la fecha de hoy
    localStorage.setItem(clave, JSON.stringify({ fecha: hoy, datos: recetas }));

    return recetas;
};

// pide las bebidas mas populares
export const obtenerBebidas = () => {
    return buscarRecetas('menu-bebidas', 'type=beverage&sort=popularity');
};

// pide los postres que llevan cafe
export const obtenerPostres = () => {
    return buscarRecetas('menu-postres', 'type=dessert&includeIngredients=coffee&sort=popularity');
};

// busca postres y bebidas por nombre
export const buscarPorNombre = (texto) => {
    const limpio = texto.trim().toLowerCase();
    // cada busqueda se guarda con su propio nombre
    return buscarRecetas(`busqueda-${limpio}`, `type=dessert,beverage&query=${encodeURIComponent(limpio)}`);
};
