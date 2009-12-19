var suite = new Suite('functional suite');

suite.testRangeNegative = function() {
    Assert.that(range(-1), Matcher.array([]));
};

suite.testRange0 = function() {
    Assert.that(range(0), Matcher.array([]));
};

suite.testRange1 = function() {
    Assert.that(range(3), Matcher.array([1, 2, 3]));
};

suite.testRange2 = function() {
    Assert.that(range(5, 7), Matcher.array([5, 6, 7]));
};

suite.testRange3 = function() {
    Assert.that(range(1, 10, 2), Matcher.array([1, 3, 5, 7, 9]));
};

suite.testRange4 = function() {
    Assert.that(range(1, 10, function(i) {
        return i+2;
    }), Matcher.array([1, 3, 5, 7, 9]));
};

suite.testRange5 = function() {
    Assert.that(range(1, 10, 'a+2'), Matcher.array([1, 3, 5, 7, 9]));
};

suite.testRange5 = function() {
    Assert.that(range(3, 100, function(a) {
        return a*3;
    }), Matcher.array([3, 9, 27, 81]));
};

suite.testFilter = function() {
    Assert.that(filter(lambda('a%2==0'), range(1, 10)), Matcher.array([2, 4, 6, 8, 10]));
};

suite.testFilter2 = function() {
    Assert.that(filter(lambda('a===3'), range(1, 10)), Matcher.array([3]));
};

suite.testReduceSum = function() {
    function sum() {
        return reduce(lambda('a+b'), arguments, 0);
    }

    Assert.that(sum(1, 2, 3), Matcher.is(6))
};

suite.testReduceSum2 = function() {
    function sum() {
        return reduce('a+b', arguments, 0);
    }

    Assert.that(sum(1, 2, 3), Matcher.is(6))
};

suite.testReduceFactorial = function() {
    function fact(n) {
        return reduce(lambda('a*b'), range(n), 1);
    }

    Assert.that(fact(5), Matcher.is(120));
};

suite.testMap1= function() {
    Assert.that(map('a*a', [1, 2, 3]), Matcher.array([1, 4, 9]));
};

suite.testMap2= function() {
    Assert.that(map(function(e) {
        return e.toUpperCase();
    }, ['foo', 'bar', 'baZ']), Matcher.array(['FOO', 'BAR', 'BAZ']));
};

suite.testEvery = function() {
    Assert.that(every(lambda('a<5'), [1, 2, 3, 4]), Matcher.is(true));
};

suite.testEvery2 = function() {
    Assert.that(every(lambda('a<2'), [1, 2, 3, 4]), Matcher.is(false));
};

suite.testSome = function() {
    Assert.that(some(lambda('a>3'), [1, 2, 3, 4]), Matcher.is(true));
};

suite.testSome2 = function() {
    Assert.that(some(lambda('a>6'), [1, 2, 3, 4]), Matcher.is(false));
};

suite.testDetect = function() {
    Assert.that(detect(4, [1, 2, 3, 4]), Matcher.is(3));
}

suite.testDetect2 = function() {
    Assert.that(detect(4, [1, 2, '3', 4], 'a==b'), Matcher.is(3));
}

suite.testLambda = function() {
    var neg = lambda('-a');
    Assert.that(neg(42), Matcher.is(-42));
    Assert.that(neg(neg(42)), Matcher.is(42));
};

suite.testLambda2 = function() {
    var add = lambda('a + b');
    Assert.that(add(1, 2), Matcher.is(3));
    Assert.that(add(-2, 2), Matcher.is(0));
};

suite.testLambda3 = function() {
    var f = lambda('a * b + c');
    Assert.that(f(2, 3, 5), Matcher.is(11));
    Assert.that(f(3, 5, -10), Matcher.is(5));
};

suite.testcurry = function() {
    var by2 = curry('a*b', 2);
    Assert.that(by2(21), Matcher.is(42));
}

suite.testPluck1 = function() {
    var a = ['a', 'aa', 'aaa', 'aaaa'];
    Assert.that(map(pluck('length'), a), Matcher.array([1, 2, 3, 4]));
};

suite.testCompose1 = function() {
    var greet = function(name){
        return "hi " + name;
    };
    var exclaim = function(statement){
        return statement + "!";
    };
    var welcome = LambdaScript.compose(greet, exclaim);
    Assert.that(welcome('dfa'), Matcher.is('hi dfa!'));
};

suite.run();