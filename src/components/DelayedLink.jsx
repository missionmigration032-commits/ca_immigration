import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DelayedLink({ to, children, style, className, onClick }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    
    setIsNavigating(true);
    const delay = Math.floor(Math.random() * 1000) + 1000; // Random delay between 1s and 2s
    
    setTimeout(() => {
      setIsNavigating(false);
      if (to) {
        navigate(to);
      }
    }, delay);
  };

  return (
    <>
      <a href={to || '#'} onClick={handleClick} style={style} className={className}>
        {children}
      </a>
      {isNavigating && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #e1e4e7',
            borderTopColor: '#26374a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 
              0% { transform: rotate(0deg); } 
              100% { transform: rotate(360deg); } 
            }
          `}} />
          <p style={{ marginTop: '20px', color: '#26374a', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Noto Sans, sans-serif' }}>
            Processing...
          </p>
        </div>
      )}
    </>
  );
}
