import { cva } from "class-variance-authority";

export const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-foreground-tag dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			size: {
				default: "h-9 min-w-9 px-2",
				sm: "h-8 min-w-8 px-1.5",
				lg: "h-10 min-w-10 px-2.5",
				huge: "h-16 w-32 min-w-42 px-4 text-xl md:text-2xl",
			},
			variant: {
				default: "bg-transparent",
				green:
					"data-[state=on]:bg-tag-green-900 data-[state=on]:border-tag-green-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-tag-green-900/50 hover:text-accent-foreground bg-tag-green-900/25",
				yellow:
					"data-[state=on]:bg-tag-yellow-900 data-[state=on]:border-tag-yellow-100 data-[state=on]:border border-transparent shadow-xs hover:bg-tag-yellow-900/50 hover:text-accent-foreground bg-tag-yellow-900/25",
				blue: "data-[state=on]:bg-tag-blue-900 data-[state=on]:border-tag-blue-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-tag-blue-900/50 hover:text-accent-foreground bg-tag-blue-900/25",
				red: "data-[state=on]:bg-tag-red-900 data-[state=on]:border-tag-red-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-tag-red-900/50 hover:text-accent-foreground bg-tag-red-900/25",
				purple:
					"data-[state=on]:bg-tag-purple-900 data-[state=on]:border-tag-purple-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-tag-purple-900/50 hover:text-accent-foreground bg-tag-purple-900/25",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
