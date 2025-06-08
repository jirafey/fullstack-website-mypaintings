import { api } from '../utils/api.js';

export class TestPage {
    async render() {
        const container = document.createElement('div');
        container.className = 'test-page';
        
        const title = document.createElement('h1');
        title.textContent = 'API Connection Test';
        container.appendChild(title);

        const testButton = document.createElement('button');
        testButton.textContent = 'Test Connection';
        testButton.className = 'test-button';
        container.appendChild(testButton);

        const resultDiv = document.createElement('div');
        resultDiv.className = 'test-result';
        container.appendChild(resultDiv);

        testButton.addEventListener('click', async () => {
            try {
                resultDiv.textContent = 'Testing connection...';
                const response = await api.testConnection();
                resultDiv.textContent = `Success! Response: ${response}`;
                resultDiv.style.color = 'green';
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
                resultDiv.style.color = 'red';
            }
        });

        return container;
    }
} 