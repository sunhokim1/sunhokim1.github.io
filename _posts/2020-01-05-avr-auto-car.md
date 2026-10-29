---
layout: post
title: "AVR 기반 자율주행 자동차"
categories: [MCU-AVR]
thumbnail: "/assets/images/car-photo.jpg"
summary: "초음파 센서와 FSM을 사용한 주행 제어, UART와 FND 핀 충돌 해결"
---

## 프로젝트 개요
- **목표**: 초음파 거리 측정 기반 자율주행 자동차 구현
- **사용 기술**: ATmega128A, C, UART, PWM, FSM
- **주요 장치**: 초음파 센서, Bluetooth, FND, 모터

![자율주행차 조립 외관](/assets/images/car-photo.jpg)
*자율주행차 조립 외관*

## 구현 내용
- **자동 주행**
    - 초음파 센서로 전방 장애물 거리 측정
    - 측정 결과에 따른 전진·후진·좌회전·우회전
- **수동 제어**
    - Bluetooth와 UART를 통한 명령 수신
    - 버튼을 이용한 Auto / Manual 모드 전환
- **모터 및 화면**
    - PWM 기반 모터 속도·방향 제어
    - FND 두 개에 자동 모드 작동 시간·기능 실행 횟수 표시
- **제어 구조**: FSM 기반 주행 상태 전환

![수동 및 자동 주행 상태도](/assets/images/car-fsm.jpg)
*수동·자동 모드의 상태 전이*

![AVR 자율주행차 회로도](/assets/images/car-circuit.jpg)
*AVR 자동차 회로도*

![초음파 센서가 장착된 자동차 전면](/assets/images/car-front.jpg)
*초음파 센서가 장착된 자동차 전면*

## FND와 배선 구성
- **상단 구성**: 제어 보드와 배선, 두 개의 FND 배치
- **화면 출력**: 자동 모드 작동 시간과 기능 실행 횟수 표시
- **핀 할당**: UART와 FND, 모터가 사용하는 포트 구분

![자동차 상단의 제어 보드와 FND](/assets/images/car-overhead.jpg)
*자동차 상단의 제어 보드와 FND*

![FND 동작 화면](/assets/images/car-fnd.jpg)
*FND 동작 화면*

## 문제 해결 1: UART와 FND 핀 충돌
- **문제점**: UART1 연결 후 FND 출력 불량
- **원인**: UART1 TX1·RX1과 FND가 PD2·PD3 공유
- **해결**
    - FND 연결을 포트 D에서 포트 C로 변경
    - 자리 선택 핀을 PF4~7, PG0~3으로 재배치
- **결과**: UART와 FND의 핀 충돌 해결

## 문제 해결 2: FND와 모터 초기화 충돌
- **문제점**: 모터 구동 시 FND 깜빡임 발생
- **원인**: FND 초기화가 모터에 사용하는 PF0~3을 포함한 PF0~7 전체에 적용
- **해결**
    - FND 초기화 범위: PF4~7
    - 모터 초기화 범위: PF0~3
- **결과**: 각 장치의 초기화 범위 분리 후 깜빡임 해결
