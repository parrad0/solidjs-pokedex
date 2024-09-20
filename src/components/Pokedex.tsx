import { fetchPokemons, fetchPokemonTypes } from "@/libs/api";
import { PokemonListItem, PokemonType } from "@/types/pokemon";
import { createInfiniteScroll } from "@solid-primitives/pagination";
import { Accessor, createResource, createSignal, For, Show } from "solid-js";
import PokedexBottom from "./PokedexBottom";
import PokemonCard, { SkeletonCard } from "./PokemonCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { createAsync } from "@solidjs/router";


export default function Pokedex() {
  const types = createAsync(() => fetchPokemonTypes());
  const [selectedType, setSelectedType] = createSignal("");
  const [pages, setEl, { end, setPage, setEnd, setPages }] = createInfiniteScroll((page) => fetchPokemons(page, selectedType()));

  return (
    <div class="h-screen flex flex-col overflow-hidden bg-red-100 max-w-7xl mx-auto bg-red-400 border-4 border-black p-4">
        <div class="h-18 flex-shrink-0">
          <div class="flex justify-start items-center gap-2 flex-grow">
            <div class="relative w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-blue-300 flex items-center justify-center">
              <img src="https://avatars.githubusercontent.com/u/79226042?s=280&v=4" alt="Avatar" class="absolute w-1/2 h-full object-contain" />
            </div>
            <h1 class="text-2xl text-white font-bold uppercase py-2 text-left flex-grow">Pokedex</h1>
          </div>
          <div class="flex gap-2 py-2">
            <Select
              class="bg-yellow-300 rounded-md"
              options={types()?.map((type: any) => type.name) || []}
              placeholder="Type"
              itemComponent={(props: any) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
              onChange={(value: any) => {
                setSelectedType(value);
                setPage(0);
                setEnd(false);
                setPages([]);
              }}
            >
              <SelectTrigger class="w-[180px]">
                <SelectValue<string>>{(state: any) => state.selectedOption() || "All"}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        </div>
        <div
          id="pokemon-grid"
          class="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 bg-green-400 border-4 border-black p-4 rounded-md"
        >
          <For each={pages()}>{(pokemon: PokemonListItem) => (
            <PokemonCard pokemonUrl={pokemon.url} />
          )}</For>
          <Show when={!end()}>
            {Array(2).fill(0).map(() => (
              <SkeletonCard />
            ))}
            <div ref={(el) => setEl(el, end as Accessor<true>)}></div>
          </Show>
        </div>
        <PokedexBottom class="h-14 flex-shrink-0" />
    </div>
  );
}