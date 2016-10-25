export default function update(pathArray) {
    return (currentPath, key, index) => {
        if (Array.isArray(key)) {
            key = key[0].indexOf(key[1])
            currentPath[key] = index === pathArray.length - 1 ? true : {}
        } else if (index === pathArray.length - 1 && !currentPath[key]) {
            currentPath[key] = true
        } else if (index < pathArray.length - 1) {
            currentPath[key] = typeof currentPath[key] === 'object' ? currentPath[key] : {}
        }
        return currentPath[key]
    }
}
