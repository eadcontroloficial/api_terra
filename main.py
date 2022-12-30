from flask import Flask, request
from playwright.sync_api import Playwright, sync_playwright
user = '13888558'
passw = 'A123456b'

app = Flask (__name__)

@app.route('/')
def search():
    args = request.args
    args.get("id", default="", type=str)
    id = args.get("id")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page(
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36")
        page.goto("https://login.doterra.com/br/pt-br/sign-in")
        page.fill('input[name="uid"]', user)
        page.fill('input[name="password"]', passw)
        page.click('button[type=submit]')
        print("Loguei")
        page.wait_for_timeout(20000)
        print("Requisitando APi...")
        page.goto(f'https://beta-doterra.myvoffice.com/index.cfm?Fuseaction=evo_Modules.Placements&FuseSubAction=GetName&DistID={id}')
        pageText = page.inner_text('body')
        text = pageText
    return text


app.run(host='0.0.0.0')