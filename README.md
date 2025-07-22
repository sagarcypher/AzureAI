# Azure AI Services Hub - AI-102 Certification Project

A comprehensive, responsive web application showcasing multiple Azure AI services integration, designed as a final project for the AI-102 Azure AI Engineer certification.

![Azure AI Services Hub](https://img.shields.io/badge/Azure-AI%20Services-0078d4?style=for-the-badge&logo=microsoft-azure)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Features

### Integrated Azure AI Services
- **🤖 Azure OpenAI**: Interactive chatbot with GPT models
- **📄 Document Intelligence**: Extract text and structure from PDFs and images
- **👥 Face API**: Detect faces and analyze emotions, age, gender
- **💭 Sentiment Analysis**: Analyze text sentiment with confidence scores
- **👁️ Vision API**: Image description, object detection, and OCR

### Application Features
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **⚙️ Configuration Management**: Secure credential storage with localStorage
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **🔄 Demo Mode**: Showcase all features without requiring Azure credentials
- **⚡ Fast Performance**: Optimized loading states and error handling

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **Icons**: Font Awesome 6
- **Cloud Services**: Microsoft Azure AI Services
- **Storage**: Browser localStorage for configuration

## 📋 Prerequisites

### For Demo Mode (No Azure Required)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for file:// protocol limitations)

### For Production Mode
- Azure subscription (Azure for Students recommended)
- Azure AI services resources:
  - Azure OpenAI Service
  - Document Intelligence (Form Recognizer)
  - Face API
  - Text Analytics
  - Computer Vision

## 🏗️ Azure Services Setup

### 1. Azure OpenAI Service
```bash
# Create Azure OpenAI resource
az cognitiveservices account create \
  --name "your-openai-resource" \
  --resource-group "your-resource-group" \
  --kind "OpenAI" \
  --sku "S0" \
  --location "East US"
```

### 2. Document Intelligence
```bash
# Create Document Intelligence resource
az cognitiveservices account create \
  --name "your-doc-intel-resource" \
  --resource-group "your-resource-group" \
  --kind "FormRecognizer" \
  --sku "F0" \
  --location "East US"
```

### 3. Face API
```bash
# Create Face API resource
az cognitiveservices account create \
  --name "your-face-resource" \
  --resource-group "your-resource-group" \
  --kind "Face" \
  --sku "F0" \
  --location "East US"
```

### 4. Text Analytics
```bash
# Create Text Analytics resource
az cognitiveservices account create \
  --name "your-text-resource" \
  --resource-group "your-resource-group" \
  --kind "TextAnalytics" \
  --sku "F0" \
  --location "East US"
```

### 5. Computer Vision
```bash
# Create Computer Vision resource
az cognitiveservices account create \
  --name "your-vision-resource" \
  --resource-group "your-resource-group" \
  --kind "ComputerVision" \
  --sku "F0" \
  --location "East US"
```

## 🚀 Getting Started

### Option 1: Direct Browser Access
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. The application will run in **demo mode** by default

### Option 2: Local Web Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (install http-server globally)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## ⚙️ Configuration

### Demo Mode
The application works out-of-the-box in demo mode, showcasing all features with simulated responses.

### Production Mode
1. Click the **Azure Configuration** panel at the top
2. Enter your Azure service endpoints and API keys:
   - **OpenAI Endpoint**: `https://your-openai-resource.openai.azure.com/`
   - **Document Intelligence Endpoint**: `https://your-doc-intel.cognitiveservices.azure.com/`
   - **Face API Endpoint**: `https://your-face-api.cognitiveservices.azure.com/`
   - **Text Analytics Endpoint**: `https://your-text-analytics.cognitiveservices.azure.com/`
   - **Vision API Endpoint**: `https://your-vision.cognitiveservices.azure.com/`
3. Click **Save Configuration**

### Finding Your Endpoints and Keys
```bash
# Get endpoint and key for a service
az cognitiveservices account show \
  --name "your-resource-name" \
  --resource-group "your-resource-group" \
  --query "properties.endpoint"

az cognitiveservices account keys list \
  --name "your-resource-name" \
  --resource-group "your-resource-group"
```

## 📱 Usage Guide

### 🤖 Azure OpenAI Chat
1. Navigate to the **OpenAI Chat** tab
2. Type messages in the input field
3. Press Enter or click send to interact with the AI
4. View conversation history in the chat interface

### 📄 Document Intelligence
1. Go to the **Document Intelligence** tab
2. Click the upload area to select PDF or image files
3. Supported formats: PDF, PNG, JPEG, BMP, TIFF
4. View extracted text and document structure

### 👥 Face Analysis
1. Select the **Face Analysis** tab
2. Upload an image containing faces
3. Supported formats: PNG, JPEG, BMP, GIF
4. Review detected faces with emotions and demographics

### 💭 Sentiment Analysis
1. Open the **Sentiment Analysis** tab
2. Enter text (up to 5,000 characters)
3. Click **Analyze Sentiment**
4. View overall sentiment and confidence breakdown

### 👁️ Vision Analysis
1. Access the **Vision Analysis** tab
2. Upload an image file
3. Select analysis options (Objects, Text, Description)
4. Review image description, detected objects, and OCR results

## 🔒 Security Considerations

### Production Deployment
- **Never commit API keys** to version control
- Use **environment variables** for credentials
- Implement **server-side proxy** for API calls
- Enable **CORS** properly for your domain
- Use **HTTPS** for all communications

### Recommended Architecture
```
Browser → Your Web Server → Azure AI Services
```

Instead of direct browser-to-Azure calls for production.

## 💰 Cost Management

### Free Tier Limits (Azure for Students)
- **Document Intelligence**: 500 pages/month
- **Face API**: 30,000 transactions/month
- **Text Analytics**: 5,000 text records/month
- **Computer Vision**: 5,000 transactions/month
- **Azure OpenAI**: Usage-based pricing

### Cost Optimization Tips
- Use **Free (F0) tiers** where available
- Monitor usage in Azure portal
- Set up **billing alerts**
- Consider **request caching** for repeated calls

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Configuration   │    │  Azure AI       │
│                 │    │                  │    │                 │
│ • HTML/CSS/JS   │◄──►│ • localStorage   │◄──►│ • OpenAI        │
│ • Responsive    │    │ • Credentials    │    │ • Document AI   │
│ • Interactive   │    │ • Settings       │    │ • Face API      │
│                 │    │                  │    │ • Text Analytics│
└─────────────────┘    └──────────────────┘    │ • Vision API    │
                                               └─────────────────┘
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Configuration panel opens and saves settings
- [ ] All tabs switch correctly
- [ ] File uploads work for supported formats
- [ ] Text input validation works
- [ ] Loading states appear during processing
- [ ] Error messages display appropriately
- [ ] Responsive design works on mobile
- [ ] Demo mode functions without credentials

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 AI-102 Certification Alignment

This project demonstrates key AI-102 exam skills:

### Skill Measured Areas
1. **Plan and manage Azure AI solution** (15-20%)
   - ✅ Service selection and configuration
   - ✅ Resource management and monitoring

2. **Implement decision support solutions** (20-25%)
   - ✅ Text Analytics for sentiment analysis
   - ✅ Document Intelligence for content extraction

3. **Implement computer vision solutions** (15-20%)
   - ✅ Face API for face detection and analysis
   - ✅ Vision API for image analysis and OCR

4. **Implement natural language processing solutions** (30-35%)
   - ✅ Azure OpenAI for conversational AI
   - ✅ Text processing and analysis

5. **Implement knowledge mining and document intelligence solutions** (10-15%)
   - ✅ Document structure extraction
   - ✅ Content analysis and processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/enhancement`)
5. Create Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For questions about this AI-102 project:
- Create an issue in the repository
- Review Azure AI documentation
- Check the AI-102 certification guide

## 🔗 Useful Links

- [AI-102 Certification](https://docs.microsoft.com/learn/certifications/azure-ai-engineer/)
- [Azure AI Services Documentation](https://docs.microsoft.com/azure/cognitive-services/)
- [Azure for Students](https://azure.microsoft.com/free/students/)
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/)

---

**Built with ❤️ for the AI-102 Azure AI Engineer certification** 