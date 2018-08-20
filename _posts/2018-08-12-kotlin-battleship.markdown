---
category: Blog
tag: Android
comments: true
date: 2018-08-12 22:00:00
layout: post
image:
  twitter: https://cdn.thingiverse.com/renders/cb/3d/31/82/20/62473f765bd0062687b91e4559fc6c11_preview_featured.JPG
  facebook: https://cdn.thingiverse.com/renders/cb/3d/31/82/20/62473f765bd0062687b91e4559fc6c11_preview_featured.JPG
  height: 620
  width: 480
slug: battleship-kotlin
title: Battleship game in Kotlin
description: Build your own Battleship game in Kotlin with immutable data structures and explore kotlin operators and overloading. This article focuses on getting the right building blocks to create the Battleship game.
keywords: [android, android development, androiddev, dev, redux, kotlin, redux architecture, battleship, battleship game, battleship android app, battleship in kotlin, redux store in kotlin, kotlin operator overloading]
category_tag: [Android, Kotlin, Redux]
series: redux-android
series_description: Use Redux for something a little more complex than a notes app. Write the Battleship game in Kotlin using your own Redux implementation. This article focuses on getting the right building blocks for the game.
---

**Battleship** is a game of two players which is played on grids on which each players fleet of ships are marked. Players take turns to take _shots_ at the other player's ships. The objective of the game is destroy the opponent's fleet. Read more on [Wikipedia](https://en.wikipedia.org/wiki/Battleship_(game)). Building this game is also a very famous design interview question.

We are going to build the game in Kotlin using Redux architecture. We will implement the logic and not worry much about the UI since it's secondary.

<p align="center">
  <img alt="battleship game" title="Battleship Game on Paper" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Battleship_game_board.svg/500px-Battleship_game_board.svg.png" />
</p>

## Rules of Battleship

Before we begin writing some code, it's imperative that we familiarize ourselves with the rules.

 - There are 2 players in the game. Each player has a board to place their fleet and a board to mark their _shots_.
 - Each player is allotted identical fleet of ships. Based on the game, the type and number of the ships may vary.
 - Each player take turns calling the _shot_ alternatively until a player's fleet is completely destroyed.
 - When a player takes a _shot_ at a grid on the board, the other player has to honestly acknowledge the shot and let the _offense_ know if they hit a ship or not. The _offense_ marks the grid based on the _defense_'s response.

## Models

Let's analyze what type of models and data structures we will require to build the game.

 - `User`: The player.
 - `Board`: The board of size `(w, h)` that belongs to the player.
 - `Ship`: A ship of size `s`, located at grid `g` with direction `d`.
 - `Point`: A point `(x, y)` denoting the grid on the board.
 - `Direction`: Direction of the ship - `vertical` or `horizontal`.

Let's start from the smallest model required.

### Point

{% highlight kotlin %}
data class Point(val col, val row)
{% endhighlight %}

The point denotes a grid on the 2D-board. The point and grid representation is from `index 0`.

### Ship

A ship may have a name, but it's not that important right now. A ship has a size - how many grids long it is. We also need to put the ship on the board, so we need start point and end point of the ship to correctly determine where the ship is.

If we take board as a 2D space, a ship can be termed as a vector which has a magnitude and a direction (vertical or horizontal). We need a fix point to place the ship on the board.

#### Direction

{% highlight kotlin %}
enum class Direction {
  HORIZONTAL, VERTICAL;
}
{% endhighlight %}

Let's write a class for `Ship`.

{% highlight kotlin %}
data class Ship(
  val start: Point,
  val size: Int,
  val direction: Direction)
{% endhighlight %}

This definition is not complete yet and we shall revisit this later.

### Board

A board has a size and contains the fleet.

{% highlight kotlin %}
data class Board(
  val width: Int,
  val height: Int,
  val ships: List<Ship> = listOf())
{% endhighlight %}

These models just represent the setup of the game. It doesn't support any gameplay, eg. what happens when a player takes a _shot_?

## Gameplay

The logic of the gameplay is complex and would involve some changes to our models.

When a player takes a _shot_ at a grid, they mark it down on their board if they hit a ship or missed. It means that we need to store if each shot was hit or missed. To keep track of hits and misses, we will add `hits: Set<Point>` and `misses: Set<Point>` to the board.

When a player takes a _shot_, the _defense_ also marks down on their board if the _shot_ hit or missed. We will add `opponentHits: Set<Point>` and `opponentMisses: Set<Point>` to the board model to keep track.

It's also helpful if we mark the hits to the ship so that we can easily track if the ship is completely destroyed or not. We will add `hits: Set<Point>` to the ship model.

We also need to keep track which ship are still active and which are completely destroyed so that we can know if the game is over once all the ships are destroyed. We can add `active: List<Ship>` and `destroyed: List<Ship>` to the board. The data structure is immutable and we should try to keep it lean as much as possible. We can use `active: List<Int>` and `destroyed: List<Int>` and unique `id: Int` to each ship.

### Ship

{% highlight kotlin %}
data class Ship(val id: Int,
  val start: Point,
  val size: Int,
  val direction: Direction,
  val hits: Set<Point> = setOf()) {

  val destroyed = hits.size == size
}
{% endhighlight %}

We added `hits` and `destroyed` to the ship model.

### Board

{% highlight kotlin %}
data class Board(
  val id: Int,
  val user: User,
  val width: Int, val height: Int,
  val ships: List<Ship> = listOf(),
  val hits: Set<Point> = setOf(),
  val misses: Set<Point> = setOf(),
  val opponentHits: Set<Point> = setOf(),
  val opponentMisses: Set<Point> = setOf()) {

  val activeShips = ships.filter { !it.destroyed }.map { it.id }
  val destroyedShips: ships.filter { it.destroyed }.map { it.id }
  val lost = ships.isNotEmpty() && activeShips.isEmpty()
}
{% endhighlight %}

We added `id` - unique identifier for the board and `user`. We also added `hits`, `misses`, `opponentHits` and `opponentMisses` to keep track of the moves and where the user can play. We added `activeShips`, `destroyedShips` and `lost` to have better representation of the gameplay.

## Kotlin operator overloading

Kotlin allows us to provide implementations for a predefined set of operators on our types. We can use `+`, `*` or `in` and other operators to make our code concise and readable.

The board has a predefined fixed size and if we want to add a ship on the board, it should fit the board.

{% highlight kotlin %}
data class Board(...) {

  operator fun contains(p: Point): Boolean {
    return p.col >= 0 && p.row >= 0
      && p.col < width && p.row < height
  }

}
{% endhighlight %}

Now, we can check if a point is on the board or not by just calling `p in board` which would return a boolean.

When a _shot_ is taken, we need to check if it hit the ship or not.

{% highlight kotlin %}
data class Ship(...) {

  operator fun contains(p: Point): Boolean {
    return when(direction) {
      HORIZONTAL -> start.row == p.row && start.col <= p.col && end.col >= p.col
      VERTICAL -> start.col == p.col && start.row <= p.row && end.row >= p.row
    }
  }
}
{% endhighlight %}

We have not defined `Ship.end` yet. So let's do that now with the help of operators. We will define `WeighedDirection` which is an actual representation of a vector.

{% highlight kotlin %}
data class WeighedDirection(val d: Direction, val len: Int)

enum class Direction {
  HORIZONTAL, VERTICAL;

  operator fun times(n: Int): WeighedDirection {
    return WeighedDirection(this, n)
  }

}

data class Point(val col: Int, val row: Int) {
  operator fun plus(wd: WeighedDirection): Point {
    return when(wd.d) {
      HORIZONTAL -> Point(col + wd.len, row)
      VERTICAL -> Point(col, row + wd.len)
    }
  }
}

data class Ship(...) {
  val end = start + direction * (size-1)
}
{% endhighlight %}

 - `direction * size` calls `Directio.times()` method and returns `WeighedDirection`. And, `start + WeighedDirection` calls `Point.plus()` which gives us the end point of the ship.

And now we can check if a point exists on the ship by calling `p in ship`.

In the game, no two ships can overlap. So let's overload another operator which would help us check if two ships overlap.

{% highlight kotlin %}
data class Ship(...) {

  operator fun contains(other: Ship): Boolean {
    if (other.direction == this.direction) {
      return other.start in this || other.end in this
    }

    val vertical = if (other.direction == VERTICAL) other else this
    val horizontal = if (other.direction == HORIZONTAL) other else this

    return horizontal.start.row in vertical.start.row..vertical.end.row &&
      vertical.start.col in horizontal.start.row..horizontal.end.row
  }
}
{% endhighlight %}

This is a complex logic and if you're not in habit of _solving_ such equations, I'd recommend that you try once. It took me some time to come up with the solution. We can use this operator to check if two ships overlap by simply calling `ship1 in ship2`.

_Explanation_: If both the ships have same direction, we need to check if start or end point one ship lies on the other or not.

The logic becomes complex when the ships have different directions. We don't care what direction the ships have since there are only two directions so we create instances for vertical and horizontal ship.

A horizontal ship has the same row for all the points and similarly, the vertical ship has the same column for all the points. So we check if the vertical ship passes through the row of the horizontal ship and the horizontal ship passes through the column of the vertical ship. This would get us the intersection point.

`horizontal.start.row in vertical.start.row...vertical.end.row` - 2 operators are used here. `in` which we have overloaded in `Point.contains()` and `..` which is the range operator.

### Summary

We require `Point`, `Direction`, `Ship`, and `Board` models to build our battleship game. Here's how the final version looks.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 BattleshipModels.kt %}
<br/>
<br/>
## UI

We have created our models and data classes. It's time to work on the UI so that we can see the game in action.

**Disclaimer**: I'm not going to spend a lot of time in making amazing UI as it's not the focus of the series. The UI is going to be super ugly!

We are going to use `RecyclerView` with `GridLayoutManager` to create the board. Each _grid_ of the board will be a `ViewHolder`. We shall use a custom view to draw some paint and dots which would represent ships and shots on the board.

This is how it's going to turn out.

<p align="center">
  <img alt="battleship UI" title="Battleship Android UI" src="/assets/images/battleship_kotlin_ui.png"/>
</p>

Let's look at the components that are being used here.

### Components

 - **Cell**: UI model which maps `Board` to an individual `Grid`. After every update, we create new cells which represent grids of the board. For a board of size of 10 columns and 10 rows, we will have `10*10 => 100` cells.
 - **SquareCell**: UI representation of the `Grid`. It extends `View` and binds with `Cell` to draw and display the data. It's a square view which draws the ship, hit and missed points on the canvas.
 - **UiCellAdapter**: RecyclerView Adapter that we use to draw the board on the screen.

Without going much in the details, here's the code which will render the game UI. You can find the layout for ViewHolder here - [square_cell_itemview.xml](https://gist.github.com/jayrambhia/8260e059ec3c4e287acdedc3ebf322a7#file-square_cell_itemview-xml).

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 BattleshipUi.kt %}
<br/>
### Converter

We have the components for the UI ready, but we still need to convert `Board` to `List<Cell>`. We create a list with capacity of `width*height` and iterate over each point and create `Cell`.

{% highlight kotlin %}
private fun convert(board: Board): List<Cell> {
    val cells = ArrayList<Cell>(board.width * board.height)
      for (i in 0 until board.height) {
        for (j in 0 until board.width) {
          val point = Point(j, i)
            cells.add(Cell(
                  point = point,
                  hasShip = board.ships.contains(point),
                  direction = board.ships.getShipDirection(point),
                  userHit = board.hits.contains(point),
                  userMissed = board.misses.contains(point),
                  opponentMissed = board.opponentMisses.contains(point),
                  opponentHit = board.opponentHits.contains(point)
            ))
          }
      }
    return cells
}
{% endhighlight %}

### Battleship in Action

Let's write an Activity and configure some code so that we can play with it. We'll use a layout which has a RecyclerView. After creating the adapter, we would set up the boards. For this, we will _randomly_ place the ships on each boats. We will add a click listener on the grid so that you can take a _shot_ on the board.

{% gist jayrambhia/8260e059ec3c4e287acdedc3ebf322a7 BattleshipActivity.kt %}

<br/>
I have quickly gone through the UI composing part as the article already has too much content. If you have any questions, feel free to leave a comment or get in touch with me.

We are ready with our models and data structure. In the next article, we will use Redux architecture to implement the gameplay logic.

## Redux architecture series

 1. [Introduction: Redux architecture for android apps](/blog/android-redux-intro)
 2. [Middleware: Introduction and implementation](/blog/android-redux-middleware)
 3. [Write your own Redux implementation in Kotlin](/blog/kotlin-redux-architecture)
 4. [Add Middleware to your Redux implementation](/blog/kotlin-redux-middleware)
 5. Build Battleship Game with Redux - Groundwork
 6. [Implement the Battleship gameplay with Redux](/blog/battleship-redux)
