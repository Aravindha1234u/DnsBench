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
    for nameserver in data:
        temp = nameserver.next_sibling
        
        if nameserver.text not in dns.keys():
            dns[nameserver.text]={
                "IPv4":[],
                "HTTPS":[],
                "TLS":[]
            }
        
        #find table from h3 tag
        while True:
            try:
                if (temp.name == "h3"):
                    break
                
                rows = temp.find_all("td")
                for j in range(len(rows)):

                    if "DNS, IPv4" == rows[j].text:
                        
                        for k in range(j+1,len(rows)):
                            t = rows[k].find_all("code")
                            if t == []:
                                break
                            for l in rows[k].find_all("code"):
                                if re.findall(r"(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?::\d{0,4})?",l.text) !=[]:
                                    dns[nameserver.text]['IPv4'].append(l.text)
                    
                    if "DNS-over-HTTPS" == rows[j].text:
                        
                        for k in range(j+1,len(rows)):
                            t = rows[k].find_all("code")
                            if t == []:
                                break
                            for l in rows[k].find_all("code"):
                                if re.findall(r"((https|tls:\/\/){0,}?(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",l.text) !=[]:
                                    dns[nameserver.text]['HTTPS'].append(l.text)
                    
                    if "DNS-over-TLS" == rows[j].text:

                        for k in range(j+1,len(rows)):
                            t = rows[k].find_all("code")
                            if t == []:
                                break
                            for l in rows[k].find_all("code"):
                                if re.findall(r"((https|tls:\/\/){0,}?(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",l.text) !=[] or "tls://" in l.text:
                                    dns[nameserver.text]['TLS'].append(l.text)
                                
            except:
                pass
            
            if temp == None:
                break
            
            temp = temp.next_sibling
    
    json.dump(dns,open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_provider.json"),"w",encoding="utf-8"),indent=2)