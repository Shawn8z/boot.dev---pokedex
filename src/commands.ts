import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
	return {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		catch: {
			name: "catch",
			description: "Catch a Pokemon",
			callback: commandCatch,
		},
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		explore: {
			name: "explore",
			description: "Show all the pokemon within a location, need to provide location",
			callback: commandExplore,
		},
		inspect: {
			name: "inspect",
			description: "Check stats of a pokemon",
			callback: commandInspect,
		},
		map: {
			name: "map",
			description: "Show 20 location areas each time its called",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Show the previous 20 location areas",
			callback: commandMapB,
		},
		pokedex: {
			name: "pokedex",
			description: "Show all the pokemon you have cought",
			callback: commandPokedex,
		}
	};
}
