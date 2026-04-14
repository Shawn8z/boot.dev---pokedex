import type { State } from "./state.js";


export function cleanInput(input: string): string[] {
	const lowerCaseStr = input.trim().toLowerCase();
        const wordArr = lowerCaseStr.split(" ");
	return wordArr;
}

export function startREPL(stateObj: State): any {
	const rl = stateObj.readlineInterface;
	const Commands = stateObj.commandsRegistry;

	rl.prompt();

	rl.on("line", (line) => {
		if (line == "") {
			rl.prompt();
			return;
		}

		const cleanStr = cleanInput(line);
		const [command, extraParm] = cleanStr;
		const isCommandWithParm = command === "explore" || command === "catch" || command === "inspect";

		if (isCommandWithParm) {
			const targetCommand = Commands[command].callback;
			targetCommand(stateObj, extraParm);
		} else if (Commands[command]) {
			const targetCommand = Commands[line].callback;
			targetCommand(stateObj);
		} else {
			console.log("Unknown command");
		}
		
		rl.prompt();
	});
}
