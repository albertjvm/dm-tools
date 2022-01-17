import firebase from 'firebase/app';

const COLLECTIONS = {
    CAMPAIGNS: 'campaigns',
};

const db = () => firebase.firestore();

const currentUserId = () => {
    return firebase.auth().currentUser.uid;
};

const isLoggedIn = () => {
    return firebase.auth().currentUser != null;
};

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

export const createNewWidget = (data) => {
    db().collection('widgets').add({
        userId: currentUserId(),
        ...data
    });
};

export const updateWidgetConfig = (id, config) => {
    db().collection('widgets').doc(id).update({config});
};

export const getCampaign = (id) => {
    return db().collection(COLLECTIONS.CAMPAIGNS).doc(id).get();
}

export const getCampaigns = () => {
    return db().collection(COLLECTIONS.CAMPAIGNS)
    .where('userId', '==', currentUserId())
    .get();
};

export const deleteCampaign = (id) => {
    db().collection(COLLECTIONS.CAMPAIGNS).doc(id).delete();
};