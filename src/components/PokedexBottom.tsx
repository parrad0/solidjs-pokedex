import { ChevronUp, GithubIcon } from "lucide-solid";

export default function PokedexBottom() {
	const scrollToTop = () => {
		const pokemonGrid = document.getElementById("pokemon-grid");
		if (pokemonGrid) {
			pokemonGrid.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<div class="w-full max-w-7xl mx-auto bg-red-400 rounded-b-lg overflow-hidden">
			<div class="bg-red-400 p-4 flex justify-between items-center">
				<div class="flex space-x-3">
					<div class="w-5 h-5 bg-red-700 rounded-full" />
					<div class="w-5 h-5 bg-yellow-400 rounded-full" />
					<div class="w-5 h-5 bg-green-400 rounded-full" />
				</div>
				<div
					class="w-20 h-5 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition-colors flex items-center justify-center"
					onClick={scrollToTop}
				>
					<ChevronUp class="w-4 h-4 text-gray-500" />
				</div>
				<div class="flex space-x-2">
					<div class="w-8 h-8 bg-black rounded-full flex items-center justify-center" onClick={() => window.open("https://github.com/parrad0/solidjs-pokedex", "_blank")}>
						<GithubIcon class="w-4 h-4 text-white" />
					</div>
				</div>
			</div>
		</div>
	);
}
