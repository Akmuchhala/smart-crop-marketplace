// ========== AI Chatbot — Gemini Integration ==========
// This file handles the AI chatbot panel, Gemini API calls,
// file/image attachments, markdown rendering, and multi-turn chat.

let aiChatOpen = false;
let aiChatHistory = []; // Multi-turn conversation history for Gemini
let aiAttachments = []; // { file, base64, mimeType, name }
let aiIsProcessing = false;
let geminiModel = null;
let geminiChat = null;

const AI_SYSTEM_PROMPT = `You are CropMart AI, an intelligent agricultural assistant for the Smart Crops Marketplace platform.

You help farmers and buyers with:
- Crop pricing guidance, market trends, and MSP (Minimum Support Price) information
- Crop disease identification and diagnosis from images
- Farming best practices, seasonal planting advice, and soil health
- Crop quality assessment from photos
- Marketplace navigation help and trading tips
- Post-harvest management and storage guidance

Rules:
- Keep responses concise, friendly, and actionable
- Use emojis sparingly for warmth (🌾, 🌱, 💰, etc.)
- If you receive an image, analyze it carefully for crop health, disease symptoms, quality, pest damage, or crop identification
- When discussing prices, mention that actual prices vary by region, season, and market conditions
- Format important information with bold text and bullet points for readability
- If a question is completely unrelated to agriculture, politely redirect the conversation to farming topics
- Always be encouraging and supportive of farmers`;

// ========== Initialize Gemini ==========
async function initGeminiAI() {
    try {
        // Check if the SDK is loaded
        if (typeof window.GoogleGenerativeAI === 'undefined') {
            console.warn('Gemini SDK not loaded yet, retrying...');
            return false;
        }

        // Fetch API key dynamically from backend if not set
        let API_KEY = window.GEMINI_API_KEY || '';
        if (!API_KEY || API_KEY === 'your_google_gemini_api_key_here') {
            try {
                const response = await fetch('/api/auth/config');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.geminiApiKey && data.geminiApiKey !== 'your_google_gemini_api_key_here') {
                        API_KEY = data.geminiApiKey;
                        window.GEMINI_API_KEY = API_KEY;
                    }
                }
            } catch (err) {
                console.warn('Failed to fetch Gemini API key from backend:', err);
            }
        }

        if (!API_KEY || API_KEY === 'your_google_gemini_api_key_here') {
            console.warn('Gemini API key not configured');
            return false;
        }

        const genAI = new window.GoogleGenerativeAI(API_KEY);
        geminiModel = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: AI_SYSTEM_PROMPT,
        });

        // Start a new chat session
        geminiChat = geminiModel.startChat({
            history: [],
        });

        console.log('✅ Gemini AI initialized successfully');
        return true;
    } catch (err) {
        console.error('Failed to initialize Gemini AI:', err);
        return false;
    }
}

// ========== Toggle Chatbot ==========
function toggleChatbot() {
    const container = document.getElementById('ai-chat-container');
    if (!container) return;

    aiChatOpen = !aiChatOpen;

    if (aiChatOpen) {
        container.classList.add('active');
        // Initialize Gemini on first open
        if (!geminiModel) {
            initGeminiAI();
        }
        // Focus input
        setTimeout(() => {
            const input = document.getElementById('ai-chat-input');
            if (input) input.focus();
        }, 400);
    } else {
        container.classList.remove('active');
    }
}

// ========== Close AI Chat ==========
function closeAIChat() {
    const container = document.getElementById('ai-chat-container');
    if (container) container.classList.remove('active');
    aiChatOpen = false;
}

// ========== Send AI Message ==========
async function sendAIMessage() {
    if (aiIsProcessing) return;

    const input = document.getElementById('ai-chat-input');
    const content = input ? input.value.trim() : '';

    if (!content && aiAttachments.length === 0) return;

    // Check if Gemini is initialized
    if (!geminiModel || !geminiChat) {
        const initialized = await initGeminiAI();
        if (!initialized) {
            renderAIMessage('⚠️ AI is not configured. Please set your Gemini API key in the settings.', 'system');
            return;
        }
    }

    // Hide welcome screen
    const welcome = document.getElementById('ai-chat-welcome');
    if (welcome) welcome.style.display = 'none';

    // Render user message
    const userDisplay = content || '📎 Sent attachment(s)';
    renderAIMessage(userDisplay, 'sent', aiAttachments.length > 0 ? [...aiAttachments] : null);

    // Clear input
    if (input) input.value = '';

    // Build the message parts for Gemini
    const parts = [];

    // Add text
    if (content) {
        parts.push({ text: content });
    }

    // Add file/image attachments as inline data
    for (const att of aiAttachments) {
        parts.push({
            inlineData: {
                mimeType: att.mimeType,
                data: att.base64,
            }
        });
        if (!content) {
            parts.push({ text: `Please analyze this ${att.mimeType.startsWith('image/') ? 'image' : 'file'} (${att.name}).` });
        }
    }

    // Clear attachments
    aiAttachments = [];
    renderAttachmentPreviews();

    // Show typing indicator
    showAITyping(true);
    aiIsProcessing = true;

    try {
        const result = await geminiChat.sendMessage(parts);
        const response = await result.response;
        const text = response.text();

        showAITyping(false);
        renderAIMessage(text, 'received');
    } catch (err) {
        console.error('Gemini API error:', err);
        showAITyping(false);

        let errorMsg = '❌ Sorry, I encountered an error. Please try again.';
        if (err.message && err.message.includes('API_KEY')) {
            errorMsg = '🔑 Invalid API key. Please check your Gemini API key configuration.';
        } else if (err.message && err.message.includes('quota')) {
            errorMsg = '⏱️ Rate limit reached. Please wait a moment and try again.';
        } else if (err.message && err.message.includes('SAFETY')) {
            errorMsg = '🛡️ The response was blocked by safety filters. Please rephrase your question.';
        }
        renderAIMessage(errorMsg, 'system');
    } finally {
        aiIsProcessing = false;
    }
}

// ========== Render AI Message ==========
function renderAIMessage(content, type, attachments) {
    const messagesBox = document.getElementById('ai-chat-messages');
    if (!messagesBox) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${type}`;

    // If user message with attachments, show attachment thumbnails
    if (type === 'sent' && attachments && attachments.length > 0) {
        const attContainer = document.createElement('div');
        attContainer.className = 'ai-msg-attachments';
        attachments.forEach(att => {
            if (att.mimeType.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = `data:${att.mimeType};base64,${att.base64}`;
                img.alt = att.name;
                img.className = 'ai-msg-attachment-img';
                attContainer.appendChild(img);
            } else {
                const fileTag = document.createElement('div');
                fileTag.className = 'ai-msg-attachment-file';
                fileTag.innerHTML = `📄 ${att.name}`;
                attContainer.appendChild(fileTag);
            }
        });
        msgDiv.appendChild(attContainer);
    }

    // Render content
    const contentDiv = document.createElement('div');
    if (type === 'received') {
        contentDiv.innerHTML = renderMarkdown(content);
    } else {
        contentDiv.textContent = content;
    }
    msgDiv.appendChild(contentDiv);

    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'ai-msg-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msgDiv.appendChild(timeDiv);

    messagesBox.appendChild(msgDiv);

    // Scroll to bottom
    requestAnimationFrame(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    });
}

// ========== Markdown Renderer ==========
function renderMarkdown(text) {
    if (!text) return '';

    let html = text
        // Escape HTML first
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Code blocks (```)
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="ai-code-block"><code>${code.trim()}</code></pre>`;
    });

    // Inline code (`)
    html = html.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');

    // Bold (**text**)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic (*text*)
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Unordered list items
    html = html.replace(/^[\s]*[-•]\s+(.+)$/gm, '<li>$1</li>');
    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Numbered list items
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h3>$1</h3>');

    // Paragraphs — convert double newlines
    html = html.replace(/\n\n/g, '</p><p>');

    // Single newlines → <br>
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraph
    html = `<p>${html}</p>`;

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p><\/p>/g, '');

    return html;
}

// ========== Typing Indicator ==========
function showAITyping(show) {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
        indicator.style.display = show ? 'flex' : 'none';
    }

    // Scroll to bottom when showing indicator
    if (show) {
        const messagesBox = document.getElementById('ai-chat-messages');
        if (messagesBox) {
            requestAnimationFrame(() => {
                messagesBox.scrollTop = messagesBox.scrollHeight;
            });
        }
    }
}

// ========== File Attachment Handling ==========
function triggerAIFileInput() {
    const fileInput = document.getElementById('ai-file-input');
    if (fileInput) fileInput.click();
}

function handleAIFileSelect(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of files) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            if (typeof showToast === 'function') {
                showToast(`File "${file.name}" is too large (max 10MB).`, 'error');
            }
            continue;
        }

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            if (typeof showToast === 'function') {
                showToast(`File type "${file.type}" is not supported. Use images or PDF.`, 'warning');
            }
            continue;
        }

        // Read as base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Full = e.target.result;
            const base64Data = base64Full.split(',')[1]; // Remove data:...;base64, prefix

            aiAttachments.push({
                file: file,
                base64: base64Data,
                mimeType: file.type,
                name: file.name,
                previewUrl: base64Full // For image preview
            });

            renderAttachmentPreviews();
        };
        reader.readAsDataURL(file);
    }

    // Reset file input so same file can be re-selected
    event.target.value = '';
}

function removeAIAttachment(index) {
    aiAttachments.splice(index, 1);
    renderAttachmentPreviews();
}

function renderAttachmentPreviews() {
    const container = document.getElementById('ai-attachment-preview');
    if (!container) return;

    if (aiAttachments.length === 0) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'flex';
    container.innerHTML = '';

    aiAttachments.forEach((att, index) => {
        const item = document.createElement('div');
        item.className = 'ai-attachment-item';

        if (att.mimeType.startsWith('image/')) {
            item.innerHTML = `
                <img src="${att.previewUrl}" alt="${att.name}" class="ai-attachment-thumb">
                <button class="ai-attachment-remove" onclick="removeAIAttachment(${index})" title="Remove">×</button>
            `;
        } else {
            item.innerHTML = `
                <div class="ai-attachment-file-icon">📄</div>
                <span class="ai-attachment-name">${att.name.length > 12 ? att.name.substring(0, 10) + '…' : att.name}</span>
                <button class="ai-attachment-remove" onclick="removeAIAttachment(${index})" title="Remove">×</button>
            `;
        }

        container.appendChild(item);
    });
}

// ========== Suggested Prompts ==========
function sendSuggestedPrompt(text) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
        input.value = text;
        sendAIMessage();
    }
}

// ========== Clear Chat ==========
function clearAIChat() {
    const messagesBox = document.getElementById('ai-chat-messages');
    if (messagesBox) messagesBox.innerHTML = '';

    const welcome = document.getElementById('ai-chat-welcome');
    if (welcome) welcome.style.display = 'flex';

    // Reset conversation
    aiChatHistory = [];
    aiAttachments = [];
    renderAttachmentPreviews();

    // Reinitialize Gemini chat session
    if (geminiModel) {
        geminiChat = geminiModel.startChat({ history: [] });
    }
}

// ========== Handle Enter Key ==========
function handleAIChatKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendAIMessage();
    }
}

// ========== Drag and Drop ==========
function initAIDragDrop() {
    const dropZone = document.getElementById('ai-chat-container');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('ai-drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('ai-drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('ai-drag-over');

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            // Simulate file input event
            const fakeEvent = { target: { files: files, value: '' } };
            handleAIFileSelect(fakeEvent);
        }
    });
}

// ========== Initialize on DOM Ready ==========
document.addEventListener('DOMContentLoaded', () => {
    initAIDragDrop();
});
