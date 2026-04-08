import type { BeanCardProps } from "./BeanTypes";
import type { MachineCardProps } from "./MachineTypes";

export type Brews = {
	id: number;
	beanWeight: number;
	espressoWeight: number;
	extractionTime: string | undefined;
	flow: string | undefined;
	overallRating: number;
	grindSize: string;
	date: Date;
	beanId: number | undefined;
	machineId: number | undefined;
};

export type BrewForm = {
	beanId: number | undefined;
	machineId: number | undefined;
	beanWeight: number;
	espressoWeight: number;
	extractionTime: string;
	flow: string;
	overallRating: "Excellent" | "Good" | "Mid" | "Horrible" | "Burnt" | "";
	grindSize: string;
	date: Date;
};

export type BrewSuggestions = {
	bean: Array<BeanCardProps>;
	machine: Array<MachineCardProps>;
};
