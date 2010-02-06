package com.humaorie.lambdascript;

import com.humaorie.lambdascript.internal.JavaScriptSourceFile;
import com.humaorie.lambdascript.internal.RhinoRunner;
import org.junit.runner.RunWith;

@RunWith(RhinoRunner.class)
@JavaScriptSourceFile("src/test/javascript/LambdaScriptTest.js")
public class LambdaScriptTest {
}
