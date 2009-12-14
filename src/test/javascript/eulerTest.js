var suite = new Suite('Euler');

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

function sum(array) {
    return reduce(lambda('a+b'), array, 0);
}

function divisibleBy(p, q) {
    return p % q == 0;
}

function problem1(upTo) {
    return sum(filter(lambda('a%3==0||a%5==0'), range(1, upTo)));
}

suite.testProblem1 = function() {
    Assert.that(problem1(9), Matcher.is(23));
    Assert.that(problem1(999), Matcher.is(233168));
}

function smallestIntegerDividedBy(factors) {
    return reduce(lambda('a*b'), factors, 1);
}

function problem5(n) {
    return smallestIntegerDividevBy(range(n));
}

suite.testProblem5 = function() {
    }

function sumOfSquares(n) {
    return sum(map(lambda('a*a'), range(n)));
}

function squareOfSum(n) {
    return lambda('a*a')(sum(range(n)));
}

function problem6(n) {
    return squareOfSum(n) - sumOfSquares(n);
}

suite.testProblem6 = function() {
    Assert.that(problem6(10), Matcher.is(2640));
    Assert.that(problem6(100), Matcher.is(25164150));

}
suite.run();