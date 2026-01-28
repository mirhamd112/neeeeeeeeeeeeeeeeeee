import {
  clear,
  createStore,
  del,
  delMany,
  entries as getEntries,
  get,
  getMany,
  keys as getKeys,
  set,
  setMany,
  update,
  values as getValues,
} from 'idb-keyval';

class IdbStore {
  public store: ReturnType<typeof createStore>;

  constructor(name: string) {
    this.store = createStore(name, 'store');
  }

  public set(key: string, value: any) {
    return set(key, value, this.store);
  }

  public setMany(entries: [string, any][]) {
    return setMany(entries, this.store);
  }

  public async get<T = unknown>(key: string) {
    try {
      return await get<T>(key, this.store);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to read IndexedDB value', key, err);
      return undefined;
    }
  }

  public async getMany<T = unknown>(keys: string[]) {
    try {
      return await getMany<T>(keys, this.store);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to read IndexedDB values', keys, err);
      return undefined;
    }
  }

  public clear() {
    return clear(this.store);
  }

  public del(key: string) {
    return del(key, this.store);
  }

  public delMany(keys: string[]) {
    return delMany(keys, this.store);
  }

  public entries() {
    return getEntries(this.store);
  }

  public keys() {
    return getKeys(this.store);
  }

  public values<T = unknown>() {
    return getValues<T>(this.store);
  }

  public update<T = unknown>(key: string, updater: (oldValue: T | undefined) => T) {
    return update(key, updater, this.store);
  }
}

export const MAIN_IDB_STORE = new IdbStore('tt-data');
export const PASSCODE_IDB_STORE = new IdbStore('tt-passcode');
