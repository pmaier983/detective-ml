"use client"

import { TRPCReactProvider } from "~/trpc/react"

export const GeneralProviders = ({
  children,
}: {
  children: React.ReactNode
}) => <TRPCReactProvider>{children}</TRPCReactProvider>
