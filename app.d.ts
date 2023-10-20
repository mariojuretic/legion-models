type BaseType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface HeroDoc extends BaseType {
  _type: "hero";
  image?: ImageType;
  media: "image";
}

interface AboutPage extends BaseType {
  _id: "about";
  _type: "about";
  description: string;
}

interface ContactPage extends BaseType {
  _id: "contact";
  _type: "contact";
  address: string;
  emails?: string[];
  phones?: string[];
  socials?: SocialObj[];
}

interface ModelDoc extends BaseType {
  _type: "model";
  campaigns?: ImageType[];
  category: string;
  covers?: ImageType[];
  digitals?: ImageType[];
  hidden: boolean;
  name: string;
  portfolioImage: ImageType;
  shows: ImageType[];
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
}

interface NewsDoc extends BaseType {
  _type: "news";
  excerpt?: string;
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
  title: string;
}

interface SiteSettings extends BaseType {
  _id: "settings";
  _type: "settings";
  theme: "dark" | "light";
}

interface SlugType {
  _type: "slug";
  current: string;
}

interface ImageType {
  _type: "image";
  asset: ReferenceType;
  dimensions?: ImageDimensionsType;
  source?: string;
}

interface ReferenceType {
  _ref: string;
  _type: "reference";
}

interface ImageDimensionsType {
  _type: "sanity.imageDimensions";
  aspectRatio: number;
  height: number;
  width: number;
}

interface SocialObj {
  name: string;
  url: string;
}
