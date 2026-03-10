import { db } from "../db";

async function deleteBean(beanId: number) {
	await db.Beans.delete(beanId);
}

export { deleteBean };
