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

test("Should parse arrays as array", t => {
    t.deepEqual(parse.array([]), []);
    t.deepEqual(parse.array([1, 2, 3, 4]), [1, 2, 3, 4]);
    t.deepEqual(parse.array(["a", "b", "c"]), ["a", "b", "c"]);
});

test("Should throw if trying to parse number as array", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.array(value);
    });

    t.is(error.message, "Parse error: 10 should be an array");
    t.is(error.value, value);
    t.is(error.rule, "array");
});

test("Should throw if trying to parse an object as array", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.array(value);
    });

    t.is(error.message, "Parse error: [object Object] should be an array");
    t.is(error.value, value);
    t.is(error.rule, "array");
});
