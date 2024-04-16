import { Document, Page, Text, View } from "@react-pdf/renderer";

type Props = {
  name: string;
  coll: string;
};

export default function Download({ name, coll }: Props) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>
            {name}-{coll}.pdf
          </Text>
        </View>
      </Page>
    </Document>
  );
}
