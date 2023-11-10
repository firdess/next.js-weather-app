'use client'
import { ThemeProvider } from "next-themes";

export default function Provider({ children, ...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}