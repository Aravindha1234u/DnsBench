from . import dns_provider
from . import dns_ip
from . import check_dns
import os,sys
import pyautogui
import eel
eel.init(os.path.join(os.path.dirname(os.path.realpath(__file__)),'web'))

@eel.expose
def dnscheck(cache):
    data = check_dns.resolve_dns(cache)
    dns = list(data.keys())
    speed = list(data.values())
    
    # You can't suggest system DNS as best since it might be cached
    best = "For your network {} is best DNS Server for use.".format(dns[1] if dns[0] == "Your system Dns" else dns[0])
    recmd = "Second recommended is {}.".format(dns[2] if dns[0] == "Your system Dns" else dns[1])
    return [dns,speed,best,recmd]

def main():
    mode = "chrome"
    if len(sys.argv) > 1 and sys.argv[1] == "--no-chrome":
        mode = "user default"
        
    try:
        eel.start('index.html',block=True,size=pyautogui.size(),mode=mode)
    except OSError as e:
        print(e)
        exit()
    
if __name__ == '__main__':    
    main()