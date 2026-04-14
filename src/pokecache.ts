export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number = 0;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        const cachObj: CacheEntry<T> = { createdAt: Date.now(), val };
        this.#cache.set(key, cachObj);
    }

    get<T>(key: string): CacheEntry<any> | undefined  {
        const entry = this.#cache.get(key);
        if (!entry) return undefined;
        return this.#cache.get(key) as CacheEntry<T>;
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    #reap() {
        const interval = this.#interval;

        function oldCacheCheck(
            key: string, 
            val: CacheEntry<any>,
            map: Map<string, CacheEntry<any>>
        ) {
            const now = Date.now();
            const cacheCreatedAt = val.createdAt;

            const isCacheTooOld = (now - cacheCreatedAt) > interval;
            if (isCacheTooOld) {
                map.delete(key);
            }
        }

        this.#cache.forEach((value, key, map) => oldCacheCheck(key, value, map));
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
}