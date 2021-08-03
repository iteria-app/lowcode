const graphqlGenTs1 = `import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "customer" */
export type Customer = {
  __typename?: 'customer';
  address?: Maybe<Scalars['jsonb']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Int']>;
  testdate?: Maybe<Scalars['date']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "customer" */
export type CustomerAddressArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "customer" */
export type Customer_Aggregate = {
  __typename?: 'customer_aggregate';
  aggregate?: Maybe<Customer_Aggregate_Fields>;
  nodes: Array<Customer>;
};

/** aggregate fields of "customer" */
export type Customer_Aggregate_Fields = {
  __typename?: 'customer_aggregate_fields';
  avg?: Maybe<Customer_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Customer_Max_Fields>;
  min?: Maybe<Customer_Min_Fields>;
  stddev?: Maybe<Customer_Stddev_Fields>;
  stddev_pop?: Maybe<Customer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Customer_Stddev_Samp_Fields>;
  sum?: Maybe<Customer_Sum_Fields>;
  var_pop?: Maybe<Customer_Var_Pop_Fields>;
  var_samp?: Maybe<Customer_Var_Samp_Fields>;
  variance?: Maybe<Customer_Variance_Fields>;
};


/** aggregate fields of "customer" */
export type Customer_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Customer_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "customer" */
export type Customer_Aggregate_Order_By = {
  avg?: Maybe<Customer_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Customer_Max_Order_By>;
  min?: Maybe<Customer_Min_Order_By>;
  stddev?: Maybe<Customer_Stddev_Order_By>;
  stddev_pop?: Maybe<Customer_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Customer_Stddev_Samp_Order_By>;
  sum?: Maybe<Customer_Sum_Order_By>;
  var_pop?: Maybe<Customer_Var_Pop_Order_By>;
  var_samp?: Maybe<Customer_Var_Samp_Order_By>;
  variance?: Maybe<Customer_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Customer_Append_Input = {
  address?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "customer" */
export type Customer_Arr_Rel_Insert_Input = {
  data: Array<Customer_Insert_Input>;
  on_conflict?: Maybe<Customer_On_Conflict>;
};

/** aggregate avg on columns */
export type Customer_Avg_Fields = {
  __typename?: 'customer_avg_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "customer" */
export type Customer_Avg_Order_By = {
  test2?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "customer". All fields are combined with a logical 'AND'. */
export type Customer_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Customer_Bool_Exp>>>;
  _not?: Maybe<Customer_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Customer_Bool_Exp>>>;
  address?: Maybe<Jsonb_Comparison_Exp>;
  avatarUrl?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  phone?: Maybe<String_Comparison_Exp>;
  test2?: Maybe<Int_Comparison_Exp>;
  testdate?: Maybe<Date_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "customer" */
export enum Customer_Constraint {
  /** unique or primary key constraint */
  CustomerPkey = 'customer_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Customer_Delete_At_Path_Input = {
  address?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Customer_Delete_Elem_Input = {
  address?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Customer_Delete_Key_Input = {
  address?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "customer" */
export type Customer_Inc_Input = {
  test2?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "customer" */
export type Customer_Insert_Input = {
  address?: Maybe<Scalars['jsonb']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Int']>;
  testdate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Customer_Max_Fields = {
  __typename?: 'customer_max_fields';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Int']>;
  testdate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "customer" */
export type Customer_Max_Order_By = {
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  test2?: Maybe<Order_By>;
  testdate?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Customer_Min_Fields = {
  __typename?: 'customer_min_fields';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Int']>;
  testdate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "customer" */
export type Customer_Min_Order_By = {
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  test2?: Maybe<Order_By>;
  testdate?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "customer" */
export type Customer_Mutation_Response = {
  __typename?: 'customer_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Customer>;
};

/** input type for inserting object relation for remote table "customer" */
export type Customer_Obj_Rel_Insert_Input = {
  data: Customer_Insert_Input;
  on_conflict?: Maybe<Customer_On_Conflict>;
};

/** on conflict condition type for table "customer" */
export type Customer_On_Conflict = {
  constraint: Customer_Constraint;
  update_columns: Array<Customer_Update_Column>;
  where?: Maybe<Customer_Bool_Exp>;
};

/** ordering options when selecting data from "customer" */
export type Customer_Order_By = {
  address?: Maybe<Order_By>;
  avatarUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  test2?: Maybe<Order_By>;
  testdate?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "customer" */
export type Customer_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Customer_Prepend_Input = {
  address?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "customer" */
export enum Customer_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Test2 = 'test2',
  /** column name */
  Testdate = 'testdate',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "customer" */
export type Customer_Set_Input = {
  address?: Maybe<Scalars['jsonb']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Int']>;
  testdate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Customer_Stddev_Fields = {
  __typename?: 'customer_stddev_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "customer" */
export type Customer_Stddev_Order_By = {
  test2?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Customer_Stddev_Pop_Fields = {
  __typename?: 'customer_stddev_pop_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "customer" */
export type Customer_Stddev_Pop_Order_By = {
  test2?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Customer_Stddev_Samp_Fields = {
  __typename?: 'customer_stddev_samp_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "customer" */
export type Customer_Stddev_Samp_Order_By = {
  test2?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Customer_Sum_Fields = {
  __typename?: 'customer_sum_fields';
  test2?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "customer" */
export type Customer_Sum_Order_By = {
  test2?: Maybe<Order_By>;
};

/** update columns of table "customer" */
export enum Customer_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Test2 = 'test2',
  /** column name */
  Testdate = 'testdate',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Customer_Var_Pop_Fields = {
  __typename?: 'customer_var_pop_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "customer" */
export type Customer_Var_Pop_Order_By = {
  test2?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Customer_Var_Samp_Fields = {
  __typename?: 'customer_var_samp_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "customer" */
export type Customer_Var_Samp_Order_By = {
  test2?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Customer_Variance_Fields = {
  __typename?: 'customer_variance_fields';
  test2?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "customer" */
export type Customer_Variance_Order_By = {
  test2?: Maybe<Order_By>;
};


/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "customer" */
  deleteCustomer?: Maybe<Customer>;
  /** delete data from the table: "customer" */
  deleteCustomers?: Maybe<Customer_Mutation_Response>;
  /** insert a single row into the table: "customer" */
  insertCustomer?: Maybe<Customer>;
  /** insert data into the table: "customer" */
  insertCustomers?: Maybe<Customer_Mutation_Response>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** update single row of the table: "customer" */
  updateCustomer?: Maybe<Customer>;
  /** update data of the table: "customer" */
  updateCustomers?: Maybe<Customer_Mutation_Response>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDeleteCustomerArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteCustomersArgs = {
  where: Customer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsertCustomerArgs = {
  object: Customer_Insert_Input;
  on_conflict?: Maybe<Customer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertCustomersArgs = {
  objects: Array<Customer_Insert_Input>;
  on_conflict?: Maybe<Customer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateCustomerArgs = {
  _append?: Maybe<Customer_Append_Input>;
  _delete_at_path?: Maybe<Customer_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Customer_Delete_Elem_Input>;
  _delete_key?: Maybe<Customer_Delete_Key_Input>;
  _inc?: Maybe<Customer_Inc_Input>;
  _prepend?: Maybe<Customer_Prepend_Input>;
  _set?: Maybe<Customer_Set_Input>;
  pk_columns: Customer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateCustomersArgs = {
  _append?: Maybe<Customer_Append_Input>;
  _delete_at_path?: Maybe<Customer_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Customer_Delete_Elem_Input>;
  _delete_key?: Maybe<Customer_Delete_Key_Input>;
  _inc?: Maybe<Customer_Inc_Input>;
  _prepend?: Maybe<Customer_Prepend_Input>;
  _set?: Maybe<Customer_Set_Input>;
  where: Customer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "customer" using primary key columns */
  customer?: Maybe<Customer>;
  /** fetch aggregated fields from the table: "customer" */
  customerAggregate: Customer_Aggregate;
  /** fetch data from the table: "customer" */
  customers: Array<Customer>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** query root */
export type Query_RootCustomerArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCustomerAggregateArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


/** query root */
export type Query_RootCustomersArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  user_id: Scalars['Int'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "customer" using primary key columns */
  customer?: Maybe<Customer>;
  /** fetch aggregated fields from the table: "customer" */
  customerAggregate: Customer_Aggregate;
  /** fetch data from the table: "customer" */
  customers: Array<Customer>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** subscription root */
export type Subscription_RootCustomerArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCustomerAggregateArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCustomersArgs = {
  distinct_on?: Maybe<Array<Customer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Customer_Order_By>>;
  where?: Maybe<Customer_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  user_id: Scalars['Int'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  user_id: Scalars['Int'];
  username: Scalars['String'];
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  user_id?: Maybe<Int_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserPkey = 'user_pkey',
  /** unique or primary key constraint */
  UserUsernameKey = 'user_username_key'
}

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  user_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  user_id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  user_id: Scalars['Int'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  user_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
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
};

export type UpdateCustomerMutationVariables = Exact<{
  id?: Scalars['uuid'];
  name?: Scalars['String'];
  email?: Scalars['String'];
  phone?: Scalars['String'];
}>;


export type UpdateCustomerMutation = (
  { __typename?: 'mutation_root' }
  & { updateCustomer?: Maybe<(
    { __typename?: 'customer' }
    & Pick<Customer, 'name' | 'id'>
  )> }
);

export type SearchCustomersQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchCustomersQuery = (
  { __typename?: 'query_root' }
  & { customers: Array<(
    { __typename?: 'customer' }
    & Pick<Customer, 'id' | 'email' | 'name' | 'phone' | 'address' | 'avatarUrl' | 'createdAt' | 'updatedAt'>
  )> }
);`

const is2 = {
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

export { graphqlGenTs1, is2 }