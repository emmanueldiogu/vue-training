var app = new Vue({
  el: '#app',
  data: {
    brand: 'Cubic Zarconia',
    product: '4 Piece Jewelry',
    selectedVariantId: 2234,
    onSale:true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "green",
        image: './one.jpeg',
        quantity: 20
      },
      {
        id: 2235,
        color: "blue",
        image: './two.jpeg',
        quantity: 0
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
    updateProduct: function (id) {
      this.selectedVariantId = id
    }
  },
  computed: {
    title: function () {
      if (this.onSale) {
        return this.brand + ' ' + this.product
      }
    },
    selectedVariant() {
      return this.variants.find(v=> v.id == this.selectedVariantId)
    },
    image() {
      return this.selectedVariant.image
    },
    inStock() {
      return this.selectedVariant.quantity
    }
  }
})
