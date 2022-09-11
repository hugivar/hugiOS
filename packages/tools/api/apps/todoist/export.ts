import { TodoistApi } from '@doist/todoist-api-typescript';
import { createObjectCsvWriter } from 'csv-writer';
import { dirname, resolve } from 'path';
import 'dotenv/config';

const api = new TodoistApi(process.env.TODOIST_API_TOKEN);

const exportTasks = () => {
    console.log('export line:32', api);

    api.getTasks()
        .then((tasks) => {
            const outputPath = resolve(dirname(require.main.filename), "../api/output/todoist.csv");

            const csvWriter = createObjectCsvWriter({
                path: outputPath,
                header: [
                    { id: 'id', title: 'Task Id' },
                    { id: 'projectId', title: 'Project Id' },
                    { id: 'content', title: 'Content' },
                    { id: 'description', title: 'Description' },
                    { id: 'completed', title: 'Completed' },
                    { id: 'created', title: 'Created' },
                    { id: 'url', title: 'URL' },
                ]
            });

            csvWriter
                .writeRecords(tasks)
                .then(() => console.log('The CSV file was written successfully'));
        })
        .catch((error) => console.log(error))
}

export default exportTasks;