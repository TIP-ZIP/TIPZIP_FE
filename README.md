# TIP.ZIP

## About Service

### 나에게 필요한 모든 팁을 한번에 모아! - TIP.ZIP

![팜플렛](/public/pamphlet/tip-zip.jpg)

---

![기능](/public/pamphlet/tip-zip-function.jpg)

## Git Commit Convention

## 1. Branch Naming Rule

**Branch 이름**은 **작업 목적과 연관된 이슈 번호를 포함하는 방식**

```php
<타입>/<이슈 번호>-<간단한 설명>

- feature/1234-add-user-login
- bugfix/5678-fix-login-error
- release/1.2.0
```

### Branch Type

- **feature/ - 새로운 기능 개발 시**
- **bugfix/ -** **버그 수정** 시
- **hotfix/ -** **긴급한 버그 수정** 시 (보통 프로덕션 환경에서 발생)
- **release/ -** **릴리즈 준비 시**
- **chore/ -** 빌드 및 기타 작업 자동화, 문서 작업 등 **코드와 관련 없는 작업**

---

## 2. Git Commit Message Rule

```php
<타입>(<모듈>): <변경 내용 요약> (#이슈 번호)

- feat(auth): add login functionality (#1234)
- fix(profile): correct user profile update error (#5678)
- docs: update README with new instructions (#91011)
```

### Commit Type

- **feat -** 새로운 기능 추가
- **fix -** 버그 수정
- **refactor -** **코드 리팩토링 (기능 변경 없이 구조 개선)**
- **style -** 코드 포맷팅, 세미콜론 누락 등 (비즈니스 로직에 영향이 없는 변경)
- **test -** 테스트 추가 또는 수정
- **docs -** 문서 추가 및 수정
- **chore -** 빌드 작업, 패키지 관리 등
