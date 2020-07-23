Vue.component('product-details', {
  props: {
    details: {
      type: String,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details"> {{ detail }}</li>
    </ul>
  `
})
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">

    <div class="product-image">
      <img v-bind:src="image">
    </div>

    <div class="product-info">
      <h1> {{ title }}</h1>
      <p v-if="inStock">In stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>

      <product-details :details="details" />

      <div  v-for="(variant, id) in variants" 
            :key="variant.id"
            class="color-box"
            :class="{highlight: selectedVariant.id == variant.id}"
            @mouseover="updateProduct(variant.id)"
            :style="{backgroundColor: variant.color}">
      </div>

      <button @click="addToCart" 
      :disabled="!inStock"
      :class="{disabledButton: !inStock}">
        Add to cart
      </button>
      <button 
      @click="removeOne" 
      :disabled="!this.cart > 0"
      :class="{disabledButton: !this.cart > 0}"
      >
        Decrease cart
      </button>

      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    </div>

  </div>
  `,
  data() {
    return {
      brand: 'Cubic Zarconia',
      product: '4 Piece Jewelry',
      selectedVariantId: 2234,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      onSale:true,
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
    } 
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
    },
    shipping() {
      if (this.premium) {
        return "free"
      }
      return 2.99
    }
  }
})
var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
  
})
