import { CodeDir, CodeRW } from '../io';
import { CodegenOptions } from './interfaces';
import { IntrospectionQuery } from '@iteria-app/graphql-lowcode/esm/generate';
export declare function generatePages(introspection: IntrospectionQuery, io: CodeRW & CodeDir, options: CodegenOptions): Promise<void>;
