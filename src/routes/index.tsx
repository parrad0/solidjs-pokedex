import Pokedex from "@/components/Pokedex";
import { PokemonContext } from "@/context/PokemonContext";
import { cache } from "@solidjs/router";
import { Suspense, createSignal } from "solid-js";

const getPokemon = cache(async (e: any) => {
	console.log("invoking", e);
	return fetch(`https://pokeapi.co/api/v2/pokemon/${e.params.id}`).then((res) =>
		res.json(),
	);
}, "pokemon");

export const route = {
	load: (e: any) => getPokemon(e),
};

export default function Home() {
	const [selectedType, setSelectedType] = createSignal("");
	const [sortOrder, setSortOrder] = createSignal("id");

	return (
		<main class="overflow-hidden">
			<Suspense fallback={<div>Loading...</div>}>
				<PokemonContext.Provider
					value={{ selectedType, setSelectedType, sortOrder, setSortOrder }}
				>
					<Pokedex />
				</PokemonContext.Provider>
			</Suspense>
		</main>
	);
}
