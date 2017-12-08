/*
 * Copyright (C) 2017 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * Error thrown during parsing and validation.
 */
export class ParseError extends Error {
    /**
     * Value being parsed.
     */
    public readonly value: any;

    /**
     * Parsing rule that failed.
     */
    public readonly rule: string;

    /**
     * Creates a new parse error with the given message, value and rule.
     */
    constructor(message: string, value: any, rule: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, ParseError);

        this.value = value;
        this.rule = rule;
    }
}
