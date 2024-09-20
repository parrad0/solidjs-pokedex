import Div100vh from "@/components/Div100";
import Pokedex from "@/components/Pokedex";
import { Meta } from "@solidjs/meta";
import { Suspense } from "solid-js";


export default function Home() {
	return (
		<div>
			<Meta property="og:image:height" content="600" />
			<Meta property="og:image:width" content="1200" />
			<Meta property="og:image:alt" content="Pokedex" />
			<Meta property="og:description" content="Explore the SolidStart Pokedex, where you can find information about your favorite Pokémon." />
			<Meta property="og:image:type" content="image/png" />
			<Meta property="og:image:url" content="https://solidjs-pokedex.vercel.app/og.png" />
			<Meta property="og:site_name" content="Pokedex" />
			<Div100vh>
				<main class="overflow-hidden h-screen">
					<Suspense fallback={<div>Loading...</div>}>
						<Pokedex />
					</Suspense>
				</main>
			</Div100vh>
		</div>
	);
}
