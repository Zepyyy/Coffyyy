export type Beans = {
	id: number;
	name: string;
	rating: number;
	status: "Excellent" | "Good" | "Mid" | "Horrible" | "New" | "default";
	tastingNotes: string[];
	dominantNote:
		| "Fruity"
		| "Nutty"
		| "Floral"
		| "Sweet"
		| "Sour"
		| "Spices"
		| "Roasted"
		| "Green";
	roastLevel: number;
	origin: string[];
	process: string[];
	variety: string[];
	brand: string;
	botanic: "Arabica" | "Robusta" | "default";
	designation: "Pure Origin" | "Blend" | "default";
	flavors: string[];
	finished: boolean;
};
export type BeanCardProps = {
	name: string;
	origin: string[];
	dominantNote: Beans["dominantNote"];
	selected: boolean;
};

export type MultiTagInputProps = {
	name: string;
	tastingNotes: Beans["tastingNotes"];
};
