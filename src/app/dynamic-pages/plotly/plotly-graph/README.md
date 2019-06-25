# What's This?

This component is an elaborate wrapper around the angular component provided by plotly `<plotly-plot ...></plotly-plot>`. The idea of this wrapper is to enable you to pass through params that determine:

- Whether the plot shows up in "isMiniMode" to be displayed in the columsn of the data table
- Whether we're plotting a scatter or histogram
- Etc.

The idea is to have a single slightly complex interface to plotly rather than a whole bunch of different implementations (one for each size, type, etc.) Since making this switch to a single interface to plotly, the code has felt A LOT neater!
