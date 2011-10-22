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

// inspired by
// http://stackoverflow.com/questions/1266402/implementing-mathematical-sets-in-javascript
Array.prototype.contains = function(e) {
    return this.lastIndexOf(e, this.length) != -1;
};


Array.prototype.notContains = function(e) {
    return this.lastIndexOf(e, this.length) == -1;
};

function union(a1, a2) {
    var res = [];

    each(a1, function(e) {
        res.push(e);
    });

    each(a2, function(e) {
        if (res.notContains(e)) {
            res.push(e);
        }
    });

    return res;
};

function intersection(a1, a2) {
    var res = [];

    each(a1, function(e) {
        if (a2.contains(e)) {
            res.push(e);
        }
    });

    return res;
};

function product(a1, a2) {
    var res = [];

    each(a1, function(e) {
        each(a2, function (f) {
            res.push(e + 'x' + f)
        })
    });

    return res;
};
