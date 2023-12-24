import mysql.connector

def check_mysql_connection(host, user, password, database, port):
    try:
        # MySQL 서버에 연결
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port
        )

        # 연결이 성공적이면 True 반환
        return True
    except mysql.connector.Error as err:
        # 연결 실패 시 False 반환
        print(f"연결 실패: {err}")
        return False
    finally:
        # 연결 종료
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# MySQL 연결 정보 설정
mysql_host = "54.180.96.26"  # MySQL 서버 IP 주소
mysql_user = "root"  # MySQL 사용자명
mysql_password = "1234"  # MySQL 비밀번호
mysql_database = "connection"  # 연결할 MySQL 데이터베이스
mysql_port = 54548  # MySQL 포트 번호

# MySQL 연결 확인
if check_mysql_connection(mysql_host, mysql_user, mysql_password, mysql_database, mysql_port):
    print(f"MySQL 연결 성공: {mysql_host}")
else:
    print(f"MySQL 연결 실패: {mysql_host}")
