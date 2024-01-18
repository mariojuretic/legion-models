"use client";

import { useDocumentOperation, type DocumentActionComponent } from "sanity";

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
