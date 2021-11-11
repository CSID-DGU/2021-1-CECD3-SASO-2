import pandas as pd
import openpyxl

#excel 항목
# id
# keyword
# content
# sentiAnal
# source
# postdate

def read_pandas(path):
    df = pd.read_excel(path)
    df = df['sentiAnal']
    sentiAnal_list = df.tolist()

    return sentiAnal_list

def read_excel(path, this_year, last_year):
    df = pd.read_excel(path)
    df['postdate'] = df['postdate'].astype(str)
    correntData = df[df.postdate.str.startswith(this_year)]
    pastData = df[df.postdate.str.startswith(last_year)]

    return correntData, pastData


def make_listDict(items):
    dict_list = []
    for item in items:
        item = eval(item)
        dict_list.append(item)
    return dict_list

def sortByFrequency(items):
    key_list = {}
    for item in items:
        key_item = item.keys()
        for key in key_item:
            try:
                key_list[key] += 1
            except:
                key_list[key] = 1
    return key_list

def countPosNegword(items):
    pos, neg, mid = 0, 0, 0
    for item in items:
        value_item = item.values()
        for value in value_item:
            if value > 0:
                pos += 1
            elif value < 0:
                neg += 1
            else:
                mid += 1
    return pos, neg, mid

def pathTest(path):
    sentiAnal_List = read_pandas(path)
    dict_list = make_listDict(sentiAnal_List)  # db로 만들목록
    cur, pas = read_excel(path, '2021', '2020')

    return dict_list, cur, pas

# path = './model/data/삼성톡스앤필_Youtube_Comment.xlsx'
# sentiAnal_List = read_pandas(path)
# dict_list = make_listDict(sentiAnal_List) # db로 만들목록

# cur, pas = read_excel(path,'2021', '2020')


# a = read_pandas(path) #xlsx to list
# b = make_listDict(a) #list to dict_list
#
# c = sortByFrequency(b) #dict_list to sort by key frequency
# d = sorted(c.items() , key=lambda x:x[1], reverse=True)



