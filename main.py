
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/parse-cv")
async def parse_cv(text: str = Form(...)):
    keywords = ["STCW", "ECDIS", "GMDSS", "Tanker", "Watchkeeping", "Chief Officer", "Deck", "Engine"]
    lines = text.split("\n")
    optimized = []

    for line in lines:
        line_keywords = [kw for kw in keywords if kw.lower() in line.lower()]
        if line_keywords:
            optimized.append(f"• {line} ({', '.join(line_keywords)})")
        else:
            optimized.append(f"• {line}")

    return JSONResponse(content={ "optimized_cv": "\n".join(optimized) })
