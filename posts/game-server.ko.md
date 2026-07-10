---
slug: game-server
date: 2026.06
tag: retro
read: 8
title: 작은 팀을 위한 실시간 게임 서버 회고
excerpt: 적은 인원으로 실시간 서버를 운영하며 배운 것들.
---

# 작은 팀을 위한 실시간 게임 서버 회고

적은 인원으로 실시간 게임 서버를 만들며 겪은 시행착오를 정리했습니다.

## 권위 있는 서버 루프

클라이언트를 믿지 않고, 서버가 20Hz로 세계를 시뮬레이션합니다.

```js
// authoritative tick loop
setInterval(() => {
  world.step(1 / 20);      // 20 Hz
  broadcast(world.snapshot());
}, 50);
```

## 배운 것

단순한 구조가 결국 이깁니다. 최적화는 측정한 다음에.
