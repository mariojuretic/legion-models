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
