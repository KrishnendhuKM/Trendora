
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  // DRESSES
  {
    name: 'Elegant Floral Midi Dress',
    category: 'dresses',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700',
    badge: 'NEW',
  },
  {
    name: 'Classic Evening Dress',
    category: 'dresses',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700',
    badge: 'BESTSELLER',
  },
  {
    name: 'Summer Casual Dress',
    category: 'dresses',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=700',
  },

  // TOPS
  {
    name: 'Minimal Everyday Top',
    category: 'tops',
    price: 999,
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=700',
    badge: 'NEW',
  },
  {
    name: 'Classic White Blouse',
    category: 'tops',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1564257577-6a9c8f3c5b7a?w=700',
  },
  {
    name: 'Elegant Casual Shirt',
    category: 'tops',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=700',
  },

  // HANDBAGS
  {
    name: 'Classic Everyday Handbag',
    category: 'handbags',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700',
    badge: 'POPULAR',
  },
  {
    name: 'Minimal Shoulder Bag',
    category: 'handbags',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700',
  },
  {
    name: 'Elegant Mini Bag',
    category: 'handbags',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700',
  },

  // FOOTWEAR
  {
    name: 'Classic Heeled Sandals',
    category: 'footwear',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700',
    badge: 'NEW',
  },
  {
    name: 'Everyday Casual Shoes',
    category: 'footwear',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',
  },
  {
    name: 'Elegant Women Flats',
    category: 'footwear',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d4a7a6?w=700',
  },

  // WATCHES
  {
    name: 'Minimal Classic Watch',
    category: 'watches',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700',
    badge: 'BESTSELLER',
  },
  {
    name: 'Elegant Gold Watch',
    category: 'watches',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
  },
  {
    name: 'Modern Everyday Watch',
    category: 'watches',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700',
  },

  // ACCESSORIES
  {
    name: 'Elegant Jewellery Set',
    category: 'accessories',
    price: 899,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700',
    badge: 'NEW',
  },
  {
    name: 'Minimal Gold Necklace',
    category: 'accessories',
    price: 699,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700',
  },
  {
    name: 'Classic Fashion Earrings',
    category: 'accessories',
    price: 599,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700',
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    const operations = products.map((product) => ({
      updateOne: {
        filter: {
          name: product.name,
          category: product.category,
        },
        update: {
          $setOnInsert: {
            ...product,
            stock: 10,
            sizes: ['S', 'M', 'L', 'XL'],
            isNew: product.badge === 'NEW',
            isBestSeller: product.badge === 'BESTSELLER',
            isOnSale: false,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);

    console.log('Product seeding completed!');
    console.log(`New products added: ${result.upsertedCount}`);
    console.log('Existing matching products were preserved.');

    process.exit(0);
  } catch (error) {
    console.error('Product seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
