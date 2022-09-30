# Cylera Frontend Developer Take-home Programming Assignment

The goal of this project is to build a single component used to render the provided dataset as a table of total payload masses by mission, filtered by nation, and display the data in a doughnut chart. We created a design for this component, and your job is to implement it. This repo is a starting point, with some of the scaffolding in place to get you started. You're expected, at a minimum, to use the following technologies in your solution:

- React with TypeScript
- TailwindCSS

If you choose use additional technologies, be prepared to discuss how and why that decision was made.

_Note:_ Your solution won't be viewed on a mobile device but it does need to be responsive.

## The Design

Figma Prototype: https://www.figma.com/proto/4YRep3EnjvbRhlgJnZ4fMl/Tailwind-Figma-UI?page-id=4030%3A49918&node-id=4030%3A49919&viewport=1848%2C1058%2C0.92&scaling=min-zoom&starting-point-node-id=4030%3A49919

Detailed Designs:

_Notes:_

- The designs do not necessarily display accurate data. They are intended to describe the appearance of the component but the numbers you compute may be different.
- The designs are not exhaustive of all functionality. It will be up to you to follow the designs' precedent and use your best judgement when implementing features that are described bellow but not represented in the designs.
- Sypmpli may require you to make an account to access the detailed designs.

## Component & Features

### Total Payload Per Mission

Bellow is a description of the component and its functionality. Please work to implement all of the following to the best of your ability.

- Doughnut chart showing total payload mass per mission.
- Table with total payload mass for each mission to serve as a legend.
- Dropdown menu to select each nation with an 'All Nations' option.
  - When a single nation is selected, then the table and chart should only show data for that nationality
  - When the 'All Nations' option is selected, then the table and chart should show data for all nationalities.
- Each Columns is sortable.
  - Clicking the column title once will sort that column
  - Clicking a second time will sort the column in the opposite order
  - Clicking a third time will remove sorting from the column.
- An arrow indication sort direction will be present when that column is sorted
- Hovering a doughnut chart segment should reveal a tooltip on that doughnut chart segment displaying the mission's name and total payload mass and doughnut chart segment color.
- The legend should be vertically scrollable if needed
- Long mission names should truncate with a '...'

_Note:_ You should be prepared to discuss the decisions and trade offs that were made throughout the development process.

## Dataset

A sample dataset is provided under `./dataset/missions.json`. **Do not alter this file**. It is intended to be used as if it were provided from a server. So please instead, read this file and perform any processing you see fit on the data in memory.

## Deadline & Submission

You have a week to complete this assignment. It shouldn't take that long, but we're giving you enough time to get familiar with the project. To begin your work, you should fork this repo. When you're ready to submit, share the repo with us and provide instructions to run your assignment.

## Scoring Rubric

We'll be assessing the final product on the following criteria:

1. Accuracy of the UI compared to the design.
2. Functionality of the component.
3. Code quality.

## Getting Started

This is a [React.js](https://reactjs.org) project bootstrapped with [`create-react-app --template typescript`](https://create-react-app.dev/docs/adding-typescript/) and modified to provide a starting point for this assignment. You are free to update the starting point as you see fit. To get started simply:

1. Install dependancies: `npm install`
2. Run the development server: `npm run start`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
4. Make changes in `src/` and elsewhere as needed to implement your solution.
