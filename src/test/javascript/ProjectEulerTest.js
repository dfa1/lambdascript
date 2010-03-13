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
var suite = {};

// utils
function println(object) {
    if (typeof object != 'string') {
        object = object.toString();
    }

    java.lang.System.out.println(object);
}

function print(object) {
    if (typeof object != 'string') {
        object = object.toString();
    }

    java.lang.System.out.print(object);
}

// problem 1
function sum(array) {
    return reduce(array, lambda('a+b'));
}

function divisibleBy3Or5(n) {
    return n % 3 == 0 || n % 5 == 0;
}

function problem1(upTo) {
    return sum(filter(range(1, upTo), divisibleBy3Or5));
}

suite.testProblem1 = function() {
    Assert.that(problem1(9), is(23));
    Assert.that(problem1(999), is(233168));
};

// problem 2
function fib(n) {
    if (n == 1 || n == 0) {
        return n;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

// fib serie is: odd odd even odd odd even odd odd even .... forever
suite.testFib = function() {
    Assert.that(map(range(11), fib), is([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]));
};

suite.testProblem2 = function() {
    each(range(20), compose(println, fib));
};

// problem 5
function smallestIntegerDividedBy(factors) {
    return reduce(factors, lambda('a*b'));
}

function problem5(n) {
    return smallestIntegerDividevBy(range(n));
}

suite.testProblem5 = function() {
    return 'TODO';
};

// problem 6: naive version
function sumOfSquares(n) {
    return sum(map(range(n), lambda('a*a')));
}

function squareOfSum(n) {
    return lambda('a*a')(sum(range(n)));
}

function problem6(n) {
    return squareOfSum(n) - sumOfSquares(n);
}

suite.testProblem6 = function() {
    Assert.that(problem6(10), is(2640));
    Assert.that(problem6(100), is(25164150));
};
