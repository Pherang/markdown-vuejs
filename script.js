// // Register a filter with a global method

Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id')
    }
  },
  computed: {
    linesCount () {
      if (this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordsCount () {
      if (this.selectedNote) {
        let s = this.selectedNote.content
        // turn new lines into white space the white space is used for word counts.
        s = s.replace(/\n/g, ' ')
        s = s.replace(/(^\s*)|(\s*$)/gi, '')
        s = s.replace(/\s\s+/gi, ' ')
        console.log(s.split(' '))
        return s.split(' ').length
      }
    },
    charactersCount () {
      if (this.selectedNote) {
        return this.selectedNote.content.split('').length
      }
    },
    notePreview () {
      // Return markdown converted to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    selectedNote () {
      return this.notes.find(note => note.id === this.selectedId)
    },
    // Create a copy of the notes array. This copy will be used for visual purposes to sort by created date then by favorites.
    // Sort it by created date then sort the favorites and non favorites
    sortedNotes () {
      return this.notes.slice()
        .sort((a, b) => a.created - b.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    }
  },
  watch: {
    // This is the syntax when the options deep, immediate aren't required. handler (val, old) { } would be used if they were.
    notes: {
      handler: 'saveNotes',
      deep: true
    },
    // This appears to be a shorthand for selectedId: function(val) { ... }
    selectedId (val) {
      localStorage.setItem('selected-id', val)
    }
  },
  methods: {
    saveNotes () {
      // Saves to localStorage in user's browser. If this was a fullstack app, we could save to a database as well.
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved', new Date())
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
    },
    removeNote () {
      if(this.selectedNote && confirm('Delete this note? Are you sure?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          // The console message has to go before the splice otherwise the object isn't found.
          console.log('Removing note', JSON.stringify(this.selectedNote.title))
          this.notes.splice(index, 1)
        }
      }
    },
    // Toggles the note, ^= is shorthand for XOR comparison a = a ^ true
    favoriteNote () {
      this.selectedNote.favorite ^= true
    }
  },
  // An alternative to this is to init the data property instead of the code below.
  created () { 
    // Set content to the value stored in localStorage of the users browser 
    // this overwrites what is assigned when data() is called above
    // This happens because of the sequence of a Vue's life cycle.
    this.content = localStorage.getItem('content') || 'You can write in **markdown** here'
  }
})

console.log('Restored note:', localStorage.getItem('content'))
