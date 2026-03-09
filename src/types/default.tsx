export type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export type Beans = {
	id?: number;
	brand?: string;
	botanic?: string;
	city?: Array<string>;
	dominantNote?: string;
	finished?: boolean;
	flavors?: Array<string>;
	name?: string;
	origin?: Array<string>;
	roastLevel?: number;
	tastingNotes?: Array<string>;
	variety?: Array<string>;
};

export type Brews = {
	id?: number;
	bean?: string;
	overallRating?: string;
	grindSize?: string;
	date?: string;
	acidity?: string;
	adjustementNeeded?: string;
	aftertaste?: string;
	bitterness?: string;
	mouthfeel?: string;
	strength?: string;
	type?: string;
	tasteProfiles?: Array<string>;
};

export type Machines = {
	id?: number;
	name?: string;
	brand?: string;
	type?: string;
	purchaseDate?: string;
	model?: string;
	induction?: boolean;
	grindRange?: string;
	capacity?: string;
};
