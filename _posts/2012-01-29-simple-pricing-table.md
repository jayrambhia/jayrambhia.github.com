---
author: Aniket
title: Simple Pricing Table
layout: post
type: post
category: notes
tags:
  - Demo
  - Pricing Tables
---
Yesterday I was browsing through [Design Curate][1] and I found [this][2].

It looked pretty nice, so I thought that I could replicate it and make a working demo. Here’s what I made ([the fiddle][3]).

The markup is like this.

## HTML

    <ul class="pricing-table">
        <li class="plan">
            <h1>Basic</h1>
            <div class="content">
                <ul class="features">
                    <li><strong>Full</strong> Email Support</li>
                    <li><strong>25GB</strong> of Storage</li>
                    <li><strong>5</strong> Domains</li>
                    <li><strong>10</strong> Email Addresses</li>
                </ul>
                <hr>
                <p class="price">25</p>
                <p class="footnote">per month</p>
                <a href="#" class="button">Sign Up</a>
            </div>
        </li>
        <li class="plan">
            <h1>Pro</h1>
            <div class="content">
                <ul class="features">
                    <li><strong>Full</strong> Email Support</li>
                    <li><strong>50GB</strong> of Storage</li>
                    <li><strong>10</strong> Domains</li>
                    <li><strong>20</strong> Email Addresses</li>
                </ul>
                <hr>
                <p class="price">49</p>
                <p class="footnote">per month</p>
                <a href="#" class="button">Sign Up</a>
            </div>
        </li>
        <li class="plan">
            <h1>Premium</h1>
            <div class="content">
                <ul class="features">
                    <li><strong>Full</strong> Email Support</li>
                    <li><strong>Unlimited</strong> Storage</li>
                    <li><strong>Unlimited</strong> Domains</li>
                    <li><strong>50</strong> Email Addresses</li>
                </ul>
                <hr>
                <p class="price">79</p>
                <p class="footnote">per month</p>
                <a href="#" class="button">Sign Up</a>
            </div>
        </li>
    </ul>
    

## CSS

    @import url(http://fonts.googleapis.com/css?family=Rokkitt:400,700);
    @import url(http://fonts.googleapis.com/css?family=Droid+Sans:400,700);
    body {
        min-height: 100%;
        background-color: rgba(255, 255, 255, 0.75);
        background-image: repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(0, 0, 0, 0.25) 5px, rgba(0, 0, 0, 0.25) 10px);
    }
    ul.pricing-table {
        width: 800px;
        margin: 50px auto;
    }
     ul.pricing-table li.plan {
         box-shadow: 0 0 10px #999;
         transition: all 250ms linear;
         border-radius: 10px 10px 0 0;
         width: 33%;
         float: left;
     }
     ul.pricing-table li.plan:nth-of-type(2n) { transform: scale(1.1) }
      ul.pricing-table li.plan:nth-of-type(2n) h1:after {
          background: #9EB550;
          line-height: 1em;
          text-transform: uppercase;
          top: 7px;
          width: 60px;
          right: -5px;
          content: "Best Value!";
          padding: 2px 0;
          position: absolute;
          font-size: 0.65em;
      }
     ul.pricing-table li.plan div.content {
         background: #fff;
         font-family: 'Droid Sans', sans-serif;
         color: #222;
         padding: 10px 20px;
     }
      ul.pricing-table li.plan div.content ul.features {
          list-style: none;
          margin: 0;
          padding: 0;
      }
       ul.pricing-table li.plan div.content ul.features li {
           margin: 5px 0;
           padding: 0;
       }
      ul.pricing-table li.plan div.content p.footnote {
          text-align: center;
          color: #999;
          font-size: 0.75em;
      }
      ul.pricing-table li.plan div.content a.button {
          background: linear-gradient(90deg, #A0B853, #A0CC53);
          text-align: center;
          box-shadow: 0 0 2px #666;
          transition: all 250ms linear;
          font-family: 'Rokkitt', serif;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.25), 0 -1px 1px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          width: 100px;
          color: #fff;
          margin: 20px auto;
          display: block;
          padding: 5px 10px;
      }
      ul.pricing-table li.plan div.content a.button:hover { background: linear-gradient(90deg, #A0CC53, #A0B853) }
      ul.pricing-table li.plan div.content p.price {
          text-align: center;
          font-weight: 700;
          font-size: 3em;
      }
      ul.pricing-table li.plan div.content p.price:before {
          top: -10px;
          left: -5px;
          content: "$";
          position: relative;
          font-size: 0.75em;
      }
      ul.pricing-table li.plan div.content strong { font-weight: 700 }
      ul.pricing-table li.plan div.content hr { color: #eee }
     ul.pricing-table li.plan h1 {
         text-align: center;
         background: #222;
         font-family: 'Rokkitt', serif;
         text-shadow: 0 1px 0 #fff, 0 -1px 0 #000;
         font-weight: 700;
         border-radius: 10px 10px 0 0;
         color: #fff;
         padding: 10px 0;
         font-size: 1.25rem;
     }

 [1]: http://designcurate.com "Design Curate"
 [2]: http://designcurate.com/resource/pricing-tables "Design Curate - Pricing Tables"
 [3]: http://jsfiddle.net/aniketpant/FGct5/ "jsFiddle - Pricing Tables"