// muestra cargando error o sin resultados
function Estado({ loading, error, vacio, onReintentar }) {
    // si esta cargando
    if (loading) {
        return (
            <div className="estado">
                <div className="estado__spinner"></div>
                <p>Preparando el menú...</p>
            </div>
        );
    }

    // si hubo un error
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

    // si no hay resultados
    if (vacio) {
        return (
            <div className="estado">
                <p>No se encontraron resultados.</p>
            </div>
        );
    }

    // si todo esta bien no muestra nada
    return null;
}

export default Estado;
