import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

const checkAndCreateTables = () => {

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='players'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          tx.executeSql(
            'CREATE TABLE players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, id_match INTEGER)',
            [],
            () => {
              console.log('Tabela players criada com sucesso!');
            },
            (error) => {
              console.log('Erro ao criar tabela players:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela players:', error);
      }
    );

    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='matches'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          tx.executeSql(
            'CREATE TABLE matches (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,limit_points INTEGER, date_create TEXT, date_exclusion TEXT)',
            [],
            () => {
              console.log('Tabela matches criada com sucesso!');
            },
            (error) => {
              console.log('Erro ao criar tabela matches:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela matches:', error);
      }
    );

    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='points'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          // Tabela de points não existe, criar a tabela
          tx.executeSql(
            'CREATE TABLE points (id INTEGER PRIMARY KEY AUTOINCREMENT, id_player INTEGER, points INTEGER)',
            [],
            () => {
              console.log('Tabela points criada com sucesso!');
            },
            (error) => {
              console.log('Erro ao criar tabela points:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela points:', error);
      }
    );

    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='action_controller'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          // Tabela de points não existe, criar a tabela
          tx.executeSql(
            'CREATE TABLE action_controller (id INTEGER PRIMARY KEY AUTOINCREMENT, qtd_actually_actions INTEGER)',
            [],
            () => {
              console.log('Tabela action_controller criada com sucesso!');
            },
            (error) => {
              console.log('Erro ao criar tabela points:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela points:', error);
      }
    );

    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='match_history'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          // Tabela de points não existe, criar a tabela
          tx.executeSql(
            'CREATE TABLE match_history (id INTEGER PRIMARY KEY AUTOINCREMENT, id_match, id_winner INTEGER)',
            [],
            () => {
              console.log('Tabela match_history criada com sucesso!');
            },
            (error) => {
              console.log('Erro ao criar tabela points:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela points:', error);
      }
    );

    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='action_controller'",
      [],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          // Tabela de points não existe, criar a tabela
          tx.executeSql(
            'INSERT INTO action_controller (qtd_actually_actions) VALUES (1)',
            [],
            (_, result) => {
              console.log('inseriu nova ação')
            },
            (error) => {
              console.log('Erro ao criar tabela points:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Erro ao verificar tabela points:', error);
      }
    );

  });

};

// Chame a função checkAndCreateTables ao abrir o aplicativo
export { checkAndCreateTables }