const fs = require('fs');
let content = fs.readFileSync('src/pages/IRCCAccount.jsx', 'utf-8');

// Fix class= to className=
content = content.replace(/class=/g, 'className=');

// Fix for= to htmlFor=
content = content.replace(/for=/g, 'htmlFor=');

// Fix HTML comments to JSX comments
content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Fix unclosed <img> tags
content = content.replace(/(<img[^>]*?[^\/])>/g, '$1 />');

// Fix unclosed <hr> tags
content = content.replace(/(<hr[^>]*?[^\/])>/g, '$1 />');

// Fix unclosed <br> tags
content = content.replace(/(<br[^>]*?[^\/])>/g, '$1 />');

// Fix unclosed <input> tags
content = content.replace(/(<input[^>]*?[^\/])>/g, '$1 />');

// Also handle the style attribute strings, the user diff had style="vertical-align: top; min-height: 38px;"
// Let's replace any style="something" with style={{}} but just fixing the known ones is safer.
// Let's find style="..." and replace.
content = content.replace(/style="([^"]*)"/g, (match, p1) => {
    const parts = p1.split(';').filter(Boolean);
    const styleObj = parts.map(part => {
        let [key, value] = part.split(':');
        if (!key || !value) return '';
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${key}: '${value.trim()}'`;
    }).filter(Boolean).join(', ');
    return `style={{${styleObj}}}`;
});

fs.writeFileSync('src/pages/IRCCAccount.jsx', content);
console.log('Fixed JSX syntax');
