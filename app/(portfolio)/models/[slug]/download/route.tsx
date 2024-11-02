import {
  Document,
  Font,
  Image,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import generateSlides from "@/lib/generateSlides";
import { readClient } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";

Font.register({
  family: "NeueHaasLight",
  src: "https://fonts.cdnfonts.com/s/47998/NeueHaasDisplayLight.ttf",
});

Font.register({
  family: "DrukWide",
  src: "https://fonts.cdnfonts.com/s/99570/DrukWideBold.ttf",
});

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "NeueHaasLight",
    fontSize: "16pt",
    textAlign: "center",
    textTransform: "uppercase",
  },
  footer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20pt",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "NeueHaasLight",
    fontSize: "10pt",
    textTransform: "uppercase",
    gap: "10pt",
  },
  logo: {
    marginLeft: "auto",
    fontFamily: "DrukWide",
    fontSize: "16pt",
  },
  mainSingle: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: "20pt",
    paddingBottom: 0,
  },
  mainDouble: {
    width: "100%",
    height: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "20pt",
    paddingBottom: 0,
    gap: "10pt",
  },
  image: {
    objectFit: "contain",
    objectPosition: "center",
  },
});

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    name,
    measures,
    portfolio[] {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const model: ModelDoc = await readClient.fetch(query, { slug: params.slug });

  if (!model) {
    return notFound();
  }

  const slides = generateSlides(model.portfolio);

  const pdf = await renderToBuffer(
    <Document
      title={`${model.name}'s Portfolio`}
      author="LEGION MODEL MANAGEMENT"
      subject={model.name}
    >
      <Page orientation="landscape">
        <View style={styles.main}>
          <Text style={styles.title}>{model.name}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.logo}>LEGION</Text>
        </View>
      </Page>

      {slides.map((slide) => (
        <Page key={slide[0].asset._ref} orientation="landscape">
          {slide.length === 1 ? (
            <View style={styles.mainSingle}>
              <Image src={urlFor(slide[0]).url()} style={styles.image} />
            </View>
          ) : (
            <View style={styles.mainDouble}>
              <Image src={urlFor(slide[0]).url()} style={styles.image} />
              <Image src={urlFor(slide[1]).url()} style={styles.image} />
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.details}>
              <Text>{model.name}</Text>
              {model.measures &&
                model.measures.length > 0 &&
                model.measures.map((measure) => (
                  <Text key={measure.label}>
                    {`${measure.label} ${measure.value_eu}`}
                  </Text>
                ))}
            </View>
            <Text style={styles.logo}>LEGION</Text>
          </View>
        </Page>
      ))}
    </Document>,
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
