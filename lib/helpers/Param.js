const Types = require("./Types");
exports.getParams = args => {
  return args.filter(arg => arg.indexOf("-") > -1);
};

exports.hasParam = args => {
  return this.getParams(args).length > 0;
};

exports.getShort = params => {
  return params.map(param => param.match("[a-z]")[0])[0];
};

exports.getValue = (params, short) => {
  return (
    params
      .find(param => param.indexOf(`-${short}=`) > -1)
      .split(`-${short}=`)[1] * 1
  );
};

exports.getText = args => {
  return args.find(
    arg =>
      arg.match("(.*?)") &&
      arg.indexOf("-") < 0 &&
      !Types.commands.includes(arg)
  );
};
