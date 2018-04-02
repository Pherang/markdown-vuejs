// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      content: 'This is a note',
      notes: [],
      selectedId: null
    }
  },
  computed: {
    notePreview () {
      // Return markdown converted to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    selectedNote () {
      return this.notes.find(note => note.id === this.selectedId)
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
      // Saves to localStorage in user's browser. If this was a fullstack app, we could save to a database as well.
      localStorage.setItem('content', val)
      this.reportOperation('saving note')
    },
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    },
    addNote () {
      const time = Date.now()
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false
      }
      // Add a note to the array notes in Data property
      this.notes.push(note)
    },
    selectNote (note) {
      this.selectedId = note.id
      console.log('Note was selected', note.id)
    }
  },
  // An alternative to this is to init the data property instead of the code below.
  created () { // Set content to the value stored in localStorage of the users browser this overwrites what is assigned when data() is called above
    // This happens because of the sequence of a Vue's life cycle.
    this.content = localStorage.getItem('content') || 'You can write in **markdown** here'
  }
})

console.log('Restored note:', localStorage.getItem('content'))
