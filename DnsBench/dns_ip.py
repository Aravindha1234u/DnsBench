from bs4 import BeautifulSoup
import re
import json
import os
from datetime import datetime

#Last modified time
mtime = os.path.getctime(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_provider.json"))

#day difference
diff = datetime.now().day - datetime.fromtimestamp(mtime).day
if diff > 0:
    
	soup = BeautifulSoup(open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","response.txt"),"r",encoding="utf-8").read(),'html.parser')

	#dns-providers
	dns = {}

	#Entire dns details
	data = soup.find_all("h3")
	for i in data:
		temp = i

		#find table from h3 tag
		while True:
			try:
				if temp.find_all("code") != []:
					break
			except AttributeError:
				pass
			temp = temp.next_sibling
		
		code_block = temp.find_all("code")

		#Regex for ip addres
		regex = r"(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?::\d{0,4})?"

		ip_address = [i.text for i in code_block if re.findall(regex,str(i.text))!=[] and "tls" not in i.text][:2]

		#adding to dns providers list
		dns[i.text] = ip_address

	json.dump(dns,open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_provider.json"),"w",encoding="utf-8"),indent=2)