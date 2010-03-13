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

suite.testLambda = function() {
    var neg = lambda('-a');
    Assert.that(neg(42), is(-42));
    Assert.that(neg(neg(42)), is(42));
};

suite.testLambda2 = function() {
    var add = lambda('a + b');
    Assert.that(add(1, 2), is(3));
    Assert.that(add(-2, 2), is(0));
};

suite.testLambda3 = function() {
    var f = lambda('a * b + c');
    Assert.that(f(2, 3, 5), is(11));
    Assert.that(f(3, 5, -10), is(5));
};

suite.testCompose1 = function() {
    var greet = function(name) {
        return "hi " + name;
    };
    var exclaim = function(statement) {
        return statement + "!";
    };
    var welcome = LambdaScript.compose(greet, exclaim);
    Assert.that(welcome('dfa'), is('hi dfa!'));
};

suite.testCompose2 = function() {
    var square = LambdaScript.lambda('a*a');
    var squareOfSquare= LambdaScript.compose(square, square);
    Assert.that(squareOfSquare(2), is(16));
};

suite.testNot = function() {
    var truth = LambdaScript.lambda('true');
    var notTruth = LambdaScript.not(truth);
    Assert.that(truth(), is(true));
    Assert.that(notTruth(), is(false));
};

suite.testComposeNot = function() {
    var truth = lambda('true');
    var notTruth = LambdaScript.not(truth);
    var notnotTruth = LambdaScript.compose(notTruth, notTruth);
    Assert.that(notnotTruth(), is(false)); // should be true?
};

suite.testToIterator = function() {
    var iterator = LambdaScript._toIterable([1, 2, 3, 4, 5]);
    Assert.that(iterator.toString(), is('ArrayIterator'));
};

suite.testToIteratorWithSelf = function() {
    var iterator = LambdaScript._toIterable([1, 2, 3, 4, 5]);
    var iterator2 = LambdaScript._toIterable(iterator);
    Assert.that(iterator2.toString(), is('ArrayIterator'));
    Assert.that(iterator2 === iterator, is(true));
};

suite.testToIteratorWithNull = function() {
    var iterator = LambdaScript._toIterable(null);
    Assert.that(iterator.toString(), is('NullIterator'));
    Assert.that(iterator.toArray(), is([]));
    Assert.that(iterator.hasNext(), is(false));
    Assert.that(iterator.next(), is(undefined));
};

suite.testToIteratorWithNull = function() {
    var iterator = LambdaScript._toIterable(null);
    Assert.that(iterator.toString(), is('NullIterator'));
};

suite.testToIteratorWithUndefined = function() {
    var iterator = LambdaScript._toIterable(undefined);
    Assert.that(iterator.toString(), is('NullIterator'));
};

suite.testArrayIterator = function() {
    var iterator = new LambdaScript._ArrayIterator([1, 2, 3, 4, 5]);
    Assert.that(iterator.toArray(), is([1, 2, 3, 4, 5]));
};

suite.testRangeIterator = function() {
    var iterator = new LambdaScript._RangeIterator(1, 10, function(i) {
        return i + 1;
    });
    Assert.that(iterator.toArray(), is([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
};

suite.testNegativeRange = function() {
    Assert.that(range(-1).toArray(), is([]));
};

suite.testRange0 = function() {
    Assert.that(range(0).toArray(), is([]));
};

suite.testRange1 = function() {
    Assert.that(range(3).toArray(), is([1, 2, 3]));
};

suite.testRange2 = function() {
    Assert.that(range(5, 7).toArray(), is([5, 6, 7]));
};

suite.testRange3 = function() {
    Assert.that(range(1, 10, 2).toArray(),is([1, 3, 5, 7, 9]));
};

suite.testRange4 = function() {
    Assert.that(range(1, 10, function(i) {
        return i + 2;
    }).toArray(), is([1, 3, 5, 7, 9]));
};

suite.testRange5 = function() {
    Assert.that(range(1, 10, 'a+2').toArray(), is([1, 3, 5, 7, 9]));
};

suite.testRange6 = function() {
    Assert.that(range(3, 100, function(a) {
        return a*3;
    }).toArray(), is([3, 9, 27, 81]));
};

suite.testRange42 = function() {
    var r = range(2);
    Assert.that(r.hasNext(), is(true));
    Assert.that(r.next(), is(1));
    Assert.that(r.hasNext(), is(true));
    Assert.that(r.next(), is(2));
    Assert.that(r.hasNext(), is(false));
};

suite.testEach = function() {
    var count = 0;
    each([1, 2, 3], function counter() {
        count++;
    });
    Assert.that(count, is(3));
};

suite.testFilter = function() {
    Assert.that(filter(range(1, 10), lambda('a%2==0')), is([2, 4, 6, 8, 10]));
};

suite.testFilterShortVersion = function() {
    Assert.that(filter(range(1, 10), lambda('a===3')), is([3]));
};

suite.testReduceSum = function() {
    Assert.that(reduce(range(3), lambda('a+b'), 0), is(6));
};

suite.testReduceSumShortVersion = function() {
    Assert.that(reduce(range(3), 'a+b'), is(6))
};

suite.testReduceFactorial = function() {
    Assert.that(reduce(range(5), lambda('a*b')), is(120));
};

suite.testReduceFactoriaShortVersion = function() {
    Assert.that(reduce(range(5), 'a*b'), is(120));
};

suite.testMapToSquare = function() {
    Assert.that(map([1, 2, 3], 'a*a'), is([1, 4, 9]));
};

suite.testMapToUppercase = function() {
    var toUpperCase = function(e) {
        return e.toUpperCase();
    };
    Assert.that(map(['foo', 'bar', 'baZ'], toUpperCase), is(['FOO', 'BAR', 'BAZ']));
};

suite.testEvery = function() {
    Assert.that(every(range(1, 4), lambda('a<5')), is(true));
};

suite.testEvery2 = function() {
    Assert.that(every(range(1,4), lambda('a<2')), is(false));
};

suite.testSome = function() {
    Assert.that(some(range(1, 4), lambda('a>3')), is(true));
};

suite.testSome2 = function() {
    Assert.that(some(range(1, 4), lambda('a>6')), is(false));
};

suite.testCurry = function() {
    var by2 = curry('a*b', 2);
    Assert.that(by2(21), is(42));
}

suite.testPluck1 = function() {
    var a = ['a', 'aa', 'aaa', 'aaaa'];
    Assert.that(map(a, pluck('length')), is([1, 2, 3, 4]));
};

suite.testMemoize = function() {
    var add = memoize(lambda('a + b'));
    Assert.that(add(1,2), is(3)); // miss
    Assert.that(add(1,3), is(4)); // miss
    Assert.that(add(1,2), is(3)); // hit!
};
