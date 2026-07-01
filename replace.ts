import fs from 'fs';
import path from 'path';

const replacements = [
  { from: /#FCF0F2/gi, to: '#1A0B10' },
  { from: /#F2D5D9/gi, to: '#301620' },
  { from: /#3A2127/gi, to: '#FDE4EB' },
  { from: /#66474E/gi, to: '#E8B8C6' },
  { from: /#D67B88/gi, to: '#FF6B8B' },
  { from: /bg-white/gi, to: 'bg-[#14080C]' },
  { from: /text-white/gi, to: 'text-[#FFFFFF]' },
  { from: /border-white/gi, to: 'border-[#FFFFFF]' }
];

const files = fs.readdirSync('src', { recursive: true })
  .filter(f => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.css')))
  .map(f => path.join('src', f as string));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  replacements.forEach(r => {
    if (content.match(r.from)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
