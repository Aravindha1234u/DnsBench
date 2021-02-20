from threading import Thread
from datetime import datetime
import os
import json
from dns.resolver import Resolver

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
	exetime = -1
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

	resolved[dns] = exetime

def resolve_dns(noCache=False):
	global resolved
 
	#Last modified time
	mtime = os.path.getctime(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache\\dns_resolved.json"))
	dns_provider = json.load(open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache\\dns_provider.json")))

	#day difference
	diff = datetime.now().minute - datetime.fromtimestamp(mtime).minute
	if noCache or diff>=1:
		threads = []
		for dns,nameserver in dns_provider.items():
			thread = Thread(target=resolve,args=(dns,nameserver,))
			thread.start()
			threads.append(thread)	

		for thread in threads:
			thread.join()

		# Sort with response time
		resolved = {k: v for k, v in sorted(resolved.items(), key=lambda item: item[1]) if v != -1}

		json.dump(resolved,open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache\\dns_resolved.json"),"w"),indent=2)

	data = json.load(open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"cache\\dns_resolved.json")))
	return data