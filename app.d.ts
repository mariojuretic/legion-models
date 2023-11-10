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
  color?: {
    label: string;
    value: string;
  };
  contract: boolean;
  contractExpirationDate?: string;
  covers?: ImageType[];
  dateOfBirth?: string;
  digitals?: ImageType[];
  hidden: boolean;
  instagram?: string;
  interview?: string;
  name: string;
  portfolioImage: ImageType;
  shows: ImageType[];
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
}

interface CollectionDoc extends BaseType {
  _type: "collection";
  models?: ModelDoc[];
  name: string;
  slug: SlugType;
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

interface PrivacyPolicyPage extends BaseType {
  _id: "privacyPolicy";
  _type: "privacyPolicy";
  content: string;
}

interface CookiePolicyPage extends BaseType {
  _id: "cookiePolicy";
  _type: "cookiePolicy";
  content: string;
}

interface TermsOfUsePage extends BaseType {
  _id: "termsOfUse";
  _type: "termsOfUse";
  content: string;
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
