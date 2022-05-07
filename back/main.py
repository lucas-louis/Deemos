from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from routes.form import router as formRouter
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*", "http://localhost:8000/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../front/build/static"))
app.include_router(formRouter, prefix="/api")
templates = Jinja2Templates(directory='../front/build')


@app.get('/')
async def index_loader(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})
