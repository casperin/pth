const toPath = require('./toPath')

module.exports = function fromObject (path, opt = {}) {
    path = toPath(path, opt)

    return function (result, o) {
        for (let {key, value} of path) {
            if (result == undefined) return opt.or

            result = key
                ? result[o[value]]
                : result[value]
        }

        return result == undefined ? opt.or : result
    }
}

