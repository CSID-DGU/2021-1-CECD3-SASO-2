import configparser
import time
import random

# from pyvirtualdisplay import Display
from crawler.Naver_BLOGandCAFE import naver
from crawler.Daum_BLOGandCAFE import daum
from crawling.openApi.YOUTUBE_comment import request_youtube, get_video_comments
from openApi.Naver_blog import url_naver
from openApi.Daum_blog import url_daum
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from sqlalchemy import create_engine
import pymysql

def URL_Crawler(query):
    url_naver(query)
    # url_daum(query)

def to_DB(query, id, url, content, source, postdate, gonggam, commentCount):
    db_connection_str = 'mysql+pymysql://saso:saso@localhost/CRAWLING'
    db_connection = create_engine(db_connection_str)
    db_connection.execute('INSERT IGNORE INTO blog_crawl_'+query+'(id, query, url, content, source, postdate, gonggam, commentCount) VALUES '
                                                                 '(:id, :query, :url, :content, :source, :postdate, :gonggam, :commentCount',
                          id = id, query = query, url = url, content = content, source = source, postdate = postdate, gonggam = gonggam, commentCount = commentCount)


    # df = pd.DataFrame(
    #     {'id': id, 'query': query, 'url': url, 'content': content, 'source': source, 'postdate': postdate,
    #      'gonggam': gonggam, 'commentCount': commentCount})
    # df.to_sql(name='blog_crawl_'+query, con = db_connection, if_exists='replace', index=False,
    #           dtype={
    #               'id': sqlalchemy.types.INTEGER(),
    #               'query': sqlalchemy.types.VARCHAR(1000),
    #               'url': sqlalchemy.types.VARCHAR(1000),
    #               'content': sqlalchemy.types.TEXT,
    #               'source': sqlalchemy.types.VARCHAR(10),
    #               'postdate': sqlalchemy.types.VARCHAR(1000),
    #               'gonggam':sqlalchemy.types.INTEGER(),
    #               'commentCount':sqlalchemy.types.INTEGER()
    #           })

def to_excel(query, id, url, content, source, postdate, gonggam, commentCount):
    df = pd.DataFrame(
        {'id':id, 'query': query, 'url':url, 'content': content, 'source': source, 'postdate': postdate, 'gonggam':gonggam, 'commentCount':commentCount})
    df.to_excel('crawler/Crawling_Result/CONTENT_DATA/' + query + '_Naver_blog_test.xlsx', index=False)

def BLOG_Crawler(query):
    config = configparser.ConfigParser()
    config.read('../config.ini', encoding='utf-8')
    config.sections()

    options = Options()

    query = query
    options.add_argument(
        'user-agent=' + "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36")
    options.add_argument('headless')
    options.add_argument('--window-size= 360, 360')  # 실행되는 브라우저 크기를 지정할 수 있습니다.
    options.add_argument('--blink-settings=imagesEnabled=false')  # 브라우저에서 이미지 로딩을 하지 않습니다.

    # display = Display(visible=0, size=(1920, 1080))
    # display.start()
    # path = '/home/drsong/download/chromedriver'    # linux server

    path = 'crawler/chromedriver'   #chromedriver 경로

    driver = webdriver.Chrome(executable_path=path,
                                   options=options)

    df = pd.read_excel('crawler/Crawling_Result/URL_DATA/' + query + '_Naver_blog.xlsx')
    df_postdate = df['postdate'].values.tolist()
    df_source = df['source'].values.tolist()
    url_list = df['url'].values.tolist()
    title_list = df['title'].values.tolist()

    # df = pd.read_excel('crawler/Crawling_Result/URL_DATA/' + query + '_Daum_blog.xlsx')
    # df_postdate += (df['postdate'].values.tolist())
    # df_source += (df['source'].values.tolist())
    # url_list += (df['url'].values.tolist())
    # title_list +=(df['title'].values.tolist())

    id = []
    Url = []
    postdate = []
    source = []
    title = []
    content_blog = []
    gonggam = []
    commentCount = []

    db_connection_str = 'mysql+pymysql://saso:saso@localhost/CRAWLING'
    db_connection = create_engine(db_connection_str)

    for i, url in enumerate(url_list):
        try:
            sql = "CREATE TABLE `CRAWLING`.`Crawl_blog` (  `id` INT NOT NULL AUTO_INCREMENT,  `query` VARCHAR(45) NULL,  `url` VARCHAR(100) NULL,  `content` TEXT NULL,  `source` VARCHAR(45) NULL,  `postdate` DATETIME NULL, `gonggam` INT NULL, `commentCount` INT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `url_UNIQUE` (`url` ASC) VISIBLE);"
            db_connection.execute(sql)
            print('create table')
        except:
            print('dont create table')

        sql = "SELECT count(*) FROM Crawl_blog WHERE url = %s"
        result = db_connection.execute(sql, (url))
        result = (result.first()[0])
        if result > 0:
            print(i, ': ', url, ' skip')
        else:
            if 'naver' in url:
                source.append('naver_blog')
                src = 'naver_blog'
                content, gong, cmt = naver(driver, url)
                content_blog.append(content)
                gonggam.append(gong)
                commentCount.append(cmt)
            elif 'daum' in url:
                source.append('daum_blog')
                src = 'daum_blog'
                content_blog.append('daum')
                gonggam.append(0)
                commentCount.append(0)
            else:
                source.append('etc')
                src = 'etc'
                content_blog.append('기타')
                gonggam.append(0)
                commentCount.append(0)

            id.append(i)
            Url.append(url)
            postdate.append(df_postdate[i])
            title.append(title_list[i])
            time.sleep(random.uniform(2, 4))

            sql = "INSERT INTO Crawl_blog (query, url, content, source, postdate, gonggam, commentCount) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            db_connection.execute(sql, (query, url, content, src, df_postdate[i], gong, cmt))
            print(i, ': ', url, ' done')
        if ( i == 10 ):
            break

    to_excel(query, id, Url, content_blog, source, postdate, gonggam, commentCount)
    # to_DB(query, id, Url, content_blog, source, postdate, gonggam, commentCount)

def YOUTUBE_Cralwer(query):
    list_youtube, urls = request_youtube(query)
    df_b = pd.DataFrame(list_youtube, columns=['keyword', 'title', 'channel', 'videoId'])
    df_b['source'] = '유튜브'
    df_b.to_excel('Crawler/Crawling_Result/URL_DATA/' + query + '_Youtube_Comment' + '.xlsx', index=True,
                  index_label="id")

    print("유튜브 크롤링 서버 가동... query :", query)

    empty_frame = pd.DataFrame(columns=['url', 'keyword', 'content', 'author', 'postdate', 'source', 'num_likes'])
    empty_frame.to_csv('Crawler/Crawling_Result/CONTENT_DATA/' + query + '_Youtube_Comment' + '.csv', index=True,
                       index_label="id")

    content_youtube = get_video_comments(query, urls)