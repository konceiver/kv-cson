import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { parse, stringify } from "cson";
import { readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, stringify(this.all()));
	}

	protected load(): void {
		try {
			for (const [key, value] of Object.entries(
				parse(readFileSync(this.uri, "utf8"))
			)) {
				// @ts-ignore
				this.put(key, value);
			}
		} catch {
			//
		}
	}
}
