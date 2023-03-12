import { Form, ActionPanel, Action, Detail, getPreferenceValues, openExtensionPreferences, showToast, popToRoot, closeMainWindow } from "@raycast/api";
import { useState } from "react";
import { setTimeout } from "timers";
import { createDatabasePage } from "./utils/notion";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

interface Preferences {
  databaseId: string;
}

// TODO: Hugivar: Use template

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);
  const preferences = getPreferenceValues<Preferences>();
  const database = preferences?.databaseId;

  async function handleSubmit(values: Values) {
    setIsLoading(true);
    const page = await createDatabasePage({ ...values, database });
    setIsLoading(false);

    if (page) {
      // Show toast and close on success
      await showToast({ title: "Quick thought captured!" });

      setTimeout(() => {
        popToRoot({ clearSearchBar: true });
        closeMainWindow({ clearRootSearch: true })
      }, 1000);
    }
  }


  if (!database) {
    const markdown = "No database id provided. Please update it in extension preferences and try again.";

    return (
      <Detail
        markdown={markdown}
        actions={
          <ActionPanel>
            <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
          </ActionPanel>
        }
      />
    );
  };

  return (
    <>
      <Form
        isLoading={isLoading}
        navigationTitle="Capture a quick thought"
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        <Form.Description
          title="Database Id"
          text={`The database id is ${database}`}
        />
        <Form.Separator key="separator" />
        <Form.TextField id="property::title::title" autoFocus title="Task name" placeholder="Enter text" defaultValue="Raycast" />
      </Form>
    </>
  );
}
