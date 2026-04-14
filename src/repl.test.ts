import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
	{
		input: " hello world ",
		expected: ["hello", "world"],
	},
	{
		input: "WE are THE WOrlD",
		expected: ["we", "are", "the", "world"],
	},
	{
		input: "Using the Bootdev CLI",
		expected: ["using", "the", "bootdev", "cli"],
	},
	{
		input: "    POWER OVERWHIELMING    ",
		expected: ["power", "overwhielming"],
	}
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
		const actual = cleanInput(input);
		expect(actual).toHaveLength(expected.length);
		for (const i in expected) {
			expect(actual[i]).toBe(expected[i]);
		}
    });
  });
