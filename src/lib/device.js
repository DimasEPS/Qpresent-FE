// Simple hash function
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

// Generate device fingerprint
export const generateFingerprint = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.fillText("fingerprint", 2, 2);

  const canvasData = canvas.toDataURL();

  // Create fingerprint components
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth.toString(),
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.platform,
    canvasData,
  ];

  // Hash each component and combine
  const fingerprint = components.map((c) => simpleHash(c)).join("-");

  return fingerprint;
};

// Get user location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);

        // Handle different error codes
        if (error.code === 1) {
          reject(new Error("Location permission denied by user"));
        } else if (error.code === 2) {
          // Position unavailable - common on localhost/desktop
          // Return fallback coordinates for development
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("Using fallback coordinates for localhost");
            resolve({
              latitude: -6.2088, // Default Jakarta coordinates
              longitude: 106.8456,
              accuracy: 0,
            });
          } else {
            reject(new Error("Location unavailable - please enable GPS"));
          }
        } else if (error.code === 3) {
          reject(new Error("Location request timeout"));
        } else {
          reject(new Error("Unknown location error"));
        }
      },
      {
        enableHighAccuracy: false, // Less strict for better compatibility
        timeout: 15000, // Longer timeout
        maximumAge: 60000, // Cache for 1 minute
      }
    );
  });
};
