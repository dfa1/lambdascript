describe("format", function() {
  
    beforeEach(LambdaScript.install)
  
    it("yields constants", function() {
        expect(format("abc")).toBe("abc")
    })
    
    it("expands variables starting from {1}", function() {
        expect(format("a{1}c", "b")).toBe("abc")
    })

    it("refuses null", function() {
        expect(format(null)) // TODO  
    })

    it("refuses undefined ", function() {
        expect(format(undefined)) // TODO
    })
});

describe("isArray", function() {
  
    beforeEach(LambdaScript.install)
  
    it("yields true when argument is array", function() {
        expect(isArray([1])).toBeTruthy()
    })
  
    it("yields false when argument is null", function() {
        expect(isArray(null)).toBeFalsy()
    })
  
    it("yields false when argument is undefined", function() {
        expect(isArray(undefined)).toBeFalsy()
    })  

    it("yields false when argument is a string", function() {
        expect(isArray("string")).toBeFalsy()
    })  
});

describe("isNull", function() {
  
    beforeEach(LambdaScript.install)
  
    it("yields true when argument is null", function() {
        expect(isNull(null)).toBeTruthy()
    })
  
    it("yields false when argument is undefined", function() {
        expect(isNull(undefined)).toBeFalsy()
    })  

    it("yields false when argument is a string", function() {
        expect(isNull("string")).toBeFalsy()
    })  
});

describe("isUndef", function() {
  
    beforeEach(LambdaScript.install)
  
    it("yields true when argument is undefined", function() {
        expect(isUndef(undefined)).toBeTruthy()
    })
  
    it("yields false when argument is null", function() {
        expect(isUndef(null)).toBeFalsy()
    })  

    it("yields false when argument is a string", function() {
        expect(isUndef("string")).toBeFalsy()
    })  
});

describe("lambda", function() {
  
    beforeEach(LambdaScript.install)
  
    it("can yields identity", function() {
        var identity = lambda('a')
        expect(identity(0)).toBe(0)
    })
  
    it("can yields opposite", function() {
        var opposite = lambda('-a')
        expect(opposite(1)).toBe(-1)
    })  
});

describe("pluck", function() {
  
    beforeEach(LambdaScript.install)
  
    it("can yields length", function() {
        var lenghtOf = pluck('length')
        expect(lenghtOf("a")).toBe(1)
    })
});

