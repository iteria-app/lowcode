const graphqlGenTs1 = `export type MyQueryQuery = (
    { __typename?: 'query_root' }
    & { parent_by_pk?: Maybe<(
      { __typename?: 'parent' }
      & Pick<Parent, 'id' | 'uuid1' | 'numeric1' | 'created_at' | 'date1' | 'double1' | 'flag1' | 'money1' | 'seq' | 'time1' | 'title'>
    )> }
  );
  
  export type Parent = {
    __typename?: 'parent';
    children: Array<Child>;
    children_aggregate: Child_Aggregate;
    created_at?: Maybe<Scalars['timestamptz']>;
    date1?: Maybe<Scalars['date']>;
    double1?: Maybe<Scalars['float8']>;
    flag1?: Maybe<Scalars['Boolean']>;
    id: Scalars['uuid'];
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq: Scalars['bigint'];
    time1?: Maybe<Scalars['timetz']>;
    title: Scalars['String'];
    uuid1?: Maybe<Scalars['uuid']>;
  };
  
  
  export type Maybe<T> = T | null;
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
    bigint: BigInt;
    date: string;
    float8: number;
    money: string;
    numeric: number;
    timestamptz: string;
    timetz: string;
    uuid: string;
  };
  
  
  export type Bigint_Comparison_Exp = {
    _eq?: Maybe<Scalars['bigint']>;
    _gt?: Maybe<Scalars['bigint']>;
    _gte?: Maybe<Scalars['bigint']>;
    _in?: Maybe<Array<Scalars['bigint']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['bigint']>;
    _lte?: Maybe<Scalars['bigint']>;
    _neq?: Maybe<Scalars['bigint']>;
    _nin?: Maybe<Array<Scalars['bigint']>>;
  };
  
  export type Boolean_Comparison_Exp = {
    _eq?: Maybe<Scalars['Boolean']>;
    _gt?: Maybe<Scalars['Boolean']>;
    _gte?: Maybe<Scalars['Boolean']>;
    _in?: Maybe<Array<Scalars['Boolean']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['Boolean']>;
    _lte?: Maybe<Scalars['Boolean']>;
    _neq?: Maybe<Scalars['Boolean']>;
    _nin?: Maybe<Array<Scalars['Boolean']>>;
  };
  
  export type Child = {
    __typename?: 'child';
    id: Scalars['uuid'];
    parent_id: Scalars['uuid'];
    seq: Scalars['bigint'];
    title: Scalars['String'];
  };
  
  export type Child_Aggregate = {
    __typename?: 'child_aggregate';
    aggregate?: Maybe<Child_Aggregate_Fields>;
    nodes: Array<Child>;
  };
  
  export type Child_Aggregate_Fields = {
    __typename?: 'child_aggregate_fields';
    avg?: Maybe<Child_Avg_Fields>;
    count?: Maybe<Scalars['Int']>;
    max?: Maybe<Child_Max_Fields>;
    min?: Maybe<Child_Min_Fields>;
    stddev?: Maybe<Child_Stddev_Fields>;
    stddev_pop?: Maybe<Child_Stddev_Pop_Fields>;
    stddev_samp?: Maybe<Child_Stddev_Samp_Fields>;
    sum?: Maybe<Child_Sum_Fields>;
    var_pop?: Maybe<Child_Var_Pop_Fields>;
    var_samp?: Maybe<Child_Var_Samp_Fields>;
    variance?: Maybe<Child_Variance_Fields>;
  };
  
  
  export type Child_Aggregate_FieldsCountArgs = {
    columns?: Maybe<Array<Child_Select_Column>>;
    distinct?: Maybe<Scalars['Boolean']>;
  };
  
  export type Child_Aggregate_Order_By = {
    avg?: Maybe<Child_Avg_Order_By>;
    count?: Maybe<Order_By>;
    max?: Maybe<Child_Max_Order_By>;
    min?: Maybe<Child_Min_Order_By>;
    stddev?: Maybe<Child_Stddev_Order_By>;
    stddev_pop?: Maybe<Child_Stddev_Pop_Order_By>;
    stddev_samp?: Maybe<Child_Stddev_Samp_Order_By>;
    sum?: Maybe<Child_Sum_Order_By>;
    var_pop?: Maybe<Child_Var_Pop_Order_By>;
    var_samp?: Maybe<Child_Var_Samp_Order_By>;
    variance?: Maybe<Child_Variance_Order_By>;
  };
  
  export type Child_Arr_Rel_Insert_Input = {
    data: Array<Child_Insert_Input>;
    on_conflict?: Maybe<Child_On_Conflict>;
  };
  
  export type Child_Avg_Fields = {
    __typename?: 'child_avg_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Avg_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Bool_Exp = {
    _and?: Maybe<Array<Maybe<Child_Bool_Exp>>>;
    _not?: Maybe<Child_Bool_Exp>;
    _or?: Maybe<Array<Maybe<Child_Bool_Exp>>>;
    id?: Maybe<Uuid_Comparison_Exp>;
    parent_id?: Maybe<Uuid_Comparison_Exp>;
    seq?: Maybe<Bigint_Comparison_Exp>;
    title?: Maybe<String_Comparison_Exp>;
  };
  
  export enum Child_Constraint {
    ChildPkey = 'child_pkey'
  }
  
  export type Child_Inc_Input = {
    seq?: Maybe<Scalars['bigint']>;
  };
  
  export type Child_Insert_Input = {
    id?: Maybe<Scalars['uuid']>;
    parent_id?: Maybe<Scalars['uuid']>;
    seq?: Maybe<Scalars['bigint']>;
    title?: Maybe<Scalars['String']>;
  };
  
  export type Child_Max_Fields = {
    __typename?: 'child_max_fields';
    id?: Maybe<Scalars['uuid']>;
    parent_id?: Maybe<Scalars['uuid']>;
    seq?: Maybe<Scalars['bigint']>;
    title?: Maybe<Scalars['String']>;
  };
  
  export type Child_Max_Order_By = {
    id?: Maybe<Order_By>;
    parent_id?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
  };
  
  export type Child_Min_Fields = {
    __typename?: 'child_min_fields';
    id?: Maybe<Scalars['uuid']>;
    parent_id?: Maybe<Scalars['uuid']>;
    seq?: Maybe<Scalars['bigint']>;
    title?: Maybe<Scalars['String']>;
  };
  
  export type Child_Min_Order_By = {
    id?: Maybe<Order_By>;
    parent_id?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
  };
  
  export type Child_Mutation_Response = {
    __typename?: 'child_mutation_response';
    affected_rows: Scalars['Int'];
    returning: Array<Child>;
  };
  
  export type Child_Obj_Rel_Insert_Input = {
    data: Child_Insert_Input;
    on_conflict?: Maybe<Child_On_Conflict>;
  };
  
  export type Child_On_Conflict = {
    constraint: Child_Constraint;
    update_columns: Array<Child_Update_Column>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  export type Child_Order_By = {
    id?: Maybe<Order_By>;
    parent_id?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
  };
  
  export type Child_Pk_Columns_Input = {
    seq: Scalars['bigint'];
  };
  
  export enum Child_Select_Column {
    Id = 'id',
    ParentId = 'parent_id',
    Seq = 'seq',
    Title = 'title'
  }
  
  export type Child_Set_Input = {
    id?: Maybe<Scalars['uuid']>;
    parent_id?: Maybe<Scalars['uuid']>;
    seq?: Maybe<Scalars['bigint']>;
    title?: Maybe<Scalars['String']>;
  };
  
  export type Child_Stddev_Fields = {
    __typename?: 'child_stddev_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Stddev_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Stddev_Pop_Fields = {
    __typename?: 'child_stddev_pop_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Stddev_Pop_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Stddev_Samp_Fields = {
    __typename?: 'child_stddev_samp_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Stddev_Samp_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Sum_Fields = {
    __typename?: 'child_sum_fields';
    seq?: Maybe<Scalars['bigint']>;
  };
  
  export type Child_Sum_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export enum Child_Update_Column {
    Id = 'id',
    ParentId = 'parent_id',
    Seq = 'seq',
    Title = 'title'
  }
  
  export type Child_Var_Pop_Fields = {
    __typename?: 'child_var_pop_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Var_Pop_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Var_Samp_Fields = {
    __typename?: 'child_var_samp_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Var_Samp_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  export type Child_Variance_Fields = {
    __typename?: 'child_variance_fields';
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Child_Variance_Order_By = {
    seq?: Maybe<Order_By>;
  };
  
  
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
  
  
  export type Float8_Comparison_Exp = {
    _eq?: Maybe<Scalars['float8']>;
    _gt?: Maybe<Scalars['float8']>;
    _gte?: Maybe<Scalars['float8']>;
    _in?: Maybe<Array<Scalars['float8']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['float8']>;
    _lte?: Maybe<Scalars['float8']>;
    _neq?: Maybe<Scalars['float8']>;
    _nin?: Maybe<Array<Scalars['float8']>>;
  };
  
  
  export type Money_Comparison_Exp = {
    _eq?: Maybe<Scalars['money']>;
    _gt?: Maybe<Scalars['money']>;
    _gte?: Maybe<Scalars['money']>;
    _in?: Maybe<Array<Scalars['money']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['money']>;
    _lte?: Maybe<Scalars['money']>;
    _neq?: Maybe<Scalars['money']>;
    _nin?: Maybe<Array<Scalars['money']>>;
  };
  
  export type Mutation_Root = {
    __typename?: 'mutation_root';
    delete_child?: Maybe<Child_Mutation_Response>;
    delete_child_by_pk?: Maybe<Child>;
    delete_parent?: Maybe<Parent_Mutation_Response>;
    delete_parent_by_pk?: Maybe<Parent>;
    insert_child?: Maybe<Child_Mutation_Response>;
    insert_child_one?: Maybe<Child>;
    insert_parent?: Maybe<Parent_Mutation_Response>;
    insert_parent_one?: Maybe<Parent>;
    update_child?: Maybe<Child_Mutation_Response>;
    update_child_by_pk?: Maybe<Child>;
    update_parent?: Maybe<Parent_Mutation_Response>;
    update_parent_by_pk?: Maybe<Parent>;
  };
  
  
  export type Mutation_RootDelete_ChildArgs = {
    where: Child_Bool_Exp;
  };
  
  
  export type Mutation_RootDelete_Child_By_PkArgs = {
    seq: Scalars['bigint'];
  };
  
  
  export type Mutation_RootDelete_ParentArgs = {
    where: Parent_Bool_Exp;
  };
  
  
  export type Mutation_RootDelete_Parent_By_PkArgs = {
    seq: Scalars['bigint'];
  };
  
  
  export type Mutation_RootInsert_ChildArgs = {
    objects: Array<Child_Insert_Input>;
    on_conflict?: Maybe<Child_On_Conflict>;
  };
  
  
  export type Mutation_RootInsert_Child_OneArgs = {
    object: Child_Insert_Input;
    on_conflict?: Maybe<Child_On_Conflict>;
  };
  
  
  export type Mutation_RootInsert_ParentArgs = {
    objects: Array<Parent_Insert_Input>;
    on_conflict?: Maybe<Parent_On_Conflict>;
  };
  
  
  export type Mutation_RootInsert_Parent_OneArgs = {
    object: Parent_Insert_Input;
    on_conflict?: Maybe<Parent_On_Conflict>;
  };
  
  
  export type Mutation_RootUpdate_ChildArgs = {
    _inc?: Maybe<Child_Inc_Input>;
    _set?: Maybe<Child_Set_Input>;
    where: Child_Bool_Exp;
  };
  
  
  export type Mutation_RootUpdate_Child_By_PkArgs = {
    _inc?: Maybe<Child_Inc_Input>;
    _set?: Maybe<Child_Set_Input>;
    pk_columns: Child_Pk_Columns_Input;
  };
  
  
  export type Mutation_RootUpdate_ParentArgs = {
    _inc?: Maybe<Parent_Inc_Input>;
    _set?: Maybe<Parent_Set_Input>;
    where: Parent_Bool_Exp;
  };
  
  
  export type Mutation_RootUpdate_Parent_By_PkArgs = {
    _inc?: Maybe<Parent_Inc_Input>;
    _set?: Maybe<Parent_Set_Input>;
    pk_columns: Parent_Pk_Columns_Input;
  };
  
  
  export type Numeric_Comparison_Exp = {
    _eq?: Maybe<Scalars['numeric']>;
    _gt?: Maybe<Scalars['numeric']>;
    _gte?: Maybe<Scalars['numeric']>;
    _in?: Maybe<Array<Scalars['numeric']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['numeric']>;
    _lte?: Maybe<Scalars['numeric']>;
    _neq?: Maybe<Scalars['numeric']>;
    _nin?: Maybe<Array<Scalars['numeric']>>;
  };
  
  export enum Order_By {
    Asc = 'asc',
    AscNullsFirst = 'asc_nulls_first',
    AscNullsLast = 'asc_nulls_last',
    Desc = 'desc',
    DescNullsFirst = 'desc_nulls_first',
    DescNullsLast = 'desc_nulls_last'
  }
  
  
  
  export type ParentChildrenArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  
  export type ParentChildren_AggregateArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  export type Parent_Aggregate = {
    __typename?: 'parent_aggregate';
    aggregate?: Maybe<Parent_Aggregate_Fields>;
    nodes: Array<Parent>;
  };
  
  export type Parent_Aggregate_Fields = {
    __typename?: 'parent_aggregate_fields';
    avg?: Maybe<Parent_Avg_Fields>;
    count?: Maybe<Scalars['Int']>;
    max?: Maybe<Parent_Max_Fields>;
    min?: Maybe<Parent_Min_Fields>;
    stddev?: Maybe<Parent_Stddev_Fields>;
    stddev_pop?: Maybe<Parent_Stddev_Pop_Fields>;
    stddev_samp?: Maybe<Parent_Stddev_Samp_Fields>;
    sum?: Maybe<Parent_Sum_Fields>;
    var_pop?: Maybe<Parent_Var_Pop_Fields>;
    var_samp?: Maybe<Parent_Var_Samp_Fields>;
    variance?: Maybe<Parent_Variance_Fields>;
  };
  
  
  export type Parent_Aggregate_FieldsCountArgs = {
    columns?: Maybe<Array<Parent_Select_Column>>;
    distinct?: Maybe<Scalars['Boolean']>;
  };
  
  export type Parent_Aggregate_Order_By = {
    avg?: Maybe<Parent_Avg_Order_By>;
    count?: Maybe<Order_By>;
    max?: Maybe<Parent_Max_Order_By>;
    min?: Maybe<Parent_Min_Order_By>;
    stddev?: Maybe<Parent_Stddev_Order_By>;
    stddev_pop?: Maybe<Parent_Stddev_Pop_Order_By>;
    stddev_samp?: Maybe<Parent_Stddev_Samp_Order_By>;
    sum?: Maybe<Parent_Sum_Order_By>;
    var_pop?: Maybe<Parent_Var_Pop_Order_By>;
    var_samp?: Maybe<Parent_Var_Samp_Order_By>;
    variance?: Maybe<Parent_Variance_Order_By>;
  };
  
  export type Parent_Arr_Rel_Insert_Input = {
    data: Array<Parent_Insert_Input>;
    on_conflict?: Maybe<Parent_On_Conflict>;
  };
  
  export type Parent_Avg_Fields = {
    __typename?: 'parent_avg_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Avg_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Bool_Exp = {
    _and?: Maybe<Array<Maybe<Parent_Bool_Exp>>>;
    _not?: Maybe<Parent_Bool_Exp>;
    _or?: Maybe<Array<Maybe<Parent_Bool_Exp>>>;
    children?: Maybe<Child_Bool_Exp>;
    created_at?: Maybe<Timestamptz_Comparison_Exp>;
    date1?: Maybe<Date_Comparison_Exp>;
    double1?: Maybe<Float8_Comparison_Exp>;
    flag1?: Maybe<Boolean_Comparison_Exp>;
    id?: Maybe<Uuid_Comparison_Exp>;
    money1?: Maybe<Money_Comparison_Exp>;
    numeric1?: Maybe<Numeric_Comparison_Exp>;
    seq?: Maybe<Bigint_Comparison_Exp>;
    time1?: Maybe<Timetz_Comparison_Exp>;
    title?: Maybe<String_Comparison_Exp>;
    uuid1?: Maybe<Uuid_Comparison_Exp>;
  };
  
  export enum Parent_Constraint {
    ParentIdKey = 'parent_id_key',
    ParentPkey = 'parent_pkey'
  }
  
  export type Parent_Inc_Input = {
    double1?: Maybe<Scalars['float8']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
  };
  
  export type Parent_Insert_Input = {
    children?: Maybe<Child_Arr_Rel_Insert_Input>;
    created_at?: Maybe<Scalars['timestamptz']>;
    date1?: Maybe<Scalars['date']>;
    double1?: Maybe<Scalars['float8']>;
    flag1?: Maybe<Scalars['Boolean']>;
    id?: Maybe<Scalars['uuid']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
    time1?: Maybe<Scalars['timetz']>;
    title?: Maybe<Scalars['String']>;
    uuid1?: Maybe<Scalars['uuid']>;
  };
  
  export type Parent_Max_Fields = {
    __typename?: 'parent_max_fields';
    created_at?: Maybe<Scalars['timestamptz']>;
    date1?: Maybe<Scalars['date']>;
    double1?: Maybe<Scalars['float8']>;
    id?: Maybe<Scalars['uuid']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
    time1?: Maybe<Scalars['timetz']>;
    title?: Maybe<Scalars['String']>;
    uuid1?: Maybe<Scalars['uuid']>;
  };
  
  export type Parent_Max_Order_By = {
    created_at?: Maybe<Order_By>;
    date1?: Maybe<Order_By>;
    double1?: Maybe<Order_By>;
    id?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    time1?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
    uuid1?: Maybe<Order_By>;
  };
  
  export type Parent_Min_Fields = {
    __typename?: 'parent_min_fields';
    created_at?: Maybe<Scalars['timestamptz']>;
    date1?: Maybe<Scalars['date']>;
    double1?: Maybe<Scalars['float8']>;
    id?: Maybe<Scalars['uuid']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
    time1?: Maybe<Scalars['timetz']>;
    title?: Maybe<Scalars['String']>;
    uuid1?: Maybe<Scalars['uuid']>;
  };
  
  export type Parent_Min_Order_By = {
    created_at?: Maybe<Order_By>;
    date1?: Maybe<Order_By>;
    double1?: Maybe<Order_By>;
    id?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    time1?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
    uuid1?: Maybe<Order_By>;
  };
  
  export type Parent_Mutation_Response = {
    __typename?: 'parent_mutation_response';
    affected_rows: Scalars['Int'];
    returning: Array<Parent>;
  };
  
  export type Parent_Obj_Rel_Insert_Input = {
    data: Parent_Insert_Input;
    on_conflict?: Maybe<Parent_On_Conflict>;
  };
  
  export type Parent_On_Conflict = {
    constraint: Parent_Constraint;
    update_columns: Array<Parent_Update_Column>;
    where?: Maybe<Parent_Bool_Exp>;
  };
  
  export type Parent_Order_By = {
    children_aggregate?: Maybe<Child_Aggregate_Order_By>;
    created_at?: Maybe<Order_By>;
    date1?: Maybe<Order_By>;
    double1?: Maybe<Order_By>;
    flag1?: Maybe<Order_By>;
    id?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
    time1?: Maybe<Order_By>;
    title?: Maybe<Order_By>;
    uuid1?: Maybe<Order_By>;
  };
  
  export type Parent_Pk_Columns_Input = {
    seq: Scalars['bigint'];
  };
  
  export enum Parent_Select_Column {
    CreatedAt = 'created_at',
    Date1 = 'date1',
    Double1 = 'double1',
    Flag1 = 'flag1',
    Id = 'id',
    Money1 = 'money1',
    Numeric1 = 'numeric1',
    Seq = 'seq',
    Time1 = 'time1',
    Title = 'title',
    Uuid1 = 'uuid1'
  }
  
  export type Parent_Set_Input = {
    created_at?: Maybe<Scalars['timestamptz']>;
    date1?: Maybe<Scalars['date']>;
    double1?: Maybe<Scalars['float8']>;
    flag1?: Maybe<Scalars['Boolean']>;
    id?: Maybe<Scalars['uuid']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
    time1?: Maybe<Scalars['timetz']>;
    title?: Maybe<Scalars['String']>;
    uuid1?: Maybe<Scalars['uuid']>;
  };
  
  export type Parent_Stddev_Fields = {
    __typename?: 'parent_stddev_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Stddev_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Stddev_Pop_Fields = {
    __typename?: 'parent_stddev_pop_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Stddev_Pop_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Stddev_Samp_Fields = {
    __typename?: 'parent_stddev_samp_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Stddev_Samp_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Sum_Fields = {
    __typename?: 'parent_sum_fields';
    double1?: Maybe<Scalars['float8']>;
    money1?: Maybe<Scalars['money']>;
    numeric1?: Maybe<Scalars['numeric']>;
    seq?: Maybe<Scalars['bigint']>;
  };
  
  export type Parent_Sum_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export enum Parent_Update_Column {
    CreatedAt = 'created_at',
    Date1 = 'date1',
    Double1 = 'double1',
    Flag1 = 'flag1',
    Id = 'id',
    Money1 = 'money1',
    Numeric1 = 'numeric1',
    Seq = 'seq',
    Time1 = 'time1',
    Title = 'title',
    Uuid1 = 'uuid1'
  }
  
  export type Parent_Var_Pop_Fields = {
    __typename?: 'parent_var_pop_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Var_Pop_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Var_Samp_Fields = {
    __typename?: 'parent_var_samp_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Var_Samp_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Parent_Variance_Fields = {
    __typename?: 'parent_variance_fields';
    double1?: Maybe<Scalars['Float']>;
    money1?: Maybe<Scalars['Float']>;
    numeric1?: Maybe<Scalars['Float']>;
    seq?: Maybe<Scalars['Float']>;
  };
  
  export type Parent_Variance_Order_By = {
    double1?: Maybe<Order_By>;
    money1?: Maybe<Order_By>;
    numeric1?: Maybe<Order_By>;
    seq?: Maybe<Order_By>;
  };
  
  export type Query_Root = {
    __typename?: 'query_root';
    child: Array<Child>;
    child_aggregate: Child_Aggregate;
    child_by_pk?: Maybe<Child>;
    parent: Array<Parent>;
    parent_aggregate: Parent_Aggregate;
    parent_by_pk?: Maybe<Parent>;
  };
  
  
  export type Query_RootChildArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  
  export type Query_RootChild_AggregateArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  
  export type Query_RootChild_By_PkArgs = {
    seq: Scalars['bigint'];
  };
  
  
  export type Query_RootParentArgs = {
    distinct_on?: Maybe<Array<Parent_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Parent_Order_By>>;
    where?: Maybe<Parent_Bool_Exp>;
  };
  
  
  export type Query_RootParent_AggregateArgs = {
    distinct_on?: Maybe<Array<Parent_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Parent_Order_By>>;
    where?: Maybe<Parent_Bool_Exp>;
  };
  
  
  export type Query_RootParent_By_PkArgs = {
    seq: Scalars['bigint'];
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
    child: Array<Child>;
    child_aggregate: Child_Aggregate;
    child_by_pk?: Maybe<Child>;
    parent: Array<Parent>;
    parent_aggregate: Parent_Aggregate;
    parent_by_pk?: Maybe<Parent>;
  };
  
  
  export type Subscription_RootChildArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  
  export type Subscription_RootChild_AggregateArgs = {
    distinct_on?: Maybe<Array<Child_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Child_Order_By>>;
    where?: Maybe<Child_Bool_Exp>;
  };
  
  
  export type Subscription_RootChild_By_PkArgs = {
    seq: Scalars['bigint'];
  };
  
  
  export type Subscription_RootParentArgs = {
    distinct_on?: Maybe<Array<Parent_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Parent_Order_By>>;
    where?: Maybe<Parent_Bool_Exp>;
  };
  
  
  export type Subscription_RootParent_AggregateArgs = {
    distinct_on?: Maybe<Array<Parent_Select_Column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<Parent_Order_By>>;
    where?: Maybe<Parent_Bool_Exp>;
  };
  
  
  export type Subscription_RootParent_By_PkArgs = {
    seq: Scalars['bigint'];
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
  
  
  export type Timetz_Comparison_Exp = {
    _eq?: Maybe<Scalars['timetz']>;
    _gt?: Maybe<Scalars['timetz']>;
    _gte?: Maybe<Scalars['timetz']>;
    _in?: Maybe<Array<Scalars['timetz']>>;
    _is_null?: Maybe<Scalars['Boolean']>;
    _lt?: Maybe<Scalars['timetz']>;
    _lte?: Maybe<Scalars['timetz']>;
    _neq?: Maybe<Scalars['timetz']>;
    _nin?: Maybe<Array<Scalars['timetz']>>;
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
  };
  
  export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;  
`

export { graphqlGenTs1 }