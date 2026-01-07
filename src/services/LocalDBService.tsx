import SQLite from 'react-native-sqlite-storage';
// Services
import { readAllMatchesService } from './MatchService';
// Store
import { userStore } from '../stores/userStore';
import { getMatchesIdsService } from './UserService';

const db = SQLite.openDatabase(
  { name: 'Nice-Sport-MatchDB', location: 'default' },
  () => {
    console.log('Database connected');
  },
  (error: any) => {
    console.log('Database error: ', error);
  },
);

export const syncFirestoreToSQLite = async () => {
  const { username } = userStore.getState();
  try {
    if (!username) throw new Error('No username found');

    db.transaction((tx: any) => {
      // Matches
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS matches (
          _id TEXT PRIMARY KEY, 
          address TEXT, 
          day TEXT, 
          publisher TEXT, 
          status TEXT, 
          time TEXT
        )`,
      );
      // Matches Ids
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS matchesIds (
          username TEXT PRIMARY KEY, 
          matchesIds TEXT
        )`,
      );
      // Chats TODO
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          sender TEXT
        )`,
      );
    });

    const matchesSnapshot = await readAllMatchesService();
    const matchesIdsSnapshot = await getMatchesIdsService(username);
    // TODO CHATS

    db.transaction(
      (tx: any) => {
        // Clear in case something was left
        tx.executeSql('DELETE FROM matches');
        tx.executeSql('DELETE FROM matchesIds');
        tx.executeSql('DELETE FROM chats');
        // Assign data accordingly
        matchesSnapshot.forEach(match => {
          tx.executeSql(
            `INSERT INTO matches (_id, address, day, publisher, status, time)
           VALUES (?, ?, ?, ?, ?, ?)`,
            [
              match._id,
              JSON.stringify(match.address),
              match.day,
              match.publisher,
              match.status,
              match.time,
            ],
          );
        });
        // Matches ids corresponding to user
        tx.executeSql(
          `INSERT INTO matchesIds (username, matchesIds)
           VALUES (?, ?)`,
          [username, JSON.stringify(matchesIdsSnapshot)],
        );
      },
      (error: any) => console.error('Sync Transaction Error', error),
      () => console.log('Sync Complete!'),
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeDBonLogOut = () => {
  db.transaction(
    (tx: any) => {
      tx.executeSql('DROP TABLE matches');
      tx.executeSql('DROP TABLE matchesIds');
      tx.executeSql('DROP TABLE chats');
    },
    (error: any) => {
      throw new Error(error.message);
    },
    () => console.log('Sync Complete!'),
  );
};

export const readAllUserMatchesFromDBService = (username: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM matches WHERE publisher = ?',
        [username],
        (tx: any, results: any) => {
          let rows = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            // Parse the only obj
            rows.push({ ...item, address: JSON.parse(item.address) });
          }
          // return data
          resolve(rows);
        },
        (err: any) => reject(err),
      );
    });
  });
};

// Read matches ids from db
export const readUserMatchesIdsFromDBService = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM matchesIds',
        [],
        (tx: any, results: any) => {
          if (results.rows.length === 0) resolve([]);
          let rows = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            // parse de array
            rows.push({ ...item, matchesIds: JSON.parse(item.matchesIds) });
          }
          // Send the array
          resolve(rows[0].matchesIds);
        },
        (err: any) => reject(err),
      );
    });
  });
};

export const readOtherMatchesFromDBService = async (username: string) => {
  // Get ids from db
  const matchesIds: any = await readUserMatchesIdsFromDBService();
  if (matchesIds.length === 0) return [];
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      // Create ? as long as the array of matches ids
      const placeholders = matchesIds.map(() => '?').join(',');
      tx.executeSql(
        `SELECT * FROM matches WHERE publisher != ? AND _id IN (${placeholders})`,
        [username, ...matchesIds],
        (tx: any, results: any) => {
          let rows = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            rows.push({ ...item, address: JSON.parse(item.address) });
          }
          resolve(rows);
        },
        (err: any) => reject(err),
      );
    });
  });
};

export const readPastMatchesFromDBService = async () => {
  // Read from local db
  const matchesIds: any = await readUserMatchesIdsFromDBService();
  if (matchesIds.length === 0) return [];
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      // ? as long as there is an element in the array
      const placeholders = matchesIds.map(() => '?').join(',');
      tx.executeSql(
        `SELECT * FROM matches WHERE _id IN (${placeholders})`,
        matchesIds,
        (tx: any, results: any) => {
          let rows = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            rows.push({ ...item, address: JSON.parse(item.address) });
          }
          resolve(rows);
        },
        (err: any) => reject(err),
      );
    });
  });
};
