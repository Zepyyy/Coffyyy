import { db } from "@/db/db";

export async function getBrewCountForBean(bean: string): Promise<number> {
	if (!bean) return 0;
	return db.Brews.where("bean").equals(bean).count();
}

export async function getUniqueBeansBrewedCount(): Promise<number> {
	const beans = await db.Brews.orderBy("bean").uniqueKeys();
	return beans.filter(Boolean).length;
}
