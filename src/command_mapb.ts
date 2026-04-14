import type { State } from "./state.ts";

export async function commandMapB(state: State): Promise<void> {
    const rl = state.readlineInterface
	const poke = state.pokeAPI;
	const prevPage = state.prevLocationsURL;
	
	if (!prevPage) {
		console.log("you're on the first page");
		return;
	}
	
    const res = await poke.fetchLocations(prevPage);

	state.nextLocationsURL = res.next;
    state.prevLocationsURL = res.previous;

	const arr = res.results;

	if (arr instanceof Array) {
		for (const idx in arr) {
			console.log(arr[idx]);
		}
	}

	rl.prompt();
}
