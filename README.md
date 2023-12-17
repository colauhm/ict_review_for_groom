# 프로젝트 목적
fastapi로 웹 사이트를 혼자 만들어 보며 복습

# 프로젝트 추가기능
1. 회원등급
2. 회원가입 시 이메일 인증
3. 댓글 추천기능
4. 게시판 분할

# 실행 명령어
uvicorn server.main:app --reload --host=0.0.0.0 --port=8088
python -m http.server 80 -d ./app