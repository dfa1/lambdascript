function Suite(name) {

    // TODO: customizable hooks
    function defaultEndTestHook(name, elapsed, result) {
        java.lang.System.out.println("'" + name + "' in " + elapsed + ' ms: ' + result);
    }

    function defaultEndSuiteHook(failures, tests, elapsed) {
        java.lang.System.out.println(tests + ' tests in ' + elapsed + ' ms: ' + failures + ' failures');
    }

    this.name = name;
    this.totalTests = 0;
    this.failures = 0;
    this.timer = new Timer();

    this.run = function() {
        this.timer.start();

        for (var property in this) {
            if (/^test/.test(property)) {
                var test = this[property];
                var testTimer = new Timer;
                var result = 'Ok.';
                testTimer.start();

                try {
                    test();
                } catch (e) {
                    this.failures++;
                    result = e;
                } finally {
                    testTimer.stop();
                    var elapsed = testTimer.elapsed()
                    defaultEndTestHook(property, elapsed, result);
                    this.totalTests++;
                }
            }
        }

        this.timer.stop();
        defaultEndSuiteHook(this.failures, this.totalTests, this.timer.elapsed())
    };
}

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
};

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
};

function IsMatcher(expected) {
    this.expected = expected;
    this.actual = null;
    
    this.matches = function(actual) {
        this.actual = actual;
        return this.actual === this.expected;
    };

    this.describeTo = function(description) {
        description.append("expected: {1} got: {2}", this.expected, this.actual);
    };
};

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
        description.append("expected: {1} got: {2}", this.expected, this.actual);
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