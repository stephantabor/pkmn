export function extend(obj1, obj2) {
    Object.keys(obj2).forEach(key => {
        obj1[key] = obj2[key];
    });
}

export function urlJoin(...parts) {
    return parts
        .map(part => '' + part)
        .map(part => part.replace(/^(\/)|(\/)$/g, ''))
        .reduce((url, part) => url + '/' + part);
}
