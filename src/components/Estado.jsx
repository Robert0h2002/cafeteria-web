// Muestra "cargando", el error con su botón o "sin resultados".
// Si todo está bien no muestra nada (return null).
function Estado({ loading, error, vacio, onReintentar }) {
    if (loading) {
        return (
            <div className="estado">
                <div className="estado__spinner"></div>
                <p>Preparando el menú...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="estado estado--error">
                <p>{error}</p>
                <button className="estado__boton" onClick={onReintentar}>
                    Reintentar
                </button>
            </div>
        );
    }

    if (vacio) {
        return (
            <div className="estado">
                <p>No se encontraron resultados.</p>
            </div>
        );
    }

    return null;
}

export default Estado;
