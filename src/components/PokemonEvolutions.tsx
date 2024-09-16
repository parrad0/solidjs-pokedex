import { getPokemonIconAndColor } from "@/libs/pokemonUtils";
import type { Evolution } from "@/types/pokemon";
import { A } from "@solidjs/router";
import { ChevronDown } from "lucide-solid";
import { Show, Suspense } from "solid-js";
import PokemonBadge from "./PokemonBadge";

const PokemonDetails = ({ pokemon }: { pokemon: Evolution }) => {
	return (
		<A href={`/pokemon/${pokemon.number}`} end class="block">
			<div class="space-y-4">
				<div
					class={`flex items-center ${getPokemonIconAndColor(pokemon.types[0]).color} p-4 rounded-lg`}
				>
					<div class="relative w-20 h-20 mr-4 rounded-md flex items-center justify-center overflow-hidden">
						<img
							src={pokemon.image}
							alt={pokemon.name}
							class="w-full h-full object-contain relative z-20"
							onload={(e) => {
								const gifUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name.toLowerCase()}.gif`;
								fetch(gifUrl, { method: "HEAD" }).then((res) => {
									if (res.ok) {
										(e.target as HTMLImageElement).src = gifUrl;
									}
								});
							}}
						/>
						<div class="absolute inset-0">
							<img
								src={getPokemonIconAndColor(pokemon.types[0]).icon}
								alt={pokemon.types[0]}
								class="w-full h-full opacity-40 object-contain z-10"
							/>
						</div>
					</div>
					<div>
						<h4 class="text-xl font-bold">{pokemon.name}</h4>
						<p class="text-gray-600">N°{pokemon.number}</p>
						<p class="text-gray-600">Level: {pokemon.level}</p>

						<div class="flex space-x-2 mt-2">
							{pokemon.types.map((type: string) => (
								<PokemonBadge type={type} />
							))}
						</div>
					</div>
				</div>
			</div>
		</A>
	);
};

const PokemonEvolutions = ({
	evolutionChain,
}: { evolutionChain: Evolution[] }) => {
	return (
		<section>
			<h3 class="text-xl font-semibold mb-4">Cadena de Evolución</h3>
			<div class="space-y-8">
				<Show when={evolutionChain}>
					{evolutionChain.map((evolution: Evolution, index: number) => (
						<div>
							{index > 0 && (
								<div class="w-full py-2 flex items-center justify-center text-blue-500 font-bold text-xl">
									<ChevronDown class="w-10 h-10" /> Level {evolution.level}
								</div>
							)}
							<PokemonDetails pokemon={evolution} />
						</div>
					))}
				</Show>
			</div>
		</section>
	);
};

export default PokemonEvolutions;
