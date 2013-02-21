---
category: Blog
tag: Python
comments: true
date: 2012-01-25 19:03:55
layout: post
slug: fetch-movie-details-from-imdb-using-python-with-proxy
title: Fetch Movie Details from IMDB using Python (with Proxy)
---


### [IMDB-py Gist](https://gist.github.com/1678382)


<UPDATE>**I have added a new and a bit better python script to fetch movie details from IMDB has been updated on my gits. visit imdb gist or go to the bottom of the post.** <UPDATE>

Lately I have started working on Social Data Mining and probably Machine Learning (will start shortly).
So, for social data mining I am taking data from Twitter. To know how **BeautifulSoup** works, I was told to make something up which would parse html/xml (well, That's what BeautifulSoup does!). An app was in my mind which would take the name of the movie and search it on the IMDB and provide all the details about it.
I always thought that the sites like IMDB would be having some kind of script (javascript/php)! and as I don't know either of them, I gave up the idea. But then one day, [Abhinav Gupta](https://twitter.com/TheMarwariJew) told me about the IMDB website, and when I looked the source code up, I was shocked! No backend script! Pure HTML! and then there was BeautifulSoup!

So it's really easy to get all the required information once you get to the movie page. BeautifulSoup will do the rest for you!
**Importing modules**

    
    from BeautifulSoup import BeautifulSoup
    from mechanize import Browser
    import re




<!-- more -->



First, search the movie on IMDB! The movie is The Dark Knight
The IMDB search URL looks like this "http://www.imdb.com/find?q=The+Dark+Knight&s=all"

**Creating the URL of the search page!**

    
    movie = raw_input()
    movie_search = '+'.join(movie.split())
    base_url = 'http://www.imdb.com/find?q='
    url = base_url+movie_search+'&s=all'




I had made this app purely with urllib2. But then Abhinav told me to make it using mechanize.Browser as it's faster.
So, I have used mechanize.Browser.
Now, I'm in BITS, Pilani - Goa! And one thing you can be sure of is that there would be proxies everywhere blocking every script! and now they have started authentication with LDAP server!

**Setting up the Proxy**

    
    br = Browser()
    br.set_proxies({'http':'http://username:password@proxy:port',
                   'https':'https://username:password@proxy:port'})




Proxy settings done! Now, open url and parse html!

Every movie on IMDB is given a particular id! and the movie page URL is "http://www.imdb.com/tt/id"
So we search the id of the corresponding movie on the search page and move to the movie page.
**Finding the title id and the title page link**

    
    br.open(url)
    link = br.find_link(url_regex = re.compile(r'/title/tt.*'))
    res = br.follow_link(link)




The movie webpage has been accessed. Now move aside and let **BeautifulSoup** do the work!
**Parsing with **BeautifulSoup****

    
    soup = BeautifulSoup(res.read())
    
    movie_title = soup.find('title').contents[0]
    rate = soup.find('span',itemprop='ratingValue')
    rating = str(rate.contents[0])
    
    actors=[]
    actors_soup = soup.findAll('a',itemprop='actors')
    for i in range(len(actors_soup)):
      actors.append(actors_soup[i].contents[0])
    
    des = str(soup.findAll('meta')[3])
    des = des.split('content')[1].split('"')[1]
    
    genre=[]
    for div in soup.findAll('div'):
      if div.has_key('class') and div['class'] == 'infobar':
        for con in div.contents:
          try:
            if con.has_key('title'):
              r = con['title']
            elif con.has_key('href'):
              genre.append(con['href'])
    
          except AttributeError:
            pass
    
    for i in range(len(genre)):
      genre[i] = genre[i].split('/')[-1]




Ok. This will give you all the information that you require! Now just print everything!
And now access IMDB with Python!
Cheers!
P.S. O! BeautifulSoup thou art beautiful!

<UPDATE>
New script:

    
    '''
    Author : Jay Rambhia
    email : jayrambhia777@gmail.com
    Git : https://github.com/jayrambhia
    gist : https://gist.github.com/jayrambhia
    '''
    
    import urllib2
    from BeautifulSoup import BeautifulSoup
    from mechanize import Browser
    import re
    
    def getunicode(soup):
      body=''
      if isinstance(soup, unicode):
        soup = soup.replace(''',"'")
        soup = soup.replace('&quot;','"')
        soup = soup.replace('&nbsp;',' ')
        body = body + soup
      else:
        if not soup.contents:
        return ''
        con_list = soup.contents
        for con in con_list:
          body = body + getunicode(con)
      return body
    
    def main():
      movie = str(raw_input('Movie Name: '))
      movie_search = '+'.join(movie.split())
    
      base_url = 'http://www.imdb.com/find?q='
      url = base_url+movie_search+'&s=all'
    
      title_search = re.compile('/title/ttd+')
    
      br = Browser()
      br.set_proxies({'http':'http://username:password@proxy:port',
                        'https':'https://username:password@proxy:port'})
    
      br.open(url)
    
      link = br.find_link(url_regex = re.compile(r'/title/tt.*'))
      res = br.follow_link(link)
    
      soup = BeautifulSoup(res.read())
    
      movie_title = getunicode(soup.find('title'))
      rate = soup.find('span',itemprop='ratingValue')
      rating = getunicode(rate)
    
      actors=[]
      actors_soup = soup.findAll('a',itemprop='actors')
      for i in range(len(actors_soup)):
        actors.append(getunicode(actors_soup[i]))
    
      des = soup.find('meta',{'name':'description'})['content']
    
      genre=[]
      infobar = soup.find('div',{'class':'infobar'})
      r = infobar.find('',{'title':True})['title']
      genrelist = infobar.findAll('a',{'href':True})
    
      for i in range(len(genrelist)-1):
        genre.append(getunicode(genrelist[i]))
      release_date = getunicode(genrelist[-1])
    
      print movie_title,rating+'/10.0'
      print 'Relase Date:',release_date
      print 'Rated',r
      print ''
      print 'Genre:',
      print ', '.join(genre)
      print 'nActors:',
      print ', '.join(actors)
      print 'nDescription:'
      print des
    
    if __name__ == '__main__':
        main()
    



