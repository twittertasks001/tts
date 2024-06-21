import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const createMatch = (data, selectedPlayers) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO matches (name, date_create, date_exclusion, limit_points) VALUES (?, ?, ?, ?)',
				[data.nomePartida, new Date().toISOString(), null, data.limitePontos],
				(_, result) => {
					const matchId = result.insertId;

					for (let i = 0; i < selectedPlayers; i++) {
						const playerName = data[`jogador${i + 1}`];
						tx.executeSql(
							'INSERT INTO players (id_match, name) VALUES (?, ?)',
							[matchId, playerName],
							(_, result) => {
								resolve(matchId)
							},
							(_, error) => {
								reject(error.message);
							}
						);
					}
				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

const updateMatch = (idMatch, infos) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE matches set name = '${infos.match_name}', limit_points = ${Number(infos.limit_points)} where id = ${idMatch}`,
				[],
				(_, result) => {
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


const getOpenMatches = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT m.*, 
                (SELECT GROUP_CONCAT(p.name) 
                 FROM players p 
                 WHERE p.id_match = m.id) as player_name 
         FROM matches m`,
				[],
				(_, result) => {
					const matches = [];

					for (let i = 0; i < result.rows.length; i++) {
						const item = result.rows.item(i);
						const { id, name, date_create, date_exclusion, limit_points, player_name } = item;
						const players = player_name.split(',');

						const match = {
							id,
							name,
							date_create,
							date_exclusion,
							limit_points,
							players,
						};

						matches.push(match);
					}

					resolve(matches);
				},
				(_, error) => {
					reject('Erro ao obter os resultados do banco de dados:', error);
				}
			);
		});
	});
};

const getInfoMatch = (id_match) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`Select p.*,
						m.name as match_name,
						m.limit_points as limit_points,
						COALESCE((SELECT GROUP_CONCAT(p2.points) FROM points p2 WHERE id_player = p.id), '0') AS points
        	    from players p 
				inner join matches m on p.id_match = m.id
				where m.id = ?`,
				[id_match],
				(_, result) => {
					const playerList = result.rows.raw().map((item) => {
						let pointsArray = [];
						if (item.points) {
							pointsArray = item.points.split(',').map((point) => parseInt(point, 10));
						} else {
							pointsArray = [0];
						}
						return {
							id: item.id,
							id_match: item.id_match,
							match_name: item.match_name,
							name: item.name,
							limit_match_points: item.limit_points,
							points: pointsArray,
						};
					});
					resolve(playerList);
				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

const insertInHistory = (idMatch, idPlayer) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO match_history (id_match, id_winner) VALUES (?, ?)',
				[idMatch, idPlayer],
				(_, result) => {
					resolve(true)
					console.log('inseriu histórico')
				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

const resetMatchPoints = (idPlayers) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`DELETE from points where id_player in (${idPlayers})`,
				[],
				(_, result) => {
					resolve(result.rowsAffected)

					console.log(result)
				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

const historyPerMatch = (idMatch) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
					select p.name as player_name
					from match_history h
					inner join players p on p.id = h.id_winner and h.id_match = ${idMatch}
				`,
				[],
				(_, result) => {
					resolve(result.rows.raw())

				},
				(error) => {
					reject(error.message);
				}
			);
		});
	});
};

export { createMatch, updateMatch, getOpenMatches, getInfoMatch, insertInHistory, resetMatchPoints, historyPerMatch } 