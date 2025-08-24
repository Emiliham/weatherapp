import os
from typing import Union
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

api_key = os.environ['API_KEY']

@app.get("/")
def pong():
    return "pong"

@app.get("/test")
def lol():
    return api_key

@app.get("/hello/{city}")
def read_root(city):
    # Hent data fra openweather
    # Plukk ut det som er nyttig
    # returner det
    return {"Hello": f"{name}"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}