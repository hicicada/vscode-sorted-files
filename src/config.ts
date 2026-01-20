import { readFileSync } from 'fs';

import { get_path } from './settings';

export const read_config = (project_path: string): string[] => {
    let path = get_path();
    if (!path) {
        return [];
    }
    let content = readFileSync(project_path + path, 'utf-8');
    let lines = content.split(/\r?\n/).map((line) => line.trim());
    lines = lines.filter((line) => line !== '');
    lines.reverse();
    return lines;
};
