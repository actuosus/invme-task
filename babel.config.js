module.exports = function(api) {
  api.cache.forever();

  const presets = [["react-app", { flow: true, typescript: false }]];

  const plugins = [
    ["@babel/plugin-transform-react-jsx"],
    ["@babel/proposal-decorators", { legacy: true }],
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ]
  ];

  if (process.env.platform === "web") {
    return {
      presets: ["@babel/env", ...presets],
      plugins
    };
  }

  return { presets, plugins };
};
