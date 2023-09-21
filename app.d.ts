type BaseType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

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
  category: string;
  hidden: boolean;
  name: string;
  slug: SlugType;
  thumbnail?: {
    default?: ImageType;
    hover?: ImageType;
  };
}

interface SlugType {
  _type: "slug";
  current: string;
}

interface ImageType {
  _type: "image";
  asset: ReferenceType;
}

interface ReferenceType {
  _ref: string;
  _type: "reference";
}

interface SocialObj {
  name: string;
  url: string;
}
