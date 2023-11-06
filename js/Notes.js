import { db } from './FirebaseConfig.js';

// renderer.js
 function renderNote(doc) {
  var li = document.createElement('li');
  var note = document.createElement('span');
  
  li.setAttribute('data-id', doc.id);
  note.textContent = doc.data().note;
  
  li.appendChild(note);
  
  document.querySelector('#note-list').appendChild(li);
}

// istener.js


db.collection('Notes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderNote(change.doc);
    }
  });
});