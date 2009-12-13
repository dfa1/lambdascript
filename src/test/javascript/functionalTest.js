var suite = new Suite('functional suite');

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
    Assert.that(range(3, 100, function(a) { return a*3;}), Matcher.array([3, 9, 27, 81]));
};

suite.testFilter = function() {
    Assert.that(filter(range(1, 10), expr('a%2==0')), Matcher.array([2, 4, 6, 8, 10]));
};

suite.testFilter2 = function() {
    Assert.that(filter(range(1, 10), expr('a===3')), Matcher.array([3]));
};

suite.testReduceSum = function() {
    function sum() {
        return reduce(arguments, expr('a+b'), 0);
    }

    Assert.that(sum(1, 2, 3), Matcher.is(6))
};

suite.testReduceSum2 = function() {
    function sum() {
        return reduce(arguments, 'a+b', 0);
    }

    Assert.that(sum(1, 2, 3), Matcher.is(6))
};

suite.testReduceFactorial = function() {
    function fact(n) {
        return reduce(range(n), expr('a*b'), 1);
    }

    Assert.that(fact(5), Matcher.is(120));
};

suite.testMapSquare = function() {
    Assert.that(map([1, 2, 3], 'a*a'), Matcher.array([1, 4, 9]));
};

suite.testEvery = function() {
    Assert.that(every([1, 2, 3, 4], expr('a<5')), Matcher.is(true));
};

suite.testEvery2 = function() {
    Assert.that(every([1, 2, 3, 4], expr('a<2')), Matcher.is(false));
};

suite.testSome = function() {
    Assert.that(some([1, 2, 3, 4], expr('a>3')), Matcher.is(true));
};

suite.testSome2 = function() {
    Assert.that(some([1, 2, 3, 4], expr('a>6')), Matcher.is(false));
};

suite.testDetect = function() {
    Assert.that(detect([1, 2, 3, 4], 4), Matcher.is(3));
}

suite.testDetect2 = function() {
    Assert.that(detect([1, 2, '3', 4], 4, 'a==b'), Matcher.is(3));
}

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

suite.testExpr = function() {
    var neg = expr('-a');
    Assert.that(neg(42), Matcher.is(-42));
    Assert.that(neg(neg(42)), Matcher.is(42));
};

suite.testExpr2 = function() {
    var add = expr('a + b');
    Assert.that(add(1, 2), Matcher.is(3));
    Assert.that(add(-2, 2), Matcher.is(0));
};

suite.testExpr3 = function() {
    var f = expr('a * b + c');
    Assert.that(f(2, 3, 5), Matcher.is(11));
    Assert.that(f(3, 5, -10), Matcher.is(5));
};

suite.run();