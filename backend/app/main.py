from functools import lru_cache
from typing import Annotated
from fastapi import Depends, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from app.maps import MapsClient, NearbyPlacesRequest

app = FastAPI()


@lru_cache
def get_client():
    return MapsClient()


origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://where-to-eat-mcmc101001.vercel.app",
    "https://wheretoeat.pages.dev",
]

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
def get_nearby_places(
    req: NearbyPlacesRequest,
    maps_client: Annotated[MapsClient, Depends(get_client)],
):
    places = maps_client.getNearbyPlaces(req)
    return places


@app.get("/picture")
def get_picture(
    place_id: str,
    img_ref: str,
    maps_client: Annotated[MapsClient, Depends(get_client)],
):
    img = maps_client.getPicture(place_id=place_id, img_ref=img_ref)
    return Response(content=img, media_type="image/jpeg")
