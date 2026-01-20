import { readFileSync, utimesSync } from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/naming-convention
import _ from 'lodash';
import { minimatch } from 'minimatch';
import * as vscode from 'vscode';

import { read_config } from './config';
import { OUTPUT_CHANNEL } from './output';
import { get_project_path_uri } from './path';

export const sort_files = async () => {
    let project_path_uri = get_project_path_uri();
    let project_path = project_path_uri.fsPath + path.sep;
    let target = read_config(project_path);
    if (target.length === 0) {
        return;
    }
    const default_sorted_files = await get_default_sorted_files(project_path_uri, project_path, target);
    target = target.map((file) => project_path + file);
    const list = [...default_sorted_files, ...target];
    modify_last_changed_date(list);
    OUTPUT_CHANNEL.appendLine('Sorting completed');
};

const modify_last_changed_date = (files: string[]) => {
    let now = Date.now();
    let milliseconds = 0;
    for (let path of files) {
        try {
            let newModifiedDate = new Date(now + milliseconds);
            milliseconds += 1;
            utimesSync(path, newModifiedDate, newModifiedDate);
        } catch (error) {
            OUTPUT_CHANNEL.appendLine(`Failed to modify last changed date for file: ${path}`);
            OUTPUT_CHANNEL.appendLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            OUTPUT_CHANNEL.appendLine(''); // Add a blank line for readability
        }
    }
};

const get_default_sorted_files = async (
    project_path_uri: vscode.Uri,
    project_path: string,
    target: string[],
): Promise<string[]> => {
    let ignore_pattern = get_gitignore_files(project_path);
    let results = new Set<string>();
    await find_all_files_and_folders_with_ignore(project_path_uri, ignore_pattern, results);
    let non_config = Array.from(results).filter((name) => !target.includes(name));
    non_config = _.sortBy(non_config, [(file) => file.toLowerCase()]);
    non_config.reverse();
    return non_config;
};

const get_gitignore_files = (project_path: string): string => {
    let defaultGitignorePattern = '**/.git/**';
    try {
        let content = readFileSync(project_path + '.gitignore', 'utf-8');
        let lines = content.split(/\r?\n/).map((s) => s.trim()); // Handles both Windows and Unix line endings
        let removedComments = lines.filter((item) => item.charAt(0) !== '#');
        let removedEmptyLines = removedComments.filter((item) => item !== '');
        let prefixedGitignoreFiles = removedEmptyLines.map((file) => '**/' + file + '**');
        let trimmedGitignoreFiles = prefixedGitignoreFiles.map((file) => file.trim());
        trimmedGitignoreFiles.push(defaultGitignorePattern); // Normally gitignore files doesn't include the .git folder, but we want to include it
        let ignorePatterns = trimmedGitignoreFiles.join(',');
        ignorePatterns = `{${ignorePatterns}}`;
        return ignorePatterns;
    } catch (error) {
        // if there is no gitignore file, return the default gitignore pattern
        return defaultGitignorePattern;
    }
};

const find_all_files_and_folders_with_ignore = async (
    project_path_uri: vscode.Uri,
    ignore_patterns: string,
    results: Set<string>,
) => {
    const entries = await vscode.workspace.fs.readDirectory(project_path_uri);
    for (const [entryName, entryType] of entries) {
        const entryUri = vscode.Uri.joinPath(project_path_uri, entryName);
        if (minimatch(entryUri.path, ignore_patterns, { dot: true })) {
            continue;
        }
        results.add(entryUri.fsPath);
        if (entryType === vscode.FileType.Directory) {
            await find_all_files_and_folders_with_ignore(entryUri, ignore_patterns, results);
        }
    }
};
