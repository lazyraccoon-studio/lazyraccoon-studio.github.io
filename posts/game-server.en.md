---
slug: game-server
title: 'Retro: a realtime game server for a small team'
excerpt: What we learned running a realtime server with few people.
---

# Retro: a realtime game server for a small team

Notes from building a realtime game server with a small team.

## Authoritative server loop

We trust no client; the server simulates the world at 20 Hz.

```js
// authoritative tick loop
setInterval(() => {
  world.step(1 / 20);      // 20 Hz
  broadcast(world.snapshot());
}, 50);
```

## What we learned

Simple structures win in the end. Optimize only after you measure.
