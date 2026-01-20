import * as vscode from 'vscode';

import { OUTPUT_CHANNEL } from './output';

let path: string | undefined = undefined;

export const get_path = () => path;

export const change_sort_order = async (activate: boolean) => {
    let config = vscode.workspace.getConfiguration('explorer');
    if (activate) {
        await config.update('sortOrder', 'modified', vscode.ConfigurationTarget.Workspace);
        OUTPUT_CHANNEL.appendLine('sort changed to modified');
        path = vscode.workspace.getConfiguration('vscode-sorted-files').get('file') ?? '.vscode/.sorted';
    } else {
        await config.update('sortOrder', 'default', vscode.ConfigurationTarget.Workspace);
        OUTPUT_CHANNEL.appendLine('sort changed to default');
    }
};
