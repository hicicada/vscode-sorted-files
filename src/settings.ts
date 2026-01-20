import * as vscode from 'vscode';

import { OUTPUT_CHANNEL } from './output';

let updated: boolean = false;
let current_sort_order: any = undefined;
let path: string | undefined = undefined;

export const get_path = () => path;

export const change_sort_order = (activate: boolean) => {
    let config = vscode.workspace.getConfiguration('explorer');
    if (activate) {
        const current = config.get('sortOrder');
        current_sort_order = current;
        if (current !== 'modified') {
            config.update('sortOrder', 'modified', vscode.ConfigurationTarget.Workspace);
            OUTPUT_CHANNEL.appendLine('sort changed to modified');
            updated = true;
        } else {
            updated = false;
        }
        path = vscode.workspace.getConfiguration('vscode-sorted-files').get('file');
    } else {
        if (updated) {
            config.update('sortOrder', current_sort_order, vscode.ConfigurationTarget.Workspace);
            OUTPUT_CHANNEL.appendLine('sort changed to ' + current_sort_order);
        }
    }
};
