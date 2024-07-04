from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dis
import io

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows the React app to access the API
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str

@app.post("/api/bytecode")
async def get_bytecode(code_input: CodeInput):
    try:
        # Compile the code
        compiled_code = compile(code_input.code, '<string>', 'exec')
        
        # Capture the disassembled bytecode
        bytecode_output = io.StringIO()
        dis.dis(compiled_code, file=bytecode_output)
        bytecode_str = bytecode_output.getvalue()
        
        return {"bytecode": bytecode_str}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)