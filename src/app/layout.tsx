import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { ContactModal } from "@/components/contact/ContactModal";
import { site } from "@/lib/site";
import { getContactContent, getFooterContent, getVerse } from "@/lib/settings";

// Always render fresh so edits made in the office app show up immediately
// (this layout has no dynamic APIs, so Next would otherwise statically
// render it once at build time). revalidate=60 previously caused a
// confusing lag where the request right after a save could still show
// stale content.
export const revalidate = 0;

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [contact, footer, verse] = await Promise.all([
    getContactContent(),
    getFooterContent(),
    getVerse(),
  ]);

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream text-clay-900 antialiased">
        <ContactModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer
            tagline={footer.tagline}
            email={contact.email}
            social={contact.social}
            verseText={verse.text}
            verseReference={verse.reference}
          />
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
