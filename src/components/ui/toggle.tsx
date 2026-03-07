import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 min-w-9 px-2",
				sm: "h-8 min-w-8 px-1.5",
				lg: "h-10 min-w-10 px-2.5",
			},
			color: {
				default: "bg-transparent",
				greenColored:
					"data-[state=on]:bg-new-green-900 data-[state=on]:border-new-green-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-new-green-900/50 hover:text-accent-foreground bg-new-green-900/25 data-[state=on]:text-white",
				yellowColored:
					"data-[state=on]:bg-new-yellow-900 data-[state=on]:border-new-yellow-100 data-[state=on]:border border-transparent shadow-xs hover:bg-new-yellow-900/50 hover:text-accent-foreground bg-new-yellow-900/25 data-[state=on]:text-white",
				blueColored:
					"data-[state=on]:bg-new-blue-900 data-[state=on]:border-new-blue-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-new-blue-900/50 hover:text-accent-foreground bg-new-blue-900/25 data-[state=on]:text-white",
				redColored:
					"data-[state=on]:bg-new-red-900 data-[state=on]:border-new-red-100 data-[state=on]:border data-[state=off]:border-transparent border-transparent shadow-xs hover:bg-new-red-900/50 hover:text-accent-foreground bg-new-red-900/25 data-[state=on]:text-white",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			color: "default",
		},
	},
);

function Toggle({
	className,
	variant,
	size,
	color,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, color, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
