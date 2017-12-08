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

enum StringEnum {
    OptionOne = "one",
    OptionTwo = "two",
    OptionThree = "three"
}

enum NumberEnum {
    OptionA,
    OptionB,
    OptionC
}

enum MixedEnum {
    OptionA,
    OptionB = "bb",
    OptionC = 10
}

test("Should match a string enum", t => {
    t.is(
        parse.matchingEnum<StringEnum>("one", StringEnum),
        StringEnum.OptionOne
    );
    t.is(
        parse.matchingEnum<StringEnum>("two", StringEnum),
        StringEnum.OptionTwo
    );
    t.is(
        parse.matchingEnum<StringEnum>("three", StringEnum),
        StringEnum.OptionThree
    );
});

test("Should match a number enum", t => {
    t.is(parse.matchingEnum<NumberEnum>(0, NumberEnum), NumberEnum.OptionA);
    t.is(parse.matchingEnum<NumberEnum>(1, NumberEnum), NumberEnum.OptionB);
    t.is(parse.matchingEnum<NumberEnum>(2, NumberEnum), NumberEnum.OptionC);
});

test("Should match a mixed enum", t => {
    t.is(parse.matchingEnum<MixedEnum>(0, MixedEnum), MixedEnum.OptionA);
    t.is(parse.matchingEnum<MixedEnum>("bb", MixedEnum), MixedEnum.OptionB);
    t.is(parse.matchingEnum<MixedEnum>(10, MixedEnum), MixedEnum.OptionC);
});

test("Should throw if trying to parse non-matching string as matching string enum", t => {
    const value = "zero";
    const error = t.throws(() => {
        parse.matchingEnum<StringEnum>(value, StringEnum);
    });

    t.is(
        error.message,
        "Parse error: zero should be one of the following: one, two, three"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingEnum");
});

test("Should throw if trying to parse non-matching number as matching number enum", t => {
    const value = 10;
    const error = t.throws(() => {
        parse.matchingEnum<NumberEnum>(value, NumberEnum);
    });

    t.is(
        error.message,
        "Parse error: 10 should be one of the following: 0 (OptionA), 1 (OptionB), 2 (OptionC)"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingEnum");
});

test("Should throw if trying to parse an object as matching string enum", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.matchingEnum<StringEnum>(value, StringEnum);
    });

    t.is(
        error.message,
        "Parse error: [object Object] should be one of the following: one, two, three"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingEnum");
});

test("Should throw if trying to parse an object as matching number enum", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.matchingEnum<NumberEnum>(value, NumberEnum);
    });

    t.is(
        error.message,
        "Parse error: [object Object] should be one of the following: 0 (OptionA), 1 (OptionB), 2 (OptionC)"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingEnum");
});

test("Should throw if trying to parse an object as matching mixed enum", t => {
    const value = { test: "a" };
    const error = t.throws(() => {
        parse.matchingEnum<MixedEnum>(value, MixedEnum);
    });

    t.is(
        error.message,
        "Parse error: [object Object] should be one of the following: 0 (OptionA), bb, 10 (OptionC)"
    );
    t.is(error.value, value);
    t.is(error.rule, "matchingEnum");
});
