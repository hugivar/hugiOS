"use client";

import { useIsMutating } from '@tanstack/react-query';
import Head from 'next/head';
import { useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import TaskView from '~/components/tasks/tasks-view';
import { isBefore, isToday, isTomorrow } from 'date-fns'

export default function DashboardPage() {
    /*
     * This data will be hydrated from the `prefetch` in `getStaticProps`. This means that the page
     * will be rendered with the data from the server and there'll be no client loading state 👍
     */
    const allTasks = trpc.todo.all.useQuery(undefined, {
        staleTime: 3000,
    });

    const utils = trpc.useContext();

    const number = useIsMutating();
    useEffect(() => {
        // invalidate queries when mutations have settled
        // doing this here rather than in `onSettled()`
        // to avoid race conditions if you're clicking fast
        if (number === 0) {
            void utils.todo.all.invalidate();
        }
    }, [number, utils]);

    const taskItems = allTasks.data ? allTasks.data.reduce((acc, curr: any) => {
        const today = new Date();
        var todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var noTime = new Date(curr.dueDate.getFullYear(), curr.dueDate.getMonth(), curr.dueDate.getDate());

        if (isBefore(noTime, todayNoTime)) {
            //@ts-ignore
            acc['Overdue'].push(curr);
        }
        else if (isToday(new Date(curr.dueDate.toDateString()))) {
            //@ts-ignore
            acc['Today'].push(curr);
        }
        else if (isTomorrow(curr.dueDate)) {
            //@ts-ignore
            acc['Tomorrow'].push(curr);
        } else {
            //@ts-ignore
            acc['Upcoming'].push(curr);
        }

        return acc;
    }, {
        "Overdue": [],
        "Today": [],
        "Tomorrow": [],
        "Upcoming": []
    }) : [];

    const mutation = trpc.todo.edit.useMutation();
    const handleUpdateTask = (id: string, data: any) => {
        console.log('page line:119', id, data);
        mutation.mutate({ id, data });
    };

    return (
        <>
            <Head>
                <title>Tali</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>Tali</h1>
                </header>
                <section className="main">
                    {/* @ts-ignore */}
                    <TaskView items={taskItems || undefined} onEdit={handleUpdateTask} />
                </section>
            </section>
        </>
    );
}