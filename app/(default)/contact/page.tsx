import Link from "next/link";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "contact"][0]
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const contact: ContactPage = await client.fetch(query);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
      <div className="brand-text max-w-[100ch] space-y-4 whitespace-pre-line">
        <p>{contact.address}</p>

        {contact.phones && contact.phones.length > 0 && (
          <div className="flex flex-col items-start">
            <p>Telephone</p>

            {contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                {phone}
              </a>
            ))}
          </div>
        )}

        {contact.emails && contact.emails.length > 0 && (
          <div className="flex flex-col items-start">
            <p>Email</p>

            {contact.emails.map((email) => (
              <a key={email} href={`mailto:${email}`} className="underline">
                {email}
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-col items-start">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </div>

        {contact.socials && contact.socials.length > 0 && (
          <div className="flex flex-col items-start">
            {contact.socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank">
                {social.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
