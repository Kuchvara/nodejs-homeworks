const fs = require('fs').promises

const isAllowed = async (path) => {
  return await fs.access(path).then(() => true).catch(() => false)
}

const createNewFolder = async (folder) => {
  if (!(await isAllowed(folder))) {
    await fs.mkdir(folder)
  }
}

module.exports = {
  createNewFolder
}
