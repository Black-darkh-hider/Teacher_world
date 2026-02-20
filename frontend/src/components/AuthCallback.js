import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const zoomAuthStatus = queryParams.get('zoom_auth');

    // Get the original path from localStorage
    const originalPath = localStorage.getItem('zoomAuthRedirect') || '/';
    localStorage.removeItem('zoomAuthRedirect'); // Clean up

    if (zoomAuthStatus === 'success') {
      // Redirect back to the original page with a success indicator
      navigate(`${originalPath}?status=zoom_success`);
    } else {
      navigate(originalPath); // Redirect back anyway
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;