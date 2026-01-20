import * as vscode from 'vscode';

import { change_sort_order } from './settings';
import { sort_files } from './sort';

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidSaveTextDocument(() => {
        sort_files();
    });
    change_sort_order(true);
    sort_files();
}

// This method is called when your extension is deactivated
export async function deactivate() {
    await change_sort_order(false);
}
