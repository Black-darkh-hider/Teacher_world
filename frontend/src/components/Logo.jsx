import React from 'react';

const Logo = ({ className = "", style = {} }) => {
  return (
    <div
      className={`logo ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        ...style,
      }}
    >
      <img
        src="/logo.png"   // correct file path for React public folder
      
        style={{ height: "40px", width: "auto" }}
      />
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#1a5490",
        }}
      >
        TeacherWorld
      </span>
    </div>
  );
};

export default Logo;
