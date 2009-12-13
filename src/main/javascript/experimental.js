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
//LambdaScript.inject = LambdaScript.reduce;

/**
 * @function
 *
 * A synonym for 'reduce', (fold) in lisp.
 */
//LambdaScript.fold = LambdaScript.reduce;

/**
 * @function
 *
 * A synonym for 'map', #collect in Smalltalk.
 */
//LambdaScript.collect = LambdaScript.map;

/**
 * @function
 *
 * A synonym for 'filter', #select in Smalltalk.
 */
//LambdaScript.select = LambdaScript.filter;

/**
 * @function
 *
 */
//LambdaScript.all = LambdaScript.every;

/**
 * @function
 *
 */
//LambdaScript.any = LambdaScript.some;