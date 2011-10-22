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

