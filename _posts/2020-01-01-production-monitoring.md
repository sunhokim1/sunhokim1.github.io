---
layout: post
title: "AI 기반 생산 공정 모니터링"
categories: [AI-시스템]
thumbnail: "/assets/images/production-flow.jpg"
summary: "객체 검출과 STM32를 연결해 조립 공정을 확인하는 시스템"
---

## 프로젝트 개요
- **목표**: 조립 단계별 부품 검사와 작업 이력 관리
- **주요 구성**: STM32 NUCLEO-F411RE, Jetson Orin Nano, 웹캠, 작업자·관리자 PC
- **사용 기술**: 객체 검출, UART, TCP/IP, LED, 버튼, 부저

![생산 공정 모니터링 시스템 구성도](/assets/images/production-flow.jpg)
*현장 장치, 작업자 PC와 관리자 PC의 연결*

## 시스템 구성
- **현장 장치**
    - 카메라의 조립 영역 촬영
    - STM32에 연결된 버튼·LED·부저 제어
- **검사**: Jetson에서 부품 종류·개수·위치를 검출해 조립 검사에 활용
- **작업자 PC**: 로그인, 제품 선택, 시작·일시정지·재개, PASS/FAIL 표시
- **관리자 PC**: 작업자·제품 정보, 작업·불량 이력, 품질 통계 관리
- **통신**: STM32 ↔ 작업자 PC UART / 작업자 PC ↔ 관리자 PC TCP/IP

## 작업자 화면
- **기본 화면**: 작업 정보, 조립 영상, 현재 STEP과 제어 버튼 표시
- **작업 시작**: 제품 선택 후 조립 화면과 단계별 진행 상태 확인

![작업자 기본 화면](/assets/images/production-screen-30.jpg)
*작업자 기본 화면*

![작업 시작과 단계 표시](/assets/images/production-screen-32.jpg)
*작업 시작과 단계 표시*

- **검사 결과**: 부품 검사 후 PASS 또는 FAIL 화면 표시
- **단계 진행**: PASS 시 다음 조립 단계 표시

![조립 검사 FAIL 화면](/assets/images/production-screen-35.jpg)
*조립 검사 FAIL 화면*

![조립 검사 PASS와 다음 단계](/assets/images/production-screen-36.jpg)
*조립 검사 PASS와 다음 단계*

## 현장 제어 장치
- **진행 표시**: STEP별 LED와 FAIL LED
- **사용자 입력**: 버튼 그룹
- **알림**: 부저와 음량 조절용 가변저항

![STM32 현장 제어 장치](/assets/images/production-screen-40.jpg)
*STM32 현장 제어 장치*

## 관리자 화면
- **작업자 관리**: 작업자 조회와 검색
- **제품 관리**: 제품 목록과 제품 등록
- **품질 확인**: 제품의 단계별 PASS·FAIL 및 불량률 확인

![관리자 작업자 조회 화면](/assets/images/production-screen-44.jpg)
*관리자 작업자 조회 화면*

![관리자 제품 등록 화면](/assets/images/production-screen-48.jpg)
*관리자 제품 등록 화면*

![단계별 검사 결과와 불량률](/assets/images/production-screen-52.jpg)
*단계별 검사 결과와 불량률*

## 객체 검출 방식
- **필요 정보**: 부품의 종류·개수·위치
- **선택 방식**: 개별 부품의 위치 정보를 얻기 위한 객체 검출
- **모델**: 작은 조립 부품 검출과 Jetson 실행을 고려한 YOLO26n

![모델 5 평가 결과와 데이터 전략](/assets/images/production-model.jpg)
*최종 데이터 전략과 모델 5 평가 결과*

## 실험: 신규 레시피 데이터 구성
- **과제**: 조립 단계가 바뀐 제품 추가 시 촬영·라벨링 데이터 축소
- **모델 비교**
    - 모델 1: 첫 제품의 데이터로 기준 모델 구성
    - 모델 2: 단일 부품 이미지 추가
    - 모델 3: 두 번째 레시피의 변경 단계 4개 추가
    - 모델 4: 좌우 반전 증강 적용
    - 모델 5: 단일 부품 이미지 제거 및 조립 단계 중심 학습
- **평가 데이터**
    - 레시피 테스트: 단계별 총 50장
    - 일반화 테스트: 오류를 고려한 부품 배치 18장
- **모델 5 결과**
    - 레시피: precision 98.9% / recall 99.9% / mAP50 99.5%
    - 일반화: precision 88.1% / recall 95.5% / mAP50 92.9%
- **데이터 전략**: 변경 단계와 취약 부품 데이터 선택적 추가
- **지표 해석**: 객체 검출 지표와 PASS/FAIL 판단 구분; 판정에는 부품 간 상대 거리 계산 필요
