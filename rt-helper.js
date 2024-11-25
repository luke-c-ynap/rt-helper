(function () {
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
        <button id="runScript7" style="margin: 0 5px; padding: 5px 5px;">Populate Search</button>
    `;

    // Append the footer to the body
    document.body.appendChild(footer);

    // Add click event listeners for each button (preserving the other scripts)

    // Script 7: Populate Search field and trigger search
    document.getElementById('runScript7').addEventListener('click', () => {
        if (!window.location.href.startsWith('https://madame.ynap.biz/search')) {
            alert('This script works on Madame Search pages');
            return;
        }

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

            const searchButton = Array.from(document.querySelectorAll('button')).find(button =>
                button.textContent.toLowerCase().includes('search')
            );
            if (searchButton) {
                searchButton.click();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });
})();
