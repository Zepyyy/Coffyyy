import { Dexie, type EntityTable } from "dexie";

interface Beans {
	id: number;
	name?: string;
	flavors?: string[];
	roastLevel?: number;
	origin?: string[];
	city?: string[];
	botanic?: string;
	variety?: string[];
	brand?: string;
	finished?: boolean;
	dominantNote?: string;
	tastingNotes?: string[];
}

const db = new Dexie("Beans") as Dexie & {
	Beans: EntityTable<Beans, "id">;
};

db.version(1).stores({
	Beans:
		"++id, name, flavors, roastLevel, origin, city, botanic, variety, brand, finished, dominantNote, tastingNotes",
});

export type { Beans };
export { db };
