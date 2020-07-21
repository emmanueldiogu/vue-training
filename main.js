var app = new Vue({
  el: '#app',
  data: {
    product: 'Cubic Zaconia Jewelry',
    description: "Nice fashionable jewelry weddings and party",
    deliveryMsg: "Your items will arrive in 1 to 3 days",
    hideMsg: false,
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
        variantColor: "green",
        variantImage: './one.jpeg',
        altText: "green product"
      },
      {
        varientId: 2235,
        variantColor: "blue",
        variantImage: './two.jpeg',
        altText: "blue product"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    removeOne: function () {
      if (this.cart > 0) {
        this.cart -= 1
      }
    },
    updateProduct: function (variantImage, altText, colorBox) {
      this.image.url = variantImage
      this.image.alts = altText
    }
  }
})
