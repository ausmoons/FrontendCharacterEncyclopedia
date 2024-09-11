# Character Encyclopedia: A Next.js Application with GraphQL and Cypress Testing

## Overview
Character Encyclopedia is a Next.js application that showcases a collection of characters from various fictional universes. The application is built with a modular and maintainable structure, utilizing TypeScript for type safety and GraphQL for querying character data. The project also includes end-to-end testing using Cypress for comprehensive testing coverage.

### Video Demo
[![Watch the video](thumbnail.jpg)](characters.mp4)

## Key Features

1. **GraphQL Integration**: The application fetches character data from a GraphQL API, allowing for efficient and flexible querying of character details.
2. **Character Encyclopedia**: The application provides a comprehensive list of characters, including their names, images, and brief descriptions. Users can navigate through the list and view detailed information about each character.
3. **Search Functionality**: Users can search for specific characters by name, providing instant search results as they type.
4. **Film Appearances**: The application displays the films in which each character appears, providing a visual representation of their cinematic history.
5. **Error Handling**: The application includes robust error handling, displaying informative error messages when data fetching fails or encounters errors.
6. **Responsive Design**: The application is designed to be responsive and visually appealing on various devices, ensuring a seamless user experience across different screen sizes.

## Technical Details

1. **Next.js**: The application is built using Next.js, a popular React framework for server-side rendering. Next.js provides features like automatic code splitting, static optimization, and server-side rendering, making it a suitable choice for building a scalable and performant web application.
2. **TypeScript**: TypeScript is used throughout the project to ensure type safety and maintainability. TypeScript adds static typing to JavaScript, providing compile-time error checking and improved code quality.
3. **GraphQL**: The application uses GraphQL to fetch character data from a GraphQL API. GraphQL provides a flexible and efficient way to query data, allowing for precise and targeted data retrieval.
4. **Apollo Client**: Apollo Client is used to manage the GraphQL data layer in the application. Apollo Client provides caching, optimistic UI updates, and error handling, making it an ideal choice for working with GraphQL in a Next.js application.
5. **Cypress**: Cypress is used for end-to-end testing in the project. Cypress provides a robust and flexible testing framework, allowing for comprehensive testing coverage of the application's functionality.
6. **SCSS**: SCSS is used for styling components and pages in the application. SCSS provides features like variables, nesting, mixins, and functions, making it easier to manage and maintain the application's styles.

## Project Structure
The project follows a modular and organized directory structure, making it easy to navigate and maintain. The main directories include:

- **character-encyclopedia**: Contains the main components and pages related to the character encyclopedia.
- **components**: A directory containing various reusable components used throughout the application.
- **cypress**: A directory for Cypress test files, including e2e tests for end-to-end testing and support files for shared functionality.
- **hooks**: A directory for custom hooks used in the application.
- **interfaces**: A directory containing TypeScript interfaces for various entities like character, error, layout, search, and film.
- **lib**: A directory containing shared utility functions and libraries.
- **pages**: A directory containing the main pages of the application, including `_app.tsx` (the root component), `index.tsx` (the home page), and characters pages for individual character details.
- **public**: A directory containing static assets like images and fonts.
- **queries**: A directory for GraphQL queries.
- **styles**: A directory containing SCSS files for styling components and pages.
- **utils**: A directory containing utility functions and error handling code.

## Installation and Running the Project

To install project dependencies, run:

```bash
npm install
# or
yarn install
# or
pnpm install

npm run lint
# or
yarn lint
# or
pnpm lint

npm run format
# or
yarn format
# or
pnpm format

npm run dev
# or
yarn dev
# or
pnpm dev


## Improvements

1. **Handle 404 Errors**: Implement a user-friendly 404 page for scenarios where users enter a non-existing page. Ensure that the styling of the 404 page is consistent with the rest of the application.
2. **Write More Tests**: Increase the coverage of tests, particularly focusing on edge cases and user interactions, to ensure the application behaves as expected in various scenarios.