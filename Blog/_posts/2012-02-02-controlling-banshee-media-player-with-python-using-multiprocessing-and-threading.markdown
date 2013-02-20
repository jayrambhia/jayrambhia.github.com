---
category: Blog
tag: Python
comments: true
date: 2012-02-02 19:51:26
layout: post
slug: controlling-banshee-media-player-with-python-using-multiprocessing-and-threading
title: Controlling Banshee Media player with Python using multiprocessing and threading
---

# [banshee-control gist](https://gist.github.com/1719217)




Whenever I have tried to control **Banshee** Media Player using terminal, I always had to use two terminals! One for the main process and other for sub process such as **'banshee --pause'**,etc.
So, I always wanted to make something which would control banshee with one terminal.
I thought I could use **threading**, but sometimes it's difficult to end a thread and also my last experience with multithreading was not that good as I tried to implement it in my **gmail-GUI**, and it did not work well.
So, I moved on to **multiprocess**. Python docs for multithreading and multiprocessing are not as neat as some of the other lib docs. I looked it up on google and found this **IBM** webpage about multiprocessing using Python. It was not the first time I had gone to this webpage. I stumbled upon this page when I was making my gmail-GUI and needless to say multiprocessing didn't work well either.

I tried multithreading and it was working fine, but there was just one problem. I could not terminate the main thread and had to kill it using ^d. I browsed many pages, many stackoverflow questions but none of them showed any significant results. I could not end the main banshee process. I tried to terminate the thread with os.system('kill '+thread._Thread__ident) but since it was thread and not a process, _Thread__ident gave me some id which was not process id! ob! I also tried **thread.exit()**, **._Thread__stop** . But nothing worked.

<!-- more -->

I looked for multiprocessing using Python and somehow found that I could terminate a process using Process.terminate(). I thought this is it and tried it out on banshee! It worked! **sigh**!

    
    import os
    import time
    import threading
    import sys
    from multiprocessing import Process
    
    def banshee():
    	os.system('banshee --play')
    	return
    
    class do(threading.Thread):
    	def __init__(self):
    		threading.Thread.__init__(self)
    
    	def run(self):
    		try:
    			command_str = str(raw_input('Command: '))
    			if command_str == 'quit':
    				os.system('banshee --stop')
    				return
    			os.system('banshee --'+command_str)
    			print command_str
    			self.run()
    		except EOFError:
    			print 'Got keyboard interrupt'
    			print 'quitting'
    			os.system('banshee --stop')
    			return
    
    def main():
    
    	p = Process(target = banshee)
    	p.start()
    
    	command = do()
    	command.start()
    	command.join()
            print 'Quitting'
    	p.terminate()
    	print 'terminate'
    
    if __name__ == '__main__':
    	main()
    




So, first create a process which will initialize/start banshee!
There is a bug in banshee media player, due to which it doesn't start playing on its own when command
$ banshee --play is given for the first time, i.e., banshee player is not running.
create a Process p in the background, which will start banshee.

We have initialized banshee. Now, we need to give commands. So, create a new thread to give commands.
So, I created a thread **command**. It takes the input from the user, and feeds it to the banshee.
Since banshee has already been initialized by Process p, the thread will end. To keep it continue, I have used recursion. Unless and 'quit' is not given as input, the thread will continue.

'quit' will end the command thread. In the main(), I'm waiting for command thread to end by using command.join(). As soon as it ends, it prints 'Quitting'. Now, I have stopped banshee but my Process p is still running since there is no command for banshee to exit. So, I terminate Process p.

Even after terminating the Process p, though, python script has ended, banshee window will still be there. The reason behind is the new policy of Ubuntu. [https://wiki.ubuntu.com/SoundMenu#Music_player_section](https://wiki.ubuntu.com/SoundMenu#Music_player_section).

I am looking for same thing for vlc! since every command like 'vlc --play', 'vlc --pause', will initialize a new vlc window!

P.S. It's always fun doing multiprocessing and multithreading with Python!
