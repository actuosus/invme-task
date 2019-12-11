module.exports = function(api) {
  api.cache.forever();

  const presets = [["react-app", { flow: true, typescript: false }]];

  const plugins = [
      ["@babel/plugin-transform-react-jsx"],
      ["@babel/proposal-decorators", { legacy: true }],
    ];

  if (process.env.platform === "web") {
    return {
      presets: ["@babel/env", ...presets],
      plugins
    };
  }

  return { presets, plugins };
};
