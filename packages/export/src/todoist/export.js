import { TodoistApi } from '@doist/todoist-api-typescript';
import { createObjectCsvWriter } from 'csv-writer';
import 'dotenv/config';

const api = new TodoistApi(process.env.API_TOKEN);

const convertToCSV = (array) => [
    [
        "Task ID",
        "Project ID",
        "Task Content",
        "Task Description",
        "Completed",
        "Creation Date",
        "Task URL"
    ],
    ...array.map(task => [
        task.id,
        task.projectId,
        task.content,
        task.description,
        task.completed,
        task.created,
        task.url
    ])
]
    .map(e => e.join(","))
    .join("\n");


api.getTasks()
    .then((tasks) => {
        const csvWriter = createObjectCsvWriter({
            path: './data/todoist/out.csv',
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
