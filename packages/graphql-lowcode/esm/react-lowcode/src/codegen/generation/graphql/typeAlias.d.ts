import { Property } from '../entity';
export declare enum PropertyType {
    string = 0,
    numeric = 1,
    datetime = 2,
    date = 3,
    time = 4,
    currency = 5,
    navigation = 6
}
export declare function getPropertyType(prop: Property): PropertyType;
