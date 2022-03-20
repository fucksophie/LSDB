import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { Database } from "../../mod.ts";

const database = new Database("database");

Deno.test("Check if we can set a value", () => {
  database.set("deno", "test");

  assertEquals(database.get("deno"), "test");
  assertEquals(database.get("deno"), "test");

  database.empty();
});

Deno.test("Check if we can delete a value", () => {
  database.set("deno", "test");

  assertEquals(database.get("deno"), "test");

  database.delete("deno");

  assertEquals(database.has("deno"), false);
});

Deno.test("Check if we can clear database", () => {
  for (let i = 0; i < 100; i++) database.set("deno" + i, i);

  assertEquals(
    database.all().size,
    100,
  );

  database.empty();

  assertEquals(
    database.all().size,
    0,
  );
});

Deno.test("Check if all is properly populated", () => {
  const types: string[] = [];

  for (let i = 0; i < 100; i++) {
    database.set("deno" + i, i);
    types.push("deno" + i);
  }

  let exists = 0;

  database.all().forEach((_value, key, _map) => {
    if (types.includes(key)) exists++;
  });

  assertEquals(exists, 100);

  database.empty();
});
