import type { State } from "./state.ts";

export async function commandCatch(state: State, name: string): Promise<void> {
    const pokeAPI = state.pokeAPI;
    const pokedex = state.pokedex;
    const rl = state.readlineInterface;
    
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await pokeAPI.fetchPokemon(name);
    const catchIndex = pokemon.base_experience
    const catchThreshold = catchIndex - catchIndex * 0.35;

    const diceRoll = Math.random() * catchIndex;
    const isCatched = diceRoll > catchThreshold;
    if (isCatched) {
        pokedex[name] = pokemon;
        console.log(`${name} was cought!`);
        console.log(`You may now inspect itwith the inspect command.`)
    } else {
        console.log(`${name} escaped!`);
    }

    rl.prompt();
}