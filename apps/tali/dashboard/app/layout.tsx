import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: any;
}) {
  return (
    <html lang="en">
      <body>
        {/*@ts-ignore */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}