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
        <button id="runScript1" style="margin: 0 10px; padding: 5px 10px;">RT/VLDT</button>
        <button id="runScript2" style="margin: 0 10px; padding: 5px 10px;">Open Matchmaker Previews</button>
        <button id="runScript3" style="margin: 0 10px; padding: 5px 10px;">Template Overlay</button>
        <button id="runScript4" style="margin: 0 10px; padding: 5px 10px;">Script 4</button>
        <button id="runScript5" style="margin: 0 10px; padding: 5px 10px;">Script 5</button>
        <button id="runScript6" style="margin: 0 10px; padding: 5px 10px;">Script 6</button>
        <button id="runScript7" style="margin: 0 10px; padding: 5px 10px;">Script 7</button>
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

    // Script 3: Place the accessory template over every image (Reverted back to original script)
    document.getElementById('runScript3').addEventListener('click', () => {
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

    // Placeholders for future scripts
    document.getElementById('runScript4').addEventListener('click', () => {
        alert('Script 4 functionality not implemented yet.');
    });

    document.getElementById('runScript5').addEventListener('click', () => {
        alert('Script 5 functionality not implemented yet.');
    });

    document.getElementById('runScript6').addEventListener('click', () => {
        alert('Script 6 functionality not implemented yet.');
    });

    document.getElementById('runScript7').addEventListener('click', () => {
        alert('Script 7 functionality not implemented yet.');
    });

    document.getElementById('runScript8').addEventListener('click', () => {
        alert('Script 8 functionality not implemented yet.');
    });

})();
