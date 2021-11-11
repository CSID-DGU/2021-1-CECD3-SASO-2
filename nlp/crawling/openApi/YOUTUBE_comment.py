import pickle
import os
import time

import pandas as pd

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from sqlalchemy import create_engine

import re


# poetry add google-api-python-client
# poetry add google-auth-oauthlib google-auth-httplib2

DEVELOPER_KEY = "AIzaSyAeUJivaAHnYid7E4AlUxhmk-8cXHH8NM4"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def request_youtube(query):
    db_connection_str = 'mysql+pymysql://saso:saso@localhost/CRAWLING'
    db_connection = create_engine(db_connection_str)

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

    search_response = youtube.search().list(
        q=query,
        order="date",
        part="snippet",
        maxResults=100
    ).execute()

    result_list = []
    urls =[]

    for document in search_response['items']:
        try:
            val = [query, document['snippet']['title'],
                   document['snippet']['channelTitle'],
                   document['id']['videoId']]
            result_list.append(val)
            urls.append(document['id']['videoId'])
            try:
                sql = "CREATE TABLE `CRAWLING`.`youtube_openApi` (  `id` INT NOT NULL AUTO_INCREMENT,  `title` VARCHAR(100) NULL, `channel` TEXT NULL, `url` VARCHAR(1000) NULL, `query` VARCHAR(45) NULL,  `source` VARCHAR(45) NULL, PRIMARY KEY (`id`), UNIQUE INDEX `url_UNIQUE` (`url` ASC) VISIBLE);"
                db_connection.execute(sql)
                print('create table')
            except:
                print(end='')

            sql = "SELECT count(*) FROM youtube_openApi WHERE url = %s"
            result = db_connection.execute(sql, (document['id']['videoId']))
            result = (result.first()[0])
            if result > 0:
                print('skip')
            else:
                sql = "INSERT INTO youtube_openApi (title, channel, url, query, source) VALUES (%s, %s, %s, %s, %s)"
                db_connection.execute(sql, (document['snippet']['title'], document['snippet']['channelTitle'], document['id']['videoId'], query, 'youtube_comment'))
                print(document['id']['videoId']+' done')
        except:
            continue

    return result_list, urls

def get_video_comments(query, urls):
    db_connection_str = 'mysql+pymysql://saso:saso@localhost/CRAWLING'
    db_connection = create_engine(db_connection_str)

    result = []
    comments = []
    api_obj = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
    id = 0

    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               "]+", flags=re.UNICODE)


    for i, url in enumerate(urls):
        try:
            sql = "CREATE TABLE `CRAWLING`.`Crawl_youtube` (  `id` INT NOT NULL AUTO_INCREMENT,  `url` VARCHAR(100) NULL, `content` TEXT NULL, `author` VARCHAR(45) NULL, `postdate` DATETIME NULL, `query` VARCHAR(45) NULL,  `source` VARCHAR(45) NULL, `num_likes` INT NULL, PRIMARY KEY (`id`));"
            db_connection.execute(sql)
            print('create table')
        except:
            print(end='')

        sql = "SELECT count(*) FROM Crawl_youtube WHERE url = %s"
        result_db = db_connection.execute(sql, (url))
        result_db = (result_db.first()[0])
        if result_db > 0:
            print('skip')
        else:
            try:
                sql = "INSERT INTO Crawl_youtube (url, content, author, postdate, query, source, num_likes) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                response = api_obj.commentThreads().list(part='snippet,replies', videoId=url, maxResults=100).execute()
                while response:
                    for item in response['items']:
                        comment = item['snippet']['topLevelComment']['snippet']
                        text = comment['textDisplay'].replace("\r", "").replace("<br>", "").replace("</br>", "").replace("\u200d", "").replace("🧡", "").replace("🤮", "").replace("🥺", "").replace("🤔", "").replace("❤️", "").replace("🩹", "").replace("☀️", "").replace("🤭" ,"")\
                            .replace("🥰", "").replace("🤍", "").replace("🤢", "")
                        comments = [{'id': id, 'url': url, 'keyword': query, 'content': text,
                                     'author': comment['authorDisplayName'],
                                     'date': comment['publishedAt'].replace("-", ""), 'source': 'Youtube',
                                     'num_likes': comment['likeCount']}]
                        print(text)
                        db_connection.execute(sql, (
                        url, emoji_pattern.sub(r'', text), emoji_pattern.sub(r'',comment['authorDisplayName']), comment['publishedAt'].replace("-", "")[:8], query,
                        'youtube_comment', comment['likeCount']))

                        df = pd.DataFrame(comments)
                        df.to_csv('Crawler/Crawling_Result/CONTENT_DATA/' + query + '_Youtube_Comment' + '.csv',
                                  mode='a',
                                  header=False, index=False)
                        id += 1
                        if item['snippet']['totalReplyCount'] > 0:
                            for reply_item in item['replies']['comments']:
                                reply = reply_item['snippet']
                                text = reply['textDisplay'].replace("\r", "").replace("<br>", "").replace("</br>", "").replace("\u200d", "").replace("🧡", "").replace("🤮", "").replace("🥺", "").replace("🤔", "").replace("❤️", "").replace("🩹", "").replace("☀️", "").replace("🤭" ,"")\
                                    .replace("🥰", "").replace("🤍", "").replace("🤢", "")
                                comments = [{'id': id, 'url': url, 'keyword': query, 'content': text,
                                             'author': reply['authorDisplayName'],
                                             'date': reply['publishedAt'].replace("-", ""), 'source': 'Youtube',
                                             'num_likes': reply['likeCount']}]

                                db_connection.execute(sql, (url, emoji_pattern.sub(r'', text), emoji_pattern.sub(r'', reply['authorDisplayName']), reply['publishedAt'].replace("-", "")[:8], query, 'youtube_comment',comment['likeCount']))


                                df = pd.DataFrame(comments)
                                df.to_csv('Crawler/Crawling_Result/CONTENT_DATA/' + query + '_Youtube_Comment' + '.csv',
                                          mode='a', header=False, index=False)
                                id += 1
                    if 'nextPageToken' in response:
                        response = api_obj.commentThreads().list(part='snippet,replies', videoId=url,
                                                                 pageToken=response['nextPageToken'],
                                                                 maxResults=100).execute()
                    else:
                        break
                result.append(comments)
                time.sleep(0.5)
            except HttpError as err:
                print('index', i, 'error code', err.status_code)
            print(url + ' done')

    return result