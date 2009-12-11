var suite = new Suite('functional suite');

suite.testRange1 = function() {
    Assert.that(range(3), Matcher.array([1, 2, 3]));
}

suite.testRange2 = function() {
    Assert.that(range(5, 7), Matcher.array([5, 6, 7]));
}

suite.testRange3 = function() {
    Assert.that(range(1, 10, 2), Matcher.array([1, 3, 5, 7, 9]));
}

suite.testFilter = function() {
    Assert.that(filter(range(1, 10), expr("a%2")), Matcher.is([2, 4, 6, 8]));
}

suite.testFilter2 = function() {
    Assert.that(filter(range(1, 10), expr("a==3")), Matcher.is([3]));
}

suite.testReduceSum = function() {
    function sum() {
        return reduce(arguments, expr("a+b"), 0);
    }

    Assert.that(sum(1, 2, 3), Matcher.is(6))
}

suite.testReduceFact = function() {
    function fact(n) {
        return reduce(range(n), expr("a*b"), 1);
    }

    Assert.that(fact(5), Matcher.is(120));
}

suite.testMapSquare = function() {
    Assert.that(map([1, 2, 3], expr("a*a")), Matcher.array([1, 4, 9]));
}

suite.testEvery = function() {
    Assert.that(every([1, 2, 3, 4]), expr("a<5"), Matcher.is(true));
}

suite.testEvery2 = function() {
    Assert.that(every([1, 2, 3, 4]), expr("a<2"), Matcher.is(false));
}

suite.testSome = function() {
    Assert.that(every([1, 2, 3, 4]), expr("a>3"), Matcher.is(true));
}

suite.testSome = function() {
    Assert.that(every([1, 2, 3, 4]), expr("a>6"), Matcher.is(false));
}

suite.run();