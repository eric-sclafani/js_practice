from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from .nlp.processing import process_document


app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/nlp/")
async def apply_processing(text: str):
    doc = process_document(text)
    return doc.to_json()
