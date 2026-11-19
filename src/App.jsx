import Header from './components/Header';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import Footer from './components/Footer';

const MENU_PRUEBA = [
  {
    id: 1,
    title: 'Cappuccino Artesanal',
    image: 'https://placehold.co/400x300/6f4e37/f8f3ec?text=Cappuccino',
    price: 22,
  },
  {
    id: 2,
    title: 'Tiramisú Clásico',
    image: 'https://placehold.co/400x300/c8a27a/2d2018?text=Tiramisu',
    price: 28,
  },
  {
    id: 3,
    title: 'Latte Caramelo',
    image: 'https://placehold.co/400x300/6f4e37/f8f3ec?text=Latte+Caramelo',
    price: 25,
  },
  {
    id: 4,
    title: 'Cheesecake de Frutos Rojos',
    image: 'https://placehold.co/400x300/c8a27a/2d2018?text=Cheesecake',
    price: 30,
  },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      <section id="menu" className="menu-section">
        <h2 className="menu-section__title">Nuestro Menú</h2>
        <div className="menu-grid">
          {MENU_PRUEBA.map((item) => (
            <MenuCard
              key={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default App;