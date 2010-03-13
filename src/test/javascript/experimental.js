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

// TODO: I'm not sure about these functions
//LambdaScript.not = function(fn) {
//    return function() {
//        return !fn();
//    };
//};
//
//LambdaScript.ifTrue = function(test, body) {
//    return function() {
//        if (test()) {
//            body();
//        }
//    };
//};
//
//LambdaScript.ifFalse = function(test, body) {
//    return function() {
//        if (not(test)()) {
//            body();
//        }
//    };
//};


//suite.testIfTrue = function() {
//    var test = function() {
//        return true;
//    };
//    var i = 0;
//    var body = function() {
//        i++;
//    };
//    ifTrue(test, body)();
//    Assert.that(i, is(1));
//};

//suite.testIfFalse = function() {
//    var test = function() {
//        return true;
//    };
//    var i = 0;
//    var body = function() {
//        i++;
//    };
//    ifFalse(test, body)();
//    Assert.that(i, is(0));
//   };