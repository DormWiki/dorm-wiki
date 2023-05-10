from bs4 import BeautifulSoup as bs
import requests as rq
import regex as re
import urllib.request as ur

# imgs are: class=carousel item
# p


# click on button /btn-nav-text/
# 
URL = "https://hfs.uw.edu"
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
            filename = re.search(r'/([\w_-]+[.](jpg|gif|png))$', url)
            if not filename:
              print("Regex didn't match with the url: {}".format(url))
              continue
            with open(filename.group(1), 'wb') as f:
              if 'http' not in url:
                  # sometimes an image source can be relative 
                  # if it is provide the base url which also happens 
                  # to be the site variable atm. 
                  url = '{}{}'.format(URL, url)
              response = rq.get(url)
              f.write(response.content)
              i += 1

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
    
except AttributeError:
    print(AttributeError)


