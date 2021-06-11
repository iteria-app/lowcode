export function getScenario(scenario: string): any {
    let scenario1 = {
        types: [
            {
            name: 'query_root',
            fields: [
                {
                name: 'entity1s',
                type: {
                    name: 'entity1'
                }
                }
            ]
            },
            {
            name: 'entity1',
            fields: [
                {
                name: 'id',
                type: {
                    name: 'uuid'
                }
                },
                {
                name: 'name',
                type: {
                    name: 'string'
                }
                }
            ]
            }
        ]
    };

    let scenario2 = {
        types: [
            {
            name: 'query_root',
            fields: [
                {
                name: 'entity1s',
                type: {
                    name: 'entity'
                }
                }
            ]
            },
            {
            name: 'entity',
            fields: [
                {
                name: 'id',
                type: {
                    name: 'uuid'
                }
                },
                {
                name: 'level1s',
                type: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                    kind: 'LIST',
                    name: null,
                    ofType: {
                        kind: 'NON_NULL',
                        name: null,
                        ofType: {
                        kind: 'OBJECT',
                        name: 'level1',
                        ofType: null
                        }
                    }
                    }
                }
                }
            ]
            },
            {
            name: 'level1',
            fields: [
                {
                name: 'name',
                type: {
                    name: 'string'
                }
                },
                {
                name: 'level2',
                type: {
                    name: 'level2'
                }
                }
            ]
            },
            {
            name: 'level2',
            fields: [
                {
                name: 'message',
                type: {
                    name: 'string'
                }
                },
                {
                name: 'level1',
                type: {
                    name: 'level2_level1'
                }
                }
            ]
            },
            {
            name: 'level2_level1',
            fields: [
                {
                name: 'id',
                type: {
                    name: 'uuid'
                }
                }
            ]
            }
        ]
    };

    let scenario3 = {
        types: [
            {
            name: 'query_root',
            fields: [
                {
                name: 'entity1s',
                }
            ]
            }
        ]
    };

    let scenario4 = {
        types: [
            {
            name: 'query_root'
            }
        ],
        aaa: [
            'aaa'
        ]
    };
        
    switch (scenario) {
        case '1':
            return scenario1
            break;
        case '2':
            return scenario2
            break;
        case '3':
            return scenario3
            break;
        case '4':
            return scenario4
            break;
        default:
            return scenario1
            break;
    }
}
 
 