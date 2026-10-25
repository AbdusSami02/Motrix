// Starting data for the store. Once the app has run, products / orders / cart
// live in localStorage (see store.jsx) and these are only used as defaults.

export const SIZES = ['Small', 'Medium', 'Large']
export const DEFAULT_SIZE = 'Medium'
export const CERTIFICATION = 'ECE 22.06'
export const DEFAULT_DESCRIPTION =
  'Full-face shell with a fog-resistant visor, multi-density EPS liner and a quick-release micro-lock buckle.'

// Every demo helmet shares the same description, sizes and stock.
// imageNumber matches the files in /public/products (1.jpg, 1-l.jpg, ...)
function createProduct(id, slug, brand, name, price, imageNumber) {
  return {
    id,
    slug,
    brand,
    name,
    price,
    img: `/products/${imageNumber}.jpg`,
    images: [`/products/${imageNumber}-l.jpg`],
    desc: DEFAULT_DESCRIPTION,
    sizes: [...SIZES],
    stock: 20,
    cert: CERTIFICATION,
  }
}

export const PRODUCTS = [
  createProduct(1, 'serps-raptor-x', 'Serps', 'RAPTOR-X', 540, 1),
  createProduct(2, 'yamaha-ventura-tour', 'Yamaha', 'VENTURA TOUR', 389, 2),
  createProduct(3, 'bmw-m-pro', 'BMW', 'M PRO', 500.5, 3),
  createProduct(4, 'ls2-carbon', 'LS2', 'CARBON', 720, 4),
  createProduct(5, 'shark-gt', 'Shark', 'GT', 499, 5),
  createProduct(6, 'bmw-m-pro-carbon', 'BMW', 'M-PRO-CARBON', 810, 6),
]

// Two sample orders so the admin panel and "Track order" have something to show
export const ORDERS = [
  {
    id: 'MTX-1001',
    name: 'Ali Khan',
    email: 'ali@mail.com',
    phone: '0300 1112223',
    address: 'Clifton, Karachi',
    total: 540,
    status: 'Delivered',
    items: [{ name: 'SERPS RAPTOR-X', size: 'Large', qty: 1, price: 540 }],
  },
  {
    id: 'MTX-1002',
    name: 'Sara Ahmed',
    email: 'sara@mail.com',
    phone: '0321 4445556',
    address: 'DHA, Lahore',
    total: 889,
    status: 'Processing',
    items: [
      { name: 'YAMAHA VENTURA TOUR', size: 'Medium', qty: 1, price: 389 },
      { name: 'BMW M PRO', size: 'Small', qty: 1, price: 500 },
    ],
  },
]
