import type { Brews } from "@/types/default";

export type BrewSuggestions = {
	bean: Array<string>;
	grindSize: Array<string>;
	overallRating: Array<string>;
	adjustementNeeded: Array<string>;
	aftertaste: Array<string>;
	bitterness: Array<string>;
	mouthfeel: Array<string>;
	strength: Array<string>;
	type: Array<string>;
	tasteProfiles: Array<string>;
};

function rankByUsage(values: Array<string>): Array<string> {
	const counts = new Map<string, { label: string; count: number }>();

	for (const value of values) {
		const normalized = value.trim();
		if (!normalized) continue;
		const key = normalized.toLocaleLowerCase();
		const current = counts.get(key);
		if (current) {
			current.count += 1;
			continue;
		}
		counts.set(key, { label: normalized, count: 1 });
	}

	return [...counts.entries()]
		.sort((a, b) => {
			if (b[1].count !== a[1].count) return b[1].count - a[1].count;
			return a[0].localeCompare(b[0]);
		})
		.map(([, value]) => value.label);
}

export function buildBrewSuggestions(
	brews: Array<Brews>,
	beanNames: string[],
): BrewSuggestions {
	const bean: Array<string> = beanNames;
	const grindSize: Array<string> = [];
	const overallRating: Array<string> = [
		"Excellent",
		"Good",
		"Mid",
		"Horrible",
		"Burnt🔥",
	];
	const adjustementNeeded: Array<string> = [
		"Keep this setting 👍",
		"Grind finer next time ⬇️",
		"Grind coarser next time ⬆️",
		"Try different machine 🔄",
		"Fuck this bean ‼️",
	];
	const aftertaste: Array<string> = [
		"✨ Amazing - lingering sweetness",
		"👍 Pleasant",
		"😐 Neutral",
		"👎 Unpleasant/harsh",
	];
	const bitterness: Array<string> = [
		"👍 Barely noticeable",
		"🍫 Pleasant bitter",
		"😐 None",
		"😖 Too bitter",
	];
	const mouthfeel: Array<string> = [
		"💧 Thin/Watery",
		"🪶 Light/Tea-like",
		"🍃 Medium/Balanced",
		"🍯 Heavy",
	];
	const strength: Array<string> = [
		"‼️ Too strong",
		"🍃 Just right",
		"💧Too weak",
	];
	const type: Array<string> = ["Bialetti Moka pot", "Bambino Sage"];
	const tasteProfiles: Array<string> = [];

	for (const brew of brews) {
		tasteProfiles.push(...(brew.tasteProfiles ?? []));
	}

	return {
		bean,
		grindSize,
		adjustementNeeded,
		aftertaste,
		bitterness,
		mouthfeel,
		overallRating,
		strength,
		type,
		tasteProfiles: rankByUsage(tasteProfiles),
	};
}
