---
category: Blog
tag: Python
comments: true
date: 2012-01-13 16:09:02
layout: post
slug: send-emails-using-python
title: Send emails using Python
wordpress_id: 200
categories:
- Daily Posts
- Python
- Technical
tags:
- email
- gmail
- Gmail GUI
- MIMEBase
- payload
- python
- send
- smtplib
---

## [Gmail GUI](https://github.com/jayrambhia/Gmail-API-GUI/blob/master/gmailGUI2.py)





## [Gmail API](https://github.com/jayrambhia/Basic-Gmail-API/blob/master/Basic-gmail.py)


This is a program written in Python using which you can send an email with multiple attachments(any kind) to multiple recipients.
I have used libraries like smtplib, email, MIME, etc. The code proceeds by making an SMTP server. The libraries you might need to import.

    
    #!/usr/bin/python2.7
    import smtplib
    import email
    import os
    from email.MIMEMultipart import MIMEMultipart
    from email.Utils import COMMASPACE
    from email.MIMEBase import MIMEBase
    from email.parser import Parser
    from email.MIMEImage import MIMEImage
    from email.MIMEText import MIMEText
    from email.MIMEAudio import MIMEAudio
    import mimetypes




Create an SMTP server. Connect it to the host.
Identify yourself to the server. >> SMTP.ehlo()
Put the SMTP connection in TLS (Transport Layer Security) mode. All SMTP commands that follow will be encrypted.
Log in on the server.
more about smtplib : [smtplib-docs](http://docs.python.org/library/smtplib.html)

    
    server = smtplib.SMTP()
    server.connect('host',port) # for eg. host = 'smtp.gmail.com', port = 587
    server.ehlo()
    server.starttls()
    server.login('user', 'password')




<!-- more -->



SMTP server has been created and authorized for data transfer.
Create an email message with attachments. This part is here is a bit tricky and uses **email** library.
Get the required input from the user.

    
    fromaddr = raw_input('Send mail by the name of: ')
    tolist = raw_input('To: ').split()
    sub = raw_input('Subject: ')




Create the message **msg** which is an instance of email.mime.multipart.MIMEMultipart.
**msg** is like a dictionary object. It stores the content corresponding to keys.

    
    msg = email.MIMEMultipart.MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = email.Utils.COMMASPACE.join(tolist)
    msg['Subject'] = sub
    msg.attach(MIMEText(raw_input('Body: ')))
    msg.attach(MIMEText('nsent via python', 'plain')) # just a way to say.. Ha! I use Python.




For more information about MIMEBase visit [email.mime](http://docs.python.org/library/email.mime.html)
So, now your email is ready but does not contain any attachments. To attach files, we need to use MIME library.
We open the file for reading in binary form. We find the content type and encoding type of the file using mimetypes.

    
        filename = raw_input('File name: ')
        f = open(filename,'rb')
        ctype, encoding = mimetypes.guess_type(filename)
    
        if ctype is None or encoding is not None:
          ctype = 'application/octet-stream'




According to the type of the file, we use corresponding MIMEtype to encode the data of the file and save it in **part** which we would attach in **msg**. If subtype is other than 'text','image','audio', we encode the file with MIMEBase and attach the part as **payload** of **msg**

    
          maintype, subtype = ctype.split('/', 1)
          if maintype == 'text':
            part = MIMEText(f.read(), _subtype=subtype)
          elif maintype == 'image':
            part = MIMEImage(f.read(), _subtype=subtype)
          elif maintype == 'audio':
            part = MIMEAudio(f.read(), _subtype=subtype)
          else:
            part = MIMEBase(maintype, subtype)
            msg.set_payload(f.read())
          part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(filename))
          msg.attach(part)
          f.close()




email is ready. It just needs to be sent.

    
    server.sendmail(user,tolist,msg.as_string())
    server.quit()




So this is a small example of how to send emails using smtplib, email, MIMEBase from Python!


#### For complete code (including receiving emails) : [Gmail API](https://github.com/jayrambhia/Basic-Gmail-API/blob/master/Basic-gmail.py)
For Gmail application GUI : [Gmail GUI](https://github.com/jayrambhia/Gmail-API-GUI/blob/master/gmailGUI2.py)


P.S. It feels good to send emails via Python!


## 
