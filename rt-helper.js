(function () {
    'use strict';

    // Wait until the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Create the footer menu
        const footer = document.createElement('div');
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
        footer.style.left = '0';
        footer.style.width = '100%';
        footer.style.backgroundColor = '#333';
        footer.style.color = 'white';
        footer.style.textAlign = 'center';
        footer.style.padding = '10px 0';
        footer.style.zIndex = '1000';

        // Add buttons to the footer
        footer.innerHTML = `
            <button id="runScript1" style="margin: 0 10px; padding: 5px 10px;">RT/VLDT</button>
            <button id="runScript2" style="margin: 0 10px; padding: 5px 10px;">Open Matchmaker Previews</button>
            <button id="runScript3" style="margin: 0 10px; padding: 5px 10px;">Template Overlay</button>
            <button id="runScript4a" style="margin: 0 10px; padding: 5px 10px;">Open Personal Area RT Pages</button>
            <button id="runScript5" style="margin: 0 10px; padding: 5px 10px;">Refresh Search Page</button>
            <button id="runScript6" style="margin: 0 10px; padding: 5px 10px;">Nuke Popups</button>
        `;

        document.body.appendChild(footer);

        // Event Listener Functions
        function toggleRTVLDT() {
            const currentUrl = window.location.href;
            if (currentUrl.includes('retouching-validation/')) {
                location.replace(currentUrl.replace('retouching-validation/', 'retouching/'));
            } else if (currentUrl.includes('retouching/')) {
                location.replace(currentUrl.replace('retouching/', 'retouching-validation/'));
            } else {
                alert('This button works on Madame Retoucher or Validator pages.');
            }
        }

        function openMatchmakerPreviews() {
            if (!window.location.href.includes('matchmaker')) {
                alert('This script runs on Matchmaker result pages.');
                return;
            }
            const headerCells = document.querySelectorAll('th');
            let columnIndex = -1;
            headerCells.forEach((cell, index) => {
                if (cell.innerText.trim() === 'Product ID') {
                    columnIndex = index;
                }
            });

            if (columnIndex === -1) {
                alert("No 'Product ID' column found.");
                return;
            }

            const rows = document.querySelectorAll('tbody tr');
            rows.forEach((row) => {
                const productId = row.cells[columnIndex]?.innerText.trim();
                if (/^\d{1,8}$/.test(productId)) {
                    window.open(`http://fulcrum.net-a-porter.com/photography/preview/${productId}`, '_blank');
                }
            });
        }

        function templateOverlay() {
            // Toggle template overlay on/off
            window.isActive = !window.isActive;
            document.querySelectorAll('img[src]').forEach((img) => {
                let overlay = img.nextElementSibling;
                if (!overlay || !overlay.classList.contains('bookmarklet-overlay')) {
                    overlay = document.createElement('img');
                    overlay.src = 'https://i.ibb.co/r3CL8MQ/Accessory-Template.png';
                    overlay.className = 'bookmarklet-overlay';
                    overlay.style.position = 'absolute';
                    overlay.style.top = '50%';
                    overlay.style.left = '50%';
                    overlay.style.transform = 'translate(-50%, -50%)';
                    overlay.style.pointerEvents = 'none';
                    overlay.style.opacity = '0';
                    img.parentElement.appendChild(overlay);
                }
                overlay.style.opacity = window.isActive ? '1' : '0';
            });
        }

        function openPersonalArea() {
            const divs = document.querySelectorAll('div[aria-label]');
            const openedUrls = new Set();
            divs.forEach((div) => {
                const match = div.getAttribute('aria-label')?.match(/\d{10,19}/);
                if (match && !openedUrls.has(match[0])) {
                    openedUrls.add(match[0]);
                    window.open(`https://madame.ynap.biz/retouching/${match[0]}`, '_blank');
                }
            });
        }

        function refreshSearchPage() {
            try {
                const spans = document.querySelectorAll('span');
                const content = Array.from(spans)
                    .map((span) => span.textContent.replace(/[^0-9 ]/g, ''))
                    .join('')
                    .trim();
                const textarea = document.getElementById('search-by-id');
                textarea.value = content;
                document.querySelector('button[type="submit"]').click();
            } catch (error) {
                console.error('Error refreshing search:', error.message);
            }
        }

        function nukePopups() {
            document.querySelectorAll('div[class*="Toastify"]').forEach((popup) => {
                popup.style.display = 'none';
                popup.style.visibility = 'hidden';
                popup.style.opacity = '0';
            });
        }

        // Attach Event Listeners
        document.getElementById('runScript1').addEventListener('click', toggleRTVLDT);
        document.getElementById('runScript2').addEventListener('click', openMatchmakerPreviews);
        document.getElementById('runScript3').addEventListener('click', templateOverlay);
        document.getElementById('runScript4a').addEventListener('click', openPersonalArea);
        document.getElementById('runScript5').addEventListener('click', refreshSearchPage);
        document.getElementById('runScript6').addEventListener('click', nukePopups);
    });
})();
