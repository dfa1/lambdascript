// LambdaScript: Yet Another Functional Javascript Library
// (C) 2009, Davide Angelocola <davide.angelocola@gmail.com>

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
    return function() {
        var a;
        var b;
        var c;

        switch (arguments.length) {
            case 1:
                a = arguments[0];
                break;

            case 2:
                a = arguments[0];
                b = arguments[1];
                break;

            case 3:
                a = arguments[0];
                b = arguments[1];
                c = arguments[2];
                break;
        }

        // eval is evil
        return eval(string);
    };
};

/**
 * @function
 *
 * @param [Number] begin, 1 when not specified
 * @param [Number] end, always specified
 * @param [Number|String|Function] step function
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
 *
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
 */
LambdaScript.each = function(e, array) {
    var f = LambdaScript._toFunction(e);
    
    for (var i in LambdaScript.range(0, array.length - 1)) {
        f(array[i], parseInt(i)); // TODO: hack
    }
};

/**
 * @function
 *
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
 * It takes an array and an unary function then it returns a new array by applying
 * the function to each of the elements of the original array (that is not touched).
 *
 * @example
 * >>> map(function(a) { return a*a; }, [2, 3, 4, 5])
 * [4, 9, 16, 25]
 *
 * @example
 * >>> map(lambda('a*a'), [2, 3, 4, 5])
 * [4, 9, 16, 25]
 *
 * @example
 * >>> map( 'a*a', [2, 3, 4, 5])
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
 * It takes an array and a function, then returns a new array
 * consisting of all the members of the input sequence for which the predicate
 * returns true.
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
LambdaScript.before = function(func, beforeFunc){
    return function() {
        beforeFunc.apply(this, arguments);
        return func.apply(this, arguments);
    };
};

/**
 * @function
 *
 */
LambdaScript.after = function(func, afterFunc){
    return function() {
        var res = func.apply(this, arguments);
        afterFunc.apply(this, arguments);
        return res;
    };
};

/**
 * @function
 *
 */
LambdaScript.around = function(func, beforeFunc, afterFunc) {
    return LambdaScript.before(LambdaScript.after(func, afterFunc), beforeFunc);
};

//LambdaScript.trace = function(func) {
//  return around(func, printArguments, printResult);
//};

//LambdaScript.memoize = function(func) {
//  return around(func, startTimer, stopTimer);
//};

// other experimental code
// http://stackoverflow.com/questions/1266402/implementing-mathematical-sets-in-javascript
//Array.prototype.contains = function(e) {
//    return this.lastIndexOf(e, this.length) != -1;
//};
//
//
//Array.prototype.notContains = function(e) {
//    return this.lastIndexOf(e, this.length) == -1;
//};
//
//function union(a1, a2) {
//    var res = [];
//
//    each(a1, function(e) {
//        res.push(e);
//    });
//
//    each(a2, function(e) {
//        if (res.notContains(e)) {
//            res.push(e);
//        }
//    });
//
//    return res;
//};
//
//function intersection(a1, a2) {
//    var res = [];
//
//    each(a1, function(e) {
//        if (a2.contains(e)) {
//            res.push(e);
//        }
//    });
//
//    return res;
//};
//
//function product(a1, a2) {
//    var res = [];
//
//    each(a1, function(e) {
//        each(a2, function (f) {
//            res.push(e + 'x' + f)
//        })
//    });
//
//    return res;
//};

/**
 * @function
 *
 * A synonym for 'reduce', #inject in Smalltalk.
 */
LambdaScript.inject = LambdaScript.reduce;

/**
 * @function
 *
 * A synonym for 'reduce', (fold) in lisp.
 */
LambdaScript.fold = LambdaScript.reduce;

/**
 * @function
 *
 * A synonym for 'map', #collect in Smalltalk.
 */
LambdaScript.collect = LambdaScript.map;

/**
 * @function
 *
 * A synonym for 'filter', #select in Smalltalk.
 */
LambdaScript.select = LambdaScript.filter;

/**
 * @function
 *
 */
LambdaScript.all = LambdaScript.every;

/**
 * @function
 *
 */
LambdaScript.any = LambdaScript.some;