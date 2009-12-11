// Functional Javascript
// (C) 2009, Davide Angelocola <davide.angelocola@gmail.com>

/// `LambdaScript` is the namespace for the LambdaScript library.
var LambdaScript = this.LambdaScript || {};

//
// This function copies all the public functions in `LambdaScript` except itself
// into the global namespace. If the optional argument $except$ is present,
// functions named by its property names are not copied.
//
//   >> LambdaScript.install()
LambdaScript.install = function(except) {
    var source = LambdaScript, target = (function() {
        return this;
    })(); // References the global object.

    for (var name in source)
        name == 'install'
        || name.charAt(0) == '_'
        || except && name in except
        || !source.hasOwnProperty(name) // work around Prototype
        || (target[name] = source[name]);
}

LambdaScript.each = function(array, f) {
    for (var i = 0; i < array.length; i++) {
        f(array[i]);
    }
}

LambdaScript.reduce = function(array, f, i) {
    each(array, function (element) {
        i = f(i, element);
    });

    return i;
}

LambdaScript.map = function(array, f) {
    var result = [];
    
    each(array, function (element) {
        result.push(f(element));
    });

    return result;
}

LambdaScript.filter = function(array, f) {
    var result = [];

    each(array, function(x) {
        if (f(x)) {
            result.push(x);
        } 
    });

    return result;
}

LambdaScript.every = function(array, f) {
    var result = true;

    each(array, function(x) {
        if (!f(x)) {
            result = false;
        }
    });

    return result;
}

LambdaScript.some = function(array, f) {
    var result = false;

    each(array, function(x) {
        if (f(x)) {
            result = true;
        }
    });

    return result;
}

LambdaScript.range = function() {
    var begin = 1;
    var end = 1;
    var step = 1;

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
            step = arguments[2];
            break;
    }

    var result = [];

    for (var i = begin; i <= end; i+=step) {
        result.push(i);
    }

    return result;
}

// unary/binary/ternary function factory
//
// expr("a + b")     is function (a, b) { return a + b; }
// expr("a * b + c") is function (a, b) { return a * b + c; }
LambdaScript.expr = function(s) {
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

        return eval(s);
    }
}

// experimental

//LambdaScript.around = function(func, beforeFunc, afterFunc) {
//    return before(after(func, afterFunc), beforeFunc);
//}
//
//LambdaScript.before = function(func, beforeFunc){
//    return function() {
//        beforeFunc.apply(this, arguments);
//        return func.apply(this, arguments);
//    };
//}
//
//LambdaScript.after = function(func, afterFunc){
//    return function() {
//        var res = func.apply(this, arguments);
//        afterFunc.apply(this, arguments);
//        return res;
//    };
//}

//LambdaScript.trace = function(func) {
//  return around(func, printArguments, printResult);
//}

//LambdaScript.timeIt = function(func) {
//  return around(func, startTimer, stopTimer);
//}
