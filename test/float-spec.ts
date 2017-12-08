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

test("Should parse string and numbers as floats", t => {
    t.is(parse.float(-5.3), -5.3);
    t.is(parse.float(0), 0);
    t.is(parse.float(14.2), 14.2);
    t.is(parse.float("-10"), -10);
    t.is(parse.float("0"), 0);
    t.is(parse.float("551.1"), 551.1);
});

test("Should parse string and numbers as zero or positive floats", t => {
    t.is(parse.zeroOrPositiveFloat(0), 0);
    t.is(parse.zeroOrPositiveFloat(5.12), 5.12);
    t.is(parse.zeroOrPositiveFloat("0"), 0);
    t.is(parse.zeroOrPositiveFloat("54.2"), 54.2);
});

test("Should parse string and numbers as positive floats", t => {
    t.is(parse.positiveFloat(612.3), 612.3);
    t.is(parse.positiveFloat("665.2"), 665.2);
});

test("Should parse string and numbers as zero or negative floats", t => {
    t.is(parse.zeroOrNegativeFloat(0), 0);
    t.is(parse.zeroOrNegativeFloat(-235.2), -235.2);
    t.is(parse.zeroOrNegativeFloat("0"), 0);
    t.is(parse.zeroOrNegativeFloat("-38"), -38);
});

test("Should parse string and numbers as negative floats", t => {
    t.is(parse.negativeFloat(-75.2), -75.2);
    t.is(parse.negativeFloat("-9.743"), -9.743);
});

test("Should throw if trying to parse a negative float as positive float", t => {
    const value = -10.2;
    const error = t.throws(() => {
        parse.positiveFloat(value);
    });

    t.is(error.message, "Parse error: -10.2 should be a positive number");
    t.is(error.value, value);
    t.is(error.rule, "positiveFloat");
});

test("Should throw if trying to parse zero as positive float", t => {
    const value = 0;
    const error = t.throws(() => {
        parse.positiveFloat(value);
    });

    t.is(error.message, "Parse error: 0 should be a positive number");
    t.is(error.value, value);
    t.is(error.rule, "positiveFloat");
});

test("Should throw if trying to parse a negative float as zero or positive float", t => {
    const value = -106.2;
    const error = t.throws(() => {
        parse.zeroOrPositiveFloat(value);
    });

    t.is(
        error.message,
        "Parse error: -106.2 should be zero or a positive number"
    );
    t.is(error.value, value);
    t.is(error.rule, "zeroOrPositiveFloat");
});

test("Should throw if trying to parse a positive float as negative float", t => {
    const value = 10.5;
    const error = t.throws(() => {
        parse.negativeFloat(value);
    });

    t.is(error.message, "Parse error: 10.5 should be a negative number");
    t.is(error.value, value);
    t.is(error.rule, "negativeFloat");
});

test("Should throw if trying to parse zero as negative float", t => {
    const value = 0;
    const error = t.throws(() => {
        parse.negativeFloat(value);
    });

    t.is(error.message, "Parse error: 0 should be a negative number");
    t.is(error.value, value);
    t.is(error.rule, "negativeFloat");
});

test("Should throw if trying to parse a positive float as zero or negative float", t => {
    const value = 634.91;
    const error = t.throws(() => {
        parse.zeroOrNegativeFloat(value);
    });

    t.is(
        error.message,
        "Parse error: 634.91 should be zero or a negative number"
    );
    t.is(error.value, value);
    t.is(error.rule, "zeroOrNegativeFloat");
});

test("Should throw if trying to parse an object as float", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.float(value);
    });

    t.is(error.message, "Parse error: [object Object] should be a number");
    t.is(error.value, value);
    t.is(error.rule, "float");
});

test("Should throw if trying to parse a non-number string as float", t => {
    const value = "574.6a";
    const error = t.throws(() => {
        parse.float(value);
    });

    t.is(error.message, "Parse error: 574.6a should be a number");
    t.is(error.value, value);
    t.is(error.rule, "float");
});

test("Should throw if trying to parse an empty string as float", t => {
    const value = "";
    const error = t.throws(() => {
        parse.float(value);
    });

    t.is(error.message, "Parse error: value should be a number");
    t.is(error.value, value);
    t.is(error.rule, "float");
});
