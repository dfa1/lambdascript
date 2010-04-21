/*
 * LambdaScript, http://bitbucket.org/dfa/lambdascript
 * (c) 2009, 2010 Davide Angelocola <davide.angelocola@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// test helpers
var Assert = {
    that: function(actual, matcher) {
        var passed = matcher.matches(actual);

        if (!passed) {
            var description = new Description();
            matcher.describeTo(description);
            throw description.toString();
        }
    }
};

function Description() {
    this.description = "";

    this.append = function() {
        var pattern = /\{\d+\}/g;
        var args = arguments;
        var text = arguments[0];

        this.description += text.replace(pattern, function(capture){
            return args[capture.match(/\d+/)];
        });

        return this;
    }

    this.toString = function() {
        return this.description;
    }
}

function NotMatcher(matcher) {
    this.matcher = matcher;

    this.matches = function(object) {
        return !matcher.matches(object);
    };
}

function IsMatcher(expected) {
    this.expected = expected;
    this.actual = null;

    this.matches = function(actual) {
        this.actual = actual;
        return this.actual === this.expected;
    };

    this.describeTo = function(description) {
        var e = this.expected;
        var a = this.actual;

        if (typeof e == 'string') {
            e = "'" + e + "'";
        }

        if (typeof a == 'string') {
            a = "'" + a + "'";
        }

        description.append("expected: {1} got: {2}", e, a);
    };
}

function ArrayMatcher(expected) {
    this.expected = expected;
    this.actual = null;

    this.matches = function(actual) {
        this.actual = actual;
        if (this.actual.length == this.expected.length) {
            for (var i = 0; i < this.actual.length; i++) {
                if (this.actual[i] !== this.expected[i]) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    };

    this.describeTo = function(description) {
        var exp = this.expected.toString();

        if (exp.length == 0) {
            exp = '[]';
        }

        var got = this.actual.toString();

        if (got.length == 0) {
            got = '[]';
        }

        description.append("expected: {1} got: {2}", exp, got);
    };
}

function TypeOfMatcher(expected) {
    this.expected = typeOf(expected);
    this.actual = null;

    function typeOf(obj) {
        if (typeof(obj) == 'object') {
            if (obj.length) {
                return 'array';
            } else {
                return 'object';
            }
        } else {
            return typeof(obj);
        }
    }

    this.matches = function(actual) {
        this.actual = typeOf(actual);
        return this.actual === this.expected;
    };

    this.describeTo = function(description) {
        description.append("expected: {1} got: {2}", this.expected, this.actual);
    };
}

// matcher interface
function is(expected) {
    if (expected instanceof Array) {
        return new ArrayMatcher(expected);
    } else {
        return new IsMatcher(expected);
    }
}

function not(matcher) {
    return new NotMatcher(matcher);
}
