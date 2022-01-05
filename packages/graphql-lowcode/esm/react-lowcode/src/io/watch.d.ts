import ts from 'typescript';
export interface CodeWatcher {
    /**
     * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
     * use native OS file watching
     */
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher;
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
}
