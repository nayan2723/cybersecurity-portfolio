import React from 'react';

const Loader4 = () => {
  return (
    <div className="flex flex-wrap w-[160px] h-[160px]">
      <div className="loader-cell loader-cell-1 animate-ripple" style={{ animationDelay: '0ms' }} />
      <div className="loader-cell loader-cell-2 animate-ripple" style={{ animationDelay: '100ms' }} />
      <div className="loader-cell loader-cell-3 animate-ripple" style={{ animationDelay: '200ms' }} />
      <div className="loader-cell loader-cell-4 animate-ripple" style={{ animationDelay: '100ms' }} />
      <div className="loader-cell loader-cell-5 animate-ripple" style={{ animationDelay: '200ms' }} />
      <div className="loader-cell loader-cell-6 animate-ripple" style={{ animationDelay: '200ms' }} />
      <div className="loader-cell loader-cell-7 animate-ripple" style={{ animationDelay: '300ms' }} />
      <div className="loader-cell loader-cell-8 animate-ripple" style={{ animationDelay: '300ms' }} />
      <div className="loader-cell loader-cell-9 animate-ripple" style={{ animationDelay: '400ms' }} />
    </div>
  );
};

export default Loader4;