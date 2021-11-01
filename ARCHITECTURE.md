# Project Architecture

## Backend

Folder: "job-tracker-backend".

Everything starts at `src/app.js`. There the middlewares are applied as well as the different routers from the three different components: `applications`, `comments` and `statuses`.

### Folders

The main separation comes whether the file is directly related to any of these entities or not.

#### Folder: components

Each of this components has a specific folder with the routes and controllers as well as the models and I would add here any other business logic specific to a component.

#### Folder: libraries

Inside the "libraries" folder we find component agnostic logic. The database layer, error management and other generic helpers.

### Database

I haven't used any Database, instead, I use files to get persistance of data.

I went for this approach to avoid configuration in the setup of this project as well as to play around with implementing a database layer from scratch. Not that I think project should do that, but more from a learning perspective.

Since I developed my own DB layer, I also had to develop the models, instead of relying on some ODM or ORM. The models are inside the "components" folder.

I followed a similar design pattern as ORMs. Yet, each of the models is developed from scratch. This was also a learning experience to understand better the role of ORMs and ODMs.

## Frontend

Folder: "job-tracker-frontend".

This is a "create-react-app", therefore, everything starts at `src/index.tsx`. There it's imported the first component: `App` which is where all the routes are set.

### Folders

#### Folders: components

The components folder is just for route agnostic components. Similar to the "libraries" folder in the backend in the sense that they do not know anything about the business logic of the application.

#### Folders: hooks

Similar to "components" folder but for hooks that are agnostic to the routes.

The `useQuery` hook is used to centralize all the logic about talking to the backend. For example, base urls or headers.

#### Folders: models

I decided to separate the types in a global folder, since they are reused in all the different routes.

#### Folders: routes

This is where there should be all the UI and business logic of the frontend application.

The `index.tsx` puts all the routes together. Each route has then a folder with the main component for that path as well as complementary components used only in that route.

I tried keeping the route component as readable as possible. Especially the return function should be a description of the UI structure of that page. For example the `ApplicationShow`:

```
<>
  <AnchorLink to="/" label="< Home" />
  <ApplicationDetails application={ application } handleChangeStatus={ handleChangeStatus } />
  <Box>
    <Heading level="3">Comments</Heading>
    <CommentNew onSubmit={ createComment } />
    <CommentsList comments={ application.comments || [] } />
  </Box>
</>
```

#### Folders: styles

Similar to "components" as well. This folder is for shared styles across the application, for example colors.

#### Folders: utils

A folder with helper functions agnostic to routes and even business logic for any of the entities.

### Styling

For the styling of this application I used Grommet UI framework. One of the goals I wanted to accomplish was to create an application without CSS.

Relying always on the theme of the framework and the props of the UI framework elements. I believe that when a framework is well developed it minimized the amount of UI decisions that developers need to make and that helps keeping consistency.

Every decision that the UI developer needs to make when creating a new page is a possible source of inconsistency.

When UI decisions are made at the framework level it ensured consistency across all the pages and reduces friction between the design and engineering teams.

## Testing

Any test file is added next to the acual file is testing. Keeping test and actual code together.
