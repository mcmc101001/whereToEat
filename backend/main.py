from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from maps import maps_client, NearbyPlacesRequest

app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/nearbyPlaces")
def get_nearby_places(req: NearbyPlacesRequest, response: Response):
    places = maps_client.getNearbyPlaces(req)
    return places
