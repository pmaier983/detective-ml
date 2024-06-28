# DetectiveML

Frontend Deadline: July 4th
Prompting Deadline: July 4th

The goal of this repo is to create a detective game.

Figma: https://www.figma.com/design/TmysmSpz3uZnoNAeYA01BZ/DetectiveML

## Background

The MVP version of the game will be a chat-box with some AI & advanced prompting. There will be little to no need for a server, and we could even ask users to paste in their OpenAI api key if we wanted to avoid any cost to ourselves.

Future versions of the game will require log in and a backend to allow users to post their own version of the game.

## Technical Info:

### Options

- Hosting Options:
  - [Cloudflare](https://www.cloudflare.com/developer-platform/hosting/)/[s3](https://aws.amazon.com/s3/)
    - I've never done this, but for a simple static site (the MVP) it would be perfect and as low cost as you can reasonably expect.
  - [ECS](https://aws.amazon.com/ecs/) & [Dockerfile](https://docs.docker.com/reference/dockerfile/)
    - I recently created a ECS Fargate spot cluster to host a few websites & servers, it would be trivial to add another image and configure the ports to host this new site.
  - [Vercel](https://vercel.com/)
    - Vercel has incredible DX, but is extrodiarly expensive compared to standard aws (https://x.com/zemotion/status/1798558292681343039/quotes)
  - [Hetzner](https://www.hetzner.com/)
    - Go Germany 🇩🇪, but also a super cheap hosting alternative to aws & possibly cloudflare. Might be able to setup a cluster on their servers, or do something similar to the first option on their [storage boxes](https://www.hetzner.com/storage/storage-box/)
- Framework Choices:
  - [t3.gg](https://t3.gg/) (Next.js & server)
    - Can handle anything you throw at it rather well. We could export a static Next.js site for the MVP and then easily add auth & solid api handling in the future.
  - [Vite](https://vitejs.dev/) (Static React 19)
    - Would work really well for the MVP, but we would have to do a-lot of our own framework rolling and configuration. Setting up good CSS, auth patterns, api handling etc.
  - [Astro](https://astro.build/) (Static + low js)
    - Probably the fastest UX of all the options. It also has easy auth config. This is probably the best option for the MVP (speed wise), and has the ability to scale to the full thing. The only problem is this is more of a web app and less of a static site, so low js just makes less sense.
  - [Remix](https://remix.run/) (Alternative to Next.js)
    - If I wanted to learn remix I'm sure this would be a good choice. Not sure I do just yet though, so might pass. Good Next.js alternative.
- CSS Choices:
  - [Stylex](https://github.com/facebook/stylex)/[Pigment Css](https://github.com/mui/pigment-css)
    - The modern styled-components alternatives. Works well with [RSC](https://react.dev/reference/rsc/server-components)
  - [Tailwind](https://tailwindcss.com/)
    - My go to quick css solution for small projects. Its a bit hard to read once you get out of the swing of things, but nothing beats its terseness.
  - [CSS Modules](https://github.com/css-modules/css-modules)
    - Works with RSC, works with everything. Classic css, will probably never go out of style.
  - [Styled Components](https://styled-components.com/)
    - My old favorite. Does not work with RSC, so not really an option any more. See options 1 for better choices.

### What will be done

- Current plan:
  - **Hosting**: Cloudflare/s3/Hetzner Static site. Why: Super cheap, very easy, and a good deploy pattern to try out once at least. If we Dockerize everything anyways it will be easy to move away from.
  - **Framework**: t3.gg - We can just use Next.js's static site export to start with, and easily add auth and api paths if the app expands.
  - **CSS_Choices**: Tailwind & CSS Modules. Tailwind for all small css, and CSS Modules for anything complex! Works with RSC and probably everything else!

### What was done

- **Hosting**:
  - Purchased the DetectiveML.com url on route53
  - Hosting the site through [cloudflare pages](https://pages.cloudflare.com/)

### How to deploy

- Simply push to main or update the [repo](https://github.com/pmaier983/detective-ml). Cloudflare pages is configured to watch!

## Questions

- [x] Whats on the back of the cards?
  - See figma
- [x] Should we save your chat history? What does returning to a suspect do?
  - Yea. Avoid time
- [ ] Can you lose? What does [Give up] do?
  - TODO Noah
- [x] How important is time (the exact time you speak to someone...)
  - Don't care for MVP
- [ ] What does success look like?
  - TODO Noah
- [ ] What does 100% aggravation do?
  - Some new error screen? Disable the card?
- [ ] What does save case do?
  - Not MVP
- [ ] Why are the suspects drawn in different styles?
  - TODO Noah
- [ ] How does the overflow logic work for the textbox?

## TODO

- [ ] Configure [shadcn/ui](https://ui.shadcn.com/docs/installation/next) UI
- [ ] Why do the images load so slowly in dev? Any way to speed this up without a server?
- [x] purchase DetectiveML.com
- [ ] configure deploy and website hosting
  - [ ] Decide on s3 vs. cloudflare & configure site -> static code
  - [ ] Document how to deploy easily (ideally just a package.json script)
- [x] Setup the proper font
- [ ] Get a Favicon
- [ ] Add some music?
- [ ] Add a good analytics platform
- [ ] Create a NOT FOUND page (next.js special page)
- [ ] Create a global error page (next.js special page)
- [ ] Limit who can view the s3 bucket (currently is public read anyone)
- [ ] Noah -> get us an api key (and set a max cash limited for said api key!)

## TODO (post-MVP)

- [ ] Setup a backend & a backend deploy/change script #drizzle #supabase
- [ ] Rename \_api -> api once we want to use server side rendering
- [x] Sketch out the db tables
- [ ] Mobile lol
- [ ] A home page
- [ ] A case creator
