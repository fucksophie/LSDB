// deno-lint-ignore-file no-explicit-any

/*
LocalStorage DataBase

```ts
new Database("MyDatabaseName")
```
*/
export class Database {
  /**
   * Name which is used in localstorage keys
   */
  name: string;

  /**
   * LocalStorage DataBase
   *
   * @example
   * new Database("MyDatabaseName")
   */
  constructor(name: string = "LSDB") {
    this.name = name;
  }

  /**
   * Delete a key from database
   */
  delete(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear the entire database
   */
  empty() {
    localStorage.clear();
  }

  /**
   * Get all keys inside database
   */
  all(): Map<string, any> {
    const all = new Map<string, any>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)?.split("@").at(-1);

      if (!key) return all;

      all.set(key, this.get(key));
    }

    return all;
  }

  /**
   * Set a key in database
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Check if a key is in the database
   */
  has(key: string) {
    return Boolean(localStorage.getItem(key));
  }

  /**
   * Get a key
   */
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || "{}");
  }
}
