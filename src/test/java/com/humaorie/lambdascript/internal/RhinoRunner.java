package com.humaorie.lambdascript.internal;

/*
 * LambdaScript, http://bitbucket.org/dfa/lambdascript
 * (c) 2009, 2010 Davide Angelocola <davide.angelocola@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
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

    private final String sourceFile;

    public RhinoRunner(Class cls) throws Exception {
        if (!cls.isAnnotationPresent(JavaScriptSourceFile.class)) {
            throw new IllegalArgumentException("missing @JavaScriptSourceFile annotation");
        }

        this.sourceFile = ((JavaScriptSourceFile) cls.getAnnotation(JavaScriptSourceFile.class)).value();
    }

    @Override
    public Description getDescription() {
        return Description.createTestDescription(String.class, sourceFile);
    }

    @Override
    public void run(RunNotifier notifier) {
        setup(notifier);
    }

    private void setup(RunNotifier notifier) {
        try {
            // dependencies
            Context context = Context.enter();
            context.setLanguageVersion(Context.VERSION_1_5);
            Scriptable scope = context.initStandardObjects();
            context.evaluateReader(scope, new FileReader("src/main/javascript/lambdascript.js"), "lambdascript.js", 1, null);
            context.evaluateString(scope, "LambdaScript.install();", "string", 1, null);
            context.evaluateReader(scope, new FileReader("src/test/java/com/humaorie/lambdascript/internal/test.js"), "test.js", 1, null);

            // evaluates sourceFile
            context.evaluateReader(scope, new FileReader(sourceFile), sourceFile, 1, null);

            // run all functions that starts with "test" in the object "suite"
            Scriptable suite = (Scriptable) scope.get("suite", scope);

            for (Object name : NativeObject.getPropertyIds(suite)) {
                String propertyName = (String) name;

                if (propertyName.startsWith("test")) {
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