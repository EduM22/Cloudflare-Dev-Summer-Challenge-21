export async function data() {
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '/product/1',
      price: '$48',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
          alt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
      ],
      colors: [],
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '/product/2',
      price: '$35',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
          alt:  'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '/product/3',
      price: '$89',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
          alt:  'Person using a pen to cross a task off a productivity paper card.',
        },
      ],
      colors: [],
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '/product/4',
      price: '$35',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
          alt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
    },
    // More products...
  ]

  await timeout(1000)

  return products
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
