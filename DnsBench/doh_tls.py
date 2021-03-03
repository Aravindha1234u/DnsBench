import dns.message
import dns.name
import dns.query
from dns.resolver import Resolver
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def check_tls(where):
    qname = dns.name.from_text('example.com')
    q = dns.message.make_query(qname, dns.rdatatype.A)
    
    try:
        try:
            where = where.replace("tls://","")
            response = dns.query.tls(q,where)
        except:
            ips = [i.to_text() for i in Resolver().resolve(where)]
            response = dns.query.tls(q,ips[0])
        return True
    
    except:
        return False

def check_https(where):
    qname = dns.name.from_text('example.com')
    q = dns.message.make_query(qname, dns.rdatatype.A)
    
    try:        
        response = dns.query.https(q,where,verify=False)
        return True
    
    except:
        return False