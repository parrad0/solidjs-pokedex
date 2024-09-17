import ImageWithFallback from "@/components/ImageWithFallback";
import PokemonBadge from "@/components/PokemonBadge";
import PokemonEvolutions from "@/components/PokemonEvolutions";
import PokemonSoundButton from "@/components/PokemonSoundButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonWithEvolution } from "@/libs/api";
import { getPokemonIconAndColor } from "@/libs/pokemonUtils";
import { createAsync, useParams } from "@solidjs/router";
import { Show } from "solid-js";

export const route = {
	load: ({ params }: any) => getPokemonWithEvolution(params.id),
};

export default function Page() {
	const params = useParams();
	const pokemon = createAsync(() => getPokemonWithEvolution(params.id));

	return (
		<div class="w-full max-w-5xl mx-auto">
			<Card
				class={`${getPokemonIconAndColor(pokemon()?.types[0]?.type.name || "normal").secondaryColor} overflow-hidden w-full`}
			>
				<CardHeader
					class={`flex flex-col items-center pb-2 rounded-b-full rounded-t-xl pokemon-image-container ${pokemon()?.types[0]?.type.name === "normal" ? "bg-gray-300" : `${getPokemonIconAndColor(pokemon()?.types[0]?.type.name || "normal").color}`}`}
				>
					{pokemon() && (
						<div class={"relative w-[400px] h-[400px] overflow-hidden mb-4 flex items-center justify-center"}>
							<Show when={pokemon()?.id} fallback={<Skeleton class="h-full w-full" />}>
								<ImageWithFallback
									key={pokemon()?.id}
									fallbackSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon()?.id}.png`}
									src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon()?.name}.gif`}
									alt={`${pokemon()?.name} sprite`}
									class="w-1/2 object-contain z-50 relative"
								/>
							</Show>
							<div class="absolute w-full h-full inset-0 flex items-center justify-center opacity-30 z-10">
								<img
									src={
										getPokemonIconAndColor(
											pokemon()?.types[0]?.type.name || "normal",
											{ class: "w-full h-full" },
										).icon
									}
									alt={pokemon()?.types[0]?.type.name || "normal"}
								/>
							</div>
						</div>
					)}
					<h2 class="text-4xl font-bold">{pokemon()?.name}</h2>
					<Show when={pokemon()?.cries?.latest}>
						<PokemonSoundButton pokemon={pokemon} />
					</Show>
					<p class="text-sm text-gray-500">N°{pokemon()?.id}</p>
				</CardHeader>
				<CardContent class="pt-6 space-y-8">
					<section>
						<h3 class="text-xl font-semibold mb-4">About</h3>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Type</h4>
								<div class="flex space-x-2 mt-1">
									{pokemon()?.types.map((type) => (
										<PokemonBadge type={type.type.name} />
									))}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Abilities</h4>
								<div class="flex space-x-2 mt-1">
									{pokemon()?.abilities.map((a) => (
										<Badge class="capitalize">{a.ability.name}</Badge>
									))}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Height</h4>
								<p class="text-md font-bold text-black">
									{(pokemon()?.height ?? 0 / 10).toFixed(1)} m
								</p>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Weight</h4>
								<p class="text-md font-bold text-black">
									{(pokemon()?.weight ?? 0 / 10).toFixed(1)} kg
								</p>
							</div>
						</div>
					</section>

					<section>
						<h3 class="text-xl font-semibold mb-4">Base Stats</h3>
						{pokemon()?.stats?.map((stat) => (
							<div class="mb-4">
								<div class="flex justify-between mb-1">
									<span class="text-sm font-semibold text-gray-700 capitalize flex items-center gap-2">
										{stat.stat.name}
										
									</span>
									<span class="text-sm font-semibold text-gray-700">
										{stat.base_stat}
									</span>
								</div>
								<Progress value={stat.base_stat} class="h-2 bg-blue-200" />
							</div>
						))}
					</section>
					{pokemon()?.evolutionChain ? (
						<PokemonEvolutions
							evolutionChain={pokemon()?.evolutionChain || []}
						/>
					) : null}
				</CardContent>
			</Card>
		</div>
	);
}
