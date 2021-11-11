import time
from Crawling_modules import URL_Crawler, BLOG_Crawler, YOUTUBE_Cralwer
from Get_Database import get_blog_url, get_youtube

if __name__ == "__main__":
    start = time.time()
    query = '순천오병원'
    # 생기한의원, 삼성톡스앤필, 서울대병원, 순천오병원

    # URL_Crawler(query)
    # BLOG_Crawler(query)
    YOUTUBE_Cralwer(query)
    # title, content, postdate, url, source = get_blog_url(query)
    # content, postdate, url, source = get_youtube(query)




    #############감성 분석##################
    print("time :", time.time() - start)
