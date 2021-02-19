import pydig
from datetime import datetime
import json
from threading import Thread
import os
from datetime import datetime


def resolve_dns():

	dns_provider = json.load(open("./cache/dns_provider.json"))

	resolved = {}

	def resolve(dns,nameserver):

		#additional args for ports
		ports=["53"]

		for i in nameserver:
			if ":" in i:
				#if ports are different remove default port
				del ports[0]

				ports.append(i.split(":")[-1])
				#remove port from ipaddress
				ind = nameserver.index(i)
				nameserver[ind] = i.split(":")[0]
		
		# remove duplicate ports
		ports = list(set(ports))
		
		# if dnserver is not reachable
		exetime = -1
		try:
			resolver = pydig.Resolver(
				nameservers=nameserver,
				additional_args=[
					"-p"+"".join(ports)
				]
			)
			#Starting time
			c_time = datetime.now()
			resolver.query('example.com','A')

			#Time excuted
			exetime = int((datetime.now() - c_time).total_seconds() * 1000)
		except:
			pass

		resolved[dns] = exetime

	threads = []

	for dns,nameserver in dns_provider.items():
		thread = Thread(target=resolve,args=(dns,nameserver,))
		thread.start()
		threads.append(thread)

	for thread in threads:
		thread.join()

	# Sort with response time
	resolved = {k: v for k, v in sorted(resolved.items(), key=lambda item: item[1]) if v != -1}

	json.dump(resolved,open("./cache/dns_resolved.json","w"),indent=2)

if __name__ == "__main__":
    #Force cache
	noCache = True

	#Last modified time
	mtime = os.path.getctime("./cache/dns_resolved.json")

	#day difference
	diff = datetime.now().minute - datetime.fromtimestamp(mtime).minute
	if diff <= 1 and not noCache:
		exit()

	resolve_dns()