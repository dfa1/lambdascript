package com.humaorie.lambdascript;

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
import com.humaorie.lambdascript.internal.JavaScriptInclude;
import com.humaorie.lambdascript.internal.JavaScriptTest;
import com.humaorie.lambdascript.internal.RhinoRunner;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.mozilla.javascript.Context;

@RunWith(RhinoRunner.class)
@JavaScriptInclude({
    "src/main/javascript/lambdascript.js",
    "src/test/java/com/humaorie/lambdascript/internal/test.js"
})
@JavaScriptTest("src/test/javascript/ProjectEulerTest.js")
public class ProjectEulerTest {

    @BeforeClass
    public static void setUpContext(Context context) {
        context.setLanguageVersion(Context.VERSION_1_5);
    }
}
