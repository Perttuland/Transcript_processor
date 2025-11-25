# Agent controls

## LLM options
We want to support bring your own key (BYOK) for the following providers:

- LiteLLM: we offer google/gemini-2.0-flash-001 as default model, we also offer azure/gpt-4o azure/azure/gpt-4o-mini, azure/o1-mini, google/gemini-1.5-pro-002

## Model setting per agent
User can configure the model to be used by each agent. This is done through a clear and minimal UI. Make sure to implement this so that when we add more models later the lists auto-update. 

## Agent prompt editing
User can easily edit the prompt for each agent. 
There is a button to restore default prompts for the agents. 

## Import and export
User can import and export all agent settings, including api keys, models, and prompts. 

