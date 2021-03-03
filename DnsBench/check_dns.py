from threading import Thread
from datetime import datetime
import os
import json
from dns.resolver import Resolver
import re
from .doh_tls import check_https,check_tls

resolved = {}

def resolve(dns,nameserver):
    global resolved
 
    #additional args for ports
    nameserver_ports={}

    for i in nameserver:
        if ":" in i:
            #if ports are different remove default port
            ip,port = i.split(":")
            port = int(port)
            ind = nameserver.index(i)
            nameserver[ind] = i.split(":")[0]
            nameserver_ports[ip] = port	

    # if dnserver is not reachable
    exetime = 0
    try:
        resolver = Resolver()
        resolver._nameservers = nameserver
        resolver.nameserver_ports = nameserver_ports
        resolver.timeout = 10
  
        #Starting time
        c_time = datetime.now()
        resolver.resolve('example.com','A')

        #Time excuted
        exetime = int((datetime.now() - c_time).total_seconds() * 1000)
    except Exception as e:
        #print(e)
        pass

    resolved[dns]['IPv4'] = exetime
 
def doh_tls(dns,nameserver):
    exectimes = []
    for qname in nameserver:
        c_time = datetime.now()
        if check_tls(qname):        
            exetime = int((datetime.now() - c_time).total_seconds() * 1000)
            exectimes.append(exetime)
    
    resolved[dns]['TLS'] = min(exectimes) if len(exectimes) >= 1 else 0
    
def doh_https(dns,nameserver):
    exectimes = []
    for qname in nameserver:
        c_time = datetime.now()
        if check_https(qname) == True:
            exetime = int((datetime.now() - c_time).total_seconds() * 1000)
            exectimes.append(exetime)
    
    resolved[dns]['HTTPS'] = min(exectimes) if len(exectimes) >= 1 else 0

def resolve_dns(noCache=False,tls=False,https=False):
    global resolved
 
    #Last modified time
    mtime = os.path.getctime(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_resolved.json"))
    dns_provider = json.load(open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_provider.json")))
    
    #System default Dns and only ipv4
    #dns_provider['Your system Dns'] = [i for i in Resolver().nameservers if re.findall(r"^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$",i)!=[]]

    #day difference
    diff = datetime.now().minute - datetime.fromtimestamp(mtime).minute
    if noCache or diff >=1 :
        threads = []
        for dns,nameserver in dns_provider.items():
            resolved[dns]={
                "IPv4":0,
                "TLS":0,
                "HTTPS":0
            }
            thread = Thread(target=resolve,args=(dns,nameserver['IPv4'],))
            thread.start()
            threads.append(thread)

        if tls:
            for dns,nameserver in dns_provider.items():
                thread = Thread(target=doh_tls,args=(dns,nameserver['TLS'],))
                thread.start()
                threads.append(thread)
        
        if https:
            for dns,nameserver in dns_provider.items():
                thread = Thread(target=doh_https,args=(dns,nameserver['HTTPS'],))
                thread.start()
                threads.append(thread)

        for thread in threads:
            thread.join()

        # Sort with response time and Append Your system Dns to First
        #temp = {"Your system Dns":resolved['Your system Dns']}
        #resolved = {k: v for k, v in sorted(resolved.items(), key=lambda item: item[1]) if v != 0 and k!="Your system Dns"}
        #temp.update(resolved)
        #resolved = temp

        json.dump(resolved,open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_resolved.json"),"w"),indent=2)

    data = json.load(open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache","dns_resolved.json")))
    return data