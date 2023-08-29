This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

To run in dev mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Recommend running a production build for faster performance 
    
```bash
npm run build
# or
yarn build
# or
pnpm build
```

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.    

About the project:

Client side development with Next.js, React, Typescript, TailwindCSS, and Shad CN.

Data fetching is done with the fetch api in a React Server Component at the root of the application. By taking advantage of the caching on the server the data can be fetched once and then used on the client side. This is a great way to reduce the amount of data fetching on the client side and improve performance. This helps to alleviate the finnicky server which fails to respond intermittently and has a delay to requests. 

![image](/Architecture.png)

The client components are used as the tree leaves in the component tree. This is a great way to take advantage of the caching on the server and the performance of the client side rendering.

Shad CN is the UI library that I chose to use. Shad CN works with radix primitives and uses TailwindCSS under the hood. It is a great library for building UIs quickly and easily. It is also very customizable and has great documentation components are installed with the command line. The only down side is that there is boiler plate code generated when installing components.

The trade off for tailwind css is that the long strings in the class names can be difficult for code reviews, de bugging and without proper management lead to repeated code. 

tailwind is however an excellent option for quickly developing a UI, is very customizable, well documented and the entire team is using the same names for css properties.



