import sharp from 'sharp';

async function updateExactFavicon() {
  const inputPath = 'C:/Users/shimu/.gemini/antigravity/brain/69a4ae76-2706-4aba-96e8-cf6d8401d7d3/.user_uploaded/media_1792991722997_8713da9e.png';

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const outputBuffer = Buffer.alloc(width * height * 4);

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Remove white/light background
      const isBg = (r > 230 && g > 230 && b > 230 && Math.abs(r - g) < 14 && Math.abs(g - b) < 14);

      const outIdx = (y * width + x) * 4;
      if (isBg) {
        outputBuffer[outIdx] = 255;
        outputBuffer[outIdx + 1] = 255;
        outputBuffer[outIdx + 2] = 255;
        outputBuffer[outIdx + 3] = 0; // Transparent
      } else {
        outputBuffer[outIdx] = r;
        outputBuffer[outIdx + 1] = g;
        outputBuffer[outIdx + 2] = b;
        outputBuffer[outIdx + 3] = 255;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  // 1. High-Res PNG (192x192)
  await sharp(outputBuffer, {
    raw: { width, height, channels: 4 }
  })
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/favicon.png');

  // 2. 32x32 standard favicon
  await sharp('public/favicon.png')
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');

  // 3. 16x16 standard favicon
  await sharp('public/favicon.png')
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');

  // 4. Also overwrite root favicon.ico / vite.svg
  await sharp('public/favicon.png')
    .resize(48, 48)
    .png()
    .toFile('public/favicon.ico');

  console.log('Exact favicon updated across all resolutions successfully!');
}

updateExactFavicon().catch(console.error);
