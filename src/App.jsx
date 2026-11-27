import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import Estado from './components/Estado';
import Footer from './components/Footer';
import { obtenerBebidas, obtenerPostres, buscarPorNombre, obtenerDetalle } from './services/spoonacular';
import cafes from './data/cafes';

// componente principal de la pagina
function App() {

    // estados de las bebidas
    const [bebidas, setBebidas] = useState([]);
    const [loadingBebidas, setLoadingBebidas] = useState(true);
    const [errorBebidas, setErrorBebidas] = useState(null);
    const [intentoBebidas, setIntentoBebidas] = useState(0);

    // estados de los postres
    const [postres, setPostres] = useState([]);
    const [loadingPostres, setLoadingPostres] = useState(true);
    const [errorPostres, setErrorPostres] = useState(null);
    const [intentoPostres, setIntentoPostres] = useState(0);

    // estados del buscador
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [loadingBusqueda, setLoadingBusqueda] = useState(false);
    const [errorBusqueda, setErrorBusqueda] = useState(null);
    const [intentoBusqueda, setIntentoBusqueda] = useState(0);
    const [buscado, setBuscado] = useState('');

    // hay busqueda si se escribieron 3 letras o mas
    const buscando = busqueda.trim().length >= 3;

    // mientras se escribe o se espera la respuesta se muestra cargando
    const cargandoBusqueda = loadingBusqueda || busqueda.trim() !== buscado;

    // estados del detalle
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [loadingDetalle, setLoadingDetalle] = useState(false);
    const [errorDetalle, setErrorDetalle] = useState(null);

    // abre el detalle de un cafe propio con sus datos
    const abrirCafe = (cafe) => {
        setErrorDetalle(null);
        setProductoSeleccionado({
            id: cafe.id,
            titulo: cafe.titulo,
            imagen: cafe.imagen,
            resumen: cafe.descripcion,
            precio: cafe.precio,
            ingredientes: []
        });
    };

    // abre el detalle de una receta y lo pide a la api
    const abrirReceta = async (receta) => {
        // muestra lo que ya se tiene mientras llega el resto
        setProductoSeleccionado({ ...receta, ingredientes: [] });
        try {
            setLoadingDetalle(true);
            setErrorDetalle(null);
            const detalle = await obtenerDetalle(receta.id);
            // solo si sigue abierta la misma receta
            setProductoSeleccionado((actual) => (actual && actual.id === detalle.id ? detalle : actual));
        } catch (err) {
            console.error(err);
            setErrorDetalle(err.message);
        } finally {
            setLoadingDetalle(false);
        }
    };

    // cierra la ventana del detalle
    const cerrarDetalle = () => {
        setProductoSeleccionado(null);
    };

    // cafes propios que coinciden con la busqueda
    const cafesEncontrados = cafes.filter((cafe) =>
        cafe.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
    );

    // carga las bebidas al iniciar y al reintentar
    useEffect(() => {
        const cargarBebidas = async () => {
            try {
                setLoadingBebidas(true);
                setErrorBebidas(null);
                const datos = await obtenerBebidas();
                setBebidas(datos);
            } catch (err) {
                console.error(err);
                setErrorBebidas(err.message);
            } finally {
                setLoadingBebidas(false);
            }
        };
        cargarBebidas();
    }, [intentoBebidas]);

    // carga los postres al iniciar y al reintentar
    useEffect(() => {
        const cargarPostres = async () => {
            try {
                setLoadingPostres(true);
                setErrorPostres(null);
                const datos = await obtenerPostres();
                setPostres(datos);
            } catch (err) {
                console.error(err);
                setErrorPostres(err.message);
            } finally {
                setLoadingPostres(false);
            }
        };
        cargarPostres();
    }, [intentoPostres]);

    // busca en la api cuando se deja de escribir
    useEffect(() => {
        // con menos de 3 letras no se busca
        if (busqueda.trim().length < 3) {
            return;
        }

        const buscar = async () => {
            try {
                setLoadingBusqueda(true);
                setErrorBusqueda(null);
                const datos = await buscarPorNombre(busqueda);
                setResultados(datos);
            } catch (err) {
                console.error(err);
                setErrorBusqueda(err.message);
            } finally {
                setLoadingBusqueda(false);
                // guarda que texto ya se busco
                setBuscado(busqueda.trim());
            }
        };

        // espera medio segundo antes de buscar
        const timer = setTimeout(() => {
            buscar();
        }, 500);

        // si se escribe otra letra se cancela la busqueda anterior
        return () => clearTimeout(timer);
    }, [busqueda, intentoBusqueda]);

    // lo que se muestra en pantalla
    return (
        <>
            {/* encabezado con modo oscuro */}
            <Header />

            <main>
                {/* portada */}
                <Hero />

                {/* buscador temporal hasta que este la barra del issue 14 */}
                <div className="menu-section" style={{ paddingBottom: 0 }}>
                    <label htmlFor="buscador" style={{ display: 'block', marginBottom: '8px' }}>
                        Buscar en el menú
                    </label>
                    <input
                        id="buscador"
                        type="search"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Ej: chocolate"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {/* resultados de la busqueda */}
                {buscando && (
                    <section id="resultados" className="menu-section">
                        <h2 className="menu-section__title">Resultados para "{busqueda.trim()}"</h2>
                        <p className="menu-section__subtitle">Las recetas de la API están en inglés.</p>

                        <div className="menu-grid">
                            {cafesEncontrados.map((cafe) => (
                                <MenuCard
                                    key={cafe.id}
                                    onClick={() => abrirCafe(cafe)}
                                    title={cafe.titulo}
                                    image={cafe.imagen}
                                    tag="Café"
                                    description={cafe.descripcion}
                                    price={cafe.precio}
                                />
                            ))}
                            {!cargandoBusqueda && !errorBusqueda && resultados.map((receta) => (
                                <MenuCard
                                    key={receta.id}
                                    onClick={() => abrirReceta(receta)}
                                    title={receta.titulo}
                                    image={receta.imagen}
                                    tag="Receta"
                                />
                            ))}
                        </div>

                        <Estado
                            loading={cargandoBusqueda}
                            error={errorBusqueda}
                            vacio={resultados.length === 0 && cafesEncontrados.length === 0}
                            onReintentar={() => setIntentoBusqueda(intentoBusqueda + 1)}
                        />
                    </section>
                )}

                {/* menu normal cuando no se busca nada */}
                {!buscando && (
                    <>
                        {/* seccion de cafes propios */}
                        <section id="menu" className="menu-section">
                            <h2 className="menu-section__title">Nuestros cafés</h2>
                            <p className="menu-section__subtitle">Preparados con café boliviano.</p>

                            <div className="menu-grid">
                                {cafes.map((cafe) => (
                                    <MenuCard
                                        key={cafe.id}
                                        onClick={() => abrirCafe(cafe)}
                                        title={cafe.titulo}
                                        image={cafe.imagen}
                                        tag="Café"
                                        description={cafe.descripcion}
                                        price={cafe.precio}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* seccion de postres de la api */}
                        <section id="postres" className="menu-section">
                            <h2 className="menu-section__title">Postres con café</h2>
                            <p className="menu-section__subtitle">Dulces que llevan café entre sus ingredientes.</p>

                            <Estado
                                loading={loadingPostres}
                                error={errorPostres}
                                vacio={postres.length === 0}
                                onReintentar={() => setIntentoPostres(intentoPostres + 1)}
                            />

                            {!loadingPostres && !errorPostres && (
                                <div className="menu-grid">
                                    {postres.map((postre) => (
                                        <MenuCard
                                            key={postre.id}
                                            onClick={() => abrirReceta(postre)}
                                            title={postre.titulo}
                                            image={postre.imagen}
                                            tag="Postre"
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* seccion de bebidas de la api */}
                        <section id="bebidas" className="menu-section">
                            <h2 className="menu-section__title">Bebidas especiales</h2>
                            <p className="menu-section__subtitle">Smoothies, tés y batidos para acompañar.</p>

                            <Estado
                                loading={loadingBebidas}
                                error={errorBebidas}
                                vacio={bebidas.length === 0}
                                onReintentar={() => setIntentoBebidas(intentoBebidas + 1)}
                            />

                            {!loadingBebidas && !errorBebidas && (
                                <div className="menu-grid">
                                    {bebidas.map((bebida) => (
                                        <MenuCard
                                            key={bebida.id}
                                            onClick={() => abrirReceta(bebida)}
                                            title={bebida.titulo}
                                            image={bebida.imagen}
                                            tag="Bebida"
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>

            {/* detalle temporal hasta que este la ventana del issue 15 */}
            {productoSeleccionado && (
                <div
                    onClick={cerrarDetalle}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 200 }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: 'var(--color-card)', color: 'var(--color-text)', borderRadius: 'var(--radius)', padding: '24px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
                    >
                        <button onClick={cerrarDetalle} style={{ float: 'right' }}>✕</button>
                        <img src={productoSeleccionado.imagen} alt={productoSeleccionado.titulo} style={{ borderRadius: '8px', margin: '32px 0 16px' }} />
                        <h2>{productoSeleccionado.titulo}</h2>

                        {loadingDetalle && <p>Cargando el detalle...</p>}
                        {errorDetalle && <p>{errorDetalle}</p>}

                        {productoSeleccionado.resumen && <p>{productoSeleccionado.resumen}</p>}
                        {productoSeleccionado.precio && <p><strong>Bs {productoSeleccionado.precio}</strong></p>}
                        {productoSeleccionado.minutos && (
                            <p>Listo en {productoSeleccionado.minutos} minutos · {productoSeleccionado.porciones} porciones</p>
                        )}

                        {productoSeleccionado.ingredientes.length > 0 && (
                            <>
                                <h3 style={{ marginTop: '16px' }}>Ingredientes</h3>
                                <ul style={{ paddingLeft: '20px' }}>
                                    {productoSeleccionado.ingredientes.map((ingrediente, i) => (
                                        <li key={i}>{ingrediente}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* pie de pagina */}
            <Footer />
        </>
    );
}

export default App;
