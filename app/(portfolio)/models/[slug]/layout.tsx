import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import ExitPortfolio from "@/components/ExitPortfolio";
import PortfolioTabs from "@/components/PortfolioTabs";
import Measures from "@/components/Measures";
import Thumbnails from "@/components/Thumbnails";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug && hidden == false][0] {
    ...,
    portfolio[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    digitals[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    shows[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    covers[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    campaigns[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    downloads {
      portfolio {
        ...,
        "downloadUrl": asset->url
      },
      digitals {
        ...,
        "downloadUrl": asset->url
      }
    }
  }
`;

export const dynamic = "force-dynamic";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const model: ModelDoc = await readClient.fetch(query, { slug });

  if (!model) {
    return notFound();
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col lg:block lg:h-screen lg:min-h-0 lg:w-screen lg:pb-[77px] lg:pt-[100px]">
      <ExitPortfolio category={model.category} />
      <div className="flex flex-1 flex-col lg:block lg:h-full lg:w-full">
        <h2 className="brand-text p-4 text-center lg:hidden">{model.name}</h2>
        {children}
      </div>
      <PortfolioTabs model={model} />

      {model.measures && model.measures.length > 0 && (
        <Measures measures={model.measures} />
      )}

      <Thumbnails modelName={model.name} />
    </div>
  );
};

export default Layout;
