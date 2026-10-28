---
layout: post
title: "STM32 DC 모터 제어 시스템"
categories: [STM32]
summary: "인터럽트와 FSM, PWM으로 DC 모터의 방향과 속도를 제어"
---

## 프로젝트 개요
- **목표:** 버튼과 UART로 DC 모터의 회전 방향과 속도 제어
- **사용 기술:** STM32, C, 인터럽트, FSM, PWM, UART
- **구성:** 모터, 버튼, TIM4, TIM5, UART

![DC 모터 제어 시스템 외관](https://github.com/user-attachments/assets/5591f718-8155-47e5-8701-672099166f1e)
*DC 모터 제어 시스템 외관*

## 구현 내용
- FSM으로 STOP, CW, CCW 세 상태 관리
- 버튼의 짧은 누름과 긴 누름을 구분하도록 설계
- TIM4로 버튼 입력 시간을 확인하고 TIM5로 PWM 출력
- 인터럽트에서 입력 이벤트를 기록하고 핸들러에서 상태·속도를 변경
- 현재 상태와 이전 상태를 비교해 모터 제어와 PWM 출력을 갱신

![모터 제어 상태 전이도](https://github.com/user-attachments/assets/9decde2c-c78c-4cb4-b1eb-f63a54d9150c)
*모터 상태 전이도*

## UART 명령
- `S`: 정지 / `F`: 시계 방향 / `R`: 반시계 방향
- `1`~`9`: PWM 듀티 변경

[프로젝트 GitHub 저장소와 동작 영상](https://github.com/qkrtkdgus010208/ARM-Motor_Controller_System)
