Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array
    },
  },
  template: `
    <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div class="color-box"
               v-for="variant in variants" 
               :key="variant.id"
               :style="{ backgroundColor: variant.color }"
               @mouseover="updateProduct(variant.id)"
               >
               {{ variantRemaining(variant) }}
          </div> 

          <button
            v-on:click="addToCart" 
            :disabled="!selectedVariantStock"
            :class="{ disabledButton: !selectedVariantStock }"
            >
          Add to cart
          </button>
          <button
            @click="subtractFromCart"
            :disableed="!selectedInCart"
            :class="{ disableButton: !selectedInCart }">
            Subtract from cart
          </button>

       </div>  
    
    </div>
   `,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariantId: 2234,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            id: 2234,
            color: 'green',
            image: './one.jpeg',
            quantity: 6     
          },
          {
            id: 2235,
            color: 'blue',
            image: './two.jpeg',
            quantity: 5    
          }
        ]
    }
  },
    methods: {
      addToCart: function() {
        if (this.selectedVariantStock) {
          this.$emit('add-to-cart', this.selectedVariant.id)
        }
      },
      subtractFromCart() {
        if (this.selectedVariantId) {         
          this.$emit('subtract-from-cart', this.selectedVariant.id)
        }
      },
      updateProduct: function(index) {
        this.selectedVariantId = index            
      },
      variantRemaining(variant) {
          return variant.quantity - this.cart.filter(v => v == variant.id).length
      }
    },
    computed: {
        selectedVariant(){
          return this.variants.find(v => v.id == this.selectedVariantId)
        },
        selectedVariantStock() {
          return this.variantRemaining(this.selectedVariant) > 0
        },
        selectedInCart() {
           return this.cart.find(id => id == this.selectedVariant.id)
        },
        title() {
            return this.brand + ' ' + this.product  
        },
        image() {
            return this.selectedVariant.image
        },
        inStock() {
            return this.selectedVariant.quantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },
      deleteCart(id) {
        let index = this.cart.indexOf(id)
        if(index >= 0) {
          this.cart.splice(index, 1)
        }

      }
    }
})