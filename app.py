from flask import Flask, request, jsonify, render_template
import time
from model import fast_response, versatile_response, gpt_oss_response

app = Flask(__name__)

# Basic route to load the homepage
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint for the frontend to hit
@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    user_msg = data.get('message')
    model_choice = data.get('model')
    
    if not user_msg:
        return jsonify({"error": "No message provided"}), 400
    
    # Setting the persona for railway triage
    system_prompt = """You are an expert Railway Logistics and Passenger Support Router. 
    Analyze the message, extract PNRs/stations, and generate a structured routing response.Also for sentiment score give it out of 100(0->severe,100->low, rest decide accordingly)avoid giving 0 or 100 to any of the query and also add the significance (severe/moderate/low)"""
    
    start = time.time()
    
    try:
        # Route to the specific LLM function based on dropdown choice
        if model_choice == 'fast':
            answer = fast_response(user_msg, system_prompt)
        elif model_choice == 'versatile':
            answer = versatile_response(user_msg, system_prompt)
        elif model_choice == 'gpt_oss':
            answer = gpt_oss_response(user_msg, system_prompt)
        else:
            return jsonify({"error": f"Invalid model choice: {model_choice}"}), 400
            
        # Tracking performance for the UI footer
        answer['duration'] = time.time() - start
        
        return jsonify(answer)
        
    except Exception as e:
        print(f"Error in generation: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)