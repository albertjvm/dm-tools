import firebase from 'firebase';

const currentUserId = () => {
    return firebase.auth().currentUser.uid;
};

const isLoggedIn = () => {
    return firebase.auth().currentUser != null;
};

const db = () => firebase.firestore();

export const saveChoice = (choice) => {
    if (!isLoggedIn()) return;
    db().collection('userChoice').doc(currentUserId()).set({
        choice
    })
};

export const getChoice = () => {
    if (!isLoggedIn()) return;
    return db().collection('userChoice').doc(currentUserId()).get();
};