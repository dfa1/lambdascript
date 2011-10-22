describe("format", function() {
  
    beforeEach(LambdaScript.install)
  
    it("can format the empty string", function() {
        expect(format("")).toBe("")
    })
    
    it("can yields constants", function() {
        expect(format("abc")).toBe("abc")
    })
    
    it("does not expands {} in templates", function() {
        expect(format("{}")).toBe("{}")
    })
    
    it("expands variables starting from 1", function() {
        expect(format("a{1}c", "b")).toBe("abc")
    })

    it("can expands variables twice", function() {
        expect(format("a{1}c a{1}c", "b")).toBe("abc abc")
    })

    it("can expands several variables at once", function() {
        expect(format("{1}/{2}", "p", "q")).toBe("p/q")
    })

    it("refuses null", function() {
        expect(function() { format(null)}).toThrow("template must be a string, got null") 
    })

    it("refuses undefined ", function() {
        expect(function() { format(undefined)}).toThrow("template must be a string, got undefined") 
    })
})

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
})

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
})

describe("isString", function() {
  
    beforeEach(LambdaScript.install)
  
    it("yields true when argument is string", function() {
        expect(isString("string")).toBeTruthy()
    })
  
    it("yields false when argument is undefined", function() {
        expect(isString(undefined)).toBeFalsy()
    })  

    it("yields false when argument is null", function() {
        expect(isString(null)).toBeFalsy()
    })  

    it("yields false when argument is a number", function() {
        expect(isString(0)).toBeFalsy()
    })  
})

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
})

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
    
    it("refuses null", function() {
        expect(function() { lambda(null) }).toThrow("expecting a string, not null")
    })
    
    it("refuses undefined", function() {
        expect(function() { lambda(undefined) }).toThrow("expecting a string, not undefined")
    })
    
    it("refuses empty string", function() {
        expect(function() { lambda("") }).toThrow("string cannot be empty")
    })
});

describe("pluck", function() {
  
    beforeEach(LambdaScript.install)
  
    it("can yields length of a string", function() {
        var lenghtOf = pluck('length')
        expect(lenghtOf("a")).toBe(1)
    })  
});

describe("zip", function() {
  
    beforeEach(LambdaScript.install)
  
    it("zips iterators of same lenght", function() {
        var zipped = zip([1, 2], [3, 4])
        expect(zipped).toEqual([[1,3], [2, 4]])
    })

    it("zips by the shortest iterator", function() {
        var zipped = zip([1], [3, 4])
        expect(zipped).toEqual([[1, 3]])    
    })
});

describe("keys", function() {
  
    beforeEach(LambdaScript.install)

    it("yields array indexes when argument is an array", function() {
        expect(keys(["a", "b"])).toEqual([0, 1])
    })

    it("yields keys when argument is an object", function() {
        var object = { a: 2, b: 3}
        expect(keys(object)).toEqual(['a', 'b'])
    })
})

describe("values", function() {
  
    beforeEach(LambdaScript.install)

    it("yields array values when argument is an array", function() {
        expect(values(["a", "b"])).toEqual(["a", "b"])
    })

    it("yields object values when argument is an object", function() {
        var object = { a: 2, b: 3}
        expect(values(object)).toEqual([2, 3])
    })
})

describe("lazymap", function() {
  
    beforeEach(LambdaScript.install)

    it("yields transfomed values according to mapping function", function() {
        var inc = function(x) { return x + 1 }
        expect(lazymap([0], inc).next()).toEqual(1)
    })

    it("yields nothing when called on empty array", function() {
        var identity = function(x) { return x }
        expect(lazymap([], identity).hasNext()).toBeFalsy()
    })
})

describe("iterate", function() {
  
    beforeEach(LambdaScript.install)

    it("yields f(x) first time", function() {
        var inc = function(x) { return x + 1 }
        expect(iterate(0, inc).next()).toEqual(1)
    })
})
