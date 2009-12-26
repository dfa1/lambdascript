package com.humaorie.lambdascript;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import org.junit.runner.Description;
import org.junit.runner.Runner;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunNotifier;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;

public class RhinoRunner extends Runner {

    public RhinoRunner(Class cls) throws Exception {
        // required by JUnit
    }

    @Override
    public Description getDescription() {
        return Description.createTestDescription(String.class, "lambdascript");
    }

    @Override
    public void run(RunNotifier notifier) {
        setup(notifier);
    }

    private void setup(RunNotifier notifier) {
        try {
            Context context = Context.enter();
            context.setLanguageVersion(Context.VERSION_1_5);
            Scriptable scope = context.initStandardObjects();
            context.evaluateReader(scope, new FileReader("src/main/javascript/lambdascript.js"), "lambdascript.js", 1, null);
            context.evaluateString(scope, "LambdaScript.install();", "string", 1, null);
            context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/test.js"), "test.js", 1, null);
            context.evaluateReader(scope, new FileReader("src/test/javascript/lambdascriptTest.js"), "", 1, null);
            //context.evaluateReader(scope, new FileReader("src/test/javascript/eulerTest.js"), "", 1, null);

            // getting Suite and invoke the run method
            Scriptable suite = (Scriptable) scope.get("suite", scope);

            for (Object name : NativeObject.getPropertyIds(suite)) {
                String propertyName = (String) name;

                if (propertyName.startsWith("test")) {
                    // we are interested only in test functions
                    Object property = NativeObject.getProperty(suite, (String) name);

                    if (property instanceof Function) {
                        Function test = (Function) property;
                        notifier.fireTestStarted(Description.createTestDescription(String.class, propertyName));
                        test.call(context, scope, suite, null);

                        notifier.fireTestFinished(Description.createTestDescription(String.class, propertyName));
                    }
                }
            }
        } catch (JavaScriptException e) {
            notifier.fireTestFailure(new Failure(Description.createTestDescription(String.class, e.details()), e));
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }
}
