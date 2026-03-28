// Hardcoded shop data for development

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  orderDate: string;
  estimatedDelivery: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  lastOrderDate: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

// Sample products
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    stock: 45,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    sku: 'WH-001',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 249.99,
    stock: 23,
    description: 'Feature-rich smartwatch with health tracking',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    sku: 'SW-002',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '3',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 39.99,
    stock: 67,
    description: 'Ergonomic aluminum laptop stand',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    sku: 'LS-003',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z'
  },
  {
    id: '4',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 59.99,
    stock: 89,
    description: '7-in-1 USB-C hub with multiple ports',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop',
    sku: 'UH-004',
    createdAt: '2024-01-18T13:00:00Z',
    updatedAt: '2024-01-18T13:00:00Z'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 129.99,
    stock: 34,
    description: 'RGB mechanical keyboard with blue switches',
    image: 'https://images.unsplash.com/photo-1596464616907-7c066b2e6f73?w=300&h=300&fit=crop',
    sku: 'MK-005',
    createdAt: '2024-01-19T14:00:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  }
];

// Sample orders
export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    items: [
      {
        productId: '1',
        productName: 'Wireless Headphones',
        quantity: 1,
        price: 79.99
      },
      {
        productId: '3',
        productName: 'Laptop Stand',
        quantity: 1,
        price: 39.99
      }
    ],
    totalAmount: 119.98,
    status: 'delivered',
    shippingAddress: '123 Main St, City, State 12345',
    orderDate: '2024-01-20T10:00:00Z',
    estimatedDelivery: '2024-01-25T10:00:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+0987654321',
    items: [
      {
        productId: '2',
        productName: 'Smart Watch',
        quantity: 1,
        price: 249.99
      }
    ],
    totalAmount: 249.99,
    status: 'processing',
    shippingAddress: '456 Oak Ave, Town, State 67890',
    orderDate: '2024-01-21T11:00:00Z',
    estimatedDelivery: '2024-01-26T11:00:00Z'
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerPhone: '+1122334455',
    items: [
      {
        productId: '4',
        productName: 'USB-C Hub',
        quantity: 2,
        price: 59.99
      },
      {
        productId: '5',
        productName: 'Mechanical Keyboard',
        quantity: 1,
        price: 129.99
      }
    ],
    totalAmount: 249.97,
    status: 'shipped',
    shippingAddress: '789 Pine Rd, Village, State 13579',
    orderDate: '2024-01-22T12:00:00Z',
    estimatedDelivery: '2024-01-27T12:00:00Z'
  }
];

// Sample customers
export const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    totalOrders: 3,
    totalSpent: 359.94,
    joinDate: '2023-12-01T10:00:00Z',
    lastOrderDate: '2024-01-20T10:00:00Z'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    address: '456 Oak Ave, Town, State 67890',
    totalOrders: 2,
    totalSpent: 499.98,
    joinDate: '2023-12-15T11:00:00Z',
    lastOrderDate: '2024-01-21T11:00:00Z'
  },
  {
    id: 'CUST-003',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1122334455',
    address: '789 Pine Rd, Village, State 13579',
    totalOrders: 5,
    totalSpent: 899.85,
    joinDate: '2023-11-20T12:00:00Z',
    lastOrderDate: '2024-01-22T12:00:00Z'
  }
];

// Sample categories
export const categories: Category[] = [
  {
    id: 'CAT-001',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    productCount: 3
  },
  {
    id: 'CAT-002',
    name: 'Accessories',
    description: 'Computer and phone accessories',
    productCount: 2
  }
];

// Dashboard statistics
export const dashboardStats = {
  totalRevenue: 1709.93,
  totalOrders: 3,
  totalCustomers: 3,
  totalProducts: 5,
  lowStockProducts: 0,
  recentOrders: orders.slice(0, 5),
  topProducts: products.slice(0, 3),
  monthlyRevenue: [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 1600 },
    { month: 'May', revenue: 2000 },
    { month: 'Jun', revenue: 1709.93 }
  ]
};
