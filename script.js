document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    const noteText = document.getElementById('note-text');
    const notesList = document.getElementById('notes');

    // Load saved notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => {
        addNoteToDOM(note);
    });

    addNoteButton.addEventListener('click', () => {
        const note = noteText.value.trim();
        if (note) {
            addNoteToDOM(note);
            saveNoteToLocalStorage(note);
            noteText.value = '';
        }
    });

    function addNoteToDOM(note) {
        const li = document.createElement('li');
        li.textContent = note;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            removeNoteFromLocalStorage(note);
        });
        
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    }

    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function removeNoteFromLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(n => n !== note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});
