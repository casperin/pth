const DEFAULT_IDENTIFIER = '$'
const DEFAULT_SPLITTER = '.'

module.exports = (path, opt) => {
    path = Array.isArray(path)
        ? path
        : path.split(opt.splitter || DEFAULT_SPLITTER)

    return path.map(pathMapper(opt.identifier || DEFAULT_IDENTIFIER))
}

const pathMapper = identifier => val => {
    const key = isKey(val, identifier)
    const value = key ? val.substr(identifier.length) : val
    return {key, value}
}

const isKey = (value, identifier) => {
    if (typeof value !== 'string') return false
    if (value.substr(0, identifier.length) !== identifier) return false
    return true
}
