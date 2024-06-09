import "~/styles/globals.css";

import { VT323 } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import styles from "./layout.module.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "DetectiveML",
  description: "An AI Detective Game", // TODO: ask for a better description
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={vt323.className}>
      <body>
        <TRPCReactProvider>
          <div className={styles.container}>
            <div className={styles.screenCase}>{children}</div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
