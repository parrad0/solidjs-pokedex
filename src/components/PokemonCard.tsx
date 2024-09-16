import { fetchPokemonDetails } from "@/libs/api";
import { getPokemonIconAndColor } from "@/libs/pokemonUtils";
import { Suspense, createResource } from "solid-js";
import PokemonBadge from "./PokemonBadge";
import { Skeleton } from "./ui/skeleton";

export const SkeletonCard = () => {
	return (
		<div class="bg-white rounded-2xl p-4 flex h-full">
			<div class="flex-1 pr-4">
				<Skeleton class="h-4 w-[100px] mb-1" />
				<Skeleton class="h-8 w-[200px] mb-4" />
				<div class="flex flex-col space-y-2">
					<Skeleton class="h-4 w-[100px]" />
					<Skeleton class="h-4 w-[100px]" />
				</div>
			</div>
			<div class="w-1/2 relative">
				<Skeleton class="h-full w-full rounded-2xl" />
			</div>
		</div>
	);
};

export default function PokemonCard({ pokemonUrl }: { pokemonUrl: string }) {
	const [pokemon] = createResource(() => fetchPokemonDetails(pokemonUrl));

	return (
		<Suspense fallback={<SkeletonCard />}>
			<a
				href={`/pokemon/${pokemon()?.id}`}
				class={"w-full max-w-md rounded-3xl p-4 shadow-lg text-left"}
			>
				<div class="bg-white rounded-2xl p-4 flex h-full">
					<div class="flex-1 pr-4">
						<div class="text-gray-400 text-sm mb-1">
							N°{pokemon()?.id?.toString().padStart(3, "0")}
						</div>
						<div class="text-3xl font-bold mb-4">{pokemon()?.name}</div>
						<div class="flex flex-col space-y-2">
							{pokemon()?.types?.map((type: any) => {
								return <PokemonBadge type={type.type.name} />;
							})}
						</div>
					</div>
					<div class="w-1/2 relative">
						<div class={"absolute inset-0  rounded-2xl overflow-hidden"}>
							<div class="absolute w-full h-full flex items-center justify-center">
								<img
									src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon()?.name}.gif`}
									alt={`${pokemon()?.name} sprite`}
									class="w-full h-full object-contain z-50"
								/>
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="w-full h-full opacity-20 z-50 flex items-center justify-center">
										<img
											src={
												getPokemonIconAndColor(
													pokemon()?.types[0]?.type.name || "normal",
												)?.icon ?? ""
											}
											class="w-full h-full object-contain z-50"
											alt="Electric"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Suspense>
	);
}
