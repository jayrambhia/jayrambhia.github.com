---
author: Aniket
title: I was forced to change my password
layout: post
type: post
category: notes
tags:
  - Password
  - Security
---
![Locked Out][1] 
2 days back, I was testing a feature for [igniteplate][2] and because of just one mail, I locked down my Google account for myself.

I was testing account verification by email and I used my primary google account for that. This turned out to be the worst thing I could do. Even though I created a new app password for SMTP access, and everything was going well. Then I registered a new user using my app and a mail was sent to my account.

So far, it was all good and then Google signed me out and the next time I logged in, it said that my account showed suspicious activity. Then I had to change my password. **Forcefully!** Yes, I had to do it.

I made the change and logged in again and then when I tried to access my Google + profile, it didn’t budge. It kept on saying incorrect password. Now I had no way out other than using the forgot password service. I went ahead and clicked the button. The next page welcomed me with some options and I said that I had my phone. But Google, didn’t send me any verification code. Instead, it wanted me to answer my security question or reset my password using my alternate email. I didn’t know my answer, so the second question was remaining.

My alternate account couldn’t be accessed using webmail, so I had to set up a new mail forwarding to another account.

After a long and irritation experience, I could finally change my password, and then I was denied for choosing my old password because of policies.

The lesson I learn from this little experience is to never use your primary to test your application (even if you wish to just send one mail). And 2-step authentication can create more problems.

 [1]: http://i2.wp.com/3.bp.blogspot.com/-x6YY45P97xo/TgzZyb9nh9I/AAAAAAAAANs/9v41dOZAgH0/s1600/gr_lockout.jpg?resize=256%2C236 "Locked Out"
 [2]: https://github.com/aniketpant/igniteplate "Igniteplate on Github"