import { AudioLines, Loader2 } from "lucide-solid";
import { Accessor, createSignal } from "solid-js";
import { Button } from "./ui/button";

const PokemonSoundButton = ({ pokemon }: { pokemon: Accessor<any> }) => {
    const [isLoading, setIsLoading] = createSignal(false);

    const playSound = async (e: Event) => {
        e.preventDefault();
        if (!pokemon) return;
        setIsLoading(true);
        try {
            const audio = new Audio(pokemon().cries.latest);
            await audio.play();
        } catch (error) {
            console.error("Error al reproducir el sonido:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            class="rounded-full w-6 h-6 p-0 flex items-center justify-center" 
            onClick={playSound} 
            disabled={!pokemon || isLoading()}
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