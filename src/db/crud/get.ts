import { SelectRandom } from "@/lib/utils";
import type { Beans } from "@/types/BeanTypes";
import type { Machines } from "@/types/MachineTypes";
import { db } from "../db";

async function getRandomBeanId(): Promise<Beans["id"] | undefined> {
	const beans = await db.Beans.toArray();
	return SelectRandom(beans.map((bean) => bean.id));
}

async function getRandomMachineId(): Promise<Machines["id"] | undefined> {
	const machines = await db.Machines.toArray();
	return SelectRandom(machines.map((machine) => machine.id));
}

export { getRandomBeanId, getRandomMachineId };
