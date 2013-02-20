---
author: Aniket
title: 'tutorial: Floating Blockquote'
layout: post
type: post
category: notes
tags:
  - blockquote
---
You would have seen this at a number of places. There is a blockquote to one side and the content is flowing around it.

Go through the post if you have no idea about how to do it.

The HTML

    <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
    
                <blockquote>
                    <p>This is our blockquote floated to left with a fixed width<br/>Done using :nth-of-type property</p>
                </blockquote>
    
                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover <strong>strong</strong> it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, <a class="external ext" href="#">link</a> waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
    
                <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
    
                <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
    
                <blockquote>
                    <p>This is our blockquote floated to left with a fixed width<br/>Done using :nth-of-type property</p>
                </blockquote>
    
                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover <strong>strong</strong> it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, <a class="external ext" href="#">link</a> waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
    

The CSS

    body {
                    margin: 0 auto;
                    padding: 0;
                    font-family: Calibri, sans-serif;
                }
    
                #header,
                #footer {
                    text-align: center;
                }
    
                #header h3:before {
                    content: "/*-- ";
                }
    
                #header h3:after {
                    content: " --*/";
                }
    
                #content {
                    margin: 1em;
                    padding: 0.5em;
                }
    
                #content p {
                    overflow: hidden;
                }
    
                blockquote {
                    width: 300px;
                    margin: 0 0.5em 0;
                    padding: 0;
                    border-top: 5px solid orangered;
                    border-bottom: 5px solid orangered;
                }
    
                blockquote:nth-of-type(2n+1) {
                    float: left;
                }
    
                blockquote:nth-of-type(2n) {
                    float: right;
                }
    
                blockquote p {
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 24px;
                }
    
                ::-webkit-selection {
                    background: #fff;
                    color: orangered;
                    text-shadow : none;
                }
                /* Firefox */
                ::-moz-selection {
                    background: #fff;
                    color: orangered;
                    text-shadow : none;
                }
                /* The Rest of em */
                ::selection {
                    background: #fff;
                    color: orangered;
                    text-shadow : none;
                }