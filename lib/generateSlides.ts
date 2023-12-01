export default function generateSlides(images: ImageType[]) {
  const slides: ImageType[][] = [];

  let firstImage = true;
  let storedImage;

  // Loop through all images
  for (const image of images) {
    if (firstImage) {
      // Add first image as a separate slide
      slides.push([image]);
      firstImage = false;
    } else {
      // Orientation of current image
      const orientation =
        image.dimensions!.aspectRatio < 1 ? "portrait" : "landscape";

      // Check if previous image was portrait oriented and stored
      if (storedImage) {
        // Check orientation of current image
        if (orientation == "portrait") {
          // Merge into a slide with previous image
          slides.push([storedImage, image]);
        } else {
          // Add previous and current image as separate slides
          slides.push([storedImage]);
          slides.push([image]);
        }
        // Clear stored image after adding
        storedImage = null;
      } else {
        // Check orientation of current image
        if (orientation == "portrait") {
          // Store portrait image and check next one
          storedImage = image;
        } else {
          // Add landscape image as a new slide
          slides.push([image]);
        }
      }
    }
  }

  // Check if last image was stored as portrait
  if (storedImage) {
    // Add leftover image as a slide and clear
    slides.push([storedImage]);
    storedImage = null;
  }

  return slides;
}
