"use client";

import { useRef, useState } from "react";
import { useDocumentOperation, type DocumentActionComponent } from "sanity";
import { Button, Stack, TextInput } from "@sanity/ui";

export const createPublishWithShareAction: (
  originalPublishAction: DocumentActionComponent,
) => DocumentActionComponent = (originalPublishAction) => {
  const PublishWithShareAction: DocumentActionComponent = (props) => {
    const { patch } = useDocumentOperation(props.id, props.type);

    const originalResult = originalPublishAction(props);
    if (!originalResult) return null;

    return {
      ...originalResult,
      onHandle: () => {
        const draft = props.draft as unknown as CollectionDoc;

        const { protocol, host } = window.location;

        const baseUrl = `${protocol}//${host}/packages/`;
        const slug = draft.slug.current;

        patch.execute([{ set: { share: baseUrl + slug } }]);

        originalResult.onHandle?.();
      },
    };
  };

  return PublishWithShareAction;
};

export const ShareWithEmailAction: DocumentActionComponent = ({
  published,
}) => {
  const collection = published as unknown as CollectionDoc;

  const inputRef = useRef<HTMLInputElement>(null);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const shareHandler = () => {
    if (!inputRef.current) return;

    // Add server action to send email...
    console.log(`Sending ${collection.name} to ${inputRef.current.value}...`);
    setShowDialog(false);
  };

  return {
    label: "Share with Email",
    onHandle: () => {
      setShowDialog(true);
    },
    dialog: showDialog && {
      type: "dialog",
      onClose: () => {
        setShowDialog(false);
      },
      header: "Share with Email",
      content: (
        <Stack space={3}>
          <TextInput ref={inputRef} placeholder="E-mail" />
          <Button
            fontSize={2}
            onClick={shareHandler}
            padding={3}
            text="Share"
            tone="positive"
          />
        </Stack>
      ),
    },
    disabled: true,
  };
};
