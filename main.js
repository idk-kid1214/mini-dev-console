//Please note that this is still being developed and may not work properly
// Create the black box
const blackBox = document.createElement('div');
blackBox.style.width = '450px';
blackBox.style.height = '270px';
blackBox.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
blackBox.style.borderRadius = '10px';
blackBox.style.position = 'fixed';
blackBox.style.bottom = '0';
blackBox.style.left = '50%';
blackBox.style.transform = 'translateX(-50%)';
blackBox.style.display = 'flex';
blackBox.style.flexDirection = 'column';
blackBox.style.alignItems = 'center';
document.body.appendChild(blackBox);

// Create the lime green box (move handle)
const limeBox = document.createElement('div');
limeBox.style.width = '60px';
limeBox.style.height = '60px';
limeBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)'; // Lime green with 70% opacity
limeBox.style.borderRadius = '10px';
limeBox.style.cursor = 'move';
limeBox.style.position = 'absolute';
limeBox.style.top = '-70px'; // Position above the black box
limeBox.style.left = '50%';
limeBox.style.transform = 'translateX(-50%)';
document.body.appendChild(limeBox);

// Create the console display box
const consoleDisplay = document.createElement('textarea');
consoleDisplay.style.width = '50%'; // Half the width of the black box
consoleDisplay.style.height = '50%'; // Half the height of the black box
consoleDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Black with 50% opacity
consoleDisplay.style.color = 'white'; // White text for visibility
consoleDisplay.style.border = '1px solid rgba(255, 255, 255, 0.5)';
consoleDisplay.style.borderRadius = '5px';
consoleDisplay.style.overflowY = 'scroll';
consoleDisplay.style.overflowX = 'hidden';
consoleDisplay.style.padding = '5px';
consoleDisplay.style.resize = 'none';
consoleDisplay.readOnly = true; // Make it non-editable
blackBox.appendChild(consoleDisplay);

// Capture console.log output
(function () {
    const originalLog = console.log;
    console.log = function (...args) {
        originalLog(...args);
        const logText = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
        consoleDisplay.value += logText + '\n'; // Append to the display
        consoleDisplay.scrollTop = consoleDisplay.scrollHeight; // Scroll to the bottom
    };
})();

// Create the code input box
const codeInput = document.createElement('textarea');
codeInput.style.width = '50%'; // Half the width of the black box
codeInput.style.height = '50%'; // Half the height of the black box
codeInput.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Solid black
codeInput.style.color = 'white'; // White text for visibility
codeInput.style.border = '1px solid rgba(255, 255, 255, 0.5)';
codeInput.style.borderRadius = '5px';
codeInput.style.overflowY = 'scroll';
codeInput.style.overflowX = 'hidden';
codeInput.style.padding = '5px';
codeInput.style.resize = 'none';
blackBox.appendChild(codeInput);

// Create the "Execute Code" button
const executeButton = document.createElement('button');
executeButton.textContent = 'Execute Code';
executeButton.style.width = '150px';
executeButton.style.height = '40px';
executeButton.style.backgroundColor = 'limegreen'; // Lime green color
executeButton.style.color = 'black'; // Black text
executeButton.style.border = 'none';
executeButton.style.borderRadius = '5px';
executeButton.style.cursor = 'pointer';
executeButton.style.fontWeight = 'bold';
executeButton.style.marginTop = '10px';
blackBox.appendChild(executeButton);

// Add functionality to the button
executeButton.addEventListener('click', () => {
    try {
        const result = eval(codeInput.value); // Evaluate the code
        console.log(result); // Log the result to the console display
    } catch (error) {
        console.log('Error:', error); // Log errors if the code fails
    }
});

// Drag functionality for the lime box
let offsetX, offsetY;

limeBox.addEventListener('mousedown', (e) => {
    // Calculate offset between mouse and top-left corner of lime box
    offsetX = e.clientX - blackBox.getBoundingClientRect().left;
    offsetY = e.clientY - blackBox.getBoundingClientRect().top;

    // Listen to mouse movements
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    // Move the blackBox and limeBox together
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    blackBox.style.left = `${left}px`;
    blackBox.style.top = `${top}px`;
    blackBox.style.bottom = 'auto'; // Clear fixed positioning
    blackBox.style.transform = 'none'; // Disable centering transform

    limeBox.style.left = `${left + blackBox.offsetWidth / 2 - limeBox.offsetWidth / 2}px`;
    limeBox.style.top = `${top - limeBox.offsetHeight - 10}px`; // Adjust limeBox's position
}

function onMouseUp() {
    // Stop listening to mouse movements
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}
