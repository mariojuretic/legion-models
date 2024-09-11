import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import Link from "next/link";

import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "contact"][0]
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "contact"][0]{ seo }`;

  const { seo }: ContactPage = await readClient.fetch(q);

  const title = seo?.title || (await parent).title || undefined;
  const description =
    seo?.description || (await parent).description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page() {
  const contact: ContactPage = await readClient.fetch(query);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <div className="brand-text max-w-[100ch] space-y-4 whitespace-pre-line">
        <p>{contact.address}</p>

        {contact.phones && contact.phones.length > 0 && (
          <div className="flex flex-col items-start">
            <p className="leading-[2.6] lg:leading-[1.3]">Telephone</p>

            {contact.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="leading-[2.6] lg:leading-[1.3]"
              >
                {phone}
              </a>
            ))}
          </div>
        )}

        {contact.emails && contact.emails.length > 0 && (
          <div className="flex flex-col items-start">
            <p className="leading-[2.6] lg:leading-[1.3]">Email</p>

            {contact.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="leading-[2.6] underline lg:leading-[1.3]"
              >
                {email}
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-col items-start">
          <Link
            href="/privacy-policy"
            className="leading-[2.6] lg:leading-[1.3]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookie-policy"
            className="leading-[2.6] lg:leading-[1.3]"
          >
            Cookie Policy
          </Link>
          <Link href="/terms-of-use" className="leading-[2.6] lg:leading-[1.3]">
            Terms of Use
          </Link>
        </div>

        {contact.socials && contact.socials.length > 0 && (
          <div className="flex flex-col items-start">
            {contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="leading-[2.6] lg:leading-[1.3]"
              >
                {social.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
