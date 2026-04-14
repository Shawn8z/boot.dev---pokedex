import type { State } from "./state.ts";

export async function commandExplore(state: State, location: string): Promise<void> {
    const rl = state.readlineInterface;
    const poke = state.pokeAPI;

    if (location === undefined) {
        console.log("Requre a location");
        return;
    }
    
    if (location) {
        const res = await poke.fetchLocation(location);
        console.log();
        console.log(`Exploring ${location}...`);
        console.log("Found Pokemon:");
        for (const item of res.pokemon_encounters) {
            console.log(` - ${item.pokemon.name}`);
        }
    }

    rl.prompt();
}