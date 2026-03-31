export type Machines = {
	id: number;
	name: string;
	brand: string;
	type: string;
	purchaseDate: string;
	model: string;
	grindRange: string;
	capacity: string;
};

export type MachineForm = {
	name: string;
	brand: string;
	model: string;
	type: string;
	grindRange: string;
	capacity: string;
	purchaseDate: string;
};

export type MachineSuggestions = {
	names: Array<string>;
	brands: Array<string>;
	models: Array<string>;
	types: Array<string>;
	grindRanges: Array<string>;
	capacities: Array<string>;
};
