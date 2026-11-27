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
| 19 nov | Encabezado con modo oscuro, portada, menú de bebidas cargado desde la API, pie de página |
| 30 nov | Buscador, ventana de detalle de cada producto, filtro por categoría |
| 7 dic (entrega final) | Carrito con precios en Bs, formulario de pedido validado, diseño para celular, página publicada |

Las tareas de cada etapa están en la pestaña **Issues** del repositorio.

## Créditos de las fotos

Las fotos de `public/img/cafes/` son de [Wikimedia Commons](https://commons.wikimedia.org) y se usan según su licencia:

| Archivo | Autor | Licencia |
|---|---|---|
| `espresso.jpg` | [Lemone](https://commons.wikimedia.org/wiki/File:Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg) | CC BY-SA 4.0 |
| `americano.jpg` | [Sameer.siddhanti](https://commons.wikimedia.org/wiki/File:Espresso_Americano.jpeg) | Dominio público |
| `cappuccino.jpg` | [Vee Satayamas](https://commons.wikimedia.org/wiki/File:Cappuccino_in_original.jpg) | CC BY 2.0 |
| `latte.jpg` | [B adger1](https://commons.wikimedia.org/wiki/File:Caffe_Latte_at_Pulse_Cafe.jpg) | CC0 |
| `mocaccino.jpg` | [Ernst Vikne](https://commons.wikimedia.org/wiki/File:Mocha_coffee.jpg) | CC BY-SA 2.0 |
| `cafe-helado.jpg` | [Tony Webster](https://commons.wikimedia.org/wiki/File:Iced_Coffee_in_Glass_-_Sunshine_Coffee_-_Laramie_Cafe_(53838344552).jpg) | CC BY 2.0 |

Las imágenes de las bebidas especiales vienen de la API de Spoonacular.

## Forma de trabajo

- Cada tarea es un issue con su responsable.
- Una rama por tarea (`feature/menu-api`, `feature/header`...).
- Pull request que revisa el compañero antes de unir a `main`.
- Reunión diaria corta: qué hice, qué haré, qué me bloquea.
