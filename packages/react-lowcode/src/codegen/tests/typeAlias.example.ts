const graphqlGenTs1 = `export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

export type Customer = {
  __typename?: 'customer';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  testDate: Scalars['timestamptz'];
};

export type Customer_Aggregate = {
  __typename?: 'customer_aggregate';
  aggregate?: Maybe<Customer_Aggregate_Fields>;
  nodes: Array<Customer>;
};

export type Customer_Aggregate_Fields = {
  __typename?: 'customer_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Customer_Max_Fields>;
  min?: Maybe<Customer_Min_Fields>;
};


export type Customer_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Customer_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Customer_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Customer_Max_Order_By>;
  min?: Maybe<Customer_Min_Order_By>;
};

export type Customer_Arr_Rel_Insert_Input = {
  data: Array<Customer_Insert_Input>;
  on_conflict?: Maybe<Customer_On_Conflict>;
};

export type Customer_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Customer_Bool_Exp>>>;
  _not?: Maybe<Customer_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Customer_Bool_Exp>>>;
  avatarUrl?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  phone?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Customer_Constraint {
  CustomerPkey = 'customer_pkey'
}

export type Customer_Insert_Input = {
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Customer_Max_Fields = {
  __typename?: 'customer_max_fields';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Customer_Max_Order_By = {
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Customer_Min_Fields = {
  __typename?: 'customer_min_fields';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Customer_Min_Order_By = {
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Customer_Mutation_Response = {
  __typename?: 'customer_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Customer>;
};

export type Customer_Obj_Rel_Insert_Input = {
  data: Customer_Insert_Input;
  on_conflict?: Maybe<Customer_On_Conflict>;
};

export type Customer_On_Conflict = {
  constraint: Customer_Constraint;
  update_columns: Array<Customer_Update_Column>;
  where?: Maybe<Customer_Bool_Exp>;
};

export type Customer_Order_By = {
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Customer_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

export enum Customer_Select_Column {
  AvatarUrl = 'avatarUrl',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Phone = 'phone',
  UpdatedAt = 'updatedAt'
}

export type Customer_Set_Input = {
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export enum Customer_Update_Column {
  AvatarUrl = 'avatarUrl',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Phone = 'phone',
  UpdatedAt = 'updatedAt'
}

export type Mutation_Root = {
  __typename?: 'mutation_root';
  deleteCustomer?: Maybe<Customer>;
  deleteCustomers?: Maybe<Customer_Mutation_Response>;
  insertCustomer?: Maybe<Customer>;
  insertCustomers?: Maybe<Customer_Mutation_Response>;
  updateCustomer?: Maybe<Customer>;
  updateCustomers?: Maybe<Customer_Mutation_Response>;
};


export type Mutation_RootDeleteCustomerArgs = {
  id: Scalars['uuid'];
};


export type Mutation_RootDeleteCustomersArgs = {
  where: Customer_Bool_Exp;
};


export type Mutation_RootInsertCustomerArgs = {
  object: Customer_Insert_Input;
  on_conflict?: Maybe<Customer_On_Conflict>;
};


export type Mutation_RootInsertCustomersArgs = {
  objects: Array<Customer_Insert_Input>;
  on_conflict?: Maybe<Customer_On_Conflict>;
};


export type Mutation_RootUpdateCustomerArgs = {
  _set?: Maybe<Customer_Set_Input>;
  pk_columns: Customer_Pk_Columns_Input;
};


export type Mutation_RootUpdateCustomersArgs = {
  _set?: Maybe<Customer_Set_Input>;
  where: Customer_Bool_Exp;
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  customer?: Maybe<Customer>;
  customerAggregate: Customer_Aggregate;
  customers: Array<Customer>;
};


export type Query_RootCustomerArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCustomerAggregateArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


export type Query_RootCustomersArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  customer?: Maybe<Customer>;
  customerAggregate: Customer_Aggregate;
  customers: Array<Customer>;
};


export type Subscription_RootCustomerArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCustomerAggregateArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


export type Subscription_RootCustomersArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};`

export { graphqlGenTs1 }