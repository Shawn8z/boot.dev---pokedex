import type { State } from "./state.js";

export function commandPokedex(state: State): void {
    const pokedex = state.pokedex;
    console.log("Your Pokedex:");
    for (const pokemon in pokedex) {
        console.log(` - ${pokemon}`);
    }
}