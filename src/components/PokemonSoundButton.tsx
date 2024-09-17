import { AudioLines, Loader2 } from "lucide-solid";
import { createSignal } from "solid-js";
import { Button } from "./ui/button";

const PokemonSoundButton = ({ url }: { url: string }) => {
	const [isLoading, setIsLoading] = createSignal(false);

	const playSound = async (e: Event) => {
		e.preventDefault();
		setIsLoading(true);
		const audio = new Audio(url);
		await audio.play();
		setIsLoading(false);
	};

	return (
		<Button 
			class="rounded-full w-6 h-6 p-0 flex items-center justify-center" 
			onClick={playSound} 
			disabled={isLoading()}
		>
			{isLoading() ? (
				<Loader2 class="w-2 h-2 animate-spin" />
			) : (
				<AudioLines class="w-4 h-4" />
			)}
		</Button>
	);
};

export default PokemonSoundButton;
