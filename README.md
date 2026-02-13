# Corre Mobile

This repository contains the source code for the Corre mobile application and its associated server functions.

## Repository Structure

The project is organized into two main directories that serve the application:

- **`app/`**: Contains the source code for the mobile application developed with React Native and Expo. This is where the user interface and client logic reside.
- **`server-functions/`**: Contains the server functions (Cloud Functions), responsible for backend logic, integrations, and data processing that support the application.

## Environment Documentation

To set up your development environment and access detailed documentation about the project, please consult our reference page:

🔗 **[Open Source Documentation - Notion](https://corre.notion.site/Open-Source-2cc8fff6730e807da999e15a6f28caca)**

### Documentation Items

On the documentation page, you will find the following essential resources:

* **Code Documentation**: Technical details about the architecture, components, and internal logic of the application.
* **Development Environments**: Instructions for configuring different environments (development, production) and their respective variables.
* **GitHub Collaboration Manual**: Guide to best practices for commits, pull requests, and workflow within the repository.
* **Store Publication**: Process and requirements for publishing new versions of the app on the Google Play Store and Apple App Store.
* **Design System & Brandbook**: Visual guidelines, color palette, typography, and UI components used in the project.
* **Assets**: Graphic resources such as logos, icons, and images used in the application.
* **Database**: Data modeling, schemas, and information about the database structure used.

## How to Run

Each part of the project has its own detailed execution guide:

### Mobile Application (`app/`)
Refer to the [`app/README.md`](app/README.md) file for instructions on:
- Installing dependencies.
- Configuring environment variables (`.env`).
- Commands to run on emulators (Android/iOS) or physical devices.
- Build and deploy scripts.

### Server Functions (`server-functions/`)
Refer to the [`server-functions/README.md`](server-functions/README.md) file for instructions on:
- Installing function dependencies.
- Google Cloud SDK configuration.
- Scripts to deploy individual or bulk functions.
- Configuration of specific environment variables (e.g., Algolia).

## How to Contribute

Contributing is very simple:

1. Use our lints and configurations.
2. Choose an issue.
3. Comment directly on the issue with your estimated delivery date, assign yourself on GitHub, and announce in the `#tech` Discord channel that you are working on it (send the link).

Always update the repository before starting a new contribution.

Commits must follow the [Commit Pattern](https://corre.notion.site/Manual-de-colabora-o-GitHub-2cc8fff6730e80e3b344f0ff4ee82c8c) standards.

```bash
git clone [https://github.com/corre-social/mobile/](https://github.com/corre-social/mobile/)
git checkout dev
cd mobile/app
git pull
npm i
git checkout -b feat/fix/XXXX # creates the new branch you will work on
# perform all commits and changes
git commit -m "feat/fix/XXX: description"
