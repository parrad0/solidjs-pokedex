import type {
	PokemonDetails,
	PokemonListItem,
	PokemonType,
} from "@/types/pokemon";
import type { Evolution } from "@/types/pokemon";
import { cache } from "@solidjs/router";

export const fetchPokemons = cache(
	async (page: number, type: string): Promise<PokemonListItem[]> => {
		"use server";
		const url = type
			? `https://pokeapi.co/api/v2/type/${type}?limit=12&offset=${page * 12}`
			: `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * 12}`;

		const response = await fetch(url);
		const data = await response.json();

		if (type) {
			return data.pokemon.map((p: any) => p.pokemon);
		}
		return data.results;
	}, "pokemons");

export const fetchPokemonTypes = cache(async () => {
	"use server";
	const response = await fetch("https://pokeapi.co/api/v2/type");
	const data = await response.json();
	return data.results as PokemonType[];
}, "types");

export const fetchPokemonDetails = cache(
	async (url: string): Promise<PokemonDetails | null> => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error fetching pokemon details from ${url}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error in fetchPokemonDetails:", error);
			return null;
		}
	}, "pokemon");

export const getPokemonWithEvolution = cache(
	async (
		id: string | number
	): Promise<PokemonDetails & { evolutionChain: Record<number, Evolution[]> } | null> => {
		"use server";
		try {
			const pokemonResponse = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			if (!pokemonResponse.ok) {
				throw new Error(`Error fetching pokemon with ID ${id}`);
			}
			const pokemonData: PokemonDetails = await pokemonResponse.json();

			const speciesResponse = await fetch(pokemonData.species.url);
			if (!speciesResponse.ok) {
				throw new Error(
					`Error fetching species for pokemon with ID ${id}`
				);
			}
			const speciesData = await speciesResponse.json();

			const evolutionResponse = await fetch(speciesData.evolution_chain.url);
			if (!evolutionResponse.ok) {
				throw new Error(
					`Error fetching evolution chain for pokemon with ID ${id}`
				);
			}
			const evolutionData = await evolutionResponse.json();

			const getAllEvolutions = async (
				chain: any,
				level = 0
			): Promise<Evolution[]> => {
				const pokemonName = chain.species.name;
				const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
				const pokemonDetails = await fetchPokemonDetails(pokemonUrl);

				if (!pokemonDetails) {
					throw new Error(
						`Error fetching pokemon details for ${pokemonName}`
					);
				}

				const types = Array.isArray(pokemonDetails.types)
					? pokemonDetails.types.map((typeInfo: any) => typeInfo.type.name)
					: [];

				const evolution: Evolution = {
					name: pokemonName,
					number: pokemonDetails.id.toString(),
					types: types,
					level: level,
					image: pokemonDetails.sprites.front_default,
				};

				let evolutions: Evolution[] = [evolution];

				if (chain.evolves_to && chain.evolves_to.length > 0) {
					for (const evo of chain.evolves_to) {
						const evoDetails = evo.evolution_details[0];
						const evoLevel = evoDetails ? evoDetails.min_level || 1 : 1;
						const childEvolutions = await getAllEvolutions(evo, evoLevel);
						evolutions = evolutions.concat(childEvolutions);
					}
				}
				return evolutions;
			};

			const evolutionChainArray = await getAllEvolutions(evolutionData.chain);

			const evolutionChainStructured: Record<number, Evolution[]> = {};

			evolutionChainArray.forEach((evolution) => {
				const nivel = evolution.level;
				if (!evolutionChainStructured[nivel]) {
					evolutionChainStructured[nivel] = [];
				}
				evolutionChainStructured[nivel].push(evolution);
			});

			const response = {
				...pokemonData,
				evolutionChain: evolutionChainStructured,
			};
			return response;
		} catch (error) {
			console.error("Error in getPokemonWithEvolution:", error);
			return null;
		}
	},
	"evolution");
