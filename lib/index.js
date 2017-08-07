const toPath = require('./toPath')
const fromObject = require('./fromObject')

function pth (path, opt = {}) {
    path = toPath(path, opt)

    if (!path[0].key) {
        throw Error('The first "argument" passed into pth should refer to ' +
                    'something passed in later (like $0). You passed in ' +
                    path[0].value)
    }

    return function () {
        var result = arguments[path[0].value]

        for (let {key, value} of path.slice(1)) {
            if (result == undefined) return opt.or

            result = key
                ? result[arguments[value]]
                : result[value]
        }

        return result == undefined ? opt.or : result
    }
}

pth.fromObject = fromObject
module.exports =  pth
