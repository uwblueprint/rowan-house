# Rowan House Society Course Platform
Welcome to the RHS platform repository!

## Technical Overview
**Backend Language:** TypeScript (Express.js on Node.js)<br>
**Backend API:** GraphQL<br>
**Database:** MongoDB<br>
**User Auth:** Opt-in<br>
**File Storage:** Opt-in<br>

The frontend is a React application written in TypeScript.

## Table of Contents
* 📝 [Documentation](#documentation)
* 👨‍💻 [Getting Started](#getting-started)
* 📂 [File STructure](#file-structure)
* 🌳 [Version Control Guide](#version-control-guide)
  * 🌿 [Branching](#branching)
  * 🔒 [Commits](#commits)

## Documentation
[Engineering Notion](https://www.notion.so/uwblueprintexecs/Engineering-f40d9b293ef84f91b7c846ea273af440)

[Starter Code](https://uwblueprint.github.io/starter-code-v2)

## Getting Started
This repository was setup using [Blueprint's starter-code](https://uwblueprint.github.io/starter-code-v2/docs/getting-started). To connect to all the services we use, we use `.env` files that keep track of keys, urls, and more. Make sure you have a `.env` file in the following locations:
- `./.env` (the main folder)
- `./frontend/.env`
- `./e2e-tests/.env` (optional)

Once you have these, build and run the system using:
```
docker-compose up --build
```

To run the linter, use the following commands while the docker containers are running:
- Mac
  - `docker exec -it RHS-frontend /bin/bash -c "yarn fix"`
  - `docker exec -it RHS-backend /bin/bash -c "yarn fix"`
- Windows
  - `docker exec -it RHS-frontend bash -c "yarn fix"`
  - `docker exec -it RHS-backend bash -c "yarn fix"`

Or, if you have yarn installed locally, running `yarn fix` should work as well.

## File Structure
```bash
rowan-house
├── .github/            # Config for issue/PR templates & GA workflows
├── backend/ # Backend (Node/Apollo/Express?)
│   ├── graphql/        # Main backend funcitonality
│   │   ├── resolvers/  # Defines Queries and Mutations (uses services)
│   │   ├── types/      # GraphQL Types (inside gql strings)
│   │   └── index.ts    # Entry point (called by server.ts)
│   │                   # - Outlines all Queries and Mutations one can call on
│   ├── middlewares/    # Defines functions that run before an API call is resolved (e.g ensures auth)
│   │   └── validators/ # ?
│   ├── models/         # Defines MongoDB schema and interfaces
│   ├── services/       # Defines interaction with core serices (e.g. Mongo, Firebase)
│   │   ├── implementations/ # Service helpers definitions
│   │   └── interfaces/ # Service helpers declarations
│   ├── testUtils/      # ?
│   ├── utilities/      # Helper functions for 3rd party utilities
│   ├── server.ts       # Entry point (where the 'code' starts)
│   └── types.ts        # Defines backend types
├── db-init/            # ?
├── e2e-tests/          # Tests to confirm starter-code setup is working
├── frontend/           # Frontend (React)
│   ├── public/         # Everything in here is directly put at the url (e.g. index.html)
│   └── src/            # Source of frontend
│       ├── APIClients/ # Helpers for interacting with the backend
│       ├── components/ # Building blocks for the website (e.g. buttons, pages)
│       ├── constants/  # Simple constants (e.g. routes)
│       ├── contexts/   # Global frontend data (a.k.a React contexts)
│       ├── reducers/   # ?
│       ├── types/      # Frontend type definitions
│       ├── utils/      # Helper functions for 3rd party utilities
│       ├── App.tsx     # "Main page" - Routing Definition
│       └── index.tsx   # Entry point (called by index.html, uses App.tsx)
└── hooks/              # Git hooks
```

## Version Control Guide

### Branching
* Branch off of `main` for all feature work and bug fixes, creating a "feature branch". Prefix the feature branch name with your name. The branch name should be in kebab case and it should be short and descriptive. E.g. `sherry/readme-update`
* To integrate changes on `main` into your feature branch, **use rebase instead of merge**

```bash
# currently working on feature branch, there are new commits on main
git pull origin main --rebase

# if there are conflicts, resolve them and then:
git add .
git rebase --continue

# force push to remote feature branch
git push -f
```

### Commits
* Commits should be atomic (guideline: the commit is self-contained; a reviewer could make sense of it even if they viewed the commit diff in isolation)
* Trivial commits (e.g. fixing a typo in the previous commit, formatting changes) should be squashed or fixup'd into the last non-trivial commit

```bash
# last commit contained a typo, fixed now
git add .
git commit -m "Fix typo"

# fixup into previous commit through interactive rebase
# x in HEAD~x refers to the last x commits you want to view
git rebase -i HEAD~2
# text editor opens, follow instructions in there to fixup

# force push to remote feature branch
git push -f
```

* Commit messages and PR names are descriptive and written in **imperative tense**<sup>1</sup>. The first word should be capitalized. E.g. "Create user REST endpoints", not "Created user REST endpoints"
* PRs can contain multiple commits, they do not need to be squashed together before merging as long as each commit is atomic. Our repo is configured to only allow squash commits to `main` so the entire PR will appear as 1 commit on `main`, but the individual commits are preserved when viewing the PR.

---

1: From Git's own [guidelines](https://github.com/git/git/blob/311531c9de557d25ac087c1637818bd2aad6eb3a/Documentation/SubmittingPatches#L139-L145)
