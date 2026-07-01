import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src', { recursive: true })
  .filter(f => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.css')))
  .map(f => path.join('src', f as string));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Swap colors using intermediate tokens
  content = content.replace(/#1A0B10/gi, 'COLOR_MAIN_BG');
  content = content.replace(/#FF6B8B/gi, 'COLOR_ACCENT');
  content = content.replace(/#FDE4EB/gi, 'COLOR_TEXT');
  content = content.replace(/#301620/gi, 'COLOR_BORDER');
  content = content.replace(/#E8B8C6/gi, 'COLOR_TEXT_MUTED');
  content = content.replace(/#FFFFFF/gi, 'COLOR_WHITE');
  content = content.replace(/#14080C/gi, 'COLOR_DARK_ELEM');

  // Assign new colors
  content = content.replace(/COLOR_MAIN_BG/g, '#FF6B8B'); // Pink bg
  content = content.replace(/COLOR_ACCENT/g, '#1A0B10');  // Dark accents/buttons
  content = content.replace(/COLOR_TEXT/g, '#1A0B10');    // Dark text
  content = content.replace(/COLOR_BORDER/g, '#E05270');  // Darker pink borders
  content = content.replace(/COLOR_TEXT_MUTED/g, '#8A2B45'); // Muted dark text
  content = content.replace(/COLOR_WHITE/g, '#FFFFFF'); 
  content = content.replace(/COLOR_DARK_ELEM/g, '#FFFFFF'); // White elements instead of dark

  // Fix button text colors and hover states
  content = content.replace(/bg-\[#1A0B10\] px-8/g, 'bg-[#1A0B10] text-[#FFFFFF] px-8');
  content = content.replace(/hover:bg-\[#1A0B10\] hover:text-\[#FF6B8B\]/g, 'hover:bg-[#FFFFFF] hover:text-[#1A0B10]');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
