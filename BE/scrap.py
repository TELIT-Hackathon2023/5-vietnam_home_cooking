## Purpose: Scrape car data from web using a license plate number (slovakia)
import requests
import re
import sys
import json
import time

## url + license plate number = car data
url = 'https://overenie.digital/over/sk/ecv/'

## load json license plates to return in
json_string = open(sys.argv[1]).read().replace("{","[").replace("}","]")

## turn json string into a list
to_parse = json.loads(json_string)

out_dict= {}


for iterations,ecv in enumerate(to_parse):
    ## HTTP GET request
    r = requests.get(url + ecv)

    ## parse r.text to get the car brand for the standard site format
    car_brand = re.search(r'Pre zobrazenie podrobností o vozidle <strong>(.*?)</strong>', r.text)

    ## check which site format we are dealing with, if not the standard one, then try to get the car brand from the other format
    if car_brand is None:

        car_brand = re.search(r'<th>Výrobca</th><td>(.*?)</td>', r.text.strip())
        car_model = re.search(r'<th>Model</th><td>(.*?)</td>', r.text.strip())

        if car_brand is None:
            print("Car brand not found")
            out_dict.update({ecv : "Default"})


        elif car_model is not None:
            car_brand = " ".join(word.capitalize() for word in car_brand.group(1).lower().split(" "))
            car_brand += " " + " ".join(word.capitalize() for word in car_model.group(1).lower().split(" "))
            out_dict.update({ecv : str(car_brand)})


    if car_brand:
        car_brand = " ".join(word.capitalize() for word in car_brand.group(1).lower().split(" "))
        print(car_brand)
        out_dict.update({ecv : str(car_brand)})

    #wait because of the site limitations smh they dont want me to get my data :D
    if (iterations % 9) == 1 and iterations != 1:
        time.sleep(10)



## write the output to a json file
with open(sys.argv[1], "w") as outfile:
    json.dump(out_dict, outfile)