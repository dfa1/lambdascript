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

// install in the global namespace
LambdaScript.install();

// the test suite: don't change the variable name
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

suite.testLambdaWithNull = function() {
    Assert.that(lambda(null)(), is(false));
};

suite.testLambdaWithUndefined = function() {
    Assert.that(lambda(undefined)(), is(false));
};

suite.testLambdaWithEmptyString = function() {
    Assert.that(lambda('')(), is(false));
};

suite.testCompose1 = function() {
    var greet = function(name) {
        return "hi " + name;
    };
    var exclaim = function(statement) {
        return statement + "!";
    };
    var welcome = compose(greet, exclaim);
    Assert.that(welcome('dfa'), is('hi dfa!'));
};

suite.testCompose2 = function() {
    var square = lambda('a*a');
    var squareOfSquare = compose(square, square);
    Assert.that(squareOfSquare(2), is(16));
};

suite.testNot = function() {
    var truth = lambda('true');
    var notTruth = LambdaScript.not(truth);
    Assert.that(truth(), is(true));
    Assert.that(notTruth(), is(false));
};

suite.testComposeNot = function() {
    var truth = lambda('true');
    var notTruth = LambdaScript.not(truth);
    var notnotTruth = compose(notTruth, notTruth);
    Assert.that(notnotTruth(), is(false)); // should be true?
};

suite.testOrFalse = function() {
    Assert.that(or('false', 'false'), is(false));
};

suite.testOrTrue = function() {
    Assert.that(or('false', 'false', 'true'), is(true));
};

suite.testAndFalse = function() {
    Assert.that(and('false', 'false'), is(false));
};

suite.testAndTrue = function() {
    Assert.that(and('true', 'true', 'true'), is(true));
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

suite.testEachWithNull = function() {
    var count = 0;
    each(null, function counter() {
        count++;
    });
    Assert.that(count, is(0));
};

suite.testEachIndex = function() {
    var last = 0;
    each([1, 2, 3], function counter(element, index) {
        last = index;
    });
    Assert.that(last, is(3));
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

suite.testPluck = function() {
    var array = ['a', 'aa', 'aaa', 'aaaa'];
    Assert.that(map(array, pluck('length')), is([1, 2, 3, 4]));
};

suite.testInvoke = function() {
    var array = ['a', 'aa', 'aaa', 'aaaa'];
    Assert.that(map(array, invoke('toUpperCase')), is(['A', 'AA', 'AAA', 'AAAA']));
};

suite.testInvokeWithArgument = function() {
    var array = ['hdr: a', 'hdr: aa', 'hdr: aaa', 'hdr: aaaa']; 
    Assert.that(map(array, invoke('substr', 5, 10)), is(['a', 'aa', 'aaa', 'aaaa']));
};

suite.testMemoize = function() {
    var add = memoize(lambda('a + b'));
    Assert.that(add(1,2), is(3)); // miss
    Assert.that(add(1,3), is(4)); // miss
    Assert.that(add(1,2), is(3)); // hit!
};

suite.testMemoizeWithStringLambda = function() {
    var add = memoize('a + b');
    Assert.that(add(1,2), is(3)); // miss
    Assert.that(add(1,3), is(4)); // miss
    Assert.that(add(1,2), is(3)); // hit!
};

suite.testType = function() {
    Assert.that(type([]), is('array'));
    Assert.that(type(null), is('null'));
};

suite.testTake = function() {
    Assert.that(take(range(10, 20), 3), is([10, 11, 12]));
};

suite.testTakeZero = function() {
    Assert.that(take(range(10, 20), 0), is([]));
};

suite.testTakeLessThanZero = function() {
    Assert.that(take(range(10, 20), 0), is([]));
};

suite.testDrop = function() {
    Assert.that(drop(range(1, 20), 17), is([18, 19, 20]));
};

suite.testDropZero = function() {
    Assert.that(drop(range(1, 4), 0), is([]));
};

suite.testDropLessThanZero = function() {
    Assert.that(drop(range(1, 4), -1), is([]));
};

suite.testFirst = function() {
    Assert.that(first(range(1, 4)), is(1));
};

suite.testLast = function() {
    Assert.that(last(range(1, 4)), is(4));
};

suite.testRest = function() {
    Assert.that(rest(range(1, 4)), is([2, 3, 4]));
};

suite.testFormat = function() {
    Assert.that(format("a{1}c", "b"), is("abc"));
};

suite.testFormatWithoutArgs = function() {
    Assert.that(format("abc"), is("abc"));
};

suite.testFormatWithNull = function() {
    Assert.that(format(null), is(""));
};

suite.testFormatWithUndefined = function() {
    Assert.that(format(undefined), is(""));
};

suite.testIsNull1 = function() {
    Assert.that(isnull(null), is(true));
};

suite.testIsNull2 = function() {
    Assert.that(isnull(undefined), is(false));
};

suite.testIsNull3 = function() {
    Assert.that(isnull(""), is(false));
};

suite.testIsUndef1 = function() {
    Assert.that(isundef(undefined), is(true));
};

suite.testIsUndef2 = function() {
    Assert.that(isundef(null), is(false));
};

suite.testIsUndef3 = function() {
    Assert.that(isundef(""), is(false));
};

suite.testConstant = function() {
    Assert.that(constant(1)(), is(1));
};

suite.testConstant2 = function() {
    var k = constant(42);
    Assert.that(k(), is(42));
    Assert.that(k(), is(42));
    Assert.that(k(), is(42));
};

suite.testConstant3 = function() {
    Assert.that(map(range(5), constant(42)), is([ 42, 42, 42, 42, 42]));
};

suite.testIterateIterator = function() {
    var iterate = new LambdaScript._IterateIterator(0, lambda('a+1'));
    Assert.that(iterate.next(), is(1));			
    Assert.that(iterate.next(), is(2));			
};

suite.testIterate = function() {
    var iterate = LambdaScript.iterate(2, curry(lambda('a*b'), 2));
    Assert.that(iterate.next(), is(4));			
    Assert.that(iterate.next(), is(8));			
    Assert.that(iterate.next(), is(16));			
};

suite.testZip1 = function() {
    var zipped = zip([1, 2], [3, 4]);
    Assert.that(zipped.length, is(2));
    Assert.that(zipped[0], is([1,3]));
    Assert.that(zipped[1], is([2,4]));
};

suite.testZip2 = function() {
    var zipped = zip([1], [3, 4]);
    Assert.that(zipped.length, is(2));
    Assert.that(zipped[0], is([1]));
    Assert.that(zipped[1], is([2,4]));
};
