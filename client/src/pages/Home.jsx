
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryProducts } from './Category.jsx';
import './Home.css';

const categories = [
  { name: 'Dresses', image: 'photo-1539109136881-3be0616acf4b' },
  { name: 'Handbags', image: 'photo-1584917865442-de89df76afd3' },
  { name: 'Footwear', image: 'photo-1543163521-1bf539c55dd2' },
  { name: 'Accessories', image: 'photo-1611652022419-a9419f74343d' }
];

const allProducts = Object.values(categoryProducts).flat();

const newArrivals = allProducts.slice(-4);

// Demo featured products for the Best Sellers section
const bestSellers = allProducts.slice(0, 4);

// Demo sale products with a 20% discount
const saleProducts = allProducts.slice(1, 5).map((product) => ({
  ...product,
  salePrice: Math.round(product.price * 0.8)
}));

function ProductSection({ label, title, description, products }) {
  return (
    <section className="home-products-section container">
      <div className="section-heading">
        <p>{label}</p>
        <h2>{title}</h2>
        <span>{description}</span>
      </div>

      <div className="home-products-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="home-product-card"
            key={product.id}
          >
            <div className="home-product-image">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className="home-product-badge">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="home-product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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

          <Link to="/collections" className="hero-button">
            EXPLORE COLLECTION
            <ArrowRight size={17} />
          </Link>
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
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="category-card"
              key={category.name}
            >
              <img
                src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=700&q=85`}
                alt={category.name}
              />

              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>
                  EXPLORE <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div id="new-arrivals">
        <ProductSection
          label="JUST LANDED"
          title="New Arrivals"
          description="Fresh finds for your wardrobe."
          products={newArrivals}
        />
      </div>

      <div id="best-sellers">
        <ProductSection
          label="MOST LOVED"
          title="Best Sellers"
          description="The styles everyone is loving."
          products={bestSellers}
        />
      </div>

      <section className="sale-section" id="sale">
        <p>THE TRENDORA EDIT</p>
        <h2>A little something special.</h2>
        <span>Enjoy 20% off selected styles.</span>
      </section>

      <section className="home-products-section container">
        <div className="section-heading">
          <p>LIMITED-TIME OFFERS</p>
          <h2>Shop the Sale</h2>
          <span>Beautiful styles at special prices.</span>
        </div>

        <div className="home-products-grid">
          {saleProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="home-product-card"
              key={product.id}
            >
              <div className="home-product-image">
                <img src={product.image} alt={product.name} />
                <span className="home-product-badge">20% OFF</span>
              </div>

              <div className="home-product-info">
                <h3>{product.name}</h3>
                <p>
                  <strong>
                    ₹{product.salePrice.toLocaleString('en-IN')}
                  </strong>
                  <del>
                    ₹{product.price.toLocaleString('en-IN')}
                  </del>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
