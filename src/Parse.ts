/*
 * Copyright (C) 2017 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import { ParseError } from "./ParseError";

/**
 * Parses the given value as a floating point number.
 */
export function float(value: any): number {
    const ret = parseFloat(value);

    if (isNaN(ret * 1)) {
        throw new ParseError(
            "Parse error: " + value + " should be a number",
            value,
            "float"
        );
    }

    return ret;
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
        console.log(options, value + "");
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
