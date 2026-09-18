const fs = require('fs');

let html = fs.readFileSync('temp_html.txt', 'utf8');

// Strip out scripts and form feedbacks
html = html.replace(/<script[\s\S]*?<\/script>/g, '');
html = html.replace(/<div class="wb-disable-allow[\s\S]*?<\/div>/g, '');
html = html.replace(/<section class="pagedetails[\s\S]*?<\/section>/g, '');
html = html.replace(/<!--[\s\S]*?-->/g, '');

// Replace standard attributes
html = html.replace(/class="/g, 'className="');
html = html.replace(/for="/g, 'htmlFor="');
html = html.replace(/tabindex="/g, 'tabIndex="');
html = html.replace(/maxlength="/g, 'maxLength="');
html = html.replace(/novalidate="/g, 'noValidate="');
html = html.replace(/novalidate/g, 'noValidate');
html = html.replace(/autocomplete="/g, 'autoComplete="');
html = html.replace(/colspan="/g, 'colSpan="');
html = html.replace(/rowspan="/g, 'rowSpan="');
html = html.replace(/datetime="/g, 'dateTime="');

// Close tags
html = html.replace(/<img([^>]*[^/])>/g, '<img$1 />');
html = html.replace(/<input([^>]*[^/])>/g, '<input$1 />');
html = html.replace(/<br([^>]*[^/])?>/g, '<br$1 />');
html = html.replace(/<hr([^>]*[^/])?>/g, '<hr$1 />');
html = html.replace(/<meta([^>]*[^/])>/g, '<meta$1 />');

// Fix style strings
html = html.replace(/style="([^"]*)"/g, (match, styles) => {
    let props = [];
    styles.split(';').forEach(s => {
        if (!s.trim()) return;
        let parts = s.split(':');
        if (parts.length >= 2) {
            let key = parts[0].trim();
            // camelCase key
            key = key.replace(/-([a-z])/g, (m, g1) => g1.toUpperCase());
            let val = parts.slice(1).join(':').trim();
            props.push(`${key}: '${val}'`);
        }
    });
    if (props.length === 0) return '';
    return `style={{${props.join(', ')}}}`;
});

// Replace Icons
html = html.replace(/<i className="fas fa-user[^"]*"><\/i>/g, '<User size={32} className="pull-left mrgn-rght-md" />');
html = html.replace(/<span className="fas fa-chevron-left[^"]*"><\/span>/g, '<ChevronLeft className="pull-left mrgn-rght-md" />');
html = html.replace(/<i className="fas fa-info-circle[^"]*" aria-hidden="true"><\/i>/g, '<Info className="mrgn-rght-sm" aria-hidden="true" />');
html = html.replace(/<span className="fas fa-share[^"]*"><\/span>/g, '<Share className="pull-right" />');
html = html.replace(/<span className="glyphicon glyphicon-ok[^"]*" aria-hidden="true"><\/span>/g, '<Check className="text-success mrgn-rght-sm" aria-hidden="true" />');
html = html.replace(/<span className="wb-inv[^"]*">\s*\(Opens in a new tab\)\s*<\/span>/g, '<span className="wb-inv">(Opens in a new tab)</span>');

// Ensure all <a> links are handled
html = html.replace(/<a([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (match, prefix, url, suffix, content) => {
    if (url.startsWith('#')) {
        return `<a${prefix}href="${url}"${suffix}>${content}</a>`;
    }
    
    // Remove domain
    url = url.replace(/^https?:\/\/[^\/]+/, '');
    // Remove .html
    url = url.replace(/\.html(\?|#|$)/, '$1');
    
    // Check if target="_blank" is inside prefix or suffix, if so remove it
    prefix = prefix.replace(/target="_blank"/g, '');
    suffix = suffix.replace(/target="_blank"/g, '');
    
    return `<Link${prefix}to="${url}"${suffix}>${content}</Link>`;
});

// A hack for some missing things
html = html.replace(/href="#/g, 'href="#'); // Keep it href

let output = `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronLeft, Info, Share, Check } from 'lucide-react';

const IRCCAccount = () => {
    useEffect(() => {
        if (window.wb && window.wb.isReady) {
            window.wb.trigger('wb-update.wb');
        }
    }, []);

    return (
${html}
    );
};

export default IRCCAccount;
`;

fs.writeFileSync('src/pages/IRCCAccount.jsx', output, 'utf8');
