/*
 * Copyright (C) 2017 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import test from "ava";
import * as parse from "../src/Parse";

test("Should parse non-empty arrays as non-empty array", t => {
    t.deepEqual(parse.nonEmptyArray([1, 2, 3, 4]), [1, 2, 3, 4]);
    t.deepEqual(parse.nonEmptyArray(["a", "b", "c"]), ["a", "b", "c"]);
});

test("Should throw if trying to parse an empty array as non-empty array", t => {
    const value: any[] = [];
    const error = t.throws(() => {
        parse.nonEmptyArray(value);
    });

    t.is(error.message, "Parse error: [] should have at least one element");
    t.is(error.value, value);
    t.is(error.rule, "nonEmptyArray");
});

test("Should throw if trying to parse number as array", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.nonEmptyArray(value);
    });

    t.is(error.message, "Parse error: 10 should be an array");
    t.is(error.value, value);
    t.is(error.rule, "array");
});

test("Should throw if trying to parse an object as non-empty array", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.nonEmptyArray(value);
    });

    t.is(error.message, "Parse error: [object Object] should be an array");
    t.is(error.value, value);
    t.is(error.rule, "array");
});
