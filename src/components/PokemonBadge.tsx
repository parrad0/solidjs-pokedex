import { getPokemonIconAndColor } from "@/libs/pokemonUtils";

const PokemonBadge = ({ type }: { type: string }) => {
	const typeIcon = getPokemonIconAndColor(type);
	return (
		<div
			class={`${typeIcon?.color} text-white px-3 py-1 rounded-full flex items-center text-sm w-max`}
		>
			<div class="flex items-center justify-center w-4 h-4">
				<img src={typeIcon?.icon} alt={type} />
			</div>
			<p class="ml-2">{type}</p>
		</div>
	);
};

export default PokemonBadge;
