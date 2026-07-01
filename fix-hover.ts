import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src', { recursive: true })
  .filter(f => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.css')))
  .map(f => path.join('src', f as string));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace hover:bg-[#FDE4EB] transition-colors with hover:bg-[#FDE4EB] hover:text-[#1A0B10] transition-colors
  if (content.match(/hover:bg-\[#FDE4EB\] transition-colors/)) {
    content = content.replace(/hover:bg-\[#FDE4EB\] transition-colors/g, 'hover:bg-[#FDE4EB] hover:text-[#1A0B10] transition-colors');
    changed = true;
  }

  // Replace hover:bg-[#FDE4EB] hover:text-[#FFFFFF] with hover:bg-[#FDE4EB] hover:text-[#1A0B10]
  if (content.match(/hover:bg-\[#FDE4EB\] hover:text-\[#FFFFFF\]/)) {
    content = content.replace(/hover:bg-\[#FDE4EB\] hover:text-\[#FFFFFF\]/g, 'hover:bg-[#FDE4EB] hover:text-[#1A0B10]');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed hovers in ' + file);
  }
});
