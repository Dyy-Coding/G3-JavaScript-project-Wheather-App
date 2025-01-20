// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Error Box</title>
//     <style>
//         /* Basic styles */
//         body {
//             font-family: Arial, sans-serif;
//             padding: 20px;
//         }
//         .error-box {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             margin: 1rem auto;
//             padding: 1rem;
//             border-radius: 8px;
//             color: #DC2941;
//             border: 1px solid #DC2941;
//             background: rgba(220, 41, 65, 0.25);
//         }
//         .error-box.info {
//             color: #f5a922;
//             border: 1px solid #f5a922;
//             background: rgba(245, 169, 34, 0.1);
//         }
//         .error-icon {
//             font-size: 24px;
//             margin-right: 8px;
//         }
//         .error-message {
//             font-size: 14px;
//             text-align: center;
//         }
//     </style>
// </head>
// <body>

//     <h1>Error Handling Example</h1>
//     <div id="errorContainer"></div>

//     <script>
function createErrorBox({ errorMessage = 'Internal error', type = 'error' }) {
    const errorBox = document.createElement('div');
    errorBox.className = `error-box ${type}`;

    const errorIcon = document.createElement('span');
    errorIcon.className = 'error-icon';
    errorIcon.innerHTML = '&#9888;'; // Error icon (⚠️)

    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerText = errorMessage;

    errorBox.appendChild(errorIcon);
    errorBox.appendChild(message);

    return errorBox;
}

// Example usage
const errorContainer = document.getElementById('errorContainer');
const errorBox = createErrorBox({ errorMessage: 'Something went wrong!', type: 'error' });
const infoBox = createErrorBox({ errorMessage: 'This is an info message.', type: 'info' });

errorContainer.appendChild(errorBox);
errorContainer.appendChild(infoBox);
//     </script>

// </body>
// </html>