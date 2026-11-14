
import { Link } from 'react-router-dom';
import './Collections.css';

const categories = [
  {
    name: 'Dresses',
    description: 'Find your perfect look',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    path: '/category/dresses',
  },
  {
    name: 'Tops',
    description: 'Everyday styles, elevated',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800',
    path: '/category/tops',
  },
  {
    name: 'Handbags',
    description: 'The perfect finishing touch',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    path: '/category/handbags',
  },
  {
    name: 'Footwear',
    description: 'Step into your style',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    path: '/category/footwear',
  },
  {
    name: 'Watches',
    description: 'Timeless elegance',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    path: '/category/watches',
  },
  {
    name: 'Accessories',
    description: 'Little details, big impact',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
    path: '/category/accessories',
  },
];

function Collections() {
  return (
    <main className="collections-page container">
      <div className="collections-heading">
        <p className="eyebrow">EXPLORE TRENDORA</p>
        <h1>Our Collections</h1>
        <p>
          Discover pieces that make every moment feel special.
        </p>
      </div>

      <div className="collections-grid">
        {categories.map((category) => (
          <Link
            to={category.path}
            className="collection-card"
            key={category.name}
          >
            <img src={category.image} alt={category.name} />

            <div className="collection-overlay">
              <div>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <span>Explore Collection →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Collections;
