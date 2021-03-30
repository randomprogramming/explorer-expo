export default function getThumbnailFromMedia(mediaArr) {
  for (const media of mediaArr) {
    if (media.isThumbnail) return media;
  }
  return mediaArr[0];
}
