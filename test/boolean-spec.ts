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

test("Should parse true and false as boolean", t => {
    t.is(parse.boolean(true), true);
    t.is(parse.boolean(false), false);
});

test("Should throw if trying to parse number as boolean", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.boolean(value);
    });

    t.is(error.message, "Parse error: 10 should be a boolean");
    t.is(error.value, value);
    t.is(error.rule, "boolean");
});

test("Should throw if trying to parse an object as boolean", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.boolean(value);
    });

    t.is(error.message, "Parse error: [object Object] should be a boolean");
    t.is(error.value, value);
    t.is(error.rule, "boolean");
});
