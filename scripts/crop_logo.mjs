import sharp from 'sharp';

async function cropAndMakeTransparent() {
  const inputPath = 'C:/Users/shimu/.gemini/antigravity/brain/69a4ae76-2706-4aba-96e8-cf6d8401d7d3/.user_uploaded/media_1792989710075_7d8c0ae2.png';
  const outputPath = 'public/images/bdfisheries_logo_tight.png';

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Background color in user's image is around rgb(238, 238, 238)
  // Let's create an RGBA buffer where the background is completely transparent
  const outputBuffer = Buffer.alloc(width * height * 4);

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Check if pixel is background (near #eeeeee or near white)
      // Background is approximately r > 220, g > 220, b > 220 and difference between r,g,b is small
      const isBg = (r > 215 && g > 215 && b > 215 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15);

      const outIdx = (y * width + x) * 4;
      if (isBg) {
        outputBuffer[outIdx] = 255;
        outputBuffer[outIdx + 1] = 255;
        outputBuffer[outIdx + 2] = 255;
        outputBuffer[outIdx + 3] = 0; // transparent
      } else {
        outputBuffer[outIdx] = r;
        outputBuffer[outIdx + 1] = g;
        outputBuffer[outIdx + 2] = b;
        outputBuffer[outIdx + 3] = 255; // visible logo element

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Original bounding box: left=${minX}, top=${minY}, right=${maxX}, bottom=${maxY}`);
  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  // Process tight cropped transparent PNG
  await sharp(outputBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .png()
  .toFile(outputPath);

  console.log(`Successfully generated tight zero-padding logo: ${cropWidth}x${cropHeight} at ${outputPath}`);
}

cropAndMakeTransparent().catch(console.error);
