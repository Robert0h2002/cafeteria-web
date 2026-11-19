import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import Estado from './components/Estado';
import Footer from './components/Footer';
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
        <>
            <Header />

            <main>
                <Hero />

                {/* Cafés: datos propios (src/data/cafes.js) */}
                <section id="menu" className="menu-section">
                    <h2 className="menu-section__title">Nuestros cafés</h2>
                    <p className="menu-section__subtitle">Preparados con café boliviano.</p>

                    <div className="menu-grid">
                        {cafes.map((cafe) => (
                            <MenuCard
                                key={cafe.id}
                                title={cafe.titulo}
                                image={cafe.imagen}
                                tag="Café"
                                description={cafe.descripcion}
                                price={cafe.precio}
                            />
                        ))}
                    </div>
                </section>

                {/* Postres: API de Spoonacular */}
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
                                    title={postre.titulo}
                                    image={postre.imagen}
                                    tag="Postre"
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Bebidas: API de Spoonacular */}
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
                                    title={bebida.titulo}
                                    image={bebida.imagen}
                                    tag="Bebida"
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default App;
