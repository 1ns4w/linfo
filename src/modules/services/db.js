import Dexie from 'dexie';

export const db = new Dexie('linfo');

db.version(1).stores({
	person:'++id, fullname, email, experience, education'
});