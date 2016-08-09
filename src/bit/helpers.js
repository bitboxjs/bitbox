export function extractPaths(paths) {
  const allPaths = [];
  function traverse(currentPaths, pathArray) {
    Object.keys(currentPaths).forEach(key => {
      pathArray.push(key);
      if (currentPaths[key] === true) {
        allPaths.push(pathArray.join('.'));
      } else {
        traverse(currentPaths[key], pathArray);
      }
      pathArray.pop();
    });
  }
  traverse(paths, []);

  return allPaths;
}
