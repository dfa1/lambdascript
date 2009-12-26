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
    Assert.that(map(fib, range(11)), Matcher.array([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]));
};

suite.testProblem2 = function() {
    each(compose(println, fib), range(20));
};

// problem 5
function smallestIntegerDividedBy(factors) {
    return reduce(lambda('a*b'), factors, 1);
}

function problem5(n) {
    return smallestIntegerDividevBy(range(n));
}

suite.testProblem5 = function() {
    return 'TODO';
};

// problem 6: naive version
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
};
