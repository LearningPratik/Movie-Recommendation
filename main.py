import pickle
from fastapi import FastAPI, Form
import pandas as pd
from pydantic import BaseModel
from typing import Annotated
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import requests

from fastapi.middleware.cors import CORSMiddleware # import here

app = FastAPI()

# declare origin/s
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    movieName: str

# Load the trained model
movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
df = pd.DataFrame(movies_dict)

# similarity matrix
similarity = pickle.load(open('similarity.pkl', 'rb'))


@app.post("/recommend")
def recommend(movie: Annotated[str, Form()]):
    
    movie_index = df[df['title'] == movie].index[0]
    
    recommended_movie_posters = []
    recommended_movies = []
    # enumerate is used to not lose the index values
    distances = sorted(list(enumerate(similarity[movie_index])),reverse=True,key = lambda x: x[1])
    for i in distances[1:6]:
        recommended_movies.append(df.iloc[i[0]].title)

        movie_id = df.iloc[i[0]].id
        recommended_movie_posters.append(fetch_poster(movie_id))

    # fetch movie poster

    return recommended_movies, recommended_movie_posters

@app.get('/movies')
def movies_list():
    # return df['title'].to_json(orient='records')
    return df['title'] 

@app.get('/recommended_movies')
def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=d85a474e564a24df1ffa4b45c6e076d4&language=en-US"
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path