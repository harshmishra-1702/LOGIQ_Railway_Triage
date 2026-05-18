# 🚆 LOGIQ Railway Triage

Smart routing engine for Indian Railways designed to automate passenger support and streamline station-level management.

## 🚀 Tech Stack
* **Backend:** Python, Flask
* **Frontend:** HTML, CSS, JavaScript
* **AI/LLM:** Groq API

## ⚙️ Features
* 🧠 **AI-Powered Triage:** Intelligently categorizes passenger queries and complaints.
* 🔍 **Data Extraction:** Automatically parses structured data like PNR numbers.
* 💻 **Web Interface:** Clean, intuitive UI built with Flask, HTML, CSS, and JavaScript.

## 📋 Prerequisites
Make sure you have the following installed on your local machine:
* Python 3.8+
* Git

## 🛠️ Setup and Installation

Follow these steps to run the LOGIQ Engine locally.

### 1. Clone the Repository
```bash
git clone https://github.com/harshmishra-1702/LOGIQ_Railway_Triage.git
cd LOGIQ_Railway_Triage
```

### 2. Create a Virtual Environment
It is highly recommended to run this project in an isolated environment.

```bash
python -m venv venv
```

* **Activate on Windows:**
```bash
venv\Scripts\activate
```

* **Activate on Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables (Crucial 🔒)
For security reasons, API keys are not included in this repository. You must create your own configuration file.

1. Create a file named `.env` in the root folder.
2. Add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run the Application
```bash
python app.py
```

🌐 **Open your web browser and navigate to `http://127.0.0.1:5000/` to use the engine.**

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the MIT License.
