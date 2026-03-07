import { ArrowRight, PlusIcon } from "lucide-react";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Tests() {
	return (
		<div>
			<h1>Tests</h1>
			<div className="relative overflow-hidden min-h-[clamp(10rem,24vh,16rem)] rounded-2xl border border-border bg-background px-6 py-5 flex justify-center items-start transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
				<div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent transition-colors" />
				<p className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl md:text-4xl font-semibold tracking-tight">
					<ArrowRight
						size={48}
						className="group-hover:scale-[1.2] transition-transform ease-out duration-200"
					/>
				</p>
				<div className="relative z-10 flex flex-col items-center h-full gap-4">
					<div className="flex flex-row gap-4">
						<h2>tags</h2>
						<Tag variant="yellowColored" text="yellow" />
						<Tag variant="blueColored" text="blue" />
						<Tag variant="greenColored" text="green" />
						<Tag variant="redColored" text="red" />
						<Tag text="default" />
						<Tag variant="light" text="light" />
					</div>
					<div className="relative z-10 flex h-full gap-4">
						<h2>togglegroup</h2>
						<ToggleGroup
							type="multiple"
							size="sm"
							defaultValue={["top"]}
							spacing={2}
						>
							<ToggleGroupItem
								value="top"
								aria-label="Toggle top"
								color="yellowColored"
							>
								banan
							</ToggleGroupItem>
							<ToggleGroupItem
								value="bottom"
								aria-label="Toggle bottom"
								color="greenColored"
							>
								matha
							</ToggleGroupItem>
							<ToggleGroupItem
								value="left"
								aria-label="Toggle left"
								color="redColored"
							>
								appel
							</ToggleGroupItem>
							<ToggleGroupItem
								value="right"
								aria-label="Toggle right"
								color="blueColored"
							>
								blueber
							</ToggleGroupItem>
							<ToggleGroupItem
								value="roast"
								aria-label="Toggle right"
								color="blueColored"
							>
								blueber2
							</ToggleGroupItem>
							<Button
								variant={"add"}
								aria-label="Toggle right"
								color="blueColored"
								size="xs"
								onClick={() =>
									console.log("this one is fake, and it adds a tag. WIP")
								}
							>
								<PlusIcon />
							</Button>
						</ToggleGroup>
					</div>
				</div>
			</div>
		</div>
	);
}
