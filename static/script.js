document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messagesContainer');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const sendButton = document.getElementById('sendButton');
    const sendIcon = document.getElementById('sendIcon');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    const modelSelect = document.getElementById('model-select'); 
    const promptChips = document.querySelectorAll('.prompt-chip');

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            let promptText = chip.textContent.replace(/^"|"$/g, '').trim();
            
            messageInput.value = promptText;
            messageInput.focus();
            
            messageInput.style.height = 'auto';
            messageInput.style.height = (messageInput.scrollHeight) + 'px';
        });
    });

    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Enter to submit, Shift+Enter for newline
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmission();
        }
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmission();
    });

    async function handleSubmission() {
        const message = messageInput.value.trim();
        const model = modelSelect.value;
        
        if (!message || sendButton.disabled) return;

        if (welcomeScreen) welcomeScreen.style.display = 'none';

        appendMessage(message, 'user');
        
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // UI feedback
        sendButton.disabled = true;
        sendIcon.style.display = 'none';
        loadingSpinner.style.display = 'block';
        loadingIndicator.style.display = 'block';
        scrollToBottom();

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, model })
            });

            const data = await response.json();

            if (response.ok) {
                appendAIResponse(data, model);
            } else {
                appendMessage(`Error: ${data.error}`, 'ai');
            }
        } catch (error) {
            appendMessage('Connection error. Check if server is running.', 'ai');
        } finally {
            sendButton.disabled = false;
            sendIcon.style.display = 'block';
            loadingSpinner.style.display = 'none';
            loadingIndicator.style.display = 'none';
            scrollToBottom();
            messageInput.focus();
        }
    }

    function appendMessage(text, sender) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${sender}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        
        wrapper.appendChild(messageDiv);
        messagesContainer.appendChild(wrapper);
    }

    function appendAIResponse(data, modelName) {
        const modelLabels = {
            'fast': 'Llama 3.1 Instant',
            'versatile': 'Llama 3.3 Versatile',
            'gpt_oss': 'GPT-OSS Expert'
        };
        
        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper ai';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';

        let sentimentClass = 'sentiment-ok';
        if (data.sentiment >= 70) sentimentClass = 'sentiment-good';
        if (data.sentiment <= 40) sentimentClass = 'sentiment-bad';

        messageDiv.innerHTML = `
        <div class="ai-badges">
            <span class="badge category">${data.category}</span>
            <span class="badge ${sentimentClass}">Sentiment: ${data.sentiment}/100</span>
            
            <span class="badge" style="background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa;">
                Route To: ${data.assigned_to}
            </span>
            
        </div>
        <div class="ai-summary"><strong>User Intent:</strong> ${data.summary}</div>
        <div class="ai-response">${data.response}</div>
        <div class="ai-action"><strong>Action:</strong> ${data.action}</div>
        <div class="ai-footer">Model: ${modelLabels[modelName] || modelName} | Speed: ${data.duration.toFixed(2)}s</div>
        `;
        
        wrapper.appendChild(messageDiv);
        messagesContainer.appendChild(wrapper);
    }

    function scrollToBottom() {
        const messagesArea = document.querySelector('.messages-area');
        if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
    }
});