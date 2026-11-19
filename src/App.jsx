import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="menu">
          {/* Aquí irá el menú de bebidas y postres */}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
