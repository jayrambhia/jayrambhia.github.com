---
category: Blog
tag: Android
comments: true
date: 2019-11-28 15:00:00
layout: post
image:
  twitter: /assets/images/ports_adapters.jpg
  facebook: /assets/image/ports_adapters.jpg
  height: 220
  width: 140
slug: ports-adapters-intro
title: Ports and Adapters (Hexagon) architecture
description: Learn about ports and adapters (Hexagon) architecture.
keywords: [android, android development, androiddev, portsadapters, ports and adapter architecture, Hexagon architecture, modularization, separation of concerns, unit testing]
category_tag: [Architecture]
---

Ports and Adapters architecture also known as Hexagon architecture was first introduced and conceptualized in 2005 by Dr. Alistair Cockburn. It can also be referred as an object structural pattern.

This is almost 15 years old, but if implemented correctly, it would help to create software / app that is **decoupled from technology**, easy to **test in isolation**. Ports and adapters is a pattern and a way of programming.

## Hexagon

The name **Hexagon** was coined for this pattern. It's not related to the shape, size or number of sides it has. Ports and Adapters is not as catchy as Hexagon. The Hexagon just represent a **closed** structure and that's the essence of this pattern - **Isolation**.

## Ports and Adapters

Ports and adapters reflect the terminology of the real world and interchangeable technologies. Nowadays, smart phone are lacking the 3.5 mm audio jack (**port**). Smart phones have a USB-C port and it can be used to charge the phone, transfer data, Audio I/O and it's possible with the use of different **adapters**.

Taking the same terminology and thought process into software development - A module should be technology agnostic. It would expose a **port** and we could connect different types of **adapters** to either perform the different tasks or the same tasks with different technology.

-------------

<p align="center">
    <img src="/assets/images/ports_adapters.jpg" alt="Ports and Adapters flow diagram" title="Ports and Adapters pattern flow" style="width: 80%;" />
    <b>Ports and Adapters (Hexagon) pattern</b>
</p>

## Architecture

The ports and adapters can also be considered as an architecture or a pattern. I consider as a design pattern that helps you design software that is scalable and highly testable.

Some of the advantages of Ports and Adapters pattern:

 - Highly modularized code
 - Each module / block works in total isolation
 - Each module / block is individually testable
 - Modules are replaceable and can be easily swapped out based on the business logic
 - The output medium is replaceable - Mobile apps, web apps, CLI, hardware, etc.

There are 4 key aspects of this pattern.

 1. **Hexagon** - Contains core business logic
 2. **Driver** - Connects to the Hexagon to perform certain tasks
 3. **Driven** - Hexagon connects to this component to perform side effects - API calls, persistence, etc
 4. **Actors** - UI, user, 3rd party API, tests that want to perform tasks

These are the different components involved in this pattern. There are 2 more aspects.

 1. **Port** - A component exposes its capabilities via Ports. Ports define how a module can interact with another module.
 2. **Adapters** - Adapters implement the port interface. While the port defines its functions, adapters implement those functions.

-----------

### Hexagon

Hexagon is the component which defines the core business logic. It is completely isolated and does not concern itself about the outside world.

Hexagon exposes **ports** for the driver component to connect => `Driver port`. A **Driver port** defines how another component should interact with the hexagon component. As an example for a hexagon component that is used to add products to a cart.

```
CartDriverPort {
    addToCart(id): Response
}
```

When `addToCart` is called, the hexagon would perform bunch of business logic - check if the product is already added to cart, is the product available, and then add to the cart if possible. It would provide an appropriate response. The response could be a State, HTTP response - depends on the hexagon component.

A lot of these tasks do not fall under *core business logic*. These would be delegated to different components. The hexagon defines **ports** for these tasks. These ports are called **Driven ports**.

```
CartDrivenPort {
    isProductAvailable(id): Response
    canAddToCard(id): Response
    addToCart(id): Response
}

CartNotificationDrivenPort {
    sendEmail(id): Response
    sendPushNotification(id): Response
}
```

The hexagon would call these ports to check, add and notify. The hexagon component is not aware of other components or modules that are effectively going to perform these tasks.

#### Driver port

Driver port can be considered as an **API** for the application or the hexagon. Other components would use the driver port to interact with it. Ex.

- An app could implement this hexagon component in the source code.
- A website could consider the server as the hexagon and just call the REST API. And the server contains the business logic.
- A mocked module could be used in testing to test the business logic inside the hexagon.

#### Driven port

Driven port can be considered as an **SPI** required by the application. The hexagon (application) defines its requirements and the provider would implement those.

- An app that contains the hexagon may call the REST API to trigger sending the email or push notifications or both. It could also implement its own IMAP client to send emails.
- The server may call Firebase to send push notifications. Here, the server would have to implement a component that can communicate with the Firebase API (here Firebase would become the hexagon and so on).

----------

### Driver

The Driver component (Driver Adapter) knows how to communicate to the hexagon. It takes a technical request and converts it to a technology agnostic request by using the **Driver port**. The driver adapter takes an action from the **Actor** and uses the driver port to request the task. Upon completion, it would convert the response from the driver port to something that the actor understands.

- An app would use the API endpoints provided by the server to add products to the cart. If the request is successful, it would show the user a nice animation. If it fails, it would show some error. The app acts as the driver adapter and user is the actor.
- When the server wants to send a push notification, it can use Firebase API or another 3rd party API that sends push notifications to Android and iOS both. The Firebase API is the driver port and the server becomes the driver adapter.

--------

### Driven

The Driven component (Driven adapter) implements the requirements provided by the hexagon to perform certain tasks. This helps in creating more isolation and separation between core business logic and side effects.

As an example, sending an email is part of the _business logic_ or _application logic_ but how to send it is completely irrelevant as long as it gets sent. The component that implements these requirements becomes driven adapter.

The application can swap out these adapter. It could replace sending email via AWS to sending email via MailChimp. It should not have an impact on the hexagon. For testing, the driven adapter can be replaced with a **mocked adapter**.

--------

### Actor

Actor is someone or something that wants to perform certain actions. That's it. A person using an app is an actor. Tapping on the _Add to cart_ button is an action. The driver adapter would take this action (and gather bunch of data) and use the driver port to add the product to the cart.

When the server wants to send an email, it becomes the actor and uses a component (driver adapter) that knows how to communicate with the driver port (MailChimp API) to send the email.

--------

## Full Picture

To complete the example and see the full picture,

1. A person (**Actor**) is shopping on a website. The person clicks on _Add to cart_ button.
2. The webpage (**Driver adapter**) connects to the server using the API (**Driver port**) to request the product be added to the cart.
3. The cart component on the server (**Hexagon**) performs a bunch of checks and now wants to add the product to the cart. The hexagon calls the **Driven port** to persist the data. A repository (**Driven adapter**) adds it to the MySQL database.
4. The cart component on the server (**Hexagon**) responses with HTTP status 200.
5. The webpage (**Driver adapter**) upon receiving status 200, shows an animation.
6. The person (**Actor**) sees the animation and _shrugs_. Creating a website would take - what 30 minutes? Big deal.

--------------

## Advantages

There are several advantages of implementing this pattern.

- **Testable** - With this pattern, you can test each component in total isolation. So implementing unit tests would be much easier by mocking the adapters. Integration tests can be easily performed to test adapters.
- **Flexible** - Swapping adapters that work with different technologies is easy. Adding a new adapter would be easy.
- **Learning curve** - There's very small learning curve for this pattern.
- **Focus** - Due to isolation between components, it's easier to focus on the business logic without worrying about the side effects.

## Disadvantages

Like any other patter, Ports and Adapter also has its fair share of disadvantages.

- **Complex** - It can become complex to manage a lot of different modules and adapters. Dependency graph can grow crazy.
- **Build** - Due to a lot of modules and inter dependencies, build time can increase significantly, especially for an Android project.

## When to use this pattern?

- It's a great pattern for small projects. You don't have to worry about looking up the ports then navigating to its implementation.
- If your project is a long term project which is going to have a lot of changes in requirements, maybe it's better to use this pattern as you can swap out the adapter with the new ones.

For most of the projects, technologies and business logic does not change rapidly. So creating bunch of ports and adapters just adds to the complexity and indirection. It's a great pattern but _premature abstraction is the root of all evil_.
