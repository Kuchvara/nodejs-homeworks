const Jimp = require('jimp')

const avatarEdit = async (avatarPath) => {
  const img = await Jimp.read(avatarPath)
  await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(75).writeAsync(avatarPath)
}

module.exports = {
  avatarEdit
}
