# Cylera Frontend Developer Take-home Programming Assignment

The goal of this project is to build a single-page dashboard consisting of a few components. We've created a design for this dashboard, and your job is to implement it. This repo is a starting point, with some of the scaffolding in place to get you started. You're expected to use the following technologies in your solution:

- React with TypeScript
- TailwindCSS
- Apollo GraphQL

In addition, your solution won't be viewed on a mobile device but it does need to be responsive.

## The Design

Figma Prototype: https://www.figma.com/proto/4YRep3EnjvbRhlgJnZ4fMl/Tailwind-Figma-UI?page-id=3933%3A43856&node-id=3933%3A43857&viewport=473%2C219%2C0.13&scaling=min-zoom&starting-point-node-id=3933%3A43857

Mock up describing the intended UI and functionality.

_Note:_ It is recommended to view the prototype with the "Fit to screen" option

Detailed Design Specifications: https://app.sympli.io/p/318122bd1bdc2d7a288c1b4828dfdb9761745c2215

_Note:_ The designs use a proprietary font called Proxima Nova. You are not expected to use this font. Please use an alternative but similar in appearance font.

_Note:_ sympli will require you to make an account. After doing that, re-clicking the link should take you to the detailed view of the designs.

## Components & Features

1. Summary statistic cards
   - 3 cards stacked in the upper-right pane of the page, showing the total payload, average payload, and number of customers
2. Table of launches
   - Infinite-scrolling table of launch data
   - Columns: mission name, launch date, launch success (outcome), rocket name, site name, mission ID
3. Filtering and sorting for table
   - All columns should be sortable, with an indicator of sorting direction (if a sort is applied)
   - Search bar that filters results based on mission name
4. Launches by nationality
   - Pie chart by nationality
   - Legend with count for each country
5. Launch site filter
   - Global filter that applies to the summary cards, nationality launch card, payload mission card, and table
6. Animations
   - Table is expandable to be full screen. Animation is demonstrated in prototype at Figma link.
7. Dark mode
   - Global setting can toggle UI theme from light mode to dark mode. Colors and animation are demonstrated in prototype at Figma link.

_Note:_ you are not expected to complete everything. Like with real assignments, you may have to make tradeoffs and compromises to deliver a product on time. You should be prepared to discuss the decisions that were made throughout the development process.

## Dataset

You'll use a publicly available GraphQL endpoint with data from SpaceX launches, found here: [https://api.spacex.land/graphql/](https://api.spacex.land/graphql/).

### Queries

Since knowledge and skillset of GraphQL and ApolloClient are of low priority for this assignment, feel free to use the following queries in your solution.
**These queries are provided as is and can be used, not used, or updated as you see fit.**

### GetLaunches

**inputs**: none

**outputs**: All launch's site names, ids, and related mission ids

```
query GetLaunches {
        launches {
            launch_site {
                site_id
                site_name
            }
            mission_id
        }
    }

```

### GetDetailedLaunches

**inputs**: $limit: Int, $offset: Int, $sort: String, $order: String, $siteId: String, $missionName: String

**outputs**: A single page of launches defined by the $limit & $offset variables that fit the mission name search criteria ($missionName) and is sorted & ordered as described by $sort & $order inputs.

```
query GetDetailedLaunches($limit: Int = 30, $offset: Int, $sort: String, $order: String = "asc", $siteId: String, $missionName: String) {
        launches(limit: $limit, offset: $offset, sort: $sort, order: $order, find: {site_id: $siteId, mission_name: $missionName}) {
        mission_name
        launch_date_utc
        launch_success
        rocket {
            rocket_name
        }
        launch_site {
            site_name
            site_id
        }
        mission_id
        }
    }
```

### GetMissions

**inputs**: none

**outputs**: All available SpaceX missions including their associated Payloads

```
query GetMissions {
        missions {
            id
            name
            payloads {
                id
                payload_mass_kg
                nationality
            }
        }
    }
```

### GetPayloadCustomers

**inputs**: none

**outputs**: All available SpaceX payloads with associated customers

```
query GetPayloadCustomers {
        payloads {
            customers
            id
        }
    }
```

## Deadline & Submission

You have a week to complete this assignment. It shouldn't take that long, but we're giving you enough time to get familiar with the project. To begin your work, you should fork this repo. When you're ready to submit, share the repo with us and provide instructions to run your assignment.

## Scoring Rubric

We'll be assessing the final product on the following criteria:

1. Accuracy of the UI compared to the design
2. Functionality of the interactive components
3. Code quality.

## Getting Started

This is a [React.js](https://reactjs.org) project bootstrapped with [`create-react-app --template typescript`](https://create-react-app.dev/docs/adding-typescript/) and modified to provide a starting point for this assignment. You are free to update the starting point as you see fit. To get started simply:

1. Install dependancies: `npm install`
2. Run the development server: `npm run start`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
4. Make changes in `src/` and elsewhere as needed to implement your solution.
