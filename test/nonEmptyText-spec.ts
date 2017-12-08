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

test("Should parse non-empty string as non-empty text", t => {
    t.is(parse.nonEmptyText("test"), "test");
});

test("Should throw if trying to parse empty string as non-empty text", t => {
    const value = "";
    const error = t.throws(() => {
        parse.nonEmptyText(value);
    });

    t.is(error.message, "Parse error: value should not be an empty string");
    t.is(error.value, value);
    t.is(error.rule, "nonEmptyText");
});

test("Should throw if trying to parse an object as non-empty text", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.nonEmptyText(value);
    });

    t.is(error.message, "Parse error: [object Object] should be a string");
    t.is(error.value, value);
    t.is(error.rule, "text");
});
