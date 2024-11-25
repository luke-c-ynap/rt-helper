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

    // Add buttons to the footer
    footer.innerHTML = `
        <button id="runScript1" style="margin: 0 5px; padding: 5px 5px;">RT / VLDT</button>
        <button id="runScript2" style="margin: 0 5px; padding: 5px 5px;">Open Matchmaker Previews</button>
        <button id="runScript3" style="margin: 0 5px; padding: 5px 5px;">Filter Worklist by Name</button>
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
    var url = window.location.href;

    if (url.includes("fulcrum")) {
        (function() {
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
                const containsTargetDiv = Array.from(row.querySelectorAll('td div')).some(div => div.title.toLowerCase().includes(lowerCaseTarget));
                if (!containsTargetDiv) {
                    row.style.display = 'none';
                } else {
                    found = true;
                    row.style.display = '';
                }
            });

            if (!found) {
                alert("Not found in worklist");
                originalStates.forEach(({ row, display }) => row.style.display = display);
                return;
            }

            const floatingDiv = document.createElement('div');
            floatingDiv.textContent = `Filtered by: ${targetName} (click to reset)`;
            floatingDiv.style.position = 'fixed';
            floatingDiv.style.bottom = '10px';
            floatingDiv.style.left = '50%';
            floatingDiv.style.transform = 'translateX(-50%)';
            floatingDiv.style.backgroundColor = 'yellow';
            floatingDiv.style.color = 'black';
            floatingDiv.style.padding = '10px';
            floatingDiv.style.borderRadius = '5px';
            floatingDiv.style.fontSize = '16px';
            floatingDiv.style.zIndex = '9999';
            floatingDiv.style.cursor = 'pointer';
            document.body.appendChild(floatingDiv);

            floatingDiv.addEventListener('click', () => {
                originalStates.forEach(({ row, display }) => row.style.display = display);
                document.body.removeChild(floatingDiv);
            });
        })();
    } else if (url.includes("madame")) {
        (function() {
            const name = prompt("Please enter the filtered name:");
            if (!name) return;

            const nameLowerCase = name.toLowerCase().trim();
            const buttons = Array.from(document.querySelectorAll('button[aria-label]'));
            let found = false;

            buttons.forEach(button => {
                let parent = button;
                let depth = 0;

                while (parent && depth < 6) {
                    parent = parent.parentElement;
                    depth++;
                }

                if (parent) {
                    const siblingButtons = Array.from(parent.querySelectorAll('button[aria-label]'));
                    const containsName = siblingButtons.some(siblingButton => {
                        return siblingButton.getAttribute('aria-label').toLowerCase().includes(nameLowerCase);
                    });

                    if (containsName) {
                        found = true;
                    }
                }
            });

            if (!found) {
                alert("Not found in worklist");
                return;
            }

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
                    const containsName = siblingButtons.some(siblingButton => {
                        return siblingButton.getAttribute('aria-label').toLowerCase().includes(nameLowerCase);
                    });

                    if (containsName) {
                        parent.style.display = '';
                    } else {
                        parent.style.display = 'none';
                    }
                }
            });

            const floatingDiv = document.createElement('div');
            floatingDiv.style.position = 'fixed';
            floatingDiv.style.bottom = '113px';
            floatingDiv.style.left = '50%';
            floatingDiv.style.transform = 'translateX(-50%)';
            floatingDiv.style.backgroundColor = 'yellow';
            floatingDiv.style.color = 'black';
            floatingDiv.style.padding = '10px';
            floatingDiv.style.borderRadius = '5px';
            floatingDiv.style.fontSize = '16px';
            floatingDiv.style.zIndex = '99999';
            floatingDiv.style.cursor = 'pointer';
            floatingDiv.innerHTML = 'Filtered by the name: ' + name + ' (Click to reset)';
            document.body.appendChild(floatingDiv);

            floatingDiv.addEventListener('click', () => {
                originalStyles.forEach((originalStyle, element) => {
                    element.style.display = originalStyle;
                });
                document.body.removeChild(floatingDiv);
            });
        })();
    } else {
        alert('This script only works on Fulcrum or Madame worklist pages');
    }

})();
