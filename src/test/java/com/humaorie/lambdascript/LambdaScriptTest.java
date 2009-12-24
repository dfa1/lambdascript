package com.humaorie.lambdascript;

import java.io.FileReader;
import java.io.IOException;
import org.junit.Test;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

// TODO: write a custom runner
public class LambdaScriptTest {

    public void runSuite(int javascriptVersion) throws IOException {
        Context context = Context.enter();
        context.setLanguageVersion(javascriptVersion);
        Scriptable scope = context.initStandardObjects();
        context.evaluateReader(scope, new FileReader("src/main/javascript/lambdascript.js"), "lambdascript.js", 1, null);
        context.evaluateString(scope, "LambdaScript.install();", "string", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/test.js"), "test.js", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/timer.js"), "timer.js", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/javascript/lambdascriptTest.js"), "", 1, null);
        context.evaluateReader(scope, new FileReader("src/test/javascript/eulerTest.js"), "", 1, null);
    }
    
//    @Test
//    public void javascript10() throws IOException {
//        runSuite(Context.VERSION_1_0);
//    }
//
//    @Test
//    public void javascript11() throws IOException {
//        runSuite(Context.VERSION_1_1);
//    }
//
//    @Test
//    public void javascript12() throws IOException {
//        runSuite(Context.VERSION_1_2);
//    }
//
//    @Test
//    public void javascript13() throws IOException {
//        runSuite(Context.VERSION_1_3);
//    }
//
//    @Test
//    public void javascript14() throws IOException {
//        runSuite(Context.VERSION_1_4);
//    }
//
//    @Test
//    public void javascript15() throws IOException {
//        runSuite(Context.VERSION_1_5);
//    }

    @Test
    public void javascript16() throws IOException {
        runSuite(Context.VERSION_1_6);
    }

    @Test
    public void javascript17() throws IOException {
        runSuite(Context.VERSION_1_7);
    }
}
