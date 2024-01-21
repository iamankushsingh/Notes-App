const addNote = document.querySelector('#add_note');


const createNote = (savedContent = '') => {
  const note = document.createElement('div');
  note.classList.add('notes');

  const htmlData = 
    <div class="operation">
      <i id="edit" class="fa-solid fa-pencil fa-2x"></i>
      <i id="delete" class="fa-solid fa-trash-arrow-up fa-2x"></i>
      <i id="save" class="far fa-save fa-2x"></i>
    </div>
    <textarea name="" class="notes-area" cols="140" rows="16" ${savedContent ? 'readonly' : ''}>${savedContent}</textarea>;

  note.insertAdjacentHTML('afterbegin', htmlData);
  document.body.appendChild(note);

  const editButton = note.querySelector('#edit');
  const deleteButton = note.querySelector('#delete');
  const saveButton = note.querySelector('#save');
  const textarea = note.querySelector('.notes-area');

  deleteButton.addEventListener('click', () => {
    note.remove();
    updateLocalStorage();
  });

  saveButton.addEventListener('click', () => {
    updateLocalStorage();
  });

  editButton.addEventListener('click', () => {
    toggleEditMode();
  });

  const toggleEditMode = () => {
    if (textarea.hasAttribute('readonly')) {
      textarea.removeAttribute('readonly');
    } else {
      textarea.setAttribute('readonly', 'false');
    }
  };
};


const getNotes = () => {
  const savedContent = localStorage.getItem('savedContent');
  
  return savedContent ? JSON.parse(savedContent) : [];
};

// Function to update localStorage with current notes
const updateLocalStorage = () => {

const notes = Array.from(document.querySelectorAll('.notes')).map((note) => ({
    content: note.querySelector('.notes-area').value,
  }));

  localStorage.setItem('savedContent', JSON.stringify(notes));
};

// Retrieve the saved content from localStorage when the page loads
window.addEventListener('load', () => {
  const notes = getNotes();
  notes.forEach((note) => createNote(note.content));
});

// Event listener for adding a new note
addNote.addEventListener('click', () => {
  createNote('');
});
