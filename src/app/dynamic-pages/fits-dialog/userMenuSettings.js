// declare var JS9: any;

JS9.globalOpts.userMenus = true;
// JS9.globalOpts.userMenuBar = [];

JS9.globalOpts.userMenuBar = [
  {
    name: 'zoom',
    title: 'Zoom',
    updateTitle: false,
    options: [
      {
        name: 'in',
        shortcut: 'zoom in',
        cmd: 'SetZoom',
        args: ['in']
      },
      {
        name: 'out',
        shortcut: 'zoom out',
        cmd: 'SetZoom',
        args: ['out']
      },
      {
        name: 'one',
        shortcut: 'reset zoom',
        cmd: 'SetZoom',
        args: [1]
      }
    ]
  },
  {
    name: 'scale',
    title: 'Scale',
    updateTitle: 'text',
    options: [
      {
        name: 'linear',
        cmd: 'SetScale',
        args: ['linear']
      },
      {
        name: 'log',
        cmd: 'SetScale',
        args: ['log']
      },
      {
        name: 'histeq',
        cmd: 'SetScale',
        args: ['histeq']
      }
    ]
  },
  {
    name: 'colormap',
    title: 'Color',
    imageTitle: 'images/toolbar/dax_images/cmap_cool.png',
    updateTitle: 'image',
    options: [
      {
        name: 'grey',
        image: 'images/toolbar/dax_images/cmap_grey.png',
        cmd: 'SetColormap',
        args: ['grey']
      },
      {
        name: 'cool',
        image: 'images/toolbar/dax_images/cmap_cool.png',
        cmd: 'SetColormap',
        args: ['cool']
      },
      {
        name: 'heat',
        image: 'images/toolbar/dax_images/cmap_heat.png',
        cmd: 'SetColormap',
        args: ['heat']
      },
      {
        name: 'viridis',
        image: 'images/toolbar/dax_images/cmap_viridis.png',
        cmd: 'SetColormap',
        args: ['viridis']
      },
      {
        name: 'magma',
        image: 'images/toolbar/dax_images/cmap_magma.png',
        cmd: 'SetColormap',
        args: ['magma']
      },
      {
        name: 'sls',
        image: 'images/toolbar/dax_images/cmap_sls.png',
        cmd: 'SetColormap',
        args: ['sls']
      },
      {
        name: 'red',
        image: 'images/toolbar/dax_images/cmap_red.png',
        cmd: 'SetColormap',
        args: ['red']
      },
      {
        name: 'green',
        image: 'images/toolbar/dax_images/cmap_green.png',
        cmd: 'SetColormap',
        args: ['green']
      },
      {
        name: 'blue',
        image: 'images/toolbar/dax_images/cmap_blue.png',
        cmd: 'SetColormap',
        args: ['blue']
      }
    ]
  },
  // {
  //   name: 'regions',
  //   title: 'regions',
  //   options: [
  //     {
  //       name: 'annulus',
  //       cmd: 'AddRegions',
  //       args: ['annulus']
  //     },
  //     {
  //       name: 'box',
  //       cmd: 'AddRegions',
  //       args: ['box']
  //     },
  //     {
  //       name: 'circle',
  //       cmd: 'AddRegions',
  //       args: ['circle']
  //     },
  //     {
  //       name: 'ellipse',
  //       cmd: 'AddRegions',
  //       args: ['ellipse']
  //     },
  //     {
  //       name: 'line',
  //       cmd: 'AddRegions',
  //       args: ['line']
  //     },
  //     {
  //       name: 'point',
  //       cmd: 'AddRegions',
  //       args: ['point']
  //     },
  //     {
  //       name: 'polygon',
  //       cmd: 'AddRegions',
  //       args: ['polygon']
  //     },
  //     {
  //       name: 'text',
  //       cmd: 'AddRegions',
  //       args: ['text']
  //     }
  //   ]
  // }
];
