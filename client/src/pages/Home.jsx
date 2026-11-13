
import { ArrowRight } from 'lucide-react';
import './Home.css';

const categories = [
  { name: 'Dresses', image: 'photo-1539109136881-3be0616acf4b' },
  { name: 'Handbags', image: 'photo-1584917865442-de89df76afd3' },
  { name: 'Footwear', image: 'photo-1543163521-1bf539c55dd2' },
  { name: 'Accessories', image: 'photo-1611652022419-a9419f74343d' }
];

function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">THE NEW SEASON COLLECTION</p>

          <h1>
            Elegance is
            <br />
            in every detail.
          </h1>

          <p className="hero-description">
            Discover timeless styles and carefully curated
            pieces made to complement your everyday elegance.
          </p>

          <a href="#collections" className="hero-button">
            EXPLORE COLLECTION
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="categories-section container" id="collections">
        <div className="section-heading">
          <p>CURATED FOR YOU</p>
          <h2>Shop by Category</h2>
          <span>Find the pieces that express your style.</span>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a href="#new-arrivals" className="category-card" key={category.name}>
              <img
                src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=700&q=85`}
                alt={category.name}
              />

              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>EXPLORE <ArrowRight size={15} /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="new-arrivals-section" id="new-arrivals">
        <div className="section-heading container">
          <p>JUST LANDED</p>
          <h2>New Arrivals</h2>
          <span>Fresh finds for your wardrobe.</span>
        </div>
        <div className="arrivals-placeholder">
          Our latest collection is coming soon.
        </div>
      </section>

      <section className="sale-section" id="sale">
        <p>THE TRENDORA EDIT</p>
        <h2>A little something special.</h2>
        <span>Discover styles you'll love.</span>
      </section>

      <div id="best-sellers" />
    </main>
  );
}

export default Home;
