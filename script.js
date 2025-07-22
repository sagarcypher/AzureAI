// Azure AI Services Hub - Main JavaScript Implementation
// AI-102 Certification Project

// Configuration Management
class AzureConfig {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        const saved = localStorage.getItem('azureAIConfig');
        return saved ? JSON.parse(saved) : {
            openaiEndpoint: '',
            openaiKey: '',
            docIntelEndpoint: '',
            docIntelKey: '',
            faceEndpoint: '',
            faceKey: '',
            textEndpoint: '',
            textKey: '',
            visionEndpoint: '',
            visionKey: ''
        };
    }

    saveConfig(config) {
        this.config = { ...this.config, ...config };
        localStorage.setItem('azureAIConfig', JSON.stringify(this.config));
    }

    getConfig() {
        return this.config;
    }

    isServiceConfigured(service) {
        const endpoints = {
            'openai': this.config.openaiEndpoint && this.config.openaiKey,
            'document': this.config.docIntelEndpoint && this.config.docIntelKey,
            'face': this.config.faceEndpoint && this.config.faceKey,
            'text': this.config.textEndpoint && this.config.textKey,
            'vision': this.config.visionEndpoint && this.config.visionKey
        };
        return endpoints[service] || false;
    }
}

// Global instances
const azureConfig = new AzureConfig();
let currentTab = 'chatbot';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadConfigurationToUI();
    initializeTabNavigation();
    initializeChatInput();
    initializeCharCounter();
    initializeConfigPanel();
    console.log('Azure AI Services Hub initialized successfully');
}

// Configuration Panel Management
function initializeConfigPanel() {
    const configHeader = document.querySelector('.config-header');
    if (configHeader) {
        configHeader.addEventListener('click', toggleConfig);
    }
}

function toggleConfig() {
    const configContent = document.querySelector('.config-content');
    const configToggle = document.querySelector('.config-toggle');
    
    if (configContent && configToggle) {
        configContent.classList.toggle('expanded');
        configToggle.classList.toggle('rotated');
    }
}

function loadConfigurationToUI() {
    const config = azureConfig.getConfig();
    Object.keys(config).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = config[key] || '';
        }
    });
}

function saveConfiguration() {
    const config = {};
    const configFields = [
        'openaiEndpoint', 'openaiKey', 'docIntelEndpoint', 'docIntelKey',
        'faceEndpoint', 'faceKey', 'textEndpoint', 'textKey',
        'visionEndpoint', 'visionKey'
    ];
    
    configFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            config[field] = element.value.trim();
        }
    });
    
    azureConfig.saveConfig(config);
    showMessage('Configuration saved successfully!', 'success');
    
    const configContent = document.querySelector('.config-content');
    const configToggle = document.querySelector('.config-toggle');
    if (configContent && configToggle) {
        configContent.classList.remove('expanded');
        configToggle.classList.remove('rotated');
    }
}

// Tab Navigation
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedPane = document.getElementById(tabId);
    
    if (selectedButton && selectedPane) {
        selectedButton.classList.add('active');
        selectedPane.classList.add('active');
        currentTab = tabId;
    }
}

// Utility Functions
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message fade-in`;
    messageDiv.textContent = message;
    
    const currentTabPane = document.querySelector('.tab-pane.active');
    if (currentTabPane) {
        const resultsSection = currentTabPane.querySelector('.results-section') || 
                              currentTabPane.querySelector('.chat-messages');
        if (resultsSection) {
            resultsSection.appendChild(messageDiv);
            
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 5000);
        }
    }
}

// Azure OpenAI Chat Implementation
function initializeChatInput() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    if (!azureConfig.isServiceConfigured('openai')) {
        showMessage('Please configure Azure OpenAI settings first.', 'error');
        return;
    }
    
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    try {
        showLoading();
        // Simulate API call with demo response
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = getDemoOpenAIResponse(message);
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('OpenAI Error:', error);
        addMessageToChat(`Sorry, I encountered an error. This is a demo version - please configure your Azure OpenAI service for full functionality.`, 'bot');
    } finally {
        hideLoading();
    }
}

function getDemoOpenAIResponse(message) {
    // Demo responses for showcase purposes
    const responses = [
        "I'm a demo Azure OpenAI assistant! In a real deployment, I would process your request using GPT models. Configure your Azure OpenAI service to enable full functionality.",
        "This is a demonstration of Azure OpenAI integration. Your message has been received, and in production, I would provide intelligent responses using Azure's GPT models.",
        "Hello! I'm showcasing Azure OpenAI capabilities. For actual AI responses, please configure your Azure OpenAI endpoint and API key in the configuration panel.",
        "This Azure AI Hub demonstrates multiple cognitive services. I'm the OpenAI chatbot component - configure your service credentials to unlock full conversational AI!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message slide-in`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Document Intelligence Implementation
async function handleDocumentUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    if (!azureConfig.isServiceConfigured('document')) {
        showMessage('Please configure Document Intelligence settings first.', 'error');
        return;
    }
    
    const resultsDiv = document.getElementById('documentResults');
    if (!resultsDiv) return;
    
    try {
        showLoading();
        resultsDiv.innerHTML = '';
        
        // Simulate document analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        const result = getDemoDocumentResult(file);
        displayDocumentResults(result, resultsDiv);
        
    } catch (error) {
        console.error('Document Intelligence Error:', error);
        resultsDiv.innerHTML = `<div class="error-message">Demo mode - Configure Document Intelligence for full functionality</div>`;
    } finally {
        hideLoading();
    }
}

function getDemoDocumentResult(file) {
    return {
        content: `DEMO DOCUMENT ANALYSIS\n\nFile: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB\n\nThis is a demonstration of Azure Document Intelligence. In production, this service would extract actual text, tables, and structure from your uploaded document using OCR and advanced AI models.\n\nKey capabilities include:\n- Text extraction from PDFs and images\n- Table and form recognition\n- Handwriting recognition\n- Document structure analysis`,
        pages: [{ lines: [{ text: 'Demo content' }] }]
    };
}

function displayDocumentResults(result, container) {
    if (!result || !result.content) {
        container.innerHTML = '<div class="error-message">No text found in document</div>';
        return;
    }
    
    const resultHTML = `
        <div class="result-item">
            <h4><i class="fas fa-file-text"></i> Extracted Text</h4>
            <p style="white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 8px;">${result.content}</p>
        </div>
        <div class="result-item">
            <h4><i class="fas fa-info-circle"></i> Document Info</h4>
            <p><strong>Status:</strong> Demo Mode - Configure service for production use</p>
            <p><strong>Pages:</strong> ${result.pages ? result.pages.length : 0}</p>
            <p><strong>Words:</strong> ${result.content.split(' ').length}</p>
        </div>
    `;
    
    container.innerHTML = resultHTML;
}

// Face API Implementation
async function handleFaceUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    if (!azureConfig.isServiceConfigured('face')) {
        showMessage('Please configure Face API settings first.', 'error');
        return;
    }
    
    const resultsDiv = document.getElementById('faceResults');
    if (!resultsDiv) return;
    
    try {
        showLoading();
        resultsDiv.innerHTML = '';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        const result = getDemoFaceResult();
        displayFaceResults(result, resultsDiv, file);
        
    } catch (error) {
        console.error('Face API Error:', error);
        resultsDiv.innerHTML = `<div class="error-message">Demo mode - Configure Face API for full functionality</div>`;
    } finally {
        hideLoading();
    }
}

function getDemoFaceResult() {
    return [{
        faceAttributes: {
            age: 28 + Math.random() * 20,
            gender: Math.random() > 0.5 ? 'male' : 'female',
            smile: Math.random(),
            glasses: ['NoGlasses', 'Sunglasses', 'ReadingGlasses'][Math.floor(Math.random() * 3)],
            emotion: {
                happiness: Math.random() * 0.8,
                sadness: Math.random() * 0.3,
                neutral: Math.random() * 0.5,
                anger: Math.random() * 0.2,
                surprise: Math.random() * 0.4,
                fear: Math.random() * 0.1,
                contempt: Math.random() * 0.1,
                disgust: Math.random() * 0.1
            }
        }
    }];
}

function displayFaceResults(faces, container, file) {
    if (!faces || faces.length === 0) {
        container.innerHTML = '<div class="error-message">No faces detected in the image</div>';
        return;
    }
    
    const imageUrl = URL.createObjectURL(file);
    let resultHTML = `
        <div class="result-item">
            <h4><i class="fas fa-image"></i> Uploaded Image</h4>
            <img src="${imageUrl}" alt="Uploaded face" style="max-width: 100%; max-height: 300px; border-radius: 10px;">
        </div>
    `;
    
    faces.forEach((face, index) => {
        const attrs = face.faceAttributes;
        const emotions = attrs.emotion;
        const topEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
        
        resultHTML += `
            <div class="result-item">
                <h4><i class="fas fa-user"></i> Face ${index + 1} Analysis (Demo)</h4>
                <p><strong>Age:</strong> ${Math.round(attrs.age)} years old</p>
                <p><strong>Gender:</strong> ${attrs.gender}</p>
                <p><strong>Smile:</strong> ${Math.round(attrs.smile * 100)}%</p>
                <p><strong>Glasses:</strong> ${attrs.glasses}</p>
                <p><strong>Primary Emotion:</strong> ${topEmotion} (${Math.round(emotions[topEmotion] * 100)}%)</p>
                
                <div style="margin-top: 15px;">
                    <strong>Emotion Breakdown:</strong>
                    ${Object.keys(emotions).map(emotion => `
                        <div style="margin: 5px 0;">
                            <span style="display: inline-block; width: 80px;">${emotion}:</span>
                            <div class="confidence-bar" style="display: inline-block; width: 150px; vertical-align: middle;">
                                <div class="confidence-fill" style="width: ${emotions[emotion] * 100}%"></div>
                            </div>
                            <span style="margin-left: 10px;">${Math.round(emotions[emotion] * 100)}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = resultHTML;
}

// Sentiment Analysis Implementation
function initializeCharCounter() {
    const textarea = document.getElementById('sentimentText');
    const counter = document.querySelector('.char-counter');
    
    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/5000`;
            
            if (length > 4500) {
                counter.style.color = '#dc3545';
            } else if (length > 4000) {
                counter.style.color = '#ffc107';
            } else {
                counter.style.color = '#6c757d';
            }
        });
    }
}

async function analyzeSentiment() {
    const textarea = document.getElementById('sentimentText');
    const resultsDiv = document.getElementById('sentimentResults');
    
    if (!textarea || !resultsDiv) return;
    
    const text = textarea.value.trim();
    if (!text) {
        showMessage('Please enter text to analyze.', 'error');
        return;
    }
    
    if (!azureConfig.isServiceConfigured('text')) {
        showMessage('Please configure Text Analytics settings first.', 'error');
        return;
    }
    
    try {
        showLoading();
        resultsDiv.innerHTML = '';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = getDemoSentimentResult(text);
        displaySentimentResults(result, resultsDiv);
        
    } catch (error) {
        console.error('Text Analytics Error:', error);
        resultsDiv.innerHTML = `<div class="error-message">Demo mode - Configure Text Analytics for full functionality</div>`;
    } finally {
        hideLoading();
    }
}

function getDemoSentimentResult(text) {
    // Simple sentiment detection for demo
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'disappointed'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let sentiment, scores;
    if (positiveCount > negativeCount) {
        sentiment = 'positive';
        scores = { positive: 0.7 + Math.random() * 0.2, neutral: 0.2, negative: 0.1 };
    } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        scores = { positive: 0.1, neutral: 0.2, negative: 0.7 + Math.random() * 0.2 };
    } else {
        sentiment = 'neutral';
        scores = { positive: 0.3, neutral: 0.5 + Math.random() * 0.2, negative: 0.2 };
    }
    
    return {
        documents: [{
            sentiment: sentiment,
            confidenceScores: scores,
            sentences: [{ text: text.substring(0, 100) + '...', sentiment: sentiment }]
        }]
    };
}

function displaySentimentResults(result, container) {
    if (!result.documents || result.documents.length === 0) {
        container.innerHTML = '<div class="error-message">No sentiment analysis results</div>';
        return;
    }
    
    const doc = result.documents[0];
    const sentiment = doc.sentiment;
    const scores = doc.confidenceScores;
    
    const sentimentClass = `sentiment-${sentiment.toLowerCase()}`;
    
    const resultHTML = `
        <div class="result-item">
            <h4><i class="fas fa-heart"></i> Overall Sentiment (Demo)</h4>
            <p>
                <span class="sentiment-indicator ${sentimentClass}">
                    ${sentiment.toUpperCase()}
                </span>
                <span>Confidence: ${Math.round(scores[sentiment.toLowerCase()] * 100)}%</span>
            </p>
        </div>
        
        <div class="result-item">
            <h4><i class="fas fa-chart-bar"></i> Sentiment Breakdown</h4>
            <div style="margin-top: 15px;">
                <div style="margin: 10px 0;">
                    <span style="display: inline-block; width: 80px;">Positive:</span>
                    <div class="confidence-bar" style="display: inline-block; width: 200px; vertical-align: middle;">
                        <div class="confidence-fill" style="width: ${scores.positive * 100}%; background: #28a745;"></div>
                    </div>
                    <span style="margin-left: 10px;">${Math.round(scores.positive * 100)}%</span>
                </div>
                
                <div style="margin: 10px 0;">
                    <span style="display: inline-block; width: 80px;">Neutral:</span>
                    <div class="confidence-bar" style="display: inline-block; width: 200px; vertical-align: middle;">
                        <div class="confidence-fill" style="width: ${scores.neutral * 100}%; background: #ffc107;"></div>
                    </div>
                    <span style="margin-left: 10px;">${Math.round(scores.neutral * 100)}%</span>
                </div>
                
                <div style="margin: 10px 0;">
                    <span style="display: inline-block; width: 80px;">Negative:</span>
                    <div class="confidence-bar" style="display: inline-block; width: 200px; vertical-align: middle;">
                        <div class="confidence-fill" style="width: ${scores.negative * 100}%; background: #dc3545;"></div>
                    </div>
                    <span style="margin-left: 10px;">${Math.round(scores.negative * 100)}%</span>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = resultHTML;
}

// Vision API Implementation
async function handleVisionUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    if (!azureConfig.isServiceConfigured('vision')) {
        showMessage('Please configure Vision API settings first.', 'error');
        return;
    }
    
    const resultsDiv = document.getElementById('visionResults');
    if (!resultsDiv) return;
    
    try {
        showLoading();
        resultsDiv.innerHTML = '';
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        const result = getDemoVisionResult();
        displayVisionResults(result, resultsDiv, file);
        
    } catch (error) {
        console.error('Vision API Error:', error);
        resultsDiv.innerHTML = `<div class="error-message">Demo mode - Configure Vision API for full functionality</div>`;
    } finally {
        hideLoading();
    }
}

function getDemoVisionResult() {
    const descriptions = [
        "A person standing outdoors on a sunny day",
        "A group of people in an indoor setting",
        "A scenic landscape with mountains and trees",
        "An urban environment with buildings and vehicles",
        "A close-up view of various objects"
    ];
    
    const tags = ['person', 'outdoor', 'building', 'sky', 'tree', 'car', 'nature', 'water'];
    const objects = ['person', 'car', 'tree', 'building', 'sign'];
    
    return {
        description: {
            captions: [{
                text: descriptions[Math.floor(Math.random() * descriptions.length)],
                confidence: 0.7 + Math.random() * 0.2
            }],
            tags: tags.slice(0, 5).map(tag => ({
                name: tag,
                confidence: 0.5 + Math.random() * 0.4
            }))
        },
        objects: objects.slice(0, 3).map(obj => ({
            object: obj,
            confidence: 0.6 + Math.random() * 0.3
        })),
        ocrText: "DEMO OCR\n\nThis is sample extracted text from the image. In production, Azure Vision API would extract actual text using advanced OCR capabilities."
    };
}

function displayVisionResults(result, container, file) {
    const imageUrl = URL.createObjectURL(file);
    
    let resultHTML = `
        <div class="result-item">
            <h4><i class="fas fa-image"></i> Uploaded Image</h4>
            <img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; max-height: 400px; border-radius: 10px;">
        </div>
    `;
    
    // Description Results
    if (result.description) {
        const desc = result.description;
        resultHTML += `
            <div class="result-item">
                <h4><i class="fas fa-eye"></i> Image Description (Demo)</h4>
                ${desc.captions && desc.captions.length > 0 ? `
                    <p><strong>Primary Description:</strong> ${desc.captions[0].text}</p>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${desc.captions[0].confidence * 100}%"></div>
                    </div>
                    <p style="margin-top: 5px;">Confidence: ${Math.round(desc.captions[0].confidence * 100)}%</p>
                ` : ''}
                
                ${desc.tags && desc.tags.length > 0 ? `
                    <p style="margin-top: 15px;"><strong>Detected Tags:</strong></p>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        ${desc.tags.map(tag => `
                            <span style="background: #e3f2fd; padding: 5px 10px; border-radius: 15px; font-size: 14px;">
                                ${tag.name} (${Math.round(tag.confidence * 100)}%)
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Objects Results
    if (result.objects && result.objects.length > 0) {
        resultHTML += `
            <div class="result-item">
                <h4><i class="fas fa-cubes"></i> Detected Objects (Demo)</h4>
                ${result.objects.map((obj, index) => `
                    <div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <p><strong>${obj.object}</strong></p>
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${obj.confidence * 100}%"></div>
                        </div>
                        <p style="margin-top: 5px;">Confidence: ${Math.round(obj.confidence * 100)}%</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // OCR Results
    if (result.ocrText) {
        resultHTML += `
            <div class="result-item">
                <h4><i class="fas fa-font"></i> Extracted Text (Demo OCR)</h4>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${result.ocrText}</p>
            </div>
        `;
    }
    
    container.innerHTML = resultHTML;
}

// Export for potential use
window.AzureAIHub = {
    azureConfig,
    switchTab,
    saveConfiguration,
    sendMessage,
    analyzeSentiment
}; 