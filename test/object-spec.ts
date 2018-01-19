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

test("Should not call parseProperty if parsing an empty object without own properties", t => {
    const obj = {};

    const result = parse.object(obj, (key, value) => t.fail());

    t.not(obj, result);
    t.deepEqual(obj, result);
});

test("Should parse an object properties", t => {
    t.deepEqual(
        parse.object({ a: "1", b: "2" } as any, (key, value) =>
            parse.integer(value)
        ),
        { a: 1, b: 2 }
    );
    t.deepEqual(
        parse.object({ a: "a", b: "b" }, (key, value) =>
            parse.nonEmptyText(value)
        ),
        { a: "a", b: "b" }
    );
});
