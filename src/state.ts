import readline from "node:readline";
import process from "node:process";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import type { Interface } from "node:readline";
import type { Pokemon } from "./pokeapi.js";

export type State = {
	pokeAPI: PokeAPI;
	nextLocationsURL: string,
	prevLocationsURL: string | null,
	readlineInterface: Interface;
	commandsRegistry: Record<string, CLICommand>;
	pokedex: Record<string, Pokemon>;
}

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void> | void;
}


export async function initState(): Promise<State> {
	const readlineInstance: Interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});
	const commands: Record<string, CLICommand> = getCommands();

	const poke = await new PokeAPI();

	const initialState: State = {
		pokeAPI: poke,
		nextLocationsURL: "",
		prevLocationsURL: "",
		readlineInterface: readlineInstance,
		commandsRegistry: commands,
		pokedex: {},
	}
	
	return initialState;
}
	
