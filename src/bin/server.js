const app = require('../../app')
const db = require('../db')
const path = require('path')
const { createNewFolder } = require('../helpers/folders')

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)
const AVATARS_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR, process.env.USERS_AVATARS)

const start = async () => {
  try {
    await db()

    app.listen(PORT, async () => {
      await createNewFolder(UPLOAD_DIR)
      await createNewFolder(AVATARS_DIR)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`)
  }
}

start()
