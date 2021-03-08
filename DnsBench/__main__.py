from . import dns_provider
from . import dns_ip
from . import check_dns
import os,sys
import pyautogui
from DnsBench import __version__
import eel
eel.init(os.path.join(os.path.dirname(os.path.realpath(__file__)),'web'))

@eel.expose
def dnscheck(cache,tls,https):
    data = check_dns.resolve_dns(cache,tls,https)
    
    resolved = {}
    for dns,values in data.items():
        for protocol,ms in values.items():
            if ms!=-1:
                resolved[dns+" - "+protocol] = ms

    resolved = {k: v for k, v in sorted(resolved.items(), key=lambda item: item[1]) if v != 0 }

    results = {}

    for dns,value in resolved.items():
        t = dns.split(" - ")
        results[t[0]]={
            "IPv4":0,
            "TLS":0,
            "HTTPS":0
        }

    for dns,value in resolved.items():
        t = dns.split(" - ")
        results[t[0]][t[1]] = value
        
    nameserver = []
    speed=[[],[],[]]
    for qname,i in results.items():
        if(list(i.values())[0]!=0 or list(i.values())[1]!=0 or list(i.values())[2]!=0):
            nameserver.append(qname)
            
            #IPv4, Tls, HTTPS
            if list(i.values())[0]!=0:
                speed[0].append(list(i.values())[0])
            
            if list(i.values())[1]!=0:
                speed[1].append(list(i.values())[1])
            
            if list(i.values())[2]!=0:
                speed[2].append(list(i.values())[2])
        

    
    # You can't suggest system DNS as best since it might be cached
    best = "For your network {} is best DNS Server for use.".format(list(resolved.keys())[0])
    recmd = "Second recommended is {}.".format(list(resolved.keys())[1])
    return [list(nameserver),speed,best,recmd]

def main():
    mode = "chrome"
    if len(sys.argv) > 1 and sys.argv[1] == "--no-chrome":
        mode = "user default"
    
    if len(sys.argv) > 1 and sys.argv[1] == "--version":
        print("DnsBench {}".format(__version__))
        exit()
        
    try:
        eel.start('index.html',host="0.0.0.0",port=8000,block=True,size=pyautogui.size(),mode=mode)
    except OSError as e:
        print(e)
        exit()
    
if __name__ == '__main__':    
    main()