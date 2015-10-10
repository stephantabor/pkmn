export function extend(obj1, obj2) {
    Object.keys(obj2).forEach(key => {
        obj1[key] = obj2[key];
    });
}
