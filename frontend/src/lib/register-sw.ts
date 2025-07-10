if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        console.log('[SW] Registered:', reg);

        // Listen for updates to the Service Worker
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available
                console.log('[SW] New version available. Refreshing...');
                
                // Option 1: Auto-reload the page
                window.location.reload();

                // Option 2 (alternative): Ask user to refresh
                // if (confirm("A new version is available. Reload now?")) {
                //   window.location.reload();
                // }

              } else {
                // First install
                console.log('[SW] Content cached for offline use.');
              }
            }
          };
        };
      })
      .catch((err) => {
        console.error('[SW] Registration failed:', err);
      });

    // Optional: Listen for SKIP_WAITING trigger (from SW)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed. Reloading...');
      window.location.reload();
    });
  });
}

export {};
