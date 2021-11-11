import pymysql

def get_blog_url(query):
    conn = pymysql.connect(
        host = 'localhost',
        user='saso',
        password='saso',
        db='CRAWLING',
        charset='utf8'
    )

    curs = conn.cursor()

    sql = "select * from naver_openApi where query = %s"
    curs.execute(sql, query)

    rows = curs.fetchall()

    title= []
    content = []
    postdate= []
    url = []
    source = []
    for row in rows:
        title.append(row[1])
        content.append(row[2])
        postdate.append(row[4])
        url.append(row[5])
        source.append(row[7])

    conn.close()

    return title, content, postdate, url, source


def get_youtube(query):
    conn = pymysql.connect(
        host = 'localhost',
        user='saso',
        password='saso',
        db='CRAWLING',
        charset='utf8'
    )

    curs = conn.cursor()

    sql = "select * from youtube_openApi where query = %s"
    curs.execute(sql, query)

    rows = curs.fetchall()

    content = []
    postdate= []
    url = []
    source = []
    for row in rows:
        content.append(row[2])
        postdate.append(row[4])
        url.append(row[1])
        source.append(row[6])

    conn.close()

    return content, postdate, url, source


