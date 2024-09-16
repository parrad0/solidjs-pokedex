import PokemonBadge from "@/components/PokemonBadge";
import PokemonEvolutions from "@/components/PokemonEvolutions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPokemonWithEvolution } from "@/libs/api";
import { getPokemonIconAndColor } from "@/libs/pokemonUtils";
import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";

export const route = {
	load: ({ params }: any) => getPokemonWithEvolution(params.id),
};

export default function Page() {
	const params = useParams();
	const [pokemon] = createResource(() => getPokemonWithEvolution(params.id));

	return (
		<div class="w-full max-w-5xl mx-auto">
			<Card
				class={`${getPokemonIconAndColor(pokemon()?.pokemon.types[0]?.type.name || "normal").secondaryColor} overflow-hidden w-full`}
			>
				<CardHeader
					class={`flex flex-col items-center pb-2 rounded-b-full rounded-t-xl pokemon-image-container ${pokemon()?.pokemon.types[0]?.type.name === "normal" ? "bg-gray-300" : `${getPokemonIconAndColor(pokemon()?.pokemon.types[0]?.type.name || "normal").color}`}`}
				>
					{pokemon() && (
						<div class={"relative w-[400px] h-[400px] overflow-hidden mb-4"}>
							<img
								src={pokemon()?.pokemon.sprites.front_default}
								alt={pokemon()?.pokemon.name}
								class="w-full h-full object-contain relative z-20"
								onload={(e) => {
									const img = e.target as HTMLImageElement;
									const pokemonName = pokemon()?.pokemon.name.toLowerCase();
									const gifUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonName}.gif`;

									fetch(gifUrl, { method: "HEAD" })
										.then((res) => {
											console.log("Respuesta de fetch:", res.status, res.ok);
											if (res.ok) {
												console.log("GIF encontrado, cambiando imagen");
												img.src = gifUrl;
											} else {
												console.log(
													"GIF no encontrado, manteniendo imagen original",
												);
											}
										})
										.catch((error) => {
											console.error("Error al verificar el GIF:", error);
										});
								}}
							/>
							<div class="absolute w-full h-full inset-0 flex items-center justify-center opacity-30 z-10">
								<img
									src={
										getPokemonIconAndColor(
											pokemon()?.pokemon.types[0]?.type.name || "normal",
											{ class: "w-full h-full" },
										).icon
									}
									alt={pokemon()?.pokemon.types[0]?.type.name || "normal"}
								/>
							</div>
						</div>
					)}
					<h2 class="text-4xl font-bold">{pokemon()?.pokemon.name}</h2>
					<p class="text-sm text-gray-500">N°{pokemon()?.pokemon.id}</p>
				</CardHeader>
				<CardContent class="pt-6 space-y-8">
					<section>
						<h3 class="text-xl font-semibold mb-4">About</h3>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Type</h4>
								<div class="flex space-x-2 mt-1">
									{pokemon()?.pokemon.types.map((type) => (
										<PokemonBadge type={type.type.name} />
									))}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Abilities</h4>
								<div class="flex space-x-2 mt-1">
									{pokemon()?.pokemon.abilities.map((a) => (
										<Badge class="capitalize">{a.ability.name}</Badge>
									))}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Height</h4>
								<p class="text-md font-bold text-black">
									{(pokemon()?.pokemon.height ?? 0 / 10).toFixed(1)} m
								</p>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-gray-500">Weight</h4>
								<p class="text-md font-bold text-black">
									{(pokemon()?.pokemon.weight ?? 0 / 10).toFixed(1)} kg
								</p>
							</div>
						</div>
					</section>

					<section>
						<h3 class="text-xl font-semibold mb-4">Base Stats</h3>
						{pokemon()?.pokemon.stats?.map((stat) => (
							<div class="mb-4">
								<div class="flex justify-between mb-1">
									<span class="text-sm font-semibold text-gray-700 capitalize">
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
