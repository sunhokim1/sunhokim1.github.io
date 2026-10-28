---
layout: post
title: "AVR 기반 자율주행 자동차"
categories: [MCU-AVR]
summary: "초음파 센서와 FSM을 사용한 주행 제어, UART와 FND 핀 충돌 해결"
---

## 프로젝트 개요
- **목표:** 초음파 센서로 장애물을 감지하고 자율 주행하는 자동차 구현
- **구성:** ATmega128A, 초음파 센서, FND, 모터, Bluetooth

![자율주행차 조립 외관](/assets/images/car-photo.jpg)
*자율주행차 조립 외관*

## 구현 내용
- FSM으로 자동 주행과 Bluetooth 수동 제어 모드를 관리
- 초음파 센서로 장애물 거리 측정, PWM으로 모터 속도와 방향 제어
- 버튼으로 모드를 전환하고 FND에 작동 시간과 기능 실행 횟수 표시

![수동 및 자동 주행 상태도](/assets/images/car-fsm.jpg)
*수동·자동 모드의 상태 전이*

## 문제 해결: UART와 FND 핀 충돌
- **문제:** UART1의 TX1·RX1과 FND가 PD2·PD3을 함께 사용해 FND가 정상 동작하지 않음
- **조치:** FND 연결을 포트 C로 옮기고 자리 선택 핀을 PF4~7, PG0~3으로 재배치
- **추가 문제:** FND 초기화가 모터에 사용 중인 PF0~3까지 건드려 FND가 깜빡임
- **해결:** FND는 PF4~7, 모터는 PF0~3만 따로 초기화
