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
      this.reportOperation('saving note')
    },
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    }
  },
  // An alternative to this is to init the data property instead of the code below.
  created () {
    // Set content to the value stored in localStorage of the users browser
    this.content = localStorage.getItem('content') || 'You can write in **markdown** here'
  }
})

console.log('Restored note:', localStorage.getItem('content'))
