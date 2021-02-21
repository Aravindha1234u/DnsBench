import requests
import os
from datetime import datetime 

#List of DNS provider 
Knowndns = "https://kb.adguard.com/en/general/dns-providers"

#Last modified time
mtime = os.path.getctime(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","response.txt"))

#day difference
diff = datetime.now().day - datetime.fromtimestamp(mtime).day
if diff > 0:
    
	#HTML Requests
	response = requests.get(Knowndns)

	#save the response
	open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","response.txt"),"w",encoding="utf-8").write(response.text)