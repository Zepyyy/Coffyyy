export type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export type Beans = {
	id: number;
	name: string; // Add, Edit
	rating: number; // Edit
	status: "Excellent" | "Good" | "Mid" | "Horrible" | "New" | "default"; // Edit
	tastingNotes: string[]; // Add, Edit
	dominantNote:
		| "Fruity"
		| "Nutty"
		| "Floral"
		| "Sweet"
		| "Sour"
		| "Spices"
		| "Roasted"
		| "Green";
	roastLevel: number; // Add, Edit
	origin: string[]; // Add, Edit
	process: "Washed" | "Natural" | "Honey" | "default"; // Add, Edit
	variety: string[]; // Add, Edit
	brand: string; // Add, Edit
	botanic: "Arabica" | "Robusta" | "default"; // Add, Edit
	designation: "Pure Origin" | "Blend" | "default"; // Add, Edit
	flavors: string[]; // Add, Edit
	finished: boolean; // Add(false), Edit
};

export type Brews = {
	id: number;
	bean: string;
	overallRating: string;
	grindSize: string;
	date: Date;
	acidity: string;
	adjustementNeeded: string;
	aftertaste: string;
	bitterness: string;
	mouthfeel: string;
	strength: string;
	machine: string;
	tasteProfiles: Array<string>;
};

export type Machines = {
	id: number;
	name?: string;
	brand?: string;
	type: "Espresso" | "Moka Pot" | "default";
	purchaseDate?: string;
	model?: string;
	induction?: boolean;
	grindRange?: string;
	capacity?: string;
};
