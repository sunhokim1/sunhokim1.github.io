---
layout: post
title: "STM32 DC 모터 제어 시스템"
categories: [STM32]
thumbnail: "https://github.com/user-attachments/assets/5591f718-8155-47e5-8701-672099166f1e"
summary: "인터럽트와 FSM, PWM으로 DC 모터의 방향과 속도를 제어"
---

## 프로젝트 개요
- **목표**: 버튼과 UART로 DC 모터 방향·속도 제어
- **사용 기술**: STM32, C, 인터럽트, FSM, PWM, UART
- **주요 장치**: DC 모터, 버튼, TIM4, TIM5

![DC 모터 제어 시스템 외관](https://github.com/user-attachments/assets/5591f718-8155-47e5-8701-672099166f1e)
*DC 모터 제어 시스템 외관*

## 상태 설계
- STOP: 모터 정지
- CW: 시계 방향 회전
- CCW: 반시계 방향 회전
- 이전·현재 상태와 속도를 비교해 모터 동작 관리

![모터 제어 상태 전이도](https://github.com/user-attachments/assets/9decde2c-c78c-4cb4-b1eb-f63a54d9150c)
*모터 상태 전이도*

## 구현 내용
- **입력 처리**
    - 버튼·UART 수신 인터럽트에서 이벤트와 데이터 기록
    - TIM4를 이용한 짧은 누름·긴 누름 구분
- **상태 관리**
    - 입력 이벤트에 따라 현재 모터 상태·속도 변경
    - 이전 값과 현재 값을 비교해 변경 여부 판단
- **출력 제어**
    - 모터 정지·정방향·역방향 동작 분리
    - TIM5 PWM 듀티 조절을 통한 속도 제어

## 버튼과 UART 입력 처리
- **버튼**: 인터럽트와 TIM4를 이용해 입력 이벤트와 누른 시간 처리
- **UART**: 수신 인터럽트에서 데이터를 기록하고 핸들러에서 명령 처리
- **출력**: 변경된 상태와 속도에 따라 모터 제어 및 TIM5 PWM 갱신

![버튼 입력 처리 흐름](https://github.com/user-attachments/assets/fbcca721-c21e-48a2-b386-4099433bc64f)
*버튼 입력 처리 흐름*

![UART 입력 처리 흐름](https://github.com/user-attachments/assets/8c5690ae-7e4f-4913-a873-560f1b3ee7ff)
*UART 입력 처리 흐름*

## UART 명령
- `S`: 모터 정지
- `F` / `R`: 시계 방향 / 반시계 방향
- `1`~`9`: PWM 듀티 변경

## 설계 과제: 입력과 모터 상태 관리
- **과제**: 버튼과 UART 입력에 따른 상태·속도의 일관된 관리
- **구성**: 입력 인터럽트 → 핸들러 → 상태 관리 → 모터·PWM 제어
- **결과**: 입력 처리와 출력 제어를 함수 단위로 분리

[프로젝트 GitHub 저장소와 동작 영상](https://github.com/qkrtkdgus010208/ARM-Motor_Controller_System)
