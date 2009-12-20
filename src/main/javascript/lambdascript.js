/*
 * LambdaScript "Yet Another Functional Javascript Library"
 * Version: ${pom.version} (${changeSet} on ${changeSetDate})
 * 
 * http://bitbucket.org/dfa/lambdascript
 *
 * Copyright (C) 2009, Davide Angelocola <davide.angelocola@gmail.com>
 */

/**
 * @namespace `LambdaScript` is the namespace for the LambdaScript library.
 */
var LambdaScript = this.LambdaScript || {};

/**
 * @function
 * 
 * This function copies all the public functions in `LambdaScript` except itself
 * into the global namespace.
 * 
 * @example
 * LambdaScript.install()
 */
LambdaScript.install = function() {
    var source = LambdaScript, target = (function() {
        return this;
    })(); // References the global object.

    for (var name in source) {
        if (name != 'install' && name.charAt(0) != '_') {
            target[name] = source[name];
        }
    }
};

/**
 * @function
 *
 * @param [String] the expression
 *
 * unary/binary/ternary function factory
 *
 * @example
 * lambda('-a') is equivalent to function negate(a) { return -a; }
 *
 * @example
 * lambda('a + b') is equivalent to function (a, b) { return a + b; }
 *
 * @example
 * lambda('a * b + c') is equivalent to function (a, b, c) { return a * b + c; }
 */
LambdaScript.lambda = function(string) {
    return function(a, b, c) {
        return eval(string);
    };
};

/**
 * @function
 *
 * @param [Number] begin, defaults 1 when not specified
 * @param [Number] end, always specified
 * @param [Number|String|Function] step 
 *
 * A very handy array builder.
 *
 * @example
 * >>> range(5)
 * [1, 2, 3, 4, 5]
 *
 * @example
 * >>> range(5, 10)
 * [5, 6, 7, 8, 9, 10]
 *
 * @example
 * >>> range(5, 25, 5)
 * [5, 10, 15, 20, 25]
 *
 * @example
 * >>> range(1, 10, 'a+2')
 * [1, 3, 5, 7, 9]
 *
 * @example
 * >>> range(3, 100, function(a) { return a*3;})
 * [3, 9, 27, 81]
 */
LambdaScript.range = function() {
    var begin = 1;
    var end = 1;
    var step = function(i) {
        return i + 1;
    };

    switch (arguments.length) {
        case 1:
            end = arguments[0];
            break;

        case 2:
            begin = arguments[0];
            end = arguments[1];
            break;

        case 3:
            begin = arguments[0];
            end = arguments[1];

            if (typeof arguments[2] == 'number') {
                var s = arguments[2];
                step = function(i) {
                    return i + s;
                };
            } else if (typeof arguments[2] == 'string') {
                step = LambdaScript.lambda(arguments[2]);
            } else if (typeof arguments[2] == 'function') {
                step = arguments[2];
            } else {
                throw 'third argument can be number, string or an unary function';
            }

            break;
    }

    var result = [];

    for (var i = begin; i <= end; i = step(i)) {
        result.push(i);
    }

    return result;
};

/**
 * @ignore 
 */
LambdaScript._toFunction = function(e) {
    if (typeof e === 'string') {
        return LambdaScript.lambda(e);
    } else if (typeof e === 'function') {
        return e;
    } else {
        throw 'Not a string or function';
    }
};

/**
 * @function
 *
 * @param [Function] a function to invoke for each element
 * @param [Array] an array
 *
 * Iterates over 'array', yielding each in turn to the function 'e'.
 *
 * @example
 *
 * >>> function toUpperCase(s) { return s.toUpperCase(); }
 * >>> map(toUpperCase, ['foo', 'bar', 'baZ'])
 * ['FOO', 'BAR', 'BAZ']
 */
LambdaScript.each = function(e, array) {
    var f = LambdaScript._toFunction(e);
    
    for (var i = 0; i < array.length; i++) {
        f(array[i], i);
    }
};

/**
 * @function
 *
 * @param [Function] a function with two parameters
 * @param [Array] a array to reduce
 * @param the initial value
 *
 * Reduce boils down 'array' into a single value using 'i' ss the initial state
 * of the reduction, and each successive step of it should be returned by 'e'.
 *
 * AKA: '#inject' in Smalltalk or 'fold' in lisp.
 *
 * @example
 * >>> reduce(lambda('a+b'), [1, 2, 3, 4], 0) // sum of range(1, 4)
 * 10
 */
LambdaScript.reduce = function(e, array, i) {
    var f = LambdaScript._toFunction(e);

    LambdaScript.each(function(element) {
        i = f(i, element);
    }, array);

    return i;
};

/**
 * @function
 *
 * @param [Function] a mapping function
 * @param [Array] an array 
 *
 * Produces a new array of values by mapping each value in 'array' through
 * the unary transformation function 'e'. 
 *
 * AKA: '#collect' in Smalltalk.
 *
 * @example
 * >>> function square(a) { return a*a; }
 * >>> map(square, [2, 3, 4, 5])
 * [4, 9, 16, 25]
 *
 * @example
 * >>> map(lambda('a*a'), [2, 3, 4, 5])
 * [4, 9, 16, 25]
 *
 * @example
 * >>> map('a*a', [2, 3, 4, 5])
 * [4, 9, 16, 25]
 */
LambdaScript.map = function(e, array) {
    var f = LambdaScript._toFunction(e);
    var result = [];
    
    LambdaScript.each(function (element) {
        result.push(f(element));
    }, array);

    return result;
};

/***
 * @function
 *
 * @param [Function] a truth test
 * @param [Array] an array
 *
 * Looks through each value in 'array', returning a new array of all the values
 * that pass the truth test 'e'.
 *
 * AKA: #select in Smalltalk.
 *
 * @example
 * >>> filter(lambda('a%2==0'), range(1, 10))
 * [2, 4, 6, 8, 10]
 */
LambdaScript.filter = function(e, array) {
    var f = LambdaScript._toFunction(e);
    var result = [];

    LambdaScript.each(function(element) {
        if (f(element)) {
            result.push(element);
        } 
    }, array);

    return result;
};

/**
 * @function
 *
 * @param [Function] the truth test
 * @param [Array] an array
 *
 * Returns true if all of the values in 'array' pass the truth test 'e'.
 *
 * 'all' maybe a convenient alias for this function.
 */
LambdaScript.every = function(e, array) {
    var f = LambdaScript._toFunction(e);
    var result = true;

    LambdaScript.each(function(element) {
        if (!f(element)) {
            result = false;
        }
    }, array);

    return result;
};

/**
 * @function
 *
 * @param [Function] the truth test
 * @param [Array] an array
 *
 * Returns true if <b>any</b> of the values in 'array' pass the truth test 'e'.
 *
 * 'any' maybe a convenient alias for this function.
 */
LambdaScript.some = function(e, array) {
    var f = LambdaScript._toFunction(e);
    var result = false;

    LambdaScript.each(function(element) {
        if (f(element)) {
            result = true;
        }
    }, array);

    return result;
};

/**
 * @function
 *
 */
LambdaScript.detect = function(x, array, e) {
    if (e === undefined) {
        e = 'a===b';
    }

    var f = LambdaScript._toFunction(e);
    var result = -1;

    LambdaScript.each(function(element, index) {
        if (f(x, element)) {
            result = index;
        }
    }, array);

    return result;
};

/**
 * @function
 *
 */
LambdaScript.curry = function(e) {
    var f = LambdaScript._toFunction(e);
    var innerArgs = Array.prototype.slice.call(arguments, 1);
    return function () {
        return f.apply(this, innerArgs.concat(Array.prototype.slice.call(arguments, 0)))
    };
};

/**
 * @function
 *
 * @param [String] a property name
 *
 * Build a function that returns the value of the property 'm'.
 *
 * @example
 * >>> map(pluck('length'), ['a', 'aa', 'aaa', 'aaaa'])
 * [ 1, 2, 3, 4 ]
 */
LambdaScript.pluck = function(m) {
    return function(o) {
        return o[m];
    }
};

/**
 * @function
 *
 * @param [Function] a function
 * @param [Function] another function
 *
 * @example
 * >>> var greet = function(name){ return "hi: " + name; };
 * >>> var exclaim  = function(statement){ return statement + "!"; };
 * >>> var welcome = LambdaScript.compose(greet, exclaim);
 * >>> welcome('moe');
 * 'hi: moe!'
 */
LambdaScript.compose = function(f, g) {
    return function() {
        return f(g.apply(null, arguments));
    }
};

/* jsdoc: http://code.google.com/p/jsdoc-toolkit/w/list */

