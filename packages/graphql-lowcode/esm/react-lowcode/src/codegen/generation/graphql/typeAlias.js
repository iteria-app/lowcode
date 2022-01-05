export var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["string"] = 0] = "string";
    PropertyType[PropertyType["numeric"] = 1] = "numeric";
    PropertyType[PropertyType["datetime"] = 2] = "datetime";
    PropertyType[PropertyType["date"] = 3] = "date";
    PropertyType[PropertyType["time"] = 4] = "time";
    PropertyType[PropertyType["currency"] = 5] = "currency";
    PropertyType[PropertyType["navigation"] = 6] = "navigation";
})(PropertyType || (PropertyType = {}));
export function getPropertyType(prop) {
    switch (prop.getType().toLowerCase()) {
        case 'date': return PropertyType.date;
        case 'timestamptz': return PropertyType.datetime;
        case 'timez': return PropertyType.time;
        case 'uuid': return PropertyType.navigation;
        case 'bigint' || 'int': return PropertyType.numeric;
        case 'money': return PropertyType.currency;
        default: return PropertyType.string;
    }
}
