// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      content: 'This is a note'
    }
  },
  computed: {
    notePreview () {
      // Return markdown converted to HTML
      return marked(this.content)
    }
  },
  watch: {
    // This is the syntax when the options deep, immediate aren't required. handler (val, old) { } would be used if they were.
    content: {
      handler: 'saveNote'
    }
  },
  methods: {
    saveNote (val) {
      console.log('Saving note: ', val)
      localStorage.setItem('content', val)
    }
  }
})
