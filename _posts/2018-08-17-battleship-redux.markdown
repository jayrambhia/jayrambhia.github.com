---
category: Blog
tag: Android
comments: true
date: 2018-08-17 18:00:00
layout: post
image:
  twitter: https://cdn.thingiverse.com/renders/cb/3d/31/82/20/62473f765bd0062687b91e4559fc6c11_preview_featured.JPG
  facebook: https://cdn.thingiverse.com/renders/cb/3d/31/82/20/62473f765bd0062687b91e4559fc6c11_preview_featured.JPG
  height: 620
  width: 480
slug: battleship-redux
title: Implement the Battleship gameplay using Redux
description: Build your own Battleship game in Kotlin and write the gameplay using Redux architecture - with immutable data structures, unidirectional data flow. This article focuses on using Redux architecture to write the gameplay of Battleship.
keywords: [android, android development, androiddev, dev, redux, kotlin, redux architecture, immutable state, redux clean architecture, write your own redux, redux data flow, redux middleware android, builds, pure functions, reactive functional android, redux reducers, redux store in kotlin]
category_tag: [Android, Kotlin, Redux]
series: redux-android
series_title: Implement the Battleship gameplay using Redux
series_description: Building upon the battleship game written in Kotlin, we use Redux architecture to implement the gameplay and business logic. By the end, you'll have a basic working Battleship game written with Redux architecture.
---

Continuing from the previous article - [Battleship game in Kotlin](/blog/battleship-kotlin), we will use Redux architecture to write the gameplay. Redux is a predictable state container with unidirectional data flow. As we write our reducers and middleware, you'll realize what predictable state container brings to the table. It makes everything straight forward and easy to debug.

<p align="center">
  <img alt="battleship UI" title="Battleship Android UI" src="/assets/images/battleship_kotlin_ui.png"/>
</p>

We'll use the Redux Store implementation that we have been discussing in this series. Redux has a store, a state tree, actions, reducers and middleware. Let's start with the state.

## State

The state tree should store all the necessary data.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GameState.kt %}

Each Battleship game has 2 players so we add 2 boards to our game state tree. `lastPlayed` is the unique id of the board which had the last turn. This would help us in determining who is going to play next. `gameOver` is a flag which would stop the game and declare a winner.

## Actions

Let's define some actions. The user can take only one action => `take a shot`. To keep things clear, we'll add `offense` and `defense` board id with every action.

{% highlight kotlin %}
data class Move(val offense: Int, val defense: Int, val point: Point): Action
{% endhighlight %}

## Generated Actions

When a user takes a _shot_, there are number of possibilities that can happen.

<ol>
  <li>The user has already taken a <i>shot</i> at that point, so it's not a valid move.</li>
  <li>The user takes a <i>shot</i>, but misses.</li>
  <li>The user takes a <i>shot</i> and hits a ship.
    <ol type="i">
      <li>The ship is not completely destroyed.</li>
      <li>The ship is completely destroyed.
          <ol type= "a">
            <li>Not all the ships of the defense have been destroyed.</li>
            <li>All the ships of the defense have been destroyed and the offense wins the game.</li>
          </ol>
      </li>  
    </ol>
  </li>
</ol>

We'll use `Middleware` to handle these logical possibilities. It means that middleware will take care of ouse business logic. A middleware can not update the state. Only a reducer can update the state when an action is dispatched.

Let's create some actions that our middleware will dispatch based on the business logic.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GeneratedActions.kt %}

Let's go over the actions briefly.

**Game setup**: Add ships on the board before the game begins.

 - `AddShip` - User generated action to add ship on the board.
 - `AddShipInvalid` - System generated action which says the ship can't be added for some reason, eg. the ship doesn't fit on the board, the ship overlaps already placed ship, etc.

**System generated actions**:

 - `InvalidMove` - The move is not valid. The reducer will update state accordingly.
 - `PlayMove` - The move is valid.
 - `MissedMove` - The _shot_ did not hit any of the ships.

**Definitive actions**: _shot_ hit a ship.

 - `HitMove` - The _shot_ hit a ship.
 - `DestroyShip` - The _shot_ hit a ship and destroyed it.
 - `LostGame` - The _shot_ hit a ship, destroyed it and the game is over.

**Other actions**:

 - `SwitchAction` - This action signifies change in turn. After player 1 take a _shot_, if it's valid, this action will be dispatched at the end which will update the state and ask the 2nd player to take a _shot_. It wraps a `GeneratedAction` so that the reducer can update the state based on the action.

 - `InvalidState` - This action signifies that values in action and state do not match. Eg. `offense` or `defense` id are different than the board ids in the state.

## Middleware

Let's write our Middleware functions. We will take advantage of the Middleware chaining.

#### State Validation

Let's write a middleware function which will check if the `offense` and `defense` board id in the action correspond to the boards in the state or not. If not, it will return `InvalidState` and not call the chain further.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 StateValidityMiddleware.kt %}

Once the action passes through the state validation, we can be assured that the state is correct.

#### Game-setup Middleware

We will write a middleware to setup the game. It will intercept `AddShip` action and apply business logic on it.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GameSetupMiddleware.kt %}

This middleware checks if the ship fits on the board and it does not overlap any other ship on the board. If it fails the above conditions, the middleware propagates `AddShipInvalid` action to the chain.

#### Move Validation

Let's write a middleware to check validity of the move. It will check if the _shot_ at that grid has already been taken or not.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 MoveMiddleware.kt %}

If the _shot_ is already taken at the grid, this middleware calls the chain with `InvalidMove` action. We can chose to return the action here itself.

It calls the chain with `PlayMove` action if the move can be taken.

#### Hit/Miss Middleware

We will write a middleware which will check if the _shot_ hit a ship or missed.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 HitMiddleware.kt %}

If the _shot_ hits a ship, we call the middleware chain with `HitMove` or else we call the chain with `MissedMove`.

#### Destroy and Lost Middleware

Similarly, let's write a middleware which checks if the hit ship is destroyed and another middleware to check if the defense lost the game.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 Destroy-LostMiddleware.kt %}

`DestroyMiddleware` _intercepts_ `HitMove` action and checks if the ship will be destroyed or not and propagates `DestroyShip` action.

`LostMiddleware` _intercepts_ `DestroyShip` action and checks if all the ships would have been destroyed or not and propagates `LostGame` action.

#### Switch turns Middleware

After we have determined the action that should be dispatched, we wrap it in `SwitchAction`. The reducer, upon receiving this action, will update the state based on the wrapped action and update the state again which will indicate change of turns.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 SwitcherMiddleware.kt %}

We are done with the business logic and middleware. Let's focus on writing the reducers now.

## Reducer

A reducer is a pure function which _reduces_ (changes) the state based on the dispatched action.

Before writing reducers for `GameState`, let's break it down and write reducers for `Board`.

#### Board Reducers

A board reducer will _reduce_ `Board` state based on the action. It will not update the `GameState` directly. The `GameState` reducer will call Board reducers to update the state.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 BoardReducers.kt %}

We write two different reducers for `Board`.

 1. `reduceOffense` is used to reduce the board which played the current turn.
 2. `reduceDefense` is used to reduce the other board which took the shot.
 3. `reduceSetup` is used to reduce the board for setup actions.

Note: `Board.reduceOffense` is an extension function and we can access the board instance by `this`. It is similar to writing `fun reduceOffense(board: Board)`.

##### reduceSetup
This reducer only reduce the board for `AddShip` action. For other actions, it will return the state as is.

##### reduceOffense
This reducer will take the action and reduce the board considering the board is the offense and it took the _shot_. If the action is `MissedMove`, it will add the point to `misses` and not `opponentMisses`. For `DefinitiveAction`, it will add the point to `hits` and not try to reduce the ships.

##### reduceDefense
This reducer will _reduce_ the state assuming the shot was taken on this board. For `DefinitiveAction`, it will add the point to `opponentHits` and reduce the ship also.

We have covered all the actions that should update the boards. Let's write reducers for `GameState` now.

### Gameplay Reducers

These reducers will _reduce_ `GameState` while also reducing the child states in the state tree.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GameplayReducers.kt %}

We write one reducer for the game setup and another one for the gameplay. Each of the reducers use `reduceChildState` function to reduce sub states.

##### reduceChildState
It's a function which lets you reduce a sub-state (child state) of your state with the provided sub-state reducer. Traditionally, in Redux, every reducer creates a new instance of the state, regardless of the change. In Java/Kotlin, creating new instances will result into unnecessary memory allocations and we all know how the garbage collector is. So we try to avoid creating new states as much as possible.

This function reduces the child state. It checks the references of the current child state and update child state via `===`. If the references are same, it means that there was no change in the state and it returns the state as is.

If there's a change in the child state, it will invoke `onReduced` function which is supposed to update the state with child state.

##### reduceSetup

This reducer updates the state only for `AddShip` action. It uses `reduceChildState` function to reduce the board using `Board::reduceSetup` reducer.

##### reduceGameplay

This reducer reacts to `GeneratedAction` and `SwitchAction` and reduces `GameState` based on the actions. When `SwitchAction` is dispatched, it reduces the state based on the wrapped action and updates `lastPlayed`.
For `GeneratedAction`, the reducer first reduces the offense board and then the defense board and update the state by copying.

`whichBoard` is just a convenient method which returns the new board based on the old board id.

We have defined our state, actions, reducers and middleware. Let's define our store and create a view which would listen to the updates.

### Store

Generally, an app based on Redux has only one store. We are also going to use only one store.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GameStore.kt %}

`GameStore` extends `SimpleStore` which we have defined in the previous articles. We supply the list of middleware and directly used reducers. When we create an instance of the store, we'll just need to pass an initial state as constructor parameter.

-----------------

## Render and Updates

We have completed the Redux implementation for our Battleship game. We need to write some `render` code which will render the views on the screen based on the state updates from the store.

Without making things too complicated, let's just update the activity. You can find the layout here - [acitivty_game.xml](https://gist.github.com/jayrambhia/8260e059ec3c4e287acdedc3ebf322a7#file-activity_game-xml).

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 GameActivity.kt %}

In `onCreate`, we initialize the views and create empty boards. Using these boards, we create an initial state and `GameStore`.

You can ask the user to setup ships, but here we are just going to put the ships on the board `randomly` (It's not random). To put ship, we'll dispatch `AddShip` action.

We subscribe to the store for state updates in `onResume` and write our render function. For every update, it will recreate the cells and update the adapter. We unsubscribe from the updates in `onPause` lifecycle callback.

To take a _shot_, we dispatch `Move` action. The instance of action has `offense` and `defense` id and the point where the user clicked.

This is it! You have created the game of Battleship using Kotlin and Redux architecture. Start playing!

------------------

### Repository

I have uploaded the code on Github and you may find it here - **[Battleship](https://github.com/jayrambhia/Battleship/tree/redux-article-series)**.

This article series has been the longest I have worked on and frankly, quite time consuming. I hope you liked the content and found it useful. Please share it with your colleagues and in your community if they are interested in learning about Redux.

## Redux architecture series

 1. [Introduction: Redux architecture for android apps](/blog/android-redux-intro)
 2. [Middleware: Introduction and implementation](/blog/android-redux-middleware)
 3. [Write your own Redux implementation in Kotlin](/blog/kotlin-redux-architecture)
 4. [Add Middleware to your Redux implementation](/blog/kotlin-redux-middleware)
 5. [Build Battleship game with Redux - Groundwork](/blog/battleship-kotlin)
 6. Implement the Battleship gameplay with Redux
