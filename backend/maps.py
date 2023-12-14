import os
import requests
import shutil

from typing import Mapping
from pydantic import BaseModel, field_validator

from dotenv import load_dotenv

if (load_dotenv() == False):
    print("Error loading .env file")
    raise Exception("Error loading .env file")

API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]

MAX_RESULT_COUNT = 20


class NearbyPlacesRequest(BaseModel):
    latitude: float
    longitude: float
    radius: float | None = 2000  # meters
    place_type: str | None = "places.displayName,places.location,places.rating,places.photos"
    max_result_count: int | None = MAX_RESULT_COUNT
    filters: list[str] | None = ['restaurant']

    @field_validator('max_result_count')
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
            'X-Goog-Api-Key': self.api_key,
            'X-Goog-FieldMask': req.place_type,
        }

        json_data = {
            'includedTypes': req.filters,
            'maxResultCount': req.max_result_count,
            # 'rankPreference': "DISTANCE",
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

    def getPicture(self, img_ref: str):
        '''Returns the picture as a base64 representation'''
        response = requests.get(
            f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={img_ref}&key={self.api_key}",
            stream=True)
        if (response.status_code != 200):
            print(response.json())
            raise Exception("Error getting picture")
        return response.raw.read()
        # with open('dpreview.jpg', 'wb') as fout:
        #     response.raw.decode_content = True
        #     shutil.copyfileobj(response.raw, fout)


maps_client = MapsClient(API_KEY)

# test code
# print(maps_client.getNearbyPlaces(NearbyPlacesRequest(
#     latitude=37.7937, longitude=-122.3965)))

# print(maps_client.getPicture("ATJ83zhSSAtkh5LTozXMhBghqubeOxnZWUV2m7Hv2tQaIzKQJgvZk9yCaEjBW0r0Zx1oJ9RF1G7oeM34sQQMOv8s2zA0sgGBiyBgvdyMxeVByRgHUXmv-rkJ2wyvNv17jyTSySm_-_6R2B0v4eKX257HOxvXlx_TSwp2NrICKrZM2d5d2P4q"))
