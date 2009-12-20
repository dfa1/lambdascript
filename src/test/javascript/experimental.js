// LambdaScript: Yet Another Functional Javascript Library; EXPERIMENTAL STUFF
// (C) 2009, Davide Angelocola <davide.angelocola@gmail.com>


LambdaScript.before = function(func, beforeFunc){
    return function() {
        beforeFunc.apply(this, arguments);
        return func.apply(this, arguments);
    };
};

LambdaScript.after = function(func, afterFunc){
    return function() {
        var res = func.apply(this, arguments);
        afterFunc.apply(this, arguments);
        return res;
    };
};

LambdaScript.around = function(func, beforeFunc, afterFunc) {
    return LambdaScript.before(LambdaScript.after(func, afterFunc), beforeFunc);
};

suite.testBefore = function() {
    var array = [ 'changeme', 'changeme' ];

    function beforeFunction() {
        array[1] = 'before';
    }

    function thisFunction() {
        array[0] = 'this';
    }

    thisFunction = before(thisFunction, beforeFunction);
    thisFunction();
    Assert.that(array, Matcher.array(['this', 'before']));
};

suite.testAfter = function() {
    var array = [ 'changeme', 'changeme' ];

    function afterFunction() {
        array[1] = 'after';
    }

    function thisFunction() {
        array[0] = 'this';
    }

    thisFunction = after(thisFunction, afterFunction);
    thisFunction();
    Assert.that(array, Matcher.array(['this', 'after']));
};

suite.testAround = function() {
    var array = [ 'changeme', 'changeme', 'changeme' ];

    function beforeFunction() {
        array[0] = 'before';
    }

    function afterFunction() {
        array[2] = 'after';
    }

    function thisFunction() {
        array[1] = 'this';
    }

    thisFunction = around(thisFunction, beforeFunction, afterFunction);
    thisFunction();
    Assert.that(array, Matcher.array([ 'before', 'this', 'after' ]));
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

// detect
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

suite.testDetect = function() {
    Assert.that(detect(4, [1, 2, 3, 4]), Matcher.is(3));
}

suite.testDetect2 = function() {
    Assert.that(detect(4, [1, 2, '3', 4], 'a==b'), Matcher.is(3));
}