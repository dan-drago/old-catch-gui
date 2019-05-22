# COMET-ASTEROID-TERRESTRIAL-CATALOG-HARVESTER (CATCH) FRONTEND

This is the frontend viewer for the [CATCH API](https://oort.astro.umd.edu/catch/docs).

## Dev Setup

## Dev Notes

- Having to deal with a [bug](https://github.com/angular/components/issues/13870) that causes angular material accordion elements to expand within a material dialog; this creates a flash that is horrible UX. They're working on a fix; in the meantime, I've implemented a workaround where I first hide the accordion items for a short while until they've settled, then I animate in the items
