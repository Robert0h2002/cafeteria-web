# Cafetería — Proyecto de Tecnologías Web I

Página web de una cafetería que muestra un menú de bebidas y postres obtenido desde la **API de Spoonacular**.

Materia: SIS-214 Tecnologías Web I — UCB, 2/2026.

## Tecnologías

- React + Vite
- HTML semántico, CSS con variables y metodología BEM
- Modo oscuro con `localStorage`
- `fetch` con `async/await` y `try/catch`
- [Spoonacular API](https://spoonacular.com/food-api)

## Cómo ejecutarlo

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar `.env.example` como `.env` y poner la clave de Spoonacular
   (se obtiene gratis en https://spoonacular.com/food-api/console):

   ```
   VITE_SPOONACULAR_KEY=tu_clave
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Estructura

```
src/
├── components/      Componentes de React (Header, Hero, MenuCard, Footer...)
├── services/        Funciones que llaman a la API de Spoonacular
├── css/
│   ├── main.css     Importa todos los estilos
│   ├── base/        Variables (colores, fuentes) y reset
│   └── components/  Un archivo CSS por componente, en BEM
├── App.jsx
└── main.jsx
```

## Plan de trabajo (Scrum en etapas de una semana)

| Entrega | Objetivo |
|---|---|
| Jueves 19 nov | Encabezado con modo oscuro, portada, menú de bebidas cargado desde la API, pie de página |
| Jueves 26 nov | Buscador, filtro bebidas/postres, ventana de detalle, resultados guardados en `localStorage` |
| Jueves 3 dic | Carrito con precios en Bs, formulario de pedido validado, diseño para celular, página publicada |

Las tareas de cada etapa están en la pestaña **Issues** del repositorio.

## Forma de trabajo

- Cada tarea es un issue con su responsable.
- Una rama por tarea (`feature/menu-api`, `feature/header`...).
- Pull request que revisa el compañero antes de unir a `main`.
- Reunión diaria corta: qué hice, qué haré, qué me bloquea.
