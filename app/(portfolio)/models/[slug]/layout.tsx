import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import ExitPortfolio from "@/components/ExitPortfolio";
import Measures from "@/components/Measures";
import PortfolioTabs from "@/components/PortfolioTabs";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
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
    <div className="relative flex min-h-svh flex-col lg:block lg:h-screen lg:min-h-0 lg:w-screen lg:pb-[77px] lg:pt-[100px]">
      <ExitPortfolio category={model.category} />
      <div className="flex flex-1 flex-col lg:block lg:h-full lg:w-full">
        <h2 className="brand-text p-4 text-center lg:hidden">{model.name}</h2>
        {children}
      </div>

      {model.measures && model.measures.length > 0 && (
        <Measures measures={model.measures} />
      )}

      {/* Disabled to avoid errors with Swiper */}
      {/* <Thumbnails modelName={model.name} /> */}

      <PortfolioTabs model={model} />
    </div>
  );
};

export default Layout;
