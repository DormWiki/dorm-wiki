from bs4 import BeautifulSoup as bs
import requests as rq
import regex as re
import urllib.request as ur
from pathlib import Path
from requests_html import HTMLSession
import json
from geopy.geocoders import Nominatim

# imgs are: class=carousel item
# p
missing = [
  "oak-hall",
  "poplar-hall",
  "nordheim-court",
  "radford-court",
  "blakeley-village"
]

codes = [
   "elm-hall", 
    "ald", 
    "hns",
    "lah",
    "mdr",
    "mcc",
    "mcm",
    "wlw",
    "ter",
    "mrc",
    "sch",
    "cedar-apartments",
    "cda",
    "lavy",
]

# click on button /btn-nav-text/
# 
URL = "https://hfs.uw.edu"
def images() :
  p = rq.get("https://hfs.uw.edu/Live/Undergraduate-Communities")
  lentilSoup = bs(p.content, 'html.parser')
  links = []
  try:
    btn = lentilSoup.find_all("a", {"class": "btn btn-nav btn-primary"})
    links = [i.get("href").replace("..", "https://hfs.uw.edu") for i in btn]
    for link in links:
        dormName = link.split("/")[-1]
        print(dormName)
        dorm = rq.get(link)
        beetSoup = bs(dorm.content, 'html.parser')
        images = beetSoup.find_all("img", {"class": "carousel-image"})
        urls = [images[i].get("src") for i in range(len(images))]
        i = 1
        for url in urls:
            url = URL + url
            ending = url.split("/")[5].split("?")[0][:-5].split(".")[-1]
            filename = "{}-{}.{}".format(dormName, i, ending)
            print(filename)
            if not filename:
              print("Regex didn't match with the url: {}".format(url))
              continue
            Path("./misc/" + dormName).mkdir(parents=True, exist_ok=True)
            with open("./misc/" + dormName + "/" + filename, "wb") as f:
              f.write(rq.get(url).content)
            i += 1
  except AttributeError:
    print(AttributeError)

        # dend, they dont have a uniform way of storing information!
        # print(beetSoup
        #       .find("strong", text="Mailing address:")
        #       .parent
        #       .next_sibling
        #       .getText()
        #       .replace("Resident Name", "")
        #       .split("<br>")[0]
        #       .split("\r\n"))
        #[beetSoup(text="Resident Name").split("<br>")[i] for i in [1,3]]

def info():
  p = rq.get("https://www.washington.edu/maps/?json=campusmap.get_locations")
  data = p.json()
  print("info")
  found = list(filter(lambda dorm: dorm["code"] in codes, data['posts']))
  geo = Nominatim(user_agent="dorm_scraper")
  ret = []
  extract = "https://hfs.uw.edu/Live/Undergraduate-Housing-Rates-and-Information/"
  for dorm in found:
    loc = geo.reverse("{}, {}".format(dorm["lat"], dorm["lng"]))
    id = dorm["body"][dorm["body"].find(extract):dorm["body"].find(">Residence Hall<")-1].split("/")[-1].lower()
    ret.append({
      "_id": id,
      "info": {
        "description": dorm["body"],
        "roomType": [],
        "address": str(loc),
        "food": [],
      },
      "review": [],
      "event": [],
    })
  js = json.dumps(ret)
  with open("misc/attempt.json", "w") as outfile:
    outfile.write(js)
info()



