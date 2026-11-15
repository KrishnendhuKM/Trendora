import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Your cart is empty.',
      });
    }

    const requiredFields = [
      'fullName',
      'phone',
      'address',
      'city',
      'state',
      'postalCode',
    ];

    const missingField = requiredFields.some(
      (field) => !shippingAddress?.[field]?.toString().trim()
    );

    if (missingField) {
      return res.status(400).json({
        message: 'Please provide complete delivery details.',
      });
    }

    // Validate products and quantities
    for (const item of items) {
      if (
        !item.productId ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1
      ) {
        return res.status(400).json({
          message: 'Invalid product or quantity.',
        });
      }
    }

    // Fetch actual product information from MongoDB
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: 'One of the products could not be found.',
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image || '',
        price:
  product.isOnSale && product.salePrice !== null
    ? product.salePrice
    : product.price,
        quantity: Number(item.quantity),
        size: item.size || '',
      });
    }

    // Calculate total using database prices
    const subtotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: 'COD',
      subtotal,
      totalAmount: subtotal,
    });

    res.status(201).json({
      message: 'Your order has been placed successfully!',
      order,
    });
  } catch (error) {
    console.error('Create order error:', error.message);

    res.status(500).json({
      message: 'Unable to place your order. Please try again.',
    });
  }
};

// Get logged-in customer's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Get orders error:', error.message);

    res.status(500).json({
      message: 'Unable to retrieve your orders.',
    });
  }
};