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

test("Should parse string and numbers as integers", t => {
    t.is(parse.integer(-10), -10);
    t.is(parse.integer(0), 0);
    t.is(parse.integer(10), 10);
    t.is(parse.integer("-10"), -10);
    t.is(parse.integer("0"), 0);
    t.is(parse.integer("10"), 10);
});

test("Should parse string and numbers as zero or positive integers", t => {
    t.is(parse.zeroOrPositiveInteger(0), 0);
    t.is(parse.zeroOrPositiveInteger(10), 10);
    t.is(parse.zeroOrPositiveInteger("0"), 0);
    t.is(parse.zeroOrPositiveInteger("10"), 10);
});

test("Should parse string and numbers as positive integers", t => {
    t.is(parse.positiveInteger(10), 10);
    t.is(parse.positiveInteger("10"), 10);
});

test("Should parse string and numbers as zero or negative integers", t => {
    t.is(parse.zeroOrNegativeInteger(0), 0);
    t.is(parse.zeroOrNegativeInteger(-10), -10);
    t.is(parse.zeroOrNegativeInteger("0"), 0);
    t.is(parse.zeroOrNegativeInteger("-10"), -10);
});

test("Should parse string and numbers as negative integers", t => {
    t.is(parse.negativeInteger(-10), -10);
    t.is(parse.negativeInteger("-10"), -10);
});

test("Should throw if trying to parse a negative integer as positive integer", t => {
    const value = -10;
    const error = t.throws(() => {
        parse.positiveInteger(value);
    });

    t.is(error.message, "Parse error: -10 should be a positive integer");
    t.is(error.value, value);
    t.is(error.rule, "positiveInteger");
});

test("Should throw if trying to parse zero as positive integer", t => {
    const value = 0;
    const error = t.throws(() => {
        parse.positiveInteger(value);
    });

    t.is(error.message, "Parse error: 0 should be a positive integer");
    t.is(error.value, value);
    t.is(error.rule, "positiveInteger");
});

test("Should throw if trying to parse a negative integer as zero or positive integer", t => {
    const value = -10;
    const error = t.throws(() => {
        parse.zeroOrPositiveInteger(value);
    });

    t.is(
        error.message,
        "Parse error: -10 should be zero or a positive integer"
    );
    t.is(error.value, value);
    t.is(error.rule, "zeroOrPositiveInteger");
});

test("Should throw if trying to parse a positive integer as negative integer", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.negativeInteger(value);
    });

    t.is(error.message, "Parse error: 10 should be a negative integer");
    t.is(error.value, value);
    t.is(error.rule, "negativeInteger");
});

test("Should throw if trying to parse zero as negative integer", t => {
    const value = 0;
    const error = t.throws(() => {
        parse.negativeInteger(value);
    });

    t.is(error.message, "Parse error: 0 should be a negative integer");
    t.is(error.value, value);
    t.is(error.rule, "negativeInteger");
});

test("Should throw if trying to parse a positive integer as zero or negative integer", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.zeroOrNegativeInteger(value);
    });

    t.is(error.message, "Parse error: 10 should be zero or a negative integer");
    t.is(error.value, value);
    t.is(error.rule, "zeroOrNegativeInteger");
});

test("Should throw if trying to parse a float as integer", t => {
    const value = 10.4;
    const error = t.throws(() => {
        parse.integer(value);
    });

    t.is(error.message, "Parse error: 10.4 should be an integer");
    t.is(error.value, value);
    t.is(error.rule, "integer");
});

test("Should throw if trying to parse an object as integer", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.integer(value);
    });

    t.is(error.message, "Parse error: [object Object] should be a number");
    t.is(error.value, value);
    t.is(error.rule, "float");
});
