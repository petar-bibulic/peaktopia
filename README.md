[`Peaktopia`](https://peaktopia.vercel.app) is an application for peak analysis in 2D charts, built with [Next.js 13](https://nextjs.org/) using app router. The idea behind Peaktopia is to provide a simple but powerful tool for peak analysis and comparison in 

## Workflow
0. Login (optional)
1. Upload file for analysis
    1. Process image if the file is an image[^1]
        * select peaks manually (under development)
        * use autoprocess (under development)
2. Select one or more files for peak comparison
3. Select unique peaks for each file
4. Save your peaks to the database or export them as .csv or .json

[^1]: Image upload only available to signed-in users

## Features
- [x] File upload and preview
- [x] User login
- [x] Peak comparison
- [ ] Peak analysis from image
- [ ] Automated image processing (digitization)
- [ ] User profile preview
- [ ] Save selected peaks to the database
- [ ] Export selected peaks

## Getting Started

First, install the dependencies (code snippets are provided for **npm**, but both **yarn** and **pnpm** are suitable alternatives)

```bash
npm install
```
After that, run the development server. Use **--turbo** flag for the experimental Turbopack feature.

```bash
npm run dev [--turbo]
```
To build and start a production-ready server use
```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The structure of the app is given below:
```
src
├── app
│   ├── api
│   ├── auth
│   │   ├── authenticate
│   │   ├── login
│   │   ├── register
│   │   └── reset
│   └── data
│       ├── charts
│       └── image
├── components
│   ├── auth
│   ├── data
│   │   ├── chart
│   │   └── image
│   └── misc
├── firebaseApp
├── hooks
├── store
├── styles
└── utils
```

- `api`: API routes (**under construction**)
- `auth`: routes used for user authn & authz
- `data`: routes used for displaying and processing data (images and XRD files)
- `components`: various components used throughout the app
- `firebaseApp`: config files and auth functions
- `hooks`: custom hooks
- `store`: Auth context provider
- `utils`: utility functions and components

## Tools and libraries

This project uses:
- [`Tailwind`](https://tailwindcss.com) for styling
- [`DaisyUI`](https://daisyui.com/) for pre-styled UI components and themes
- [`Recharts`](https://recharts.org) as a charting library.
- [`Zustand`](https://docs.pmnd.rs/zustand/getting-started/introduction) for global state management
- [`Firebase`](https://firebase.google.com) as a backend (auth, store & NoSQL database)

The project is currently hosted on [`Vercel`](https://vercel.com) as serverless functions. Visit [`Peaktopia`](https://peaktopia.vercel.app) to see it in action.

## Issues & Contributing
You can check out [Peaktopia Github repository](https://github.com/petar-bibulic/peaktopia) - your feedback and contributions are welcome! 

If there is a feature you would like to see implemented open an issue with an `enhancement` tag and I will try to prioritise it.

## Learn More about Next

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
