import { stat } from "node:fs";
import type { State } from "./state.js";

export function commandInspect(state: State, name: string): void {
    const pokedex = state.pokedex;
    const pokemon = pokedex[name];
    
    if (pokemon === undefined) {
        console.log(`You haven't cought ${name} yet.`);
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const item of pokemon.stats) {
        const statName = item.stat.name;
        const statVal = item.base_stat;
        console.log(` -${statName}: ${statVal}`);
    }
    console.log("Types:");
    for (const item of pokemon.types) {
        console.log(` -${item.type.name}`);
    }
}