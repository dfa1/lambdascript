package com.humaorie.lambdascript;

import java.io.FileReader;
import java.io.IOException;
import org.junit.Test;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

// TODO: write a custom runner
public class LambdaScriptTest {

    @Test
    public void test() throws IOException {
        Context context = Context.enter();
        Scriptable scope = context.initStandardObjects();
        context.evaluateReader(scope, new FileReader("src/main/javascript/functional.js"), "functional.js", 1, null);
        context.evaluateString(scope, "LambdaScript.install();", "string", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/test.js"), "test.js", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/timer.js"), "timer.js", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/javascript/functionalTest.js"), "", 1, null);
    }
}
