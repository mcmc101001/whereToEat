import os
import requests

from typing import Optional, Mapping
from pydantic import BaseModel

from dotenv import load_dotenv

if (load_dotenv() == False):
    print("Error loading .env file")
    raise Exception("Error loading .env file")

API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]


class NearbyPlacesRequest(BaseModel):
    latitude: float
    longitude: float
    radius: Optional[float] = 500
    place_type: Optional[str] = "places.displayName,places.location,places.rating"
    max_result_count: Optional[int] = 10


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
