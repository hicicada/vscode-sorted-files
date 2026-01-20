import * as vscode from 'vscode';

import { change_sort_order, is_enabled } from './settings';
import { sort_files } from './sort';

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidSaveTextDocument(() => {
        if (is_enabled()) {
            sort_files();
        }
    });
    if (is_enabled()) {
        change_sort_order(true);
        sort_files();
    }
}

// This method is called when your extension is deactivated
export function deactivate() {
    if (is_enabled()) {
        change_sort_order(false);
    }
}
