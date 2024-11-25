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

    } else {
        alert('This script only works on Fulcrum or Madame worklist pages');
    }
});
