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
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import org.junit.BeforeClass;
import org.junit.runner.Description;
import org.junit.runner.Runner;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunNotifier;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.RhinoException;
import org.mozilla.javascript.Scriptable;

public class RhinoRunner extends Runner {

    private final String sourceFile;
    private final Class testClass;

    public RhinoRunner(Class cls) throws Exception {
        if (!cls.isAnnotationPresent(JavaScriptTest.class)) {
            throw new IllegalArgumentException("missing @JavaScriptSource annotation");
        }

        JavaScriptTest javaScriptSource = (JavaScriptTest) cls.getAnnotation(JavaScriptTest.class);
        sourceFile = javaScriptSource.value();
        testClass = cls;
    }

    @Override
    public Description getDescription() {
        return Description.createTestDescription(testClass, sourceFile);
    }

    @Override
    public void run(RunNotifier notifier) {
        Context context = Context.enter();
        Scriptable scope = context.initStandardObjects();
        String propertyName = "";

        try {
            // evaluates includes
            JavaScriptInclude include = (JavaScriptInclude) testClass.getAnnotation(JavaScriptInclude.class);

            for (String file : include.value()) {
                context.evaluateReader(scope, new FileReader(file), file, 1, null);
            }

            // customize context
            for (Method method : testClass.getDeclaredMethods()) {
                if (Modifier.isStatic(method.getModifiers()) && method.isAnnotationPresent(BeforeClass.class)) {
                    Class[] parameterTypes = method.getParameterTypes();

                    if (parameterTypes != null && parameterTypes.length == 1 && parameterTypes[0].isInstance(context)) {
                        try {
                            method.invoke(null, context);
                        } catch (Exception ex) {
                            throw new RuntimeException(ex);
                        }
                    }
                }
            }

            // evaluates sourceFile
            context.evaluateReader(scope, new FileReader(sourceFile), sourceFile, 1, null);

            // run all functions that starts with "test" in the object "suite"
            Scriptable suite = (Scriptable) scope.get("suite", scope);

            // run functions prefixed with "test"
            for (Object name : NativeObject.getPropertyIds(suite)) {
                propertyName = (String) name;

                if (propertyName.startsWith("test")) {
                    Object property = NativeObject.getProperty(suite, (String) name);

                    if (property instanceof Function) {
                        Function test = (Function) property;
                        notifier.fireTestStarted(Description.createTestDescription(testClass, propertyName));
                        test.call(context, scope, suite, null);
                        notifier.fireTestFinished(Description.createTestDescription(testClass, propertyName));
                    }
                }
            }
        } catch (RhinoException exception) {
            notifier.fireTestFailure(new Failure(Description.createTestDescription(testClass, propertyName + ": " + exception.details()), exception));
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }
}
