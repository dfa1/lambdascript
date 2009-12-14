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
    println(problem1(999));
}

suite.run();