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

var Matcher = {
    is: function (expected) {
        return new IsMatcher(expected);
    },

    not: function (matcher) {
        return new NotMatcher(matcher);
    },

    // TODO: merge with 'is'
    array: function (expected) {
        return new ArrayMatcher(expected);
    }
};

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
    };

    this.matches = function(actual) {
        this.actual = typeOf(actual);
        return this.actual === this.expected;
    };

    this.describeTo = function(description) {
        description.append("expected: {1} got: {2}", this.expected, this.actual);
    };
}