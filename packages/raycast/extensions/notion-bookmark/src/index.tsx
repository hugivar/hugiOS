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
  Clipboard,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { createDatabasePage } from "./utils/notion";
const urlMetadata = require('url-metadata');

type Values = {
  "property::title::title": string;
};

interface Preferences {
  databaseId: string;
}

const isValidURL = (url: string) => {
  if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
    return true
  } else {
    return false;
  }
}

const grabURLMetadta = (url: string, setData: any) => {
  if (isValidURL(url)) {
    urlMetadata(url).then(
      function (metadata: any) {
        setData(metadata)
      },
      function (error: any) { // failure handler
        console.log(error);
      })
  };
};



export default function Command() {
  const [url, setURL] = useState("");
  const [metadata, setMetadata] = useState();
  const preferences = getPreferenceValues<Preferences>();
  const database = preferences?.databaseId;

  useEffect(() => {
    const fetchData = async () => {
      const data = await Clipboard.readText();
      return data;
    }

    // call the function
    fetchData()
      .then((item: string) => {
        setURL(item);
        if (item.length > 0) {
          grabURLMetadta(item, setMetadata);
        }
      })
      // make sure to catch any error
      .catch(console.error);

  }, []);

  async function handleChange(url) {
    setURL(url)

    if (url) {
      grabURLMetadta(url, setMetadata);
    }
  };

  async function handleSubmit(values: Values) {
    showToast({ title: "Creating Bookmark", style: Toast.Style.Animated });

    let page = null;
    try {
      page = await createDatabasePage({
        ...values,
        'property::title::title': metadata?.title,
        database,
      });

    } catch (err: any) {
      showToast({ title: "Error", message: err.toString(), style: Toast.Style.Failure });
    }

    if (page) {
      // Show toast and close on success
      await showToast({ title: "Bookmark created!" });

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
      navigationTitle="Create a bookmark"
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description title="Database Id" text={`The database id is ${database}`} />
      <Form.Separator key="separator" />
      <Form.TextField
        id="property::url::url"
        autoFocus
        title="Url"
        placeholder="Enter text"
        onChange={item => handleChange(item)}
        value={url}
      />

      {metadata && (
        <>
          <Form.Separator key="description-separator" />
          <Form.Description title="Bookmark name" text={`The bookmark name will be ${metadata?.title}`} />
        </>
      )}

      <Form.Separator key="content-separator" />
      <Form.TextArea id="content" title="Page Content" />
    </Form>
  );
}
