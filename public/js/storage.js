const firebaseConfig = {
    apiKey: "AIzaSyArJ0UO0rPnqt3E70jFBHlZh4fUhOc6HSI",
    authDomain: "alias-3052f.firebaseapp.com",
    projectId: "alias-3052f",
    storageBucket: "alias-3052f.appspot.com",
    messagingSenderId: "533741029384",
    appId: "1:533741029384:web:4eb31b89dcf026bb00a9bd",
    measurementId: "G-YZWLKV4NK5"
};

class Storage {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }
        
        this.database = firebase.firestore();
    }

    getStatistics() {
        return this.database.collection('statistics').get()
            .then((snapshot) => {
                return snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getDictionaries() {
        return this.database.collection('dictionaries').get()
            .then((snapshot) => {
                return snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    removeDictionary (dictionaryId) {
        return this.database
            .collection('dictionaries')
            .doc(dictionaryId)
            .delete()
            .catch((error) => {
                console.error(error);
            });
    }

    addStatistics (statistics) {
        statistics.forEach((statistic) => {
            this.database
                .collection('statistics')
                .add({
                    game_date: Date.now(),
                    guessed: statistic.guessed,
                    skipped: statistic.skipped,
                    team_name: statistic.team_name,
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    getDictionaryById(id) {
        return this.database.collection('dictionaries').doc(id).get()
            .then((snapshot) => {
                return snapshot.data()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateWords(dictionaryId, words) {
        return this.database.collection('dictionaries').doc(dictionaryId)
            .update({
                words,
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export default new Storage();