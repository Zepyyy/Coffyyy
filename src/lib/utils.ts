import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Beans } from "@/types/BeanTypes";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const colorSwatch: Partial<
	Record<
		Beans["dominantNote"],
		{
			bgColor: string;
			secondaryBgColor: string;
			textColor: string;
			secondaryTextColor: string;
		}
	>
> = {
	Fruity: {
		bgColor: "bg-tag-teal-900",
		secondaryBgColor: "bg-tag-teal-900 dark:bg-tag-teal-100",
		textColor: "text-tag-teal-100",
		secondaryTextColor: "text-tag-teal-100/75",
	},
	Nutty: {
		bgColor: "bg-tag-red-900",
		secondaryBgColor: "bg-tag-red-900 dark:bg-tag-red-100",
		textColor: "text-tag-red-100",
		secondaryTextColor: "text-tag-red-100/75",
	},
	Floral: {
		bgColor: "bg-tag-blue-900",
		secondaryBgColor: "bg-tag-blue-900 dark:bg-tag-blue-100",
		textColor: "text-tag-blue-100",
		secondaryTextColor: "text-tag-blue-100/75",
	},
	Green: {
		bgColor: "bg-tag-green-900",
		secondaryBgColor: "bg-tag-green-900 dark:bg-tag-green-100",
		textColor: "text-tag-green-100",
		secondaryTextColor: "text-tag-green-100/75",
	},
	Roasted: {
		bgColor: "bg-tag-yellow-900",
		secondaryBgColor: "bg-tag-yellow-900 dark:bg-tag-yellow-100",
		textColor: "text-tag-yellow-100",
		secondaryTextColor: "text-tag-yellow-100/75",
	},
	Sour: {
		bgColor: "bg-tag-orange-900",
		secondaryBgColor: "bg-tag-orange-900 dark:bg-tag-orange-100",
		textColor: "text-tag-orange-100",
		secondaryTextColor: "text-tag-orange-100/75",
	},
	Spices: {
		bgColor: "bg-tag-purple-900",
		secondaryBgColor: "bg-tag-purple-900 dark:bg-tag-purple-100",
		textColor: "text-tag-purple-100",
		secondaryTextColor: "text-tag-purple-100/75",
	},
	Sweet: {
		bgColor: "bg-tag-yellow-900",
		secondaryBgColor: "bg-tag-yellow-900 dark:bg-tag-yellow-100",
		textColor: "text-tag-yellow-100",
		secondaryTextColor: "text-tag-yellow-100/75",
	},
};
