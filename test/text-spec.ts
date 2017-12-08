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

test("Should parse string as text", t => {
    const value = "test";

    t.is(parse.text(value), "test");
});

test("Should throw if trying to parse number as text", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.text(value);
    });

    t.is(error.message, "Parse error: 10 should be a string");
    t.is(error.value, value);
    t.is(error.rule, "text");
});

test("Should throw if trying to parse object as text", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.text(value);
    });

    t.is(error.message, "Parse error: [object Object] should be a string");
    t.is(error.value, value);
    t.is(error.rule, "text");
});
