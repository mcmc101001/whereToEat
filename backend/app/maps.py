import os
from typing import Mapping

import requests
from cachetools import LRUCache, cached
from cachetools.keys import hashkey
from dotenv import load_dotenv
from fastapi import HTTPException
from pydantic import BaseModel, field_validator

MAX_RESULT_COUNT = 20


if not load_dotenv():
    print(".env file not found")

API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")

if API_KEY is None:
    print("Error finding API key")
    raise Exception("Error finding API key")


class NearbyPlacesRequest(BaseModel):
    latitude: float
    longitude: float
    radius: float | None = 2000  # meters
    place_type: str | None = (
        "places.id,places.displayName,places.location,places.rating,places.photos,places.types"
    )
    max_result_count: int | None = MAX_RESULT_COUNT
    filters: list[str] | None = ["restaurant"]

    @field_validator("max_result_count")
    def max_result_count_must_be_between_1_and_20(cls, v):
        if v < 1 or v > 20:
            raise ValueError("max_result_count must be between 1 and 20")
        return v


class Location(BaseModel):
    latitude: float
    longitude: float


class Place(BaseModel):
    name: str
    location: Location
    rating: float


class MapsClient:

    @staticmethod
    def getNearbyPlaces(req: NearbyPlacesRequest) -> list[Place]:
        headers: Mapping = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": req.place_type,
        }

        json_data = {
            "includedTypes": req.filters,
            "maxResultCount": req.max_result_count,
            # 'rankPreference': "DISTANCE",
            "locationRestriction": {
                "circle": {
                    "center": {
                        "latitude": req.latitude,
                        "longitude": req.longitude,
                    },
                    "radius": req.radius,
                },
            },
        }

        response = requests.post(
            "https://places.googleapis.com/v1/places:searchNearby",
            headers=headers,
            json=json_data,
        )

        if response.status_code != 200:
            print(response.json())
            raise HTTPException(
                status_code=response.status_code, detail=response.json()
            )
        return response.json()

    @staticmethod
    @cached(
        cache=LRUCache(maxsize=128), key=lambda place_id, img_ref: hashkey(place_id)
    )
    def getPicture(place_id: str, img_ref: str) -> bytes:
        """Returns the picture as a base64 representation and caches it based on place_id"""
        response = requests.get(
            f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={img_ref}&key={API_KEY}",
            stream=True,
        )
        if response.status_code != 200:
            print(response.json())
            raise Exception("Error getting picture")

        result = response.raw.read()

        return result


# test code

# maps_client = MapsClient()
# print(
#     str(
#         maps_client.getNearbyPlaces(
#             NearbyPlacesRequest(
#                 latitude=48.8550643650682,
#                 longitude=2.3523107940325465,
#                 filters=["coffee_shop"],
#             )
#         )
#     ).encode("utf-8")
# )
