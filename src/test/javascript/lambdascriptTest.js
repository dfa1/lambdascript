var suite = {};

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
    var square = function(i) {
        return i * i;
    };
    var squareOfSquare= LambdaScript.compose(square, square);
    Assert.that(squareOfSquare(2), is(16));
};

suite.testNot = function() {
    var truth = function() {
        return true;
    };
    var notTruth = LambdaScript.not(truth);
    Assert.that(truth(), is(true));
    Assert.that(notTruth(), is(false));
};

suite.testComposeNot = function() {
    var truth = function() {
        return true;
    };
    var notTruth = LambdaScript.not(truth);
    var notnotTruth = LambdaScript.compose(notTruth, notTruth);
    Assert.that(notnotTruth(), is(false)); // should be true?
};

suite.testIfTrue = function() {
    //    var test = function() {
    //        return true;
    //    };
    //    var i = 0;
    //    var body = function() {
    //        i++;
    //    };
    //    ifTrue(test, body)();
    //    Assert.that(i, is(1));
    };

suite.testIfFalse = function() {
    //    var test = function() {
    //        return true;
    //    };
    //    var i = 0;
    //    var body = function() {
    //        i++;
    //    };
    //    ifFalse(test, body)();
    //    Assert.that(i, is(0));
    };

suite.testToIterator1 = function() {
    var iterator = LambdaScript._toIterator([1, 2, 3, 4, 5]);
    Assert.that(iterator.toString(), is('ArrayIterator'));
};

suite.testToIterator2 = function() {
    var iterator = LambdaScript._toIterator([1, 2, 3, 4, 5]);
    var iterator2 = LambdaScript._toIterator(iterator);
    Assert.that(iterator2.toString(), is('ArrayIterator'));
    Assert.that(iterator2 === iterator, is(true));
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
    each(function counter() {
        count++;
    }, [1, 2, 3]);
    Assert.that(count, is(3));
};

suite.testFilter = function() {
    Assert.that(filter(lambda('a%2==0'), range(1, 10)), is([2, 4, 6, 8, 10]));
};

suite.testFilter2 = function() {
    Assert.that(filter(lambda('a===3'), range(1, 10)), is([3]));
};

suite.testReduceSum = function() {
    Assert.that(reduce(lambda('a+b'), range(3), 0), is(6));
};

suite.testReduceSum2 = function() {
    Assert.that(reduce('a+b', range(3), 0), is(6))
};

suite.testReduceFactorial = function() {
    Assert.that(reduce(lambda('a*b'), range(5), 1), is(120));
};

suite.testReduceFactoria2 = function() {
    Assert.that(reduce('a*b', range(5), 1), is(120));
};

suite.testMap1 = function() {
    Assert.that(map('a*a', [1, 2, 3]), is([1, 4, 9]));
};

suite.testMap2 = function() {
    var toUpperCase = function(e) {
        return e.toUpperCase();
    };
    Assert.that(map(toUpperCase, ['foo', 'bar', 'baZ']), is(['FOO', 'BAR', 'BAZ']));
};

suite.testEvery = function() {
    Assert.that(every(lambda('a<5'), [1, 2, 3, 4]), is(true));
};

suite.testEvery2 = function() {
    Assert.that(every(lambda('a<2'), [1, 2, 3, 4]), is(false));
};

suite.testSome = function() {
    Assert.that(some(lambda('a>3'), [1, 2, 3, 4]), is(true));
};

suite.testSome2 = function() {
    Assert.that(some(lambda('a>6'), [1, 2, 3, 4]), is(false));
};

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

suite.testCurry = function() {
    var by2 = curry('a*b', 2);
    Assert.that(by2(21), is(42));
}

suite.testPluck1 = function() {
    var a = ['a', 'aa', 'aaa', 'aaaa'];
    Assert.that(map(pluck('length'), a), is([1, 2, 3, 4]));
};

suite.testMemoize = function() {
    var add = memoize(lambda('a + b'));
    Assert.that(add(1,2), is(3)); // miss
    Assert.that(add(1,3), is(4)); // miss
    Assert.that(add(1,2), is(3)); // hit!
};
