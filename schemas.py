from pydantic import BaseModel

class Movies(BaseModel):
    movie_list: dict