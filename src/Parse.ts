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

import { ParseError } from "./ParseError";

/**
 * Parses the given value as a floating point number.
 */
export function float(value: any): number {
    if (String(value).trim() === "") {
        throw new ParseError(
            "Parse error: value should be a number",
            value,
            "float"
        );
    }

    const noCommas: any = String(value).replace(",", "");

    if (isNaN(noCommas * 1)) {
        throw new ParseError(
            "Parse error: " + value + " should be a number",
            value,
            "float"
        );
    }

    return Number(noCommas);
}

/**
 * Parses the given value as a zero or positive floating point number.
 */
export function zeroOrPositiveFloat(value: any): number {
    const ret = float(value);

    if (ret < 0) {
        throw new ParseError(
            "Parse error: " + value + " should be zero or a positive number",
            value,
            "zeroOrPositiveFloat"
        );
    }

    return ret;
}

/**
 * Parses the given value as a positive floating point number.
 */
export function positiveFloat(value: any): number {
    const ret = float(value);

    if (ret <= 0) {
        throw new ParseError(
            "Parse error: " + value + " should be a positive number",
            value,
            "positiveFloat"
        );
    }

    return ret;
}

/**
 * Parses the given value as a zero or negative floating point number.
 */
export function zeroOrNegativeFloat(value: any): number {
    const ret = float(value);

    if (ret > 0) {
        throw new ParseError(
            "Parse error: " + value + " should be zero or a negative number",
            value,
            "zeroOrNegativeFloat"
        );
    }

    return ret;
}

/**
 * Parses the given value as a negative floating point number.
 */
export function negativeFloat(value: any): number {
    const ret = float(value);

    if (ret >= 0) {
        throw new ParseError(
            "Parse error: " + value + " should be a negative number",
            value,
            "negativeFloat"
        );
    }

    return ret;
}

/**
 * Parses the given value as an integer.
 */
export function integer(value: any): number {
    const ret = float(value);

    if (!Number.isInteger(ret)) {
        throw new ParseError(
            "Parse error: " + value + " should be an integer",
            value,
            "integer"
        );
    }

    return ret;
}

/**
 * Parses the given value as a zero or positive integer.
 */
export function zeroOrPositiveInteger(value: any): number {
    const ret = integer(value);

    if (ret < 0) {
        throw new ParseError(
            "Parse error: " + value + " should be zero or a positive integer",
            value,
            "zeroOrPositiveInteger"
        );
    }

    return ret;
}

/**
 * Parses the given value as a positive integer.
 */
export function positiveInteger(value: any): number {
    const ret = integer(value);

    if (ret <= 0) {
        throw new ParseError(
            "Parse error: " + value + " should be a positive integer",
            value,
            "positiveInteger"
        );
    }

    return ret;
}

/**
 * Parses the given value as a zero or negative integer.
 */
export function zeroOrNegativeInteger(value: any): number {
    const ret = integer(value);

    if (ret > 0) {
        throw new ParseError(
            "Parse error: " + value + " should be zero or a negative integer",
            value,
            "zeroOrNegativeInteger"
        );
    }

    return ret;
}

/**
 * Parses the given value as a negative integer.
 */
export function negativeInteger(value: any): number {
    const ret = integer(value);

    if (ret >= 0) {
        throw new ParseError(
            "Parse error: " + value + " should be a negative integer",
            value,
            "negativeInteger"
        );
    }

    return ret;
}

/**
 * Parses the given value as an array.
 */
export function array(value: any): any[] {
    if (!Array.isArray(value)) {
        throw new ParseError(
            "Parse error: " + value + " should be an array",
            value,
            "array"
        );
    }

    return value;
}

/**
 * Parses the given value as an array that cannot be empty.
 */
export function nonEmptyArray(value: any): any[] {
    const ret = array(value);

    if (ret.length === 0) {
        throw new ParseError(
            "Parse error: " +
                JSON.stringify(value) +
                " should have at least one element",
            value,
            "nonEmptyArray"
        );
    }

    return value;
}

/**
 * Parses the given value as text.
 */
export function text(value: any): string {
    if (typeof value !== "string") {
        throw new ParseError(
            "Parse error: " + value + " should be a string",
            value,
            "text"
        );
    }

    return value;
}

/**
 * Parses the given value as non-empty text.
 */
export function nonEmptyText(value: any): string {
    const ret = text(value);

    if (value === "") {
        throw new ParseError(
            "Parse error: value should not be an empty string",
            value,
            "nonEmptyText"
        );
    }

    return value;
}

/**
 * Parses the given value as text if it matches the given regex.
 */
export function matchingText(value: any, validValues: RegExp): string {
    const ret = text(value);

    if (!validValues.test(value)) {
        throw new ParseError(
            "Parse error: " +
                value +
                " should match /" +
                validValues.source +
                "/",
            value,
            "matchingText"
        );
    }

    return ret;
}

/**
 * Parses the given value that matches an Enum.
 */
export function matchingEnum<T>(value: any, enumToMatch: any): T {
    const names = Object.getOwnPropertyNames(enumToMatch)
        .map(option => {
            if (enumToMatch[enumToMatch[option]] === option) {
                return enumToMatch[option] + " (" + option + ")";
            }
            if (enumToMatch[enumToMatch[option]] + "" === option) {
                return "";
            }
            return enumToMatch[option];
        })
        .filter(name => name !== "");

    const options = Object.getOwnPropertyNames(enumToMatch)
        .map(option => {
            if (typeof enumToMatch[enumToMatch[option]] === "number") {
                return "";
            }
            return enumToMatch[option] + "";
        })
        .filter(name => name !== "");

    if (options.indexOf(value + "") === -1) {
        throw new ParseError(
            "Parse error: " +
                value +
                " should be one of the following: " +
                names.join(", "),
            value,
            "matchingEnum"
        );
    }

    return value;
}

/**
 * Parses the given value as boolean.
 */
export function boolean(value: any): boolean {
    if (typeof value !== "boolean") {
        throw new ParseError(
            "Parse error: " + value + " should be a boolean",
            value,
            "boolean"
        );
    }

    return value;
}

/**
 * Parses the properties of the given object.
 */
export function object<T>(
    obj: T,
    parseProperty: (key: any, value: any) => any
): T {
    const result: any = {};

    for (const key of Object.getOwnPropertyNames(obj)) {
        result[key] = parseProperty(key, (obj as any)[key]);
    }

    return result;
}

/**
 * Parses the properties of the given object.
 */
export function nonEmptyObject<T>(
    obj: T,
    parseProperty: (key: any, value: any) => any
): T {
    if (Object.getOwnPropertyNames(obj).length === 0) {
        throw new ParseError(
            "Parse error: " + obj + " should have at least one property",
            obj,
            "nonEmptyObject"
        );
    }

    return object<T>(obj, parseProperty);
}

/**
 * If the given value is null, null is returned. Non-null values are parsed
 * using the given function.
 */
export function nullOr<T>(value: any, parse: (value: any) => T): T | null {
    if (value === null) {
        return null;
    }

    return parse(value);
}
