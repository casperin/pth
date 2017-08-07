var tape = require('tape')
var pth = require('../lib')

tape('Searching', function (t) {
    var a1 = pth('$0.a.b.$1')({a: {b: {c: 42}}}, 'c')
    t.equal(a1, 42, "Simple search")

    var a2 = pth('$2.foo.$0')('a', 'not used', {foo: {a: 43}})
    t.equal(a2, 43, "Reverse arg order")

    var a3 = pth('$0.$1.$1')({k: {k: 44}}, 'k')
    t.equal(a3, 44, "Using args more than once")

    var a4 = pth('$0.$1', {or: 'foo'})({z: {k: 44}}, 'k')
    t.equal(a4, 'foo', "Default value")

    var a5 = pth('$0.$1', {or: 'foo'})({k: 0}, 'k')
    t.equal(a5, 0, "Don't give default value for falsy value (0)")

    var a6 = pth(['$0', '$1'])({k: 0}, 'k')
    t.equal(a6, 0, "array as path")

    var a7 = pth('%0->%1', {identifier: '%', splitter: '->'})({k: 0}, 'k')
    t.equal(a7, 0, "Different identifier and splitter")

    t.end()
})

tape('Failing', function (t) {
    var a1 = pth('$0.a')(undefined);
    t.equal(a1, undefined, 'Should "fail" gracefully')

    var a2 = pth('$0.a.$1')({a: {b: {c: 42}}}, 'c')
    t.equal(a2, undefined, 'Should "fail" gracefully')

    var a3 = pth('$0.$1.$2')({a: 3}, 'a', 'b')
    t.equal(a3, undefined, 'Should "fail" gracefully #2')

    var a4 = pth('$0.a.$1')({a: [10, 11, 12, 13]}, 2)
    t.equal(a4, 12, 'Find items in array')

    var a5 = pth('$0.a')(null);
    t.equal(a5, undefined, 'Should "fail" gracefully')

    var a6 = pth('$0.a')('hello');
    t.equal(a6, undefined, 'Should "fail" gracefully')

    t.end()
})

tape('Throwing', function (t) {
    t.throws(function () { pth('a') }, 'Needs a ref as first arg')

    t.end()
})

tape('fromObject searching', function (t) {
    var a1 = pth.fromObject('users.$id.name')({users: {foo: {name: 'Dan'}}}, {id: 'foo'})
    t.equal(a1, 'Dan', "Should find Dan")

    var a2 = pth.fromObject('users.$id.name', {or: 'Paul'})({users: 'Dan'}, {id: 'foo'})
    t.equal(a2, 'Paul', "fromObject: or")

    t.end()
})
