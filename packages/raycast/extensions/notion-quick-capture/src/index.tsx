import {
  Form,
  ActionPanel,
  Action,
  Detail,
  getPreferenceValues,
  openExtensionPreferences,
  showToast,
  Toast,
  popToRoot,
  closeMainWindow,
} from "@raycast/api";
import { setTimeout } from "timers";
import { createDatabasePage } from "./utils/notion";

type Values = {
  "property::title::title": string;
};

interface Preferences {
  databaseId: string;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const database = preferences?.databaseId;

  async function handleSubmit(values: Values) {
    showToast({ title: "Capturing", style: Toast.Style.Animated });

    let page = null;
    try {
      page = await createDatabasePage({
        ...values,
        database,
        "property::date::Date": new Date(),
      });
    } catch (err: any) {
      showToast({ title: "Error", message: err.toString(), style: Toast.Style.Failure });
    }

    if (page) {
      // Show toast and close on success
      await showToast({ title: "Quick thought captured!" });

      setTimeout(() => {
        popToRoot({ clearSearchBar: true });
        closeMainWindow({ clearRootSearch: true });
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
  }

  return (
    <Form
      navigationTitle="Capture a quick thought"
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description title="Database Id" text={`The database id is ${database}`} />
      <Form.Separator key="separator" />
      <Form.TextField
        id="property::title::title"
        autoFocus
        title="Task name"
        placeholder="Enter text"
        defaultValue=""
      />
      <Form.Separator key="content-separator" />
      <Form.TextArea id="content" title="Page Content" />
    </Form>
  );
}
