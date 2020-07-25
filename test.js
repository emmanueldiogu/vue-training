//this creates a component that repeats the prop "text" multiple times
Vue.component('repeat-phrase', {
  props: {
    text: {
      type: String,
      required: true
    },
    times: {
      type: Number,
      default: 1
    }
  },
  computed: {
    repeatedText(){
      let textArray = []
      for(var i = 0; i < this.times; i++) {
        textArray.push(this.text)
      }
      return textArray.join(' ')
    }
  },
  template: `
    <div>{{repeatedText}}</div>
  `
})

var app = new Vue({
    el: '#app'
})

// in the html add <repeat-phrase text="hey" :times="7" /> within the Vue instance. or you could create a text in the Vue instance data and replace accordingly 