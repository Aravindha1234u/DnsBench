from . import dns_provider
from . import dns_ip
import check_dns

import eel
eel.init('web')

@eel.expose
def dnscheck(cache):
    data = check_dns.resolve_dns(cache)
    dns = list(data.keys())
    speed = list(data.values())
    
    best = "For your network {} is best DNS Server for use.".format(dns[0])
    recmd = "Second recommended is {}.".format(dns[1])
    return [dns,speed,best,recmd]

def main():
    eel.start('index.html',block=True)
    
if __name__ == '__main__':
    main()