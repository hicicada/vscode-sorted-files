import * as vscode from 'vscode';

export const get_project_path_uri = () => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new URIError('No workspace detected');
    }
    return workspaceFolder.uri;
};
