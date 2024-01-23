"use client";

import { useRef, useState } from "react";
import { useDocumentOperation, type DocumentActionComponent } from "sanity";
import { Button, Flex, Spinner, Stack, Text, TextInput } from "@sanity/ui";
import { shareCollectionWithEmail } from "./app/actions";

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
  const [sending, setSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shareHandler = async () => {
    if (!inputRef.current) return;

    setSending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const email = inputRef.current.value;

    const response = await shareCollectionWithEmail(collection, email);

    if (response.success) {
      setSuccessMessage("Successfully shared with " + email);
      inputRef.current.value = "";
    } else {
      setErrorMessage("Something went wrong.");
    }

    setSending(false);
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
          <TextInput ref={inputRef} placeholder="E-mail" disabled={sending} />
          <Button
            fontSize={2}
            onClick={shareHandler}
            padding={3}
            text="Share"
            tone="positive"
            disabled={sending}
          />

          {sending && (
            <Flex align="center" justify="center" gap={3}>
              <Spinner muted />
              <Text muted>Sending package...</Text>
            </Flex>
          )}

          {!sending && successMessage && (
            <Text align="center" muted>
              {successMessage}
            </Text>
          )}

          {!sending && errorMessage && (
            <Text align="center" muted>
              {errorMessage}
            </Text>
          )}
        </Stack>
      ),
    },
  };
};
