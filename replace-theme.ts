import fs from 'fs';
import path from 'path';

const replacements = [
  { from: /#FF6B8B/gi, to: '#FFF8F0' },
  { from: /#E05270/gi, to: '#E8D8C8' },
  { from: /#1A0B10_MUTED/gi, to: '#4A4A5A' },
  { from: /bg-\[#1A0B10\]/g, to: 'bg-[#D4A373]' },
  { from: /text-\[#1A0B10\]/g, to: 'text-[#2B2D42]' },
  { from: /border-\[#1A0B10\]/g, to: 'border-[#D4A373]' },
  { from: /hover:bg-\[#1A0B10\]/g, to: 'hover:bg-[#C89F65]' },
  { from: /hover:text-\[#1A0B10\]/g, to: 'hover:text-[#D4A373]' },
  { from: /hover:border-\[#1A0B10\]/g, to: 'hover:border-[#C89F65]' },
  { from: /selection:bg-\[#1A0B10\]/g, to: 'selection:bg-[#D4A373]' },
];

const files = fs.readdirSync('src', { recursive: true })
  .filter(f => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.css')))
  .map(f => path.join('src', f as string));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (file.endsWith('index.css')) {
    content = content.replace(/--color-gold: #1A0B10;/g, '--color-gold: #D4A373;');
    content = content.replace(/--color-ink: #1A0B10;/g, '--color-ink: #2B2D42;');
  }

  // Footer dark section override
  if (file.endsWith('Footer.tsx')) {
    content = content.replace(/bg-\[#FFF8F0\] text-\[#2B2D42\] py-16/g, 'bg-[#111111] text-[#FFF8F0] py-16');
    content = content.replace(/text-\[#2B2D42\]/g, 'text-[#FFF8F0]');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
