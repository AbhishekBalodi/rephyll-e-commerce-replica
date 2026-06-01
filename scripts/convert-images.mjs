import sharp from 'sharp';
import path from 'path';

const root = path.resolve('src', 'assets');
const files = [
  'bg-home-kits.png',
  'bg-home-kits-mobile.png',
  'bg-testimonials.png',
  'bg-testimonials-mobile.png',
  'bg-blogs.png',
  'Group 1707479861.png',
  'bg-mega-saver.png'
];

for (const name of files) {
  const src = path.join(root, name);
  const base = path.basename(name, path.extname(name));
  const webp = path.join(root, `${base}.webp`);
  const avif = path.join(root, `${base}.avif`);
  console.log('Converting', name);
  await sharp(src).webp({ quality: 80, effort: 6 }).toFile(webp);
  await sharp(src).avif({ quality: 50, effort: 4 }).toFile(avif);
}
console.log('Image conversion complete');
