from fastapi import FastAPI, Query

from pydantic import BaseModel

from maps import maps_client, NearbyPlacesRequest

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/nearbyPlaces")
def get_nearby_places(req: NearbyPlacesRequest):
    response = maps_client.getNearbyPlaces(req)
    return {"response": response}
