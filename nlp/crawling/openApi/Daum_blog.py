import requests
import json
import pandas as pd
from urllib.parse import urlparse
import config

############ 카카오 검색 API를 이용한 '깃대종' 블로그/카페 검색 가시화  https://blog.daum.net/geoscience/1412

def request_daum(source, query, page):
    if source == 'blog':
        url = "https://dapi.kakao.com/v2/search/blog?&query="+query+"&size=50"+"&page="+str(page)
    elif source == 'cafe':
        url = "https://dapi.kakao.com/v2/search/cafe?&query="+query+"&size=50"+"&page="+str(page)
    else:
        return False

    header = {'authorization':'KakaoAK '+config.CRWALING_CONFIG['Daum_REST_API_KEY']}

    r = requests.get(urlparse(url).geturl(), headers=header)
    if r.status_code == 200:
        return r.json()
    else:
        return r.error

def get_daum(source, query):
    list=[]
    page = 1
    if source == 'blog':
        while page <= 50:
            json_obj = request_daum(source, query, page)
            for document in json_obj['documents']:
                val = [document['title'].replace("<b>", "").replace("</b>", ""),
                       document['contents'].replace("<b>", "").replace("</b>", "").replace("&lt;", "").replace("&gt;", ""),
                       document['blogname'], document['datetime'].replace("-", ""), document['url']]
                list.append(val)
            if json_obj['meta']['is_end'] is True: break
            page += 1
    elif source == 'cafe':
        while page <= 50:
            json_obj = request_daum(source, query, page)
            for document in json_obj['documents']:
                val = [document['title'].replace("<b>", "").replace("</b>", ""),
                       document['contents'].replace("<b>", "").replace("</b>", ""),
                       document['cafename'].replace("&lt;","").replace("&gt;",""), document['datetime'].replace("-", ""), document['url']]
                list.append(val)
            if json_obj['meta']['is_end'] is True: break
            page += 1
    return list


def url_daum(query):
    json_list_blog = get_daum('blog', query)
    df_b = pd.DataFrame(json_list_blog, columns=['title', 'contents', 'name', 'postdate', 'url'])
    df_b['query'] = query
    df_b['source'] = '다음블로그'
    df_b.to_excel('Crawler/Crawling_Result/URL_DATA/'+query+'_Daum_blog'+'.xlsx', index=True, index_label = "id")


    json_list_cafe = get_daum('cafe', query)
    df_c = pd.DataFrame(json_list_cafe, columns=['title', 'contents', 'name', 'postdate', 'url'])
    df_c['query'] = query
    df_c['source'] = '다음카페'
    df_c.to_excel('Crawler/Crawling_Result/URL_DATA/'+query+'_Daum_cafe'+'.xlsx', index=True, index_label = "id")