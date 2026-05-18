# LOGIQ Railway Triage 🚆

Smart routing engine for Indian Railways designed to automate passenger support and streamline station-level management.

## ⚙️ Features
* **AI-Powered Triage:** Intelligently categorizes passenger queries and complaints.
* **Data Extraction:** Automatically parses structured data like PNR numbers.
* **Web Interface:** Clean, intuitive UI built with Flask, HTML, CSS, and JavaScript.

## 🛠️ Setup and Installation

Follow these steps to run the LOGIQ Engine locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/harshmishra-1702/LOGIQ_Railway_Triage.git](https://github.com/harshmishra-1702/LOGIQ_Railway_Triage.git)
cd LOGIQ_Railway_Triage
```bash

2. Create a Virtual Environment
It is recommended to run this project in an isolated environment.

python -m venv venv

# Activate on Windows:
venv\Scripts\activate

# Activate on Mac/Linux:
source venv/bin/activate

3. Install required dependencies

pip install -r requirements.txt

4. Configure Environment Variables (Crucial)
For security reasons, API keys are not included in this repository. You must create your own configuration file.

    1.Create a file named .env in the root folder.

    2.Add your LLM API keys. (e.g., GROQ_API_KEY=your_api_key_here).

5. Run the Application 
python app.py

Open your web browser and navigate to http://127.0.0.1:5000/ to use the engine.