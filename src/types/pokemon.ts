export type PokemonListItem = {
	name: string;
	url: string;
};

export type PokemonDetails = {
	species: any;
	id: number;
	name: string;
	abilities: {
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}[];
	base_experience: number;
	cries: {
		latest: string;
		legacy: string;
	};
	forms: {
		name: string;
		url: string;
	}[];
	game_indices: {
		game_index: number;
		version: {
			name: string;
			url: string;
		};
	}[];
	height: number;
	held_items: any[]; // Puedes definir un tipo más específico si es necesario
	is_default: boolean;
	location_area_encounters: string;
	moves: {
		move: {
			name: string;
			url: string;
		};
		version_group_details: {
			level_learned_at: number;
			move_learn_method: {
				name: string;
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}[];
	}[];
	sprites: {
		back_default: string;
		back_shiny: string;
		front_default: string;
		front_shiny: string;
		// ... otros sprites si es necesario
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}[];
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}[];
	weight: number;
};

export type PokemonType = {
	name: string;
	url: string;
};

export interface Evolution {
	name: string;
	number: string;
	types: string[]; // Puedes ajustar este campo según cómo obtengas los tipos
	level: number;
	image: string;
}
