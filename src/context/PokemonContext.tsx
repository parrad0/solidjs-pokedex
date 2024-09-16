import { createContext, createSignal } from "solid-js";

const [selectedType, setSelectedType] = createSignal<string>("");
const [sortOrder, setSortOrder] = createSignal<string>("");

export const PokemonContext = createContext<{
	selectedType: () => string;
	setSelectedType: (type: string) => void;
	sortOrder: () => string;
	setSortOrder: (order: string) => void;
}>();
