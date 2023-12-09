import os
import requests

from typing import Optional, Mapping
from pydantic import BaseModel, validator

from dotenv import load_dotenv

if (load_dotenv() == False):
    print("Error loading .env file")
    raise Exception("Error loading .env file")

API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]

MAX_RESULT_COUNT = 20


class NearbyPlacesRequest(BaseModel):
    latitude: float
    longitude: float
    radius: float | None = 200  # meters
    place_type: str | None = "places.displayName,places.location,places.rating"
    max_result_count: int | None = MAX_RESULT_COUNT

    @validator('max_result_count')
    def max_result_count_must_be_between_1_and_20(cls, v):
        if (v < 1 or v > 20):
            raise ValueError('max_result_count must be between 1 and 20')
        return v


class Location(BaseModel):
    latitude: float
    longitude: float


class Place(BaseModel):
    name: str
    location: Location
    rating: float


class MapsClient:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def getNearbyPlaces(self, req: NearbyPlacesRequest) -> list[Place]:
        headers: Mapping = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': req.place_type,
        }

        json_data = {
            'includedTypes': [
                'restaurant',
            ],
            'maxResultCount': req.max_result_count,
            'locationRestriction': {
                'circle': {
                    'center': {
                        'latitude': req.latitude,
                        'longitude': req.longitude,
                    },
                    'radius': req.radius,
                },
            },
        }

        response = requests.post(
            'https://places.googleapis.com/v1/places:searchNearby', headers=headers, json=json_data)

        if (response.status_code != 200):
            print(response.json())
            raise Exception("Error getting nearby places")
        return response.json()


maps_client = MapsClient(API_KEY)

# test code
# print(maps_client.getNearbyPlaces(NearbyPlacesRequest(
#     latitude=37.7937, longitude=-122.3965)))
