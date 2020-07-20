var app = new Vue({
  el: '#app',
  data: {
    product: 'Cubic Zaconia Jewelry',
    description: "Nice fashionable jewelry weddings and party",
    image: {
      url: './one.jpeg',
      alts: 'product image'
    },
    links: {
      url: "./about.html",
      text: "About page"
    },
    inventory: 20,
    inStock: true,
    onSale: false,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green"
      },
      {
        varientId: 2235,
        variantColor: "blue"
      }
    ],
    sizes: [ "S", "M", "L", "XL"]
  }
})
