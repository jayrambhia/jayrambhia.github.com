---
category: Blog
tag: Python
comments: true
date: 2012-01-12 21:53:35
layout: post
slug: monitor-your-browsingdownloading-data-via-python
title: Monitor your Browsing/Downloading data via Python
---

## **[Download-Monitor](https://github.com/jayrambhia/Download-Monitor)**


So here's a small script which will monitor the amount of your browsing/downloading data.
I have used pypcap and dpkt library. dpkt is a library which provides packets creation/ parsing capabilities with an object oriented interface. The project is hosted at [http://code.google.com/p/dpkt/](http://code.google.com/p/dpkt/) .

    
    #!/usr/bin/python2.7
    import pcap, dpkt, socket
    
    pc = pcap.pcap()
    ports = (80, 8080, 443, 888) # for HTPP and HTPPS




pc is now my pcap.pcap object. pcap objects are their own iterator returning the timestamp and
the packet as a 2-tuple.

    
    def process():
      mem = sport = dport = 0
      try:
        for ts, pkt in pc:
          eth = dpkt.ethernet.Ethernet(pkt)
          ip = eth.data




<!-- more -->



now **ts** contains **timestamp** and **data** is stored in **pkt**
**eth** is an object of class dpkt.ethernet.Ethernet
` `Now accessing ip <class 'dpkt.ip.IP'>, we access the data as ip.data

    
          if ip.__class__ == dpkt.ip.IP:
            ip1, ip2 = map(socket.inet_ntoa, [ip.src, ip.dst])
            if ip.p == socket.IPPROTO_TCP:
              I7 = ip.data
              sport, dport = [I7.sport, I7.dport]




We use **socket.inet_ntoa** mapping to get the source IP address and Destination IP address.
ip.data contains all the required data information that we need.

    
              if sport in ports or dport in ports:
                if len(I7.data) > 0:
                  print 'From %s to %s, length: %d' %(ip1, ip2, len(I7.data))
                  mem = mem + len(I7.data)
        except KeyboardInterrupt:
          return int(mem)




len(I7.data) is the amount of data(in bytes) that package (pkt) contains.
And to wrap it up,

    
    def main():
      mem = process()
      print float(mem/(1024*1024)), 'mb'
      return
    
    if __name__ == '__main__':
      main()




I hope you find this code helpful. Suggestions are welcome.

So, A day well spent. Learned a bit about networking, ports, pypcap, dpkt!
P.S. Python seems fun!
