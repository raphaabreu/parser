/*
 * Copyright (C) 2017 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import test from "ava";
import { ParseError } from "../src/ParseError";

test("Should instantiate a new ParseError", t => {
    const error = new ParseError("test message", "field", "random-rule");

    t.is(error.message, "test message");
    t.is(error.value, "field");
    t.is(error.rule, "random-rule");
});
