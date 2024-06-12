/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  // The MVP is a static site, we may need a server in the future though
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: "export",
}

export default config
