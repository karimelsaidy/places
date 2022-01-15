import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
const db = SQLite.openDatabase({name: 'places.dp', location: 'default'});

export const initDb = () => {
  db.then(db => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL ,title TEXT NOT NULL,imageUri TEXT NOT NULL,address TEXT NOT NULL,notes TEXT NOT NULL);',
        [],
        res => {
          return res;
        },
        e => {
          return e;
        },
      );
    });
  });
};

export const insertPlace = async (title, imageUri, address, notes) => {
  const response = new Promise((resolve, reject) => {
    db.then(db => {
      db.transaction(tran => {
        tran.executeSql(
          'INSERT INTO places (title,imageUri,address,notes) VALUES (?,?,?,?)',
          [title, imageUri, address, notes],
          (_, result) => {
            resolve(result);
          },
          (_, e) => {
            reject(e);
          },
        );
      });
    });
  });

  return response;
};
export const getPlaces = () => {
  const response = new Promise((resolve, reject) => {
    db.then(db => {
      db.transaction(tran => {
        tran.executeSql(
          'SELECT * FROM places',
          [],
          (_, result) => {
            let temp = [];
            for (i = 0; i < result.rows.length; i++) {
              temp.push(result.rows.item(i));
            }
            resolve(temp);
          },
          (_, e) => {
            reject(e);
          },
        );
      });
    });
  });
  return response;
};
export const deletePlace = async id => {
  const response = new Promise((resolve, reject) => {
    db.then(db => {
      db.transaction(tran => {
        tran.executeSql(
          'DELETE FROM places WHERE id = ?',
          [id],
          (_, result) => {
            resolve(result);
          },
          (_, e) => {
            reject(e);
          },
        );
      });
    });
  });

  return response;
};
export const updatePlaceDb = async (id, title, imageUri, address, notes) => {
  const response = new Promise((resolve, reject) => {
    db.then(db => {
      db.transaction(tran => {
        tran.executeSql(
          'UPDATE places set title = ? , imageUri = ? , address = ?  ,notes = ? WHERE id = ? ;',
          [title, imageUri, address, notes, id],
          (_, result) => {
            resolve(result);
          },
          (_, e) => {
            reject(e);
          },
        );
      });
    });
  });

  return response;
};
