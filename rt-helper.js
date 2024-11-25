(function() {
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
    footer.style.zIndex = '20000';

    // Add buttons to the footer
    footer.innerHTML = `
        <button id="runScript1" style="margin: 0 5px; padding: 5px 5px;">RT / VLDT</button>
        <button id="runScript2" style="margin: 0 5px; padding: 5px 5px;">Open Matchmaker Previews</button>
        <button id="runScript3" style="margin: 0 5px; padding: 5px 5px;">Filter Worklist by Name</button>
        <button id="runScript4" style="margin: 0 5px; padding: 5px 5px;">Toggle Template Overlay</button>
        <button id="runScript5" style="margin: 0 5px; padding: 5px 5px;">Open Personal VIDs</button>
        <button id="runScript6" style="margin: 0 5px; padding: 5px 5px;">Open Validation Links</button>
    `;

    // Append the footer to the body
    document.body.appendChild(footer);

    // Add click event listeners for the buttons

    // Script 1: Toggle between "retouching-validation" and "retouching" in the URL
    document.getElementById('runScript1').addEventListener('click', () => {
        const currentUrl = window.location.href;
        if (currentUrl.includes("retouching-validation/")) {
            location.replace(currentUrl.replace("retouching-validation/", "retouching/"));
        } else if (currentUrl.includes("retouching/")) {
            location.replace(currentUrl.replace("retouching/", "retouching-validation/"));
        } else {
            alert('This script runs on pages with "retouching" or "retouching-validation" in the URL.');
        }
    });

    // Script 2: Scan the "Product ID" column and open valid PIDs in new Fulcrum Preview tabs
    document.getElementById('runScript2').addEventListener('click', () => {
        if (!window.location.href.includes('matchmaker')) {
            alert('This script runs on Matchmaker result pages.');
            return;
        }
        const headerCells = document.querySelectorAll('th');
        let columnIndex = -1;
        for (let i = 0; i < headerCells.length; i++) {
            if (headerCells[i].innerText.trim() === 'Product ID') {
                columnIndex = i;
                break;
            }
        }
        if (columnIndex === -1) {
            alert("No 'Product ID' column found.");
            return;
        }
        const rows = document.querySelectorAll('tbody tr');
        const productIDs = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > columnIndex) {
                const productId = cells[columnIndex].innerText.trim();
                if (/^\d{1,8}$/.test(productId)) {
                    productIDs.push(productId);
                }
            }
        });
        if (productIDs.length === 0) {
            alert("No valid Product IDs found.");
        } else {
            productIDs.forEach(id => {
                window.open(`http://fulcrum.net-a-porter.com/photography/preview/${id}`, '_blank');
            });
        }
    });

    // Script 3: Filter a worklist by a name input
    document.getElementById('runScript3').addEventListener('click', () => {
        const url = window.location.href;

        if (url.includes("fulcrum")) {
            // Fulcrum filtering logic
            const targetName = prompt("Please enter the filtered name:");
            if (!targetName) return;

            const lowerCaseTarget = targetName.toLowerCase();
            const rows = document.querySelectorAll('table tr[id*="row_for"]');
            let found = false;

            const originalStates = Array.from(rows).map(row => ({
                row,
                display: row.style.display
            }));

            rows.forEach(row => {
                const containsTargetDiv = Array.from(row.querySelectorAll('td div')).some(div =>
                    div.title.toLowerCase().includes(lowerCaseTarget)
                );
                if (containsTargetDiv) {
                    found = true;
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            if (!found) {
                alert("Not found in worklist");
                originalStates.forEach(({ row, display }) => row.style.display = display);
                return;
            }

            const floatingDiv = document.createElement('div');
            floatingDiv.textContent = `Filtered by: ${targetName} (click to reset)`;
            Object.assign(floatingDiv.style, {
                position: 'fixed',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'yellow',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                zIndex: '9999',
                cursor: 'pointer'
            });

            document.body.appendChild(floatingDiv);
            floatingDiv.addEventListener('click', () => {
                originalStates.forEach(({ row, display }) => row.style.display = display);
                document.body.removeChild(floatingDiv);
            });

        } else if (url.includes("madame")) {
            // Madame filtering logic
            const name = prompt("Please enter the filtered name:");
            if (!name) return;

            const nameLowerCase = name.toLowerCase().trim();
            const buttons = Array.from(document.querySelectorAll('button[aria-label]'));
            let found = false;

            const originalStyles = new Map();
            buttons.forEach(button => {
                let parent = button;
                let depth = 0;
                while (parent && depth < 6) {
                    parent = parent.parentElement;
                    depth++;
                }
                if (parent) {
                    if (!originalStyles.has(parent)) {
                        originalStyles.set(parent, parent.style.display);
                    }

                    const siblingButtons = Array.from(parent.querySelectorAll('button[aria-label]'));
                    const containsName = siblingButtons.some(siblingButton =>
                        siblingButton.getAttribute('aria-label').toLowerCase().includes(nameLowerCase)
                    );

                    if (containsName) {
                        found = true;
                        parent.style.display = '';
                    } else {
                        parent.style.display = 'none';
                    }
                }
            });

            if (!found) {
                alert("Not found in worklist");
                originalStyles.forEach((originalStyle, element) => {
                    element.style.display = originalStyle;
                });
                return;
            }

            const floatingDiv = document.createElement('div');
            floatingDiv.textContent = `Filtered by: ${name} (click to reset)`;
            Object.assign(floatingDiv.style, {
                position: 'fixed',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'yellow',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                zIndex: '9999',
                cursor: 'pointer'
            });

            document.body.appendChild(floatingDiv);
            floatingDiv.addEventListener('click', () => {
                originalStyles.forEach((originalStyle, element) => {
                    element.style.display = originalStyle;
                });
                document.body.removeChild(floatingDiv);
            });

        } else {
            alert('This script only works on Fulcrum or Madame worklist pages');
        }
    });

    // Script 4: Toggle Image Overlay
    document.getElementById('runScript4').addEventListener('click', () => {
        window.isActive = !window.isActive;

        window.toggleOverlay = function() {
            document.querySelectorAll('img[src], .panZoomImage').forEach(function(targetImage) {
                var wrapper = targetImage.parentNode;
                var overlayImage = wrapper.querySelector('.bookmarklet-overlay');

                if (!overlayImage) {
                    overlayImage = new Image();
                    overlayImage.src = 'https://i.ibb.co/r3CL8MQ/Accessory-Template.png';
                    overlayImage.classList.add('bookmarklet-overlay');
                    overlayImage.style.position = 'absolute';
                    overlayImage.style.top = '50%';
                    overlayImage.style.left = '50%';
                    overlayImage.style.transform = 'translate(-50%, -50%)';
                    overlayImage.style.height = '100%';
                    overlayImage.style.pointerEvents = 'none';
                    overlayImage.style.opacity = '0';
                    overlayImage.style.transition = 'opacity 0.3s ease';
                    overlayImage.style.zIndex = '999999';
                    overlayImage.style.display = 'block';
                    if (targetImage.classList.contains('panZoomImage')) {
                        overlayImage.style.paddingBottom = '5px';
                    }
                    if (getComputedStyle(wrapper).position === 'static') {
                        wrapper.style.position = 'relative';
                    }
                    wrapper.appendChild(overlayImage);
                    wrapper.addEventListener('mouseenter', function() {
                        if (window.isActive) overlayImage.style.opacity = '1';
                    });
                    wrapper.addEventListener('mouseleave', function() {
                        overlayImage.style.opacity = '0';
                    });
                }

                overlayImage.style.display = window.isActive ? 'block' : 'none';
            });

            document.querySelectorAll('.panZoomContainer__in').forEach(function(container) {
                container.style.pointerEvents = window.isActive ? 'auto' : 'none';
            });
        };

        window.toggleOverlay();

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if ((node.tagName === 'IMG' && node.src) || node.classList.contains('panZoomImage')) {
                        window.toggleOverlay();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });

    // Script 5: Open Madame URLs for matching Product IDs
    document.getElementById('runScript5').addEventListener('click', () => {
        // Check if the current URL starts with "https://madame.ynap.biz/retouching/"
        if (!window.location.href.startsWith('https://madame.ynap.biz/retouching/')) {
            alert('This script works on Retoucher pages, with images in the Personal Area');
            return;
        }

        const divs = document.querySelectorAll('div[aria-label]');
        const openedUrls = new Set();
        divs.forEach(div => {
            const ariaLabel = div.getAttribute('aria-label');
            const match = ariaLabel.match(/\d{10,19}/);
            if (match) {
                const result = match[0];
                if (!openedUrls.has(result)) {
                    const newUrl = 'https://madame.ynap.biz/retouching/' + encodeURIComponent(result);
                    window.open(newUrl, '_blank');
                    openedUrls.add(result);
                }
            }
        });
    });

    // Script 6: Open Validation Links
    document.getElementById('runScript6').addEventListener('click', () => {
        var currentUrl = window.location.href;
        if (currentUrl.startsWith("https://madame.ynap.biz/worklist/") || currentUrl.startsWith("https://madame.ynap.biz/search/")) {
            var links = document.querySelectorAll('a[href*="validation"]');
            for (var i = 0; i < links.length; i++) {
                var href = links[i].href;
                if (href) {
                    window.open(href, '_blank');
                }
            }
        } else {
            alert('This script works only on Madame worklist or search pages');
        }
    });

})();
