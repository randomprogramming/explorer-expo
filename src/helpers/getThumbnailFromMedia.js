export default function getThumbnailFromMedia(mediaArr) {
  for (const media of mediaArr) {
    if (media.thumbnail) return media.url;
  }
  return mediaArr[0].url;
}
