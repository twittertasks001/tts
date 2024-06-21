import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');


const updateNamePlayers = (idPlayer, name) => {
	console.log(idPlayer)
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE players set name = '${name}' where id = ${idPlayer}`,
				[],
				(_, result) => {
          console.log(result);
					if (result.rowsAffected > 0) {
						resolve(true)
					} else resolve(false)
				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

export {updateNamePlayers}