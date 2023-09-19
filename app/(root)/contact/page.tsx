import Link from "next/link";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "contact"][0]
`;

export default async function Page() {
  const contact: ContactSingleton = await client.fetch(query);

  return (
    <div className="flex grow items-center justify-center">
      <div className="w-full max-w-[100ch] space-y-6 whitespace-pre-line">
        <p>{contact.address}</p>

        <div className="flex flex-col items-start">
          <p>Telephone</p>
          {contact.phone.map((item) => (
            <a key={item} href={`tel:${item.replace(/\s+/g, "")}`}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start">
          <p>Email</p>
          {contact.email.map((item) => (
            <a key={item} href={`mailto:${item}`} className="underline">
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </div>

        <div className="flex flex-col items-start">
          <Link href="/">Instagram</Link>
          <Link href="/">Facebook</Link>
        </div>
      </div>
    </div>
  );
}
