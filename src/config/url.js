var baseUrl = function() {
  var currPath = window.document.location.href;
  var pathArr = currPath.split("/");
  var basePath = pathArr[0] + "/" + pathArr[1];
  let URL = basePath
  if (process.env.NODE_ENV === "development") {
    basePath = "/yunhis";
    URL = 'http://120.77.145.235:8080/yunhis'
  }
  console.log(basePath);
  //basePath = 'http://120.77.245.151:8080/yunhis';
  //basePath='http://120.78.78.69:8080/yunhis';
  //basePath="http://192.168.1.172:8880/yunhis";
  return {
    url: basePath + "/skip/controller/execute.action",
    mainUrl: URL
  };
  //return  '/skip/controller/execute.action';
};

export default {baseUrl};
