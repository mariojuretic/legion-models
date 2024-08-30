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
  media: "image" | "video";
  video?: VideoType;
}

interface AboutPage extends BaseType {
  _id: "about";
  _type: "about";
  description: string;
  seo?: SeoObj;
}

interface ContactPage extends BaseType {
  _id: "contact";
  _type: "contact";
  address: string;
  emails?: string[];
  phones?: string[];
  seo?: SeoObj;
  socials?: SocialObj[];
}

interface DevelopmentPage extends BaseType {
  _id: "development";
  _type: "development";
  message: string;
  seo?: SeoObj;
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
  downloads?: {
    digitals?: FileType;
    portfolio?: FileType;
  };
  hidden: boolean;
  instagram?: string;
  interview?: string;
  measures?: MeasureObj[];
  name: string;
  notes?: string;
  portfolio: ImageType[];
  shows: ImageType[];
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
  videos?: VideoType[];
}

interface CollectionDoc extends BaseType {
  _type: "collection";
  models?: ModelDoc[];
  name: string;
  share: string;
  slug: SlugType;
}

interface NewsDoc extends BaseType {
  _type: "news";
  details?: string;
  excerpt?: string;
  images?: ImageType[];
  model?: ModelDoc;
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
  title: string;
  type: "image" | "video";
  videos?: VideoType[];
}

interface NewApplicationDoc {
  _type: "application";
  birthday: string;
  email: string;
  fullBodyShot: ImageType;
  fullName: string;
  gender: string;
  halfBodyShot: ImageType;
  headshot: ImageType;
  height: string;
  instagram?: string;
  location: string;
  phone: string;
  profileHeadshot: ImageType;
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
  getScoutedSeo?: SeoObj;
  landingPageContentType: "random" | "image" | "video";
  landingPageRedirectMilliseconds: number;
  landingPageSeo?: SeoObj;
  mainBoardSeo?: SeoObj;
  newsSeo?: SeoObj;
  newsletterSeo?: SeoObj;
  theme: "dark" | "light";
}

interface SlugType {
  _type: "slug";
  current: string;
}

interface ImageType {
  _type: "image";
  alt?: string;
  asset: ReferenceType;
  dimensions?: ImageDimensionsType;
  sliderPage?: number;
  source?: string;
}

interface FileType {
  _type: "file";
  asset: ReferenceType;
  downloadUrl?: string;
}

interface VideoType {
  _type: "mux.video";
  aspectRatio: string;
  asset: ReferenceType;
  playbackId: string;
}

interface ReferenceType {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
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

interface MeasureObj {
  label?: string;
  value_eu?: string;
  value_us?: string;
}

interface SeoObj {
  _type: "seo";
  title?: string;
  description?: string;
}
