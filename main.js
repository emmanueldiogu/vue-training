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
            :disabled="!selectedInCart"
            :class="{ disableButton: !selectedInCart }">
            Subtract from cart
          </button>
      </div>  
      <div>
        <h3>Reviews</h3>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p> {{ review.name }}</p>
            <p> {{ review.email }}</p>
            <p> Rating: {{ review.rating }}</p>
            <p> {{ review.review }}</p>
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview" />
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
        ],
        reviews: []
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
      addReview(productReview) {
        this.reviews.push(productReview)
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length" class="errors">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors"> {{ error }}</li>
        </ul>
      </p>
      <div>
        <label for="">Name:</label>
        <input type="text"  placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label for="">Email:</label>
        <input type="email" placeholder="Enter your email" v-model="email">
      </div>
      <div>
        <label for="">Review:</label>
        <input type="text"  placeholder="Enter Review" v-model="review">
      </div>
      <div class="form-group">
        <label for="">Ratings:</label>
        <select v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>
      <br>
      <input type="submit" value="Submit" >
    </form>
  `,
  data() {
    return {
      name: null,
      email: null,
      review: null,
      rating: null,
      errors:[]
    }
  },
  methods: {
    onSubmit() {
      this.errors = [] //this resets the error msg after the error has been corrected
      let emailTest = /\S+@\S+\.\S+/;
      let emailValid = emailTest.test(this.email)
      if (this.name && emailValid && this.review && this.rating) {
        let productReview = {
          name: this.name,
          email: this.email,
          review:this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.email = null
        this.review = null
        this.rating = null
      }
      else {
        if (!this.name) { this.errors.push("Name required.") }
        if (!this.email) { this.errors.push("Email required.") }
        if (!emailValid) { this.errors.push("Email must be valid.") }
        if (!this.review) { this.errors.push("Review required.") }
        if (!this.rating) { this.errors.push("Rating required.") }
      }
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