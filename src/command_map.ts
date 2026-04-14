import type { State } from "./state.ts";

export async function commandMap(state: State): Promise<void> {
	const rl = state.readlineInterface;
	const poke = state.pokeAPI;
	
	const res = await poke.fetchLocations(state.nextLocationsURL);

	state.nextLocationsURL = res.next;
	state.prevLocationsURL = res.previous;

	const arr = res.results;
	
	if (arr instanceof Array) {
		console.log("\n");
		for (const idx in arr) {
			console.log(arr[idx]);
		}
	}
	
	rl.prompt();
}
