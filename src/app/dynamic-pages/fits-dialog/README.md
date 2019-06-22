# Fits Dialog

## What's This?

Notes on building a dialog for displaying FITS files.

## Details

This dialog integrates JS9 resources. That is an involved endeavour since JS9 is not designed to be run in SPAs, and its API is thus not equipped with all the hooks to readily start/stop all salient processes. Anyhow, here are some points in an attempt to document what's been integrated:

- Using jquery in my view since it's included/required by JS9 anyway; I'm not including jquery in my bundle (directly).

## Resources

Example fits file: 'https://oort.astro.umd.edu/c2014b1-20171028_13064-post9.560-r-ztf.fits.gz'
