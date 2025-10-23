import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAb6CebSqNCTHBVQp8CcPk-3guoThpTtDU',
  authDomain: 'react-notes-ab798.firebaseapp.com',
  databaseURL: 'https://react-notes-ab798-default-rtdb.firebaseio.com',
  projectId: 'react-notes-ab798',
  storageBucket: 'react-notes-ab798.firebasestorage.app',
  messagingSenderId: '492986183907',
  appId: '1:492986183907:web:049e6e29463859124c95d6',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export function onNotesValueChange(callback) {
  db.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val() || {});
  });
}

export function createNote(note) {
  db.ref('notes').push(note);
}

export function updateNote(id, fields) {
  db.ref('notes').child(id).update(fields);
}

export function deleteNote(id) {
  db.ref('notes').child(id).remove();
}
