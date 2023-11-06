module.exports = {
    // ...
    webpack: {
      alias: { /* ... */ },
      plugins: {
        add: [ /* ... */ ],
        remove: [ /* ... */ ],
      },
      resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
        }
      },
      configure: { /* ... */},
      // eslint-disable-next-line no-dupe-keys
      configure: (webpackConfig, { env, paths }) => {
        /* ... */
        return webpackConfig;
      },
    },
  };