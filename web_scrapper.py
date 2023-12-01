import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    # Send an HTTP GET request to the website
    url = 'https://supportgowhere.life.gov.sg/categories/mental-health?activeTab=services'
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML text of the page using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')