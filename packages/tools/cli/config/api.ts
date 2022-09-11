#!/usr/bin/env node
import path from 'path';

// Commands
import clickupDocExport from 'api/apps/clickup/export';
import todoistExport from 'api/apps/todoist/export';


export const setup = {
    name: 'API',
    value: path.parse(__filename).name,
}

export const choices = [
    {
        name: 'Export ClickUp docs',
        value: 'api.clickup-docs',
        action: clickupDocExport
    },
    {
        name: 'Export Todoist tasks',
        value: 'api.todoist',
        action: todoistExport
    }
];