import { ActionPanel, Form, Action, getPreferenceValues, Keyboard } from "@raycast/api";

import NoteCreator from "../utils/data/NoteCreator";
import { FormValue, Vault } from "../utils/interfaces";
import { renewCache } from "../utils/data/cache";
import { NoteFormPreferences } from "../utils/preferences";

function parseFolderActions(folderActions: any) {
  if (folderActions) {
    const folders = folderActions
      .split(",")
      .filter((folder: any) => !!folder)
      .map((folder: string) => folder.trim());
    return folders;
  }
  return [];
}

function parseTags(tags: any, prefTag: any) {
  if (!tags) {
    if (prefTag) {
      return [{ name: prefTag, key: prefTag }];
    }
    return [];
  }
  const parsedTags = tags
    .split(",")
    .map((tag: any) => ({ name: tag.trim(), key: tag.trim() }))
    .filter((tag: any) => !!tag);
  if (prefTag) {
    parsedTags.push({ name: prefTag, key: prefTag });
  }
  return parsedTags;
}

async function createNewNote(noteProps: FormValue, path: string | undefined = undefined, vault: Vault, pref: NoteFormPreferences) {
  if (path !== undefined) {
    noteProps.path = path;
  }
  const nc = new NoteCreator(noteProps, vault, pref);
  const saved = nc.createNote();
  if (await saved) {
    renewCache(vault);
  }

}

export function CreateNoteForm(props: { vault: Vault; showTitle: boolean }) {
  const { vault, showTitle } = props;

  const pref = getPreferenceValues<NoteFormPreferences>();
  const { folderActions, tags, prefTag, prefPath } = pref;

  return (
    <Form
      navigationTitle={showTitle ? "Create Note for " + vault.name : ""}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create" onSubmit={(props: FormValue) => createNewNote(props, "", vault, pref)} />
          {parseFolderActions(folderActions)?.map((folder: any, index: number) => (
            <Action.SubmitForm
              title={"Create in " + folder}
              onSubmit={(props: FormValue) => createNewNote(props, folder, vault, pref)}
              key={index}
              shortcut={{ modifiers: ["shift", "cmd"], key: index.toString() as Keyboard.KeyEquivalent }}
            ></Action.SubmitForm>
          ))}
        </ActionPanel>
      }
    >
      <Form.TextField
        title="Document name"
        id="name"
        placeholder="Name of note"
        defaultValue={pref.fillFormWithDefaults ? pref.prefNoteName : ""}
      />
      <Form.TextField
        title="Notion url"
        id="notionUrl"
        placeholder=""
      />
      <Form.TextField
        title="Desired Obsidian Path"
        id="path"
        defaultValue={prefPath ? prefPath : ""}
        placeholder="path/to/note (optional)"
      />
      <Form.TagPicker id="tags" title="Tags" defaultValue={prefTag ? [prefTag] : []}>
        {parseTags(tags, prefTag)?.map((tag: any) => (
          <Form.TagPicker.Item value={tag.name.toLowerCase()} title={tag.name} key={tag.key} />
        ))}
      </Form.TagPicker>
      <Form.TextArea
        title="Content:"
        id="content"
        placeholder={"Text"}
        defaultValue={pref.fillFormWithDefaults ? pref.prefNoteContent ?? "" : ""}
      />
    </Form>
  );
}
