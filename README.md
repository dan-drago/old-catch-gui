# COMET-ASTEROID-TERRESTRIAL-CATALOG-HARVESTER (CATCH) FRONTEND

This is the frontend viewer for the [CATCH API](https://oort.astro.umd.edu/catch/docs).

## Dev Setup

- Clone/fork the repo to your local machine
- Copy `.env-template` to `.env` and fill in the vars with appropriate names.
- To run a local dev server, run `ng serve`
- See below for production build and deployment

## Production Build

If you want to just build and test your production bundles locally, then run `_build_prod`, enter `dist-`, and fire up a local file server from there.

## Deployment

### Deploy to github

For github deployment to work, you need to set the env vars beginning with `GITHUB_`. If you are able to push automatically to github then you'll be able to simply run the script `_deploy_github_pages` in order to generate a working site

This is of course intended for development and demonstration purposes.

### Deploy to Remote Linux

Set the env vars beginning with `LINUX_` and make sure that you have a file server (e.g. apache) serving from the path you set to `LINUX_CATCH_GUI_PATH`. For apache, this is likely to be `/var/www/html/catch-gui`. Then run `_versioned_linux_deployment XXX` where the argument `XXX` will be the effective version name of this build/deployment, which will then be served from `http(s)://yourhost.com/catch-gui/XXX`.

This is of course intended for development and demonstration purposes.

## Dev Notes

- Having to deal with a [bug](https://github.com/angular/components/issues/13870) that causes angular material accordion elements to expand within a material dialog; this creates a flash that is horrible UX. They're working on a fix; in the meantime, I've implemented a workaround where I first hide the accordion items for a short while until they've settled, then I animate in the items.
