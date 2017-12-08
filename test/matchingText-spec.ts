/*
 * Copyright (C) 2017 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import test from "ava";
import * as parse from "../src/Parse";

test("Should parse matching string as matching text", t => {
    t.is(parse.matchingText("lion", /(penguin|lion|cow|bird)/), "lion");
});

test("Should throw if trying to parse empty string as non-empty text", t => {
    const value = "seagull";
    const error = t.throws(() => {
        parse.matchingText(value, /(penguin|lion|cow|bird)/);
    });

    t.is(
        error.message,
        "Parse error: seagull should match /(penguin|lion|cow|bird)/"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingText");
});

test("Should throw if trying to parse an object as matching text", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.matchingText(value, /.*?/);
    });

    t.is(error.message, "Parse error: [object Object] should be a string");
    t.is(error.value, value);
    t.is(error.rule, "text");
});
