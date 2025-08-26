import os
import requests
from typing import Union
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

# this allows for cross origin requests
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


api_key = os.environ['API_KEY']
url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + api_key


@app.get("/ping")
def pong():
    return "pong"

@app.get("/weather/{city}")
def read_root(city):
    completeUrl = f"{url}&q={city}"
    response = requests.get(completeUrl).json()
    temp = response["main"]["temp"]
    imageInfo = response["weather"][0]["main"]
    description = response["weather"][0]["description"]

    return {"temperature": temp, "imageInfo": imageInfo, "description": description}
