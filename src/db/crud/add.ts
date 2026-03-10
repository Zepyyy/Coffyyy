import type { Beans, Brews, Machines } from "@/types/default";
import { db } from "../db";

async function addBean(bean: Omit<Beans, "id">) {
	try {
		return await db.Beans.bulkAdd([bean]);
	} catch (error) {
		return error;
	}
}

async function addBrew(brew: Omit<Brews, "id">) {
	try {
		return await db.Brews.bulkAdd([brew]);
	} catch (error) {
		return error;
	}
}

async function addMachine(machine: Omit<Machines, "id">) {
	try {
		return await db.Machines.bulkAdd([machine]);
	} catch (error) {
		return error;
	}
}

export { addBean, addBrew, addMachine };
