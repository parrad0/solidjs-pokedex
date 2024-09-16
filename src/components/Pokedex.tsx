import { fetchPokemonTypes, fetchPokemons } from "@/libs/api";
import type { PokemonListItem } from "@/types/pokemon";
import { createInfiniteScroll } from "@solid-primitives/pagination";
import {
	type Accessor,
	For,
	Show,
	createResource,
	createSignal,
} from "solid-js";
import PokedexBottom from "./PokedexBottom";
import PokemonCard, { SkeletonCard } from "./PokemonCard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function Pokedex() {
	const [types] = createResource(fetchPokemonTypes);
	const [selectedType, setSelectedType] = createSignal("");
	const [pages, setEl, { end, setPage, setEnd, setPages }] =
		createInfiniteScroll((page) => fetchPokemons(page, selectedType()));

	return (
		<div class="flex flex-col h-screen overflow-hidden">
			<div class="w-full max-w-7xl mx-auto bg-red-400 border-4 border-black p-4 flex-grow overflow-hidden">
				<div class="mb-2 flex justify-start items-center gap-4 flex-grow">
					<div class="bg-blue-500 rounded-full w-14 h-14 text-white border-4 border-black" />
					<h1 class="text-3xl text-black font-bold uppercase py-4 text-left font-outline-2 flex-grow">
						Pokedex
					</h1>
				</div>
				<div class="flex gap-2 py-4">
					<Select
						class="bg-yellow-300 rounded-md"
						options={types()?.map((type: any) => type.name) || []}
						placeholder="Type"
						itemComponent={(props: any) => (
							<SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
						)}
						onChange={(value: any) => {
							setSelectedType(value);
							setPage(0);
							setEnd(false);
							setPages([]);
						}}
					>
						<SelectTrigger class="w-[180px]">
							<SelectValue<string>>
								{(state: any) => state.selectedOption() || "All"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				</div>
				<div
					id="pokemon-grid"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 bg-green-500 border-4 border-black p-4 rounded-md max-h-[70vh] overflow-y-auto"
				>
					<For each={pages()}>
						{(pokemon: PokemonListItem) => (
							<PokemonCard pokemonUrl={pokemon.url} />
						)}
					</For>
					<Show when={!end()}>
						{Array(6)
							.fill(0)
							.map(() => (
								<SkeletonCard />
							))}
						<div ref={(el) => setEl(el, end as Accessor<true>)} />
					</Show>
				</div>
				<PokedexBottom />
			</div>
		</div>
	);
}
