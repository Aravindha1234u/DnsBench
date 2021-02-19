import requests
import os
from datetime import datetime 

#List of DNS provider 
Knowndns = "https://kb.adguard.com/en/general/dns-providers"

#Last modified time
mtime = os.path.getctime("./cache/response.txt")

#day difference
diff = datetime.now().day - datetime.fromtimestamp(mtime).day
if diff > 0:
    
	#HTML Requests
	response = requests.get(Knowndns)

	#save the response
	open("./cache/response.txt","w").write(response.text)