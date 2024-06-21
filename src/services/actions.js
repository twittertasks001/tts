import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');
const getCountAction = () => {

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT qtd_actually_actions FROM action_controller',
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const count = result.rows.raw()[0].qtd_actually_actions
            resolve(count)
          } else {
            reject(false)
            console.log('Nenhum registro encontrado.');
          }
        },
        (_, error) => {
          console.log('Erro ao obter ações:', error);
          reject(error.message)
        }
      );
    })
  })
}

const incrementAction = (count) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE action_controller SET qtd_actually_actions = ?',
        [count],
        (_, result) => {
          resolve(true)
          console.log('dey boa')
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  });
};

const resetAction = (count) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE action_controller SET qtd_actually_actions = 1',
        [],
        (_, result) => {
          resolve(true)
          console.log('Resetou')
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  });
};

export { getCountAction, incrementAction, resetAction }
