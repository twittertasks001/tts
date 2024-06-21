import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');


const inserPoint = (idPlayer, point) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO points (id_player, points) VALUES (?, ?)',
        [idPlayer, point],
        (_, result) => {
          console.log(`inserido com sucesso: ${result.rows.raw()}`)
          resolve(true)
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  });
};

const deletePoint = (idPlayer) => {
  
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT MAX(id) as lastId FROM points where id_player = ?',
        [idPlayer],
        (_, result) => {
          if (result.rows.length > 0) {
            const lastId = result.rows.raw()[0].lastId;
            tx.executeSql(
              'DELETE FROM points WHERE id = ?',
              [lastId],
              (_, deleteResult) => {
                resolve(deleteResult)
              },
              (_, error) => {
                console.log('Erro ao excluir o registro:', error);
                reject(false)
              }
            );
          } else {
            reject(false)
            console.log('Nenhum registro encontrado.');
          }
        },
        (_, error) => {
          console.log('Erro ao obter o último ID:', error);
        }
      );
    })
  })
}
export { inserPoint, deletePoint }