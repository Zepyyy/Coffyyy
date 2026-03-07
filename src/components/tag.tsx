import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const colorVariant = cva(
	"cursor-pointer flex items-center text-xs md:text-sm font-semibold tracking-tight px-2 py-1 rounded-sm",
	{
		variants: {
			variant: {
				greenColored:
					"bg-new-green-900 border-new-green-100 border shadow-xs hover:bg-new-green-900/50 hover:text-accent-foreground text-white",
				yellowColored:
					"bg-new-yellow-900 border-new-yellow-100 border shadow-xs hover:bg-new-yellow-900/50 hover:text-accent-foreground text-white",
				blueColored:
					"bg-new-blue-900 border-new-blue-100 border shadow-xs hover:bg-new-blue-900/50 hover:text-accent-foreground text-white",
				redColored:
					"bg-new-red-900 border-new-red-100 border shadow-xs hover:bg-new-red-900/50 hover:text-accent-foreground text-white",
				light:
					"border-1 border-primary border-dashed bg-transparent text-accent-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				default:
					"bg-background/80 border-background/80 text-accent-foreground hover:bg-background/50 hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface TagProps
	extends React.ComponentProps<"p">,
		VariantProps<typeof colorVariant> {
	text?: string;
}

export default function Tag({ className, variant, text, ...props }: TagProps) {
	return (
		<p className={clsx(colorVariant({ variant, className }))} {...props}>
			<span>{text ?? "tag"}</span>
		</p>
	);
}
