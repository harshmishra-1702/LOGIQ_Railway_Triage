from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from config import FAST_MODEL_ID, VERSATILE_MODEL_ID, GPT_OSS_MODEL_ID
import os
from dotenv import load_dotenv

load_dotenv()

# Schema for forcing structured JSON output
class TriageOutput(BaseModel):
    sentiment: int = Field(description="Passenger mood score 0-100")
    category: str = Field(description="Issue type: eCatering, Ticketing, etc.")
    summary: str = Field(description="Main issue and entities like PNR/Station")
    action: str = Field(description="Routing instruction for logistics")
    response: str = Field(description="Direct reply to the passenger")

# Initialize the parser with our schema
json_parser = JsonOutputParser(pydantic_object=TriageOutput)

# Setup Groq models
fast_llm = ChatGroq(model=FAST_MODEL_ID)
versatile_llm = ChatGroq(model=VERSATILE_MODEL_ID)
gpt_llm = ChatGroq(model=GPT_OSS_MODEL_ID)

# Prompt template that handles both instructions and JSON formatting
universal_template = ChatPromptTemplate.from_messages([
    ("system", "{system_prompt}\n\n{format_prompt}"),
    ("user", "{user_prompt}")
])

def get_ai_response(model, system_prompt, user_prompt):
    # Chain: Template -> Model -> JSON Parser
    chain = universal_template | model | json_parser
    
    return chain.invoke({
        'system_prompt': system_prompt, 
        'user_prompt': user_prompt,
        'format_prompt': json_parser.get_format_instructions()
    })

# Helpers to call different models from app.py
def fast_response(sys, user):
    return get_ai_response(fast_llm, sys, user)

def versatile_response(sys, user):
    return get_ai_response(versatile_llm, sys, user)

def gpt_oss_response(sys, user):
    return get_ai_response(gpt_llm, sys, user)