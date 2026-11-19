import { useState, useEffect } from 'react';
import MenuCard from './components/MenuCard';
import Estado from './components/Estado';
import { obtenerBebidas, obtenerPostres } from './services/spoonacular';
import cafes from './data/cafes';

function App() {

    // Bebidas (API)
    const [bebidas, setBebidas] = useState([]);
    const [loadingBebidas, setLoadingBebidas] = useState(true);
    const [errorBebidas, setErrorBebidas] = useState(null);
    const [intentoBebidas, setIntentoBebidas] = useState(0);

    // Postres con café (API)
    const [postres, setPostres] = useState([]);
    const [loadingPostres, setLoadingPostres] = useState(true);
    const [errorPostres, setErrorPostres] = useState(null);
    const [intentoPostres, setIntentoPostres] = useState(0);

    // Carga las bebidas al iniciar y cada vez que se pulsa "Reintentar"
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

    // Carga los postres al iniciar y cada vez que se pulsa "Reintentar"
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

    return (
        <main>
            {/* Cafés: datos propios (src/data/cafes.js) */}
            <section className="menu" id="menu">
                <h2 className="menu__title">Nuestros cafés</h2>
                <p className="menu__subtitle">Preparados con café boliviano.</p>

                <div className="menu__grid">
                    {cafes.map((cafe) => (
                        <MenuCard
                            key={cafe.id}
                            titulo={cafe.titulo}
                            imagen={cafe.imagen}
                            etiqueta="Café"
                            descripcion={cafe.descripcion}
                            precio={cafe.precio}
                        />
                    ))}
                </div>
            </section>

            {/* Postres: API de Spoonacular */}
            <section className="menu" id="postres">
                <h2 className="menu__title">Postres con café</h2>
                <p className="menu__subtitle">Dulces que llevan café entre sus ingredientes.</p>

                <Estado
                    loading={loadingPostres}
                    error={errorPostres}
                    vacio={postres.length === 0}
                    onReintentar={() => setIntentoPostres(intentoPostres + 1)}
                />

                {!loadingPostres && !errorPostres && (
                    <div className="menu__grid">
                        {postres.map((postre) => (
                            <MenuCard
                                key={postre.id}
                                titulo={postre.titulo}
                                imagen={postre.imagen}
                                etiqueta="Postre"
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Bebidas: API de Spoonacular */}
            <section className="menu" id="bebidas">
                <h2 className="menu__title">Bebidas especiales</h2>
                <p className="menu__subtitle">Smoothies, tés y batidos para acompañar.</p>

                <Estado
                    loading={loadingBebidas}
                    error={errorBebidas}
                    vacio={bebidas.length === 0}
                    onReintentar={() => setIntentoBebidas(intentoBebidas + 1)}
                />

                {!loadingBebidas && !errorBebidas && (
                    <div className="menu__grid">
                        {bebidas.map((bebida) => (
                            <MenuCard
                                key={bebida.id}
                                titulo={bebida.titulo}
                                imagen={bebida.imagen}
                                etiqueta="Bebida"
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default App;
