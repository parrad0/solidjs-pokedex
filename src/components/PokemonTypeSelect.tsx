import { PokemonContext } from "@/context/PokemonContext";
import type { PokemonType } from "@/types/pokemon";
import { type Resource, useContext } from "solid-js";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function PokemonTypeSelect({
	types,
}: { types: Resource<PokemonType[]> }) {
	const context = useContext(PokemonContext);
	if (!context) {
		throw new Error(
			"usePokemonContext must be used within a PokemonContextProvider",
		);
	}
	const { setSelectedType } = context;

	return (
		<Select
			class="bg-yellow-300 rounded-md"
			options={types()?.map((type) => type.name) || []}
			placeholder="Type"
			itemComponent={(props: any) => (
				<SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
			)}
			onChange={(value: any) => {
				setSelectedType(value);
			}}
		>
			<SelectTrigger class="w-[180px]">
				<SelectValue<string>>
					{(state: any) => state.selectedOption() || "All"}
				</SelectValue>
			</SelectTrigger>
			<SelectContent />
		</Select>
	);
}
