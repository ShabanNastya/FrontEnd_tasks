export class DatabaseHelper {
    constructor(database, rootPath) {
      this.database = database;
      this.rootPath = rootPath;
    }
  
    addDictionary(dictionaryName) {
      let path = this.rootPath + dictionaryName + "/";
      this.database.ref(path).push({
        init: "init",
      });
    }
  
    getDictionariesNames()
    {
      let array = [];
      return this.database
        .ref(this.rootPath)
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            let dataTemp = snapshot.val();
            for (let key in dataTemp) {
              array.push(key);
            }
            return array;
          } else {
            console.log("No data available");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    getDictionaryWords(dictionaryName)
    {
      return this.database
        .ref(this.rootPath + dictionaryName + '/')
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    addWord(dictionaryName, newWord)
    {
      this.database.ref(this.rootPath + dictionaryName + "/").push({
        word: newWord,
      });
    }

    removeDictionary(dictionaryName)
    {
      this.database.ref(this.rootPath + dictionaryName + "/").remove();
    }

    removeWord(dictionaryName, key)
    {
      this.database.ref(this.rootPath + dictionaryName + "/" + key).remove();
    }

    updateWord(dictionaryName, key, newWord)
    {
      this.database.ref(this.rootPath + dictionaryName + '/' + key + '/').update({
        word: newWord,
      });
    }
}