
export function removeNullKey(object: { [key: string | number]: any }) {
    var obj: any = {};
    for (let key in object) {
        if (object[key] != null) {
            obj[key] = object[key];
        }
    }
    return obj;
}