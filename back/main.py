from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from routes.form import router as formRouter
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="../front/build/static"))
app.include_router(formRouter, prefix="/api")
templates = Jinja2Templates(directory='../front/build')


@app.get('/')
async def index_loader(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})
