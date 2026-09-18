import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const isImmigrationHome = pathname === '/immigration-citizenship' || pathname === '/immigration-citizenship.html';

  return (
    <nav id="wb-bc" property="breadcrumb">
      <h2 className="wb-inv">You are here:</h2>
      <div className="container">
        <ol className="breadcrumb">
          <li><Link to="/">Canada.ca</Link></li>
          {!isImmigrationHome && (
            <li><Link to="/immigration-citizenship">Immigration and citizenship</Link></li>
          )}
        </ol>
      </div>
    </nav>
  );
}
