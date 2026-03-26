export type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export type Brews = {
	id: number;
	bean: string | undefined;
	overallRating:
		| "Excellent"
		| "Good"
		| "Mid"
		| "Horrible"
		| "Burnt🔥"
		| "default";
	grindSize: string;
	date: Date;
	acidity:
		| "⚡ Too sharp/sour"
		| "🍋 Bright/Lively"
		| "😊 Balanced"
		| "😴 Flat/Dull"
		| "default";
	adjustementNeeded:
		| "Keep this setting 👍"
		| "Grind finer next time ⬇️"
		| "Grind coarser next time ⬆️"
		| "Try different machine 🔄"
		| "Fuck this bean ‼️"
		| "default";
	aftertaste:
		| "✨ Amazing - lingering sweetness"
		| "👍 Pleasant"
		| "😐 Neutral"
		| "👎 Unpleasant/harsh"
		| "default";
	bitterness:
		| "👍 Barely noticeable"
		| "🍫 Pleasant bitter"
		| "😐 None"
		| "😖 Too bitter"
		| "default";
	mouthfeel:
		| "💧 Thin/Watery"
		| "😊 Balanced"
		| "😐 Neutral"
		| "😖 Too watery"
		| "🔥 Fluffy/airy"
		| "default";
	strength: "‼️ Too strong" | "🍃 Just right" | "💧Too weak" | "default";
	machine: string | undefined;
	tasteProfiles: Array<string>;
};

export type Machines = {
	id: number;
	name?: string;
	brand?: string;
	type: string;
	purchaseDate?: string;
	model?: string;
	induction?: boolean;
	grindRange?: string;
	capacity?: string;
};
