type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface AboutSingleton extends Base {
  _id: "about";
  _type: "about";
  content: string;
}

interface ContactSingleton extends Base {
  _id: "contact";
  _type: "contact";
  address: string;
  email: string[];
  phone: string[];
}

interface ModelDocument extends Base {
  _type: "model";
  category: string;
  featuredImage?: Image;
  hidden: boolean;
  name: string;
  slug: Slug;
  thumbnail?: {
    default?: Image;
    hover?: Image;
  };
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Image {
  _type: "image";
  asset: Reference;
  author?: string;
  description?: string;
}

interface Reference {
  _ref: string;
  _type: "reference";
}
