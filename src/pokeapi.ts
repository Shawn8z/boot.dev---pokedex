import { Cache } from "./pokecache.js";

export type ShallowLocations = {
	count: number,
	next: string,
	previous: string,
	results: {
		name: string,
		url: string,
	}[],
}

export type Location = {
	encounterMethodsRates: [],
	game_index: number,
	id: number,
	location: [],
	name: string,
	names: [],
	pokemon_encounters: { 
		pokemon: Record<string, string>,
		version_details: Record<string, any>[],
	}[],
}

export type Pokemon = {
	abilities: Record<string, any>[],
	base_experience: number,
	moves: Record<string, any>[],
	name: string,
	order: number, 
	height: number,
	weight: number,
	stats: Record<string, any>[];
	types: Record<string, any>[];
}

export class PokeAPI {

	private static readonly baseURL = "https://pokeapi.co/api/v2";
	cache: Cache;

	constructor() {
		this.cache = new Cache(60000);
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		let url;

		if (pageURL !== undefined && pageURL !== "") {
			url = pageURL;
		} else {
			url = `${PokeAPI.baseURL}/location-area/`
		}

		const cacheData = this.cache.get<ShallowLocations>(url);
		if (cacheData) return cacheData.val;

		try {
			const res = await fetch(url, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				}
			})

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			this.cache.add<ShallowLocations>(url, data);
			return data;
			
		} catch (err) {
			throw new Error(`Error fetching locations: ${(err as Error).message}`);
		}
	}	

	
	async fetchLocation(locationName: string): Promise<Location> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

		const cacheData = this.cache.get<Location>(url);
		if (cacheData) return cacheData.val;

		try {
			const res = await fetch(url, {
				method: "GET",
				mode: "cors",
				headers: { 
					"Content-type": "application/json"
				},
			})

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			this.cache.add<Location>(url, data);
			return data;

		} catch (err) {
			throw new Error(`Error fetching location '${locationName}': ${(err as Error).message}`);
		}
	}

	async fetchPokemon(name: string): Promise<Pokemon> {
		const url = `${PokeAPI.baseURL}/pokemon/${name}`;

		try {
			const res = await fetch(url, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				}
			})

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			this.cache.add<Pokemon>(url, data);
			return data;
		} catch (err) {
			throw new Error(`Error fetching pokemon ${name}`);
		}
	}
}
