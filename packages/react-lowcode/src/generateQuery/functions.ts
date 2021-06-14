import { TypeAliasDeclaration } from 'ts-morph';

var nameOfQuery = 'myQuery';
var startOfQuery = 'query'
var objectIsQueryDefinition = 'query_root';
var startOfObject = '{';
var endOfObject = '}';
var limitOfCount = "$limit";

var isQueryWithName: boolean = false;
var allFragments = '';

var nameOfActualFragment = '';
var fullJson: any;

var newLine = '\n';
var doubleDot = ':';

/**
 * This method returns GraphQL query
 * @param data 
 * @returns 
 */
    export function generateNewIntrospectonQuery(data: any): string {
    fullJson = JSON.stringify(data);
    console.log('JSON: ', data)
    // introspectino => graphql AST
    var queryString = '';
    
    queryString += getParameters(data.types, true);
    queryString += newLine + newLine + allFragments;
    console.log('Konecny String:');
    console.log(queryString);
    var graphqlQuery = '';
    return graphqlQuery
}

/**
 * This method returns GraphQL query.
 * If call this method for first time mainBody argument is true, and if query hasn't extension syntax add end parenthesis
 * @param data 
 * @param mainBody 
 * @returns 
 */
    export function getParameters(data: any, mainBody: boolean = false): string {
    var queryString = '';

    Object.entries(data).forEach(([key, value], index, index2) => {
        //console.log( index, index2)
        queryString += addKeyToQuery(key, value, true);
        //console.log('On for Each: ',key, value)
        if (typeof (value as Array<unknown>) != 'string') {
            queryString += processEntityWhenIsObject((value as Array<unknown>));
        } else {
            queryString += value;
        }

        queryString += addKeyToQuery(key, value, false);
    });

    if (isQueryWithName && mainBody) {
        queryString += endOfObject;
    }
    
    return queryString;
}

/**
 * This method proccess data when data is object
 * @param data 
 * @returns 
 */
    export function processEntityWhenIsObject(data: any) {
    let queryString = '';

    if (data.length != undefined) {
        for (let index = 0; index < data.length; index++) {
            queryString += processEntityAccordKeys(data[index]);
        }
    } else {
        queryString += processEntityAccordKeys(data);
    }

    return queryString;
}

/**
 * This method add key to query if key isn't number
 * @param key 
 * @param data 
 * @param startOfParentesis 
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
                
    if ('name' in data) {
        if ( (data.name == objectIsQueryDefinition) && ('fields' in data) ) {
            queryString += definiteNewQuery(data)
            return queryString;
        } else {
            let searchedWord = new RegExp(':"'+data.name+'"', "g");
            //console.log('zistenie fragmentu: ',fullJson,(fullJson.match(searchedWord) || []).length, fullJson.match(searchedWord))
            if ((fullJson.match(searchedWord) || []).length > 1 && 'fields' in data) {
                queryString += makeNewFragment(data)
                return queryString;
            } else {
                queryString += data.name + ' ';
            }
        }
        
    }
    if ('type' in data) {
        queryString += addTypesToString(data.type);
    }
    if ('name' in data) {
        nameOfActualFragment += '_' + data.name
        //console.log('Name V type: ',data.name,nameOfActualFragment)
        queryString += (('fields' in data) ? startOfObject + newLine : '');
    }
    if ('fields' in data) {
        queryString += getParameters(data.fields);
    }
    if ('name' in data) {
        if (('fields' in data)) {
            queryString += endOfObject + newLine;
        } else {
            queryString += newLine;
        }

        nameOfActualFragment = nameOfActualFragment.slice(0,nameOfActualFragment.lastIndexOf('_'));
    }

    return queryString;
}

/**
 * This method process new fragment to another (global) string, which join to queryString on end process of composed query
 * @param data 
 */
    export function makeNewFragment(data: any) {
    let nameOfFragment = nameOfActualFragment + '_' + data.name;
    let queryString = '...' + nameOfFragment + newLine;
    allFragments += 'fragment ' + nameOfFragment + ' on ' + data.name + ' ' + startOfObject + newLine;
    
    allFragments += getParameters(data.fields)
    allFragments += endOfObject + newLine;

    //console.log('FRAGMENT: ', allFragments)
    return queryString;
}

/**
 * This method composed body of query with name
 * @param data 
 * @returns 
 */
    export function definiteNewQuery(data: any) {
    var queryString = '';
    //console.log('Zaciatok Query: ', data)

    isQueryWithName = true;
    nameOfActualFragment += data.fields[0].name;

    queryString += 'query' + ' ' + data.fields[0].name + ' (' + limitOfCount +': Limit = 100) ' + startOfObject + newLine;
    //queryString += getParameters(data.fields)

    return queryString
}

/**
 * This method give types for data
 * @param data 
 * @returns 
 */
    export function addTypesToString(data: any) {
    var string = ': ';
    var keys = Object.keys(data);

    for (let key = 0; key < keys.length; key++) {
        if (keys[key] == 'name') {
            string += data[keys[key]];
        }
    }

    return string;
}

/**
 * This method give arguments to parenthesis
 * @param data 
 * @returns 
 */
    export function addArgumentsToString(data: any) {
    var string = '( ';
    var keys = Object.keys(data);

    for (let key = 0; key < keys.length; key++) {
        string += keys[key] + ': ' + data[keys[key]];
    }
    
    string += ' )';

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
        return isStart ? startOfObject + newLine : endOfObject + newLine;
    } else {
        return '';
    }
}