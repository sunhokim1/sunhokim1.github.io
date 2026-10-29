---
layout: post
title: "FPGA 분초 시계와 스톱워치"
categories: [FPGA-RTL]
thumbnail: "/assets/images/fpga-board.jpg"
summary: "Verilog로 모드 전환과 FND 출력을 구현하고 버튼 입력을 검증"
---

## 프로젝트 개요
- **목표**: FPGA 기반 분초 시계와 스톱워치 구현
- **사용 기술**: Verilog HDL, FSM, 디바운싱, FND, 테스트벤치
- **동작 모드**: 시계, 스톱워치, 대기

![동작 중인 FPGA 보드와 FND](/assets/images/fpga-board.jpg)
*FPGA 보드와 FND 동작 화면*

## 구현 내용
- **상태 제어**
    - FSM 기반 시계·스톱워치·대기 모드 전환
    - 버튼 입력에 따른 스톱워치 시작·일시정지
- **타이머와 출력**
    - 타이머를 이용한 시간 값 생성
    - FND 제어 모듈을 통한 7세그먼트 표시
- **검증**
    - 테스트벤치 작성 및 버튼 입력 생성
    - 타이밍 차트와 실제 FPGA 보드 동작 확인

![시계와 스톱워치 상태 전이도](/assets/images/fpga-fsm.jpg)
*시계·스톱워치 상태 전이*

![FPGA 모듈 블록도](/assets/images/fpga-block.jpg)
*FPGA 모듈 블록도*

![시뮬레이션 타이밍 차트](/assets/images/fpga-timing.jpg)
*시뮬레이션 타이밍 차트*

## FND 출력과 시뮬레이션
- **FND 제어**: 자리 선택 및 표시 값에 맞춰 7세그먼트 출력
- **테스트벤치**: 버튼 입력을 생성해 모드 전환과 스톱워치 동작 확인
- **타이밍 차트**: 버튼 입력 이후 상태와 출력 신호 변화 확인

![FND 출력 제어 모듈 구성](/assets/images/fpga-fnd.jpg)
*FND 출력 제어 모듈 구성*

![테스트벤치 버튼 입력과 검증 순서](/assets/images/fpga-testbench.jpg)
*테스트벤치 버튼 입력과 검증 순서*

## 문제 해결: 세 버튼의 디바운싱
- **문제점**: C·L·R 버튼 입력 불량 및 모드 전환 오류
- **원인**: 1비트 입력용 디바운서를 세 버튼에 각각 적용하지 않음
- **해결**: 버튼별 디바운서 인스턴스 3개 생성
- **결과**: 세 버튼의 독립 입력과 스톱워치 제어 정상 동작
