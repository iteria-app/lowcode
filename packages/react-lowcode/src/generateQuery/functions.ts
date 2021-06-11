import { TypeAliasDeclaration } from 'ts-morph';

var nameOfQuery = 'myQuery';
var startOfQuery = 'query'
var startOfObject = '{';
var endOfObject = '}';

var newLine = '\n';
var doubleDot = ':';

/**
 * This method returns GraphQL query
 * @param data 
 * @returns 
 */
 export function generateNewIntrospectonQuery(data: any): string {
    console.log('JSON: ', data)
    // introspectino => graphql AST
    var queryString = '';
    queryString = startOfQuery + ' ' + nameOfQuery + ' ' + startOfObject + newLine;
    queryString += getParameters(data);
    queryString += endOfObject + newLine;
    console.log('Konecny String: ',queryString);
    var graphqlQuery = '';
    return graphqlQuery
}

/**
 * This method returns GraphQL query
 * @param data 
 * @returns 
 */
 export function getParameters(data: any): string {
    var queryString = '';
    Object.entries(data).forEach(([key, value]) => {

        queryString += addKeyToQuery(key, value, true);

        if (typeof (value as Array<unknown>) != 'string') {
            
            if ((value as Array<unknown>).length != undefined) {
                for (let index = 0; index < (value as Array<unknown>).length; index++) {
                    queryString += processEntityAccordKeys((value as Array<unknown>)[index])
                }
            } else {
                queryString += processEntityAccordKeys(value as Array<unknown>)
            }

        } else {
            queryString += value;
        }

        queryString += addKeyToQuery(key, value, false);
    });
    
    return queryString;
}

/**
 * This method add key to query if key isn't number
 * @param key 
 * @param data 
 * @returns 
 */
 export function addKeyToQuery(key: any, data: any, startOfParentesis: boolean) {
    if (isNaN(Number(key)) ) {
        let stringToReturn = startOfParentesis ? key + ' ' : ''; 
        stringToReturn += addParenthesisByValue(data, startOfParentesis);
        return stringToReturn;
    } else {
        return '';
    }
}

/**
 * This method return part of query by a keys of object
 * @param data 
 * @returns 
 */
 export function processEntityAccordKeys(data: any) {
    var queryString = '';
    let valueInFor = (data);
                
    if ('name' in valueInFor) {
        queryString += valueInFor.name + ' ';
    }
    if ('type' in valueInFor) {
        queryString += addTypesToString(valueInFor.type)
    }
    if ('name' in valueInFor) {
        queryString += (('fields' in valueInFor) ? startOfObject + newLine : '');
    }
    if ('fields' in valueInFor) {
        queryString += getParameters(valueInFor.fields)
    }
    if ('name' in valueInFor) {
        if (('fields' in valueInFor)) {
            queryString += endOfObject + newLine;
        } else {
            queryString += newLine;
        }
    }
    return queryString;
}

/**
 * This method give arguments to parenthesis
 * @param data 
 * @returns 
 */
 export function addTypesToString(data: any) {
    var string = '( '
    var keys = Object.keys(data)

    for (let key = 0; key < keys.length; key++) {
        string += keys[key] + ': ' + data[keys[key]]
        
    }
    
    string += ' )'

    return string;
}


/**
 * This method return parenthesis oriented like we need 
 * @param data 
 * @param isStart 
 * @returns 
 */
 export function addParenthesisByValue(data: any, isStart: boolean) {
    if (typeof data != 'string') {
        return isStart ? startOfObject + newLine : endOfObject + newLine
    } else {
        return ''
    }
}
 