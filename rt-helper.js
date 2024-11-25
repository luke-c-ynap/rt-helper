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
        <button id="runScript1" style="margin: 0 05px; padding: 5px 05px;">RT / VLDT</button>
        <button id="runScript2" style="margin: 0 05px; padding: 5px 05px;">Open Matchmaker Previews</button>
        <button id="runScript3" style="margin: 0 05px; padding: 5px 05px;">Filter Worklist by Name</button>
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
    document.getElementById('runScript2').addEventListener('click', () => {
        if (!window.location.href.includes('matchmaker')) {
            alert('This script runs on Matchmaker result pages.');
            return;
        }
        const url = window.location.href;

    // Handle Fulcrum worklist page
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

            // Filter rows based on the target name
            rows.forEach(row => {
                const containsTargetDiv = Array.from(row.querySelectorAll('td div')).some(div =>
                    div.title.toLowerCase().includes(lowerCaseTarget)
                );
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

            // Create floating div for reset functionality
            const floatingDiv = document.createElement('div');
            floatingDiv.textContent = `Filtered by: ${targetName} (click to reset)`;
            Object.assign(floatingDiv.style, {
                position: 'fixed',
                bottom: '10px',
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
        })();

    // Handle Madame worklist page
    } else if (url.includes("madame")) {
        (function() {
            const name = prompt("Please enter the filtered name:");
            if (!name) return;

            const nameLowerCase = name.toLowerCase().trim();
            const buttons = Array.from(document.querySelectorAll('button[aria-label]'));
            let found = false;

            // Check each button's parent for the name
            buttons.forEach(button => {
                let parent = button;
                let depth = 0;
                while (parent && depth < 6) {
                    parent = parent.parentElement;
                    depth++;
                }
                if (parent) {
                    const siblingButtons = Array.from(parent.querySelectorAll('button[aria-label]'));
                    const containsName = siblingButtons.some(siblingButton =>
                        siblingButton.getAttribute('aria-label').toLowerCase().includes(nameLowerCase)
                    );
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

            // Hide or show parent elements based on the name
            buttons.forEach(button => {
                let parent = button;
                let depth = 0;
                while (parent && depth < 6) {
                    parent = parent.parentElement;
                    depth++;
                }
                if (parent && !originalStyles.has(parent)) {
                    originalStyles.set(parent, parent.style.display);
                    const siblingButtons = Array.from(parent.querySelectorAll('button[aria-label]'));
                    const containsName = siblingButtons.some(siblingButton =>
                        siblingButton.getAttribute('aria-label').toLowerCase().includes(nameLowerCase)
                    );
                    parent.style.display = containsName ? '' : 'none';
                }
            });

            // Create floating div for reset functionality
            const floatingDiv = document.createElement('div');
            floatingDiv.innerHTML = `Filtered by the name: ${name} (Click to reset)`;
            Object.assign(floatingDiv.style, {
                position: 'fixed',
                bottom: '10px',
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
        })();

    // Alert for unsupported URLs
    } else {
        alert('This script only works on Fulcrum or Madame worklist pages');
    }
        }
    });
})();
