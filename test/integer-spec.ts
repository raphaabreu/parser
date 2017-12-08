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
