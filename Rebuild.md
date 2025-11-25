This project has reached an impass and it is now a more fruitful direction to start over. Lets not delete anything, we can use the existing components where they make sense if they work. 

The UI is mostly fine, so we can keep that. 

This tool should:
1. Take in transcripts 
2. Work with the user to extract insights and information from these transcritps
3. Store this information in a format that makes it easy and reliable to query by AI

The current implementation has elements like country or unit, these are no longer relevant. Lets make a baseline app that works for any context. 

Principles for next round:
1. We work with text only, no more JSON
2. We have persistence but lets not worry about data management. If the user can download their processed data in the end, it is fine. The end file should should be a markdown file that is optimized for AI use. It starts with a short readme section that explains the contents, it then has the key information and insights in a structured format with verified quotes as evidence. It is broad, in the sense that it can be used as a replacement for the transcript file without loss of key information. 
3. We break parts down into small agentic tasks so that very light LLM's can perform the tasks. 
4. We never error out due to bad LLM generation, insteaad we have a flow of iterating with the user. 
5. Our app is responsive and the user can see the agents working during the flow, text generates and they can see multiple agents working in parallel. For example if there are 5 key themes as points of view, then there will be 5 parallel agents running analysis and writing sections of those themes. 

I have created a new folder, @v2 for you to build this in. 

You can ask clarifying questions before starting 