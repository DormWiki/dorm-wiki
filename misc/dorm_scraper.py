from bs4 import BeautifulSoup as bs
import requests as rq

# imgs are: class=carousel item
# p


p = rq.get("https://www.washington.edu/maps/#!/mah")
soup = bs(p.content, 'html.parser')

print(soup.find("div", id="info-window"))
print(soup.get_text())