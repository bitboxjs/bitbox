export function getBoundingClient(com) {

    const domNode = com._lastNode && com._lastNode.dom
        ? com._lastNode.dom
        : null
    const bounds = domNode && domNode.getBoundingClientRect
        ? domNode.getBoundingClientRect()
        : {}

    return {
        width: bounds.width || 0,
        height: bounds.height || 0,
        top: bounds.top || 0,
        right: bounds.right || 0,
        bottom: bounds.bottom || 0,
        left: bounds.left || 0,
        offset: document.body.scrollTop || 0
    }
}

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

export function getTime(date) {
    const hours = String(date.getHours()).length === 2 ? date.getHours() : '0' + date.getHours();
    const minutes = String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = String(date.getSeconds()).length === 2 ? date.getSeconds() : '0' + date.getSeconds();
    const milliseconds = String(date.getMilliseconds())
    return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}
