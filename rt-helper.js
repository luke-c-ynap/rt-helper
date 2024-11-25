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
    footer.style.zIndex = '1000';
    footer.style.zIndex = '100';

    // Add buttons to the footer
    footer.innerHTML = `
        <button id="runScript1" style="margin: 0 10px; padding: 5px 10px;">RT/VLDT</button>
        <button id="runScript2" style="margin: 0 10px; padding: 5px 10px;">Open Matchmaker Previews</button>
        <button id="runScript3" style="margin: 0 10px; padding: 5px 10px;">Template Overlay</button>
        <button id="runScript4" style="margin: 0 10px; padding: 5px 10px;">Open Personal Area RT Pages</button>
        <button id="runScript5" style="margin: 0 10px; padding: 5px 10px;">Refresh Search</button>
        <button id="runScript6" style="margin: 0 10px; padding: 5px 10px;">Nuke Popups</button>
        <button id="runScript7" style="margin: 0 10px; padding: 5px 10px;">Worklist Name Filter</button>
        <button id="runScript8" style="margin: 0 10px; padding: 5px 10px;">Script 8</button>
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
            alert('This button works on Madame Retoucher or Validator pages.');
        }
    });

    // Script 2: Scan the Matchmaker "Product ID" column and open valid IDs in new tabs
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

    // Script 3: Template Overlay - Add accessory overlay to images
    document.getElementById('runScript3').addEventListener('click', () => {
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
                    overlayImage.style.zIndex = '99';
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

    // Script 4: Open Personal Area retouching pages
    document.getElementById('runScript4').addEventListener('click', () => {
        const divs = document.querySelectorAll('div[aria-label]');
        const openedUrls = new Set();

        divs.forEach(div => {
            const ariaLabel = div.getAttribute('aria-label');
            const match = ariaLabel.match(/\d{10,19}/); // Match 10-19 digit numbers

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

    // Script 5: Refresh Search page by finding vids and re-searching
    document.getElementById('runScript5').addEventListener('click', () => {
        try {
            const spans = document.querySelectorAll('span');
            let content = '';
            spans.forEach(span => {
                if (span.textContent.includes('/')) {
                    content += span.textContent.replace(/[^0-9 ]/g, '');
                }
            });
            content = content.trim();
            const textarea = document.getElementById('search-by-id');
            textarea.focus();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand('insertText', false, content);
            const event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
            const searchButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.toLowerCase().includes('search'));
            if (searchButton) {
                searchButton.click();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    // Script 6: Nuke Popups - Hide all Toastify popups
    document.getElementById('runScript6').addEventListener('click', () => {
        document.querySelectorAll('div[class*="Toastify"]').forEach(el => {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('opacity', '0', 'important');
        });
    });



    // Script 8: To be implemented
    document.getElementById('runScript8').addEventListener('click', () => {
        alert('Script 8 functionality not implemented yet.');
    });
})();
