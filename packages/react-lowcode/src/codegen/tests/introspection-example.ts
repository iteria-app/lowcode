export const is2 = {
	"data": {
		"__schema": {
			"directives": [
				{
					"args": [
						{
							"name": "if",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"name": "include",
					"locations": [
						"FIELD",
						"FRAGMENT_SPREAD",
						"INLINE_FRAGMENT"
					],
					"description": null
				},
				{
					"args": [
						{
							"name": "if",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"name": "skip",
					"locations": [
						"FIELD",
						"FRAGMENT_SPREAD",
						"INLINE_FRAGMENT"
					],
					"description": null
				}
			],
			"queryType": {
				"name": "query_root"
			},
			"subscriptionType": {
				"name": "subscription_root"
			},
			"types": [
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "Boolean",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "Float",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "ID",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "Int",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "Int_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type Int. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "String",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_ilike",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_like",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nilike",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_nlike",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nsimilar",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_similar",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "String_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type String. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__Directive",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "args",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "__InputValue",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "locations",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "ENUM",
											"name": "__DirectiveLocation",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "__DirectiveLocation",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "ARGUMENT_DEFINITION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "ENUM",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "ENUM_VALUE",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "FIELD",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "FIELD_DEFINITION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "FRAGMENT_DEFINITION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "FRAGMENT_SPREAD",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INLINE_FRAGMENT",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INPUT_FIELD_DEFINITION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INPUT_OBJECT",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INTERFACE",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "MUTATION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "OBJECT",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "QUERY",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "SCALAR",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "SCHEMA",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "SUBSCRIPTION",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "UNION",
							"description": null
						}
					],
					"description": null,
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__EnumValue",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "deprecationReason",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "isDeprecated",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__Field",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "args",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "__InputValue",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "deprecationReason",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "isDeprecated",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "type",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Type",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__InputValue",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "defaultValue",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "type",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Type",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__Schema",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "directives",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "__Directive",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "mutationType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "queryType",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Type",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "subscriptionType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "types",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "__Type",
											"ofType": null
										}
									}
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "__Type",
					"enumValues": null,
					"description": null,
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [
								{
									"name": "includeDeprecated",
									"defaultValue": "false",
									"type": {
										"kind": "SCALAR",
										"name": "Boolean",
										"ofType": null
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "enumValues",
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__EnumValue",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"args": [
								{
									"name": "includeDeprecated",
									"defaultValue": "false",
									"type": {
										"kind": "SCALAR",
										"name": "Boolean",
										"ofType": null
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "fields",
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__Field",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "inputFields",
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__InputValue",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "interfaces",
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__Type",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "kind",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "ENUM",
									"name": "__TypeKind",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "ofType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "possibleTypes",
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__Type",
										"ofType": null
									}
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "__TypeKind",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "ENUM",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INPUT_OBJECT",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "INTERFACE",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "LIST",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "NON_NULL",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "OBJECT",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "SCALAR",
							"description": null
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "UNION",
							"description": null
						}
					],
					"description": null,
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer",
					"enumValues": null,
					"description": "columns and relationships of \"customer\"",
					"fields": [
						{
							"args": [
								{
									"name": "path",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									},
									"description": "JSON select path"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "address",
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avatarUrl",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "timestamptz",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "email",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "uuid",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "phone",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "testdate",
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updatedAt",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "timestamptz",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_aggregate",
					"enumValues": null,
					"description": "aggregated selection of \"customer\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "aggregate",
							"type": {
								"kind": "OBJECT",
								"name": "customer_aggregate_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "nodes",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "customer",
											"ofType": null
										}
									}
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_aggregate_fields",
					"enumValues": null,
					"description": "aggregate fields of \"customer\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avg",
							"type": {
								"kind": "OBJECT",
								"name": "customer_avg_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [
								{
									"name": "columns",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "customer_select_column",
												"ofType": null
											}
										}
									},
									"description": null
								},
								{
									"name": "distinct",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Boolean",
										"ofType": null
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "max",
							"type": {
								"kind": "OBJECT",
								"name": "customer_max_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "min",
							"type": {
								"kind": "OBJECT",
								"name": "customer_min_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "stddev",
							"type": {
								"kind": "OBJECT",
								"name": "customer_stddev_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "stddev_pop",
							"type": {
								"kind": "OBJECT",
								"name": "customer_stddev_pop_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "stddev_samp",
							"type": {
								"kind": "OBJECT",
								"name": "customer_stddev_samp_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "sum",
							"type": {
								"kind": "OBJECT",
								"name": "customer_sum_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "var_pop",
							"type": {
								"kind": "OBJECT",
								"name": "customer_var_pop_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "var_samp",
							"type": {
								"kind": "OBJECT",
								"name": "customer_var_samp_fields",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "variance",
							"type": {
								"kind": "OBJECT",
								"name": "customer_variance_fields",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "avg",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_avg_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "count",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "max",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_max_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "min",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_min_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "stddev",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_stddev_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "stddev_pop",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_stddev_pop_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "stddev_samp",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_stddev_samp_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "sum",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_sum_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "var_pop",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_var_pop_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "var_samp",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_var_samp_order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "variance",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_variance_order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_aggregate_order_by",
					"enumValues": null,
					"description": "order by aggregate values of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_append_input",
					"enumValues": null,
					"description": "append existing jsonb value of filtered columns with new jsonb value",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "customer_insert_input",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_arr_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting array relation for remote table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_avg_fields",
					"enumValues": null,
					"description": "aggregate avg on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_avg_order_by",
					"enumValues": null,
					"description": "order by avg() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_and",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "customer_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "_not",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_bool_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_or",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "customer_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "jsonb_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "timestamptz_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "uuid_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "Int_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "date_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "timestamptz_comparison_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_bool_exp",
					"enumValues": null,
					"description": "Boolean expression to filter rows from the table \"customer\". All fields are combined with a logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_constraint",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customer_pkey",
							"description": "unique or primary key constraint"
						}
					],
					"description": "unique or primary key constraints on table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_delete_at_path_input",
					"enumValues": null,
					"description": "delete the field or element with specified path (for JSON arrays, negative integers count from the end)",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_delete_elem_input",
					"enumValues": null,
					"description": "delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_delete_key_input",
					"enumValues": null,
					"description": "delete key/value pair or string element. key/value pairs are matched based on their key value",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_inc_input",
					"enumValues": null,
					"description": "input type for incrementing integer column in table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_insert_input",
					"enumValues": null,
					"description": "input type for inserting data into table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_max_fields",
					"enumValues": null,
					"description": "aggregate max on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avatarUrl",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "email",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "phone",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "testdate",
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updatedAt",
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_max_order_by",
					"enumValues": null,
					"description": "order by max() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_min_fields",
					"enumValues": null,
					"description": "aggregate min on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avatarUrl",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "email",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "phone",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "testdate",
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updatedAt",
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_min_order_by",
					"enumValues": null,
					"description": "order by min() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_mutation_response",
					"enumValues": null,
					"description": "response of any mutation on the table \"customer\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "affected_rows",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								}
							},
							"description": "number of affected rows by the mutation"
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "returning",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "customer",
											"ofType": null
										}
									}
								}
							},
							"description": "data of the affected rows by the mutation"
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "customer_insert_input",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_obj_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting object relation for remote table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "constraint",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "ENUM",
									"name": "customer_constraint",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "update_columns",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "ENUM",
											"name": "customer_update_column",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "where",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "customer_bool_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_on_conflict",
					"enumValues": null,
					"description": "on conflict condition type for table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_order_by",
					"enumValues": null,
					"description": "ordering options when selecting data from \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "uuid",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_pk_columns_input",
					"enumValues": null,
					"description": "primary key columns input for table: \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_prepend_input",
					"enumValues": null,
					"description": "prepend existing jsonb value of filtered columns with new jsonb value",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_select_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "address",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avatarUrl",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "email",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "phone",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "testdate",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updatedAt",
							"description": "column name"
						}
					],
					"description": "select columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "address",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "avatarUrl",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "email",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "name",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "phone",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "testdate",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "updatedAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_set_input",
					"enumValues": null,
					"description": "input type for updating data in table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_stddev_fields",
					"enumValues": null,
					"description": "aggregate stddev on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_stddev_order_by",
					"enumValues": null,
					"description": "order by stddev() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_stddev_pop_fields",
					"enumValues": null,
					"description": "aggregate stddev_pop on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_stddev_pop_order_by",
					"enumValues": null,
					"description": "order by stddev_pop() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_stddev_samp_fields",
					"enumValues": null,
					"description": "aggregate stddev_samp on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_stddev_samp_order_by",
					"enumValues": null,
					"description": "order by stddev_samp() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_sum_fields",
					"enumValues": null,
					"description": "aggregate sum on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_sum_order_by",
					"enumValues": null,
					"description": "order by sum() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_update_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "address",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "avatarUrl",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "email",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "name",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "phone",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "testdate",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updatedAt",
							"description": "column name"
						}
					],
					"description": "update columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_var_pop_fields",
					"enumValues": null,
					"description": "aggregate var_pop on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_var_pop_order_by",
					"enumValues": null,
					"description": "order by var_pop() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_var_samp_fields",
					"enumValues": null,
					"description": "aggregate var_samp on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_var_samp_order_by",
					"enumValues": null,
					"description": "order by var_samp() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "customer_variance_fields",
					"enumValues": null,
					"description": "aggregate variance on columns",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test2",
							"type": {
								"kind": "SCALAR",
								"name": "Float",
								"ofType": null
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "test2",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "customer_variance_order_by",
					"enumValues": null,
					"description": "order by variance() on columns of table \"customer\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "date",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "date",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "date",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "date",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "date_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type date. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "jsonb",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_contained_in",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": "is the column contained in the given json value"
						},
						{
							"name": "_contains",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": "does the column contain the given json value at the top level"
						},
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_has_key",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": "does the string exist as a top-level key in the column"
						},
						{
							"name": "_has_keys_all",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								}
							},
							"description": "do all of these strings exist as top-level keys in the column"
						},
						{
							"name": "_has_keys_any",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								}
							},
							"description": "do any of these strings exist as top-level keys in the column"
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "jsonb",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "jsonb",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "jsonb",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "jsonb_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type jsonb. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "mutation_root",
					"enumValues": null,
					"description": "mutation root",
					"fields": [
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "deleteCustomer",
							"type": {
								"kind": "OBJECT",
								"name": "customer",
								"ofType": null
							},
							"description": "delete single row from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "customer_bool_exp",
											"ofType": null
										}
									},
									"description": "filter the rows which have to be deleted"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "deleteCustomers",
							"type": {
								"kind": "OBJECT",
								"name": "customer_mutation_response",
								"ofType": null
							},
							"description": "delete data from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "products_bool_exp",
											"ofType": null
										}
									},
									"description": "filter the rows which have to be deleted"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "delete_products",
							"type": {
								"kind": "OBJECT",
								"name": "products_mutation_response",
								"ofType": null
							},
							"description": "delete data from the table: \"products\""
						},
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "delete_products_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "products",
								"ofType": null
							},
							"description": "delete single row from the table: \"products\""
						},
						{
							"args": [
								{
									"name": "object",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "customer_insert_input",
											"ofType": null
										}
									},
									"description": "the row to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insertCustomer",
							"type": {
								"kind": "OBJECT",
								"name": "customer",
								"ofType": null
							},
							"description": "insert a single row into the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "objects",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "LIST",
											"name": null,
											"ofType": {
												"kind": "NON_NULL",
												"name": null,
												"ofType": {
													"kind": "INPUT_OBJECT",
													"name": "customer_insert_input",
													"ofType": null
												}
											}
										}
									},
									"description": "the rows to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insertCustomers",
							"type": {
								"kind": "OBJECT",
								"name": "customer_mutation_response",
								"ofType": null
							},
							"description": "insert data into the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "objects",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "LIST",
											"name": null,
											"ofType": {
												"kind": "NON_NULL",
												"name": null,
												"ofType": {
													"kind": "INPUT_OBJECT",
													"name": "products_insert_input",
													"ofType": null
												}
											}
										}
									},
									"description": "the rows to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insert_products",
							"type": {
								"kind": "OBJECT",
								"name": "products_mutation_response",
								"ofType": null
							},
							"description": "insert data into the table: \"products\""
						},
						{
							"args": [
								{
									"name": "object",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "products_insert_input",
											"ofType": null
										}
									},
									"description": "the row to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insert_products_one",
							"type": {
								"kind": "OBJECT",
								"name": "products",
								"ofType": null
							},
							"description": "insert a single row into the table: \"products\""
						},
						{
							"args": [
								{
									"name": "objects",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "LIST",
											"name": null,
											"ofType": {
												"kind": "NON_NULL",
												"name": null,
												"ofType": {
													"kind": "INPUT_OBJECT",
													"name": "user_insert_input",
													"ofType": null
												}
											}
										}
									},
									"description": "the rows to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insert_user",
							"type": {
								"kind": "OBJECT",
								"name": "user_mutation_response",
								"ofType": null
							},
							"description": "insert data into the table: \"user\""
						},
						{
							"args": [
								{
									"name": "object",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "user_insert_input",
											"ofType": null
										}
									},
									"description": "the row to be inserted"
								},
								{
									"name": "on_conflict",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_on_conflict",
										"ofType": null
									},
									"description": "on conflict condition"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "insert_user_one",
							"type": {
								"kind": "OBJECT",
								"name": "user",
								"ofType": null
							},
							"description": "insert a single row into the table: \"user\""
						},
						{
							"args": [
								{
									"name": "_append",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_append_input",
										"ofType": null
									},
									"description": "append existing jsonb value of filtered columns with new jsonb value"
								},
								{
									"name": "_delete_at_path",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_at_path_input",
										"ofType": null
									},
									"description": "delete the field or element with specified path (for JSON arrays, negative integers count from the end)"
								},
								{
									"name": "_delete_elem",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_elem_input",
										"ofType": null
									},
									"description": "delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array"
								},
								{
									"name": "_delete_key",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_key_input",
										"ofType": null
									},
									"description": "delete key/value pair or string element. key/value pairs are matched based on their key value"
								},
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_prepend",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_prepend_input",
										"ofType": null
									},
									"description": "prepend existing jsonb value of filtered columns with new jsonb value"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "pk_columns",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "customer_pk_columns_input",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updateCustomer",
							"type": {
								"kind": "OBJECT",
								"name": "customer",
								"ofType": null
							},
							"description": "update single row of the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "_append",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_append_input",
										"ofType": null
									},
									"description": "append existing jsonb value of filtered columns with new jsonb value"
								},
								{
									"name": "_delete_at_path",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_at_path_input",
										"ofType": null
									},
									"description": "delete the field or element with specified path (for JSON arrays, negative integers count from the end)"
								},
								{
									"name": "_delete_elem",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_elem_input",
										"ofType": null
									},
									"description": "delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array"
								},
								{
									"name": "_delete_key",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_delete_key_input",
										"ofType": null
									},
									"description": "delete key/value pair or string element. key/value pairs are matched based on their key value"
								},
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_prepend",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_prepend_input",
										"ofType": null
									},
									"description": "prepend existing jsonb value of filtered columns with new jsonb value"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "customer_bool_exp",
											"ofType": null
										}
									},
									"description": "filter the rows which have to be updated"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "updateCustomers",
							"type": {
								"kind": "OBJECT",
								"name": "customer_mutation_response",
								"ofType": null
							},
							"description": "update data of the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "products_bool_exp",
											"ofType": null
										}
									},
									"description": "filter the rows which have to be updated"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "update_products",
							"type": {
								"kind": "OBJECT",
								"name": "products_mutation_response",
								"ofType": null
							},
							"description": "update data of the table: \"products\""
						},
						{
							"args": [
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "pk_columns",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "products_pk_columns_input",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "update_products_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "products",
								"ofType": null
							},
							"description": "update single row of the table: \"products\""
						},
						{
							"args": [
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "user_bool_exp",
											"ofType": null
										}
									},
									"description": "filter the rows which have to be updated"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "update_user",
							"type": {
								"kind": "OBJECT",
								"name": "user_mutation_response",
								"ofType": null
							},
							"description": "update data of the table: \"user\""
						},
						{
							"args": [
								{
									"name": "_inc",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_inc_input",
										"ofType": null
									},
									"description": "increments the integer columns with given value of the filtered values"
								},
								{
									"name": "_set",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_set_input",
										"ofType": null
									},
									"description": "sets the columns of the filtered rows to the given values"
								},
								{
									"name": "pk_columns",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "user_pk_columns_input",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "update_user_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "user",
								"ofType": null
							},
							"description": "update single row of the table: \"user\""
						}
					]
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "numeric",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "numeric",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "numeric",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "numeric_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type numeric. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "order_by",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "asc",
							"description": "in the ascending order, nulls last"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "asc_nulls_first",
							"description": "in the ascending order, nulls first"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "asc_nulls_last",
							"description": "in the ascending order, nulls last"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "desc",
							"description": "in the descending order, nulls first"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "desc_nulls_first",
							"description": "in the descending order, nulls first"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "desc_nulls_last",
							"description": "in the descending order, nulls last"
						}
					],
					"description": "column ordering options",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "products",
					"enumValues": null,
					"description": "columns and relationships of \"products\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "timestamptz",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "uuid",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "media",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test",
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "title",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "totalDownloads",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "numeric",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "products_insert_input",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "products_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_arr_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting array relation for remote table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_and",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "products_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "_not",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "products_bool_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_or",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "products_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "timestamptz_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "description",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "uuid_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "media",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "title",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "totalDownloads",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "numeric_comparison_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_bool_exp",
					"enumValues": null,
					"description": "Boolean expression to filter rows from the table \"products\". All fields are combined with a logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_constraint",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products_pkey",
							"description": "unique or primary key constraint"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products_test_key",
							"description": "unique or primary key constraint"
						}
					],
					"description": "unique or primary key constraints on table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "totalDownloads",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_inc_input",
					"enumValues": null,
					"description": "input type for incrementing integer column in table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "description",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "media",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "title",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "totalDownloads",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_insert_input",
					"enumValues": null,
					"description": "input type for inserting data into table \"products\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "products_mutation_response",
					"enumValues": null,
					"description": "response of any mutation on the table \"products\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "affected_rows",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								}
							},
							"description": "number of affected rows by the mutation"
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "returning",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "products",
											"ofType": null
										}
									}
								}
							},
							"description": "data of the affected rows by the mutation"
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "products_insert_input",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "products_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_obj_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting object relation for remote table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "constraint",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "ENUM",
									"name": "products_constraint",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "update_columns",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "ENUM",
											"name": "products_update_column",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "where",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "products_bool_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_on_conflict",
					"enumValues": null,
					"description": "on conflict condition type for table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "description",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "media",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "title",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "totalDownloads",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_order_by",
					"enumValues": null,
					"description": "ordering options when selecting data from \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "uuid",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_pk_columns_input",
					"enumValues": null,
					"description": "primary key columns input for table: \"products\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_select_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "media",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "title",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "totalDownloads",
							"description": "column name"
						}
					],
					"description": "select columns of table \"products\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "createdAt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "description",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "media",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "test",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "title",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "totalDownloads",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "numeric",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_set_input",
					"enumValues": null,
					"description": "input type for updating data in table \"products\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "products_update_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "createdAt",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "description",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "media",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "test",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "title",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "totalDownloads",
							"description": "column name"
						}
					],
					"description": "update columns of table \"products\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "query_root",
					"enumValues": null,
					"description": "query root",
					"fields": [
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customer",
							"type": {
								"kind": "OBJECT",
								"name": "customer",
								"ofType": null
							},
							"description": "fetch data from the table: \"customer\" using primary key columns"
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "customer_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "customer_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customerAggregate",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "customer_aggregate",
									"ofType": null
								}
							},
							"description": "fetch aggregated fields from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "customer_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "customer_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customers",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "customer",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "products_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "products_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "products",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"products\""
						},
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "products",
								"ofType": null
							},
							"description": "fetch data from the table: \"products\" using primary key columns"
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "user_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "user_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "user",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"user\""
						},
						{
							"args": [
								{
									"name": "user_id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "Int",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "user",
								"ofType": null
							},
							"description": "fetch data from the table: \"user\" using primary key columns"
						}
					]
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "subscription_root",
					"enumValues": null,
					"description": "subscription root",
					"fields": [
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customer",
							"type": {
								"kind": "OBJECT",
								"name": "customer",
								"ofType": null
							},
							"description": "fetch data from the table: \"customer\" using primary key columns"
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "customer_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "customer_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customerAggregate",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "customer_aggregate",
									"ofType": null
								}
							},
							"description": "fetch aggregated fields from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "customer_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "customer_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "customer_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "customers",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "customer",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"customer\""
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "products_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "products_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "products_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "products",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"products\""
						},
						{
							"args": [
								{
									"name": "id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "uuid",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "products_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "products",
								"ofType": null
							},
							"description": "fetch data from the table: \"products\" using primary key columns"
						},
						{
							"args": [
								{
									"name": "distinct_on",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "ENUM",
												"name": "user_select_column",
												"ofType": null
											}
										}
									},
									"description": "distinct select on columns"
								},
								{
									"name": "limit",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "limit the number of rows returned"
								},
								{
									"name": "offset",
									"defaultValue": null,
									"type": {
										"kind": "SCALAR",
										"name": "Int",
										"ofType": null
									},
									"description": "skip the first n rows. Use only with order_by"
								},
								{
									"name": "order_by",
									"defaultValue": null,
									"type": {
										"kind": "LIST",
										"name": null,
										"ofType": {
											"kind": "NON_NULL",
											"name": null,
											"ofType": {
												"kind": "INPUT_OBJECT",
												"name": "user_order_by",
												"ofType": null
											}
										}
									},
									"description": "sort the rows by one or more columns"
								},
								{
									"name": "where",
									"defaultValue": null,
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "user_bool_exp",
										"ofType": null
									},
									"description": "filter the rows returned"
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "user",
											"ofType": null
										}
									}
								}
							},
							"description": "fetch data from the table: \"user\""
						},
						{
							"args": [
								{
									"name": "user_id",
									"defaultValue": null,
									"type": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "SCALAR",
											"name": "Int",
											"ofType": null
										}
									},
									"description": null
								}
							],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_by_pk",
							"type": {
								"kind": "OBJECT",
								"name": "user",
								"ofType": null
							},
							"description": "fetch data from the table: \"user\" using primary key columns"
						}
					]
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "timestamptz",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "timestamptz",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "timestamptz",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "timestamptz",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "timestamptz_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "user",
					"enumValues": null,
					"description": "columns and relationships of \"user\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_id",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "username",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								}
							},
							"description": null
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "INPUT_OBJECT",
											"name": "user_insert_input",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "user_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_arr_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting array relation for remote table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_and",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "user_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "_not",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "user_bool_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_or",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "user_bool_exp",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "Int_comparison_exp",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "username",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "String_comparison_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_bool_exp",
					"enumValues": null,
					"description": "Boolean expression to filter rows from the table \"user\". All fields are combined with a logical 'AND'.",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_constraint",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_pkey",
							"description": "unique or primary key constraint"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_username_key",
							"description": "unique or primary key constraint"
						}
					],
					"description": "unique or primary key constraints on table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_inc_input",
					"enumValues": null,
					"description": "input type for incrementing integer column in table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "username",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_insert_input",
					"enumValues": null,
					"description": "input type for inserting data into table \"user\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "OBJECT",
					"possibleTypes": null,
					"interfaces": [],
					"name": "user_mutation_response",
					"enumValues": null,
					"description": "response of any mutation on the table \"user\"",
					"fields": [
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "affected_rows",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								}
							},
							"description": "number of affected rows by the mutation"
						},
						{
							"args": [],
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "returning",
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "OBJECT",
											"name": "user",
											"ofType": null
										}
									}
								}
							},
							"description": "data of the affected rows by the mutation"
						}
					]
				},
				{
					"inputFields": [
						{
							"name": "data",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "INPUT_OBJECT",
									"name": "user_insert_input",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "on_conflict",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "user_on_conflict",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_obj_rel_insert_input",
					"enumValues": null,
					"description": "input type for inserting object relation for remote table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "constraint",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "ENUM",
									"name": "user_constraint",
									"ofType": null
								}
							},
							"description": null
						},
						{
							"name": "update_columns",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "NON_NULL",
										"name": null,
										"ofType": {
											"kind": "ENUM",
											"name": "user_update_column",
											"ofType": null
										}
									}
								}
							},
							"description": null
						},
						{
							"name": "where",
							"defaultValue": null,
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "user_bool_exp",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_on_conflict",
					"enumValues": null,
					"description": "on conflict condition type for table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "username",
							"defaultValue": null,
							"type": {
								"kind": "ENUM",
								"name": "order_by",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_order_by",
					"enumValues": null,
					"description": "ordering options when selecting data from \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_pk_columns_input",
					"enumValues": null,
					"description": "primary key columns input for table: \"user\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_select_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "username",
							"description": "column name"
						}
					],
					"description": "select columns of table \"user\"",
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "user_id",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "username",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_set_input",
					"enumValues": null,
					"description": "input type for updating data in table \"user\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "ENUM",
					"possibleTypes": null,
					"interfaces": null,
					"name": "user_update_column",
					"enumValues": [
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "user_id",
							"description": "column name"
						},
						{
							"isDeprecated": false,
							"deprecationReason": null,
							"name": "username",
							"description": "column name"
						}
					],
					"description": "update columns of table \"user\"",
					"fields": null
				},
				{
					"inputFields": null,
					"kind": "SCALAR",
					"possibleTypes": null,
					"interfaces": null,
					"name": "uuid",
					"enumValues": null,
					"description": null,
					"fields": null
				},
				{
					"inputFields": [
						{
							"name": "_eq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_gte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_in",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "uuid",
										"ofType": null
									}
								}
							},
							"description": null
						},
						{
							"name": "_is_null",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lt",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_lte",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_neq",
							"defaultValue": null,
							"type": {
								"kind": "SCALAR",
								"name": "uuid",
								"ofType": null
							},
							"description": null
						},
						{
							"name": "_nin",
							"defaultValue": null,
							"type": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "uuid",
										"ofType": null
									}
								}
							},
							"description": null
						}
					],
					"kind": "INPUT_OBJECT",
					"possibleTypes": null,
					"interfaces": null,
					"name": "uuid_comparison_exp",
					"enumValues": null,
					"description": "expression to compare columns of type uuid. All fields are combined with logical 'AND'.",
					"fields": null
				}
			],
			"mutationType": {
				"name": "mutation_root"
			}
		}
	}
}