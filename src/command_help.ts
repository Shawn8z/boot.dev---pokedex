import type { State } from "./state.ts";

export function commandHelp(state: State): void {
	const commands = state.commandsRegistry;
	let commandDescriptionArr = [];
	for (const key in commands) {
		const command = commands[key];
		const newStr = `${command.name}: ${command.description}`;
		commandDescriptionArr.push(newStr);
	}
	
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log();
	for (const index in commandDescriptionArr) {
		console.log(commandDescriptionArr[index]);
	}
	console.log();
}
