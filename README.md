# 2021-1-CECD3-SASO-2 <br/>
# NLP 감정 분석을 통한 마케팅 시장 분석<br/>
> ## Project
* 댓글 리뷰를 크롤링 
<br/>

 ![image](https://user-images.githubusercontent.com/22928068/120779216-d3274d80-c561-11eb-94cd-d76b2644653e.png)
> ## Developer
<pre>
팀장 : 2016112146 장준표
팀원 : 2015112100 최선욱
팀원 : 2017112111 구미송
</pre><br/>

> ## Developer Tool
* Spring Java (Server)
* ReactJS (Frontend)
* MySQL (Database)
* Python TensorFlow (NLP analysis)
<br/>


## Crawling Server

### Installation

```
git clone https://github.com/CSID-DGU/2021-1-CECD3-SASO-2.git

cd 2021-1-CECD3-SASO-2/web-crawler

./gradlew build && java -jar build/libs/web-crawler-0.1.0.jar

```

### 진행 결과물

Java를 이용하여 웹 크롤러를 구현했으며 이를 AWS EC2 서버에 배포했다. 크롤러는 다음과 같이 하루에 한번 주기적으로 성형 커뮤니티들의 리뷰들을 가져오고 이를 FIle 로 저장한다. 

![image](https://user-images.githubusercontent.com/22928068/122672807-67530f00-d208-11eb-88d6-59b856decfa7.png)


**[크롤링 된 리뷰]**

 ![image](https://user-images.githubusercontent.com/22928068/122673172-3ecc1480-d20a-11eb-8d2a-c6668187e1bf.png)


**[EC2에 저장되는 크롤링 파일]**

 

 

File로 저장됨과 동시에 DB에 Insert하여 웹 크롤러가 한번 크롤링한 결과물에 쉽게 관리할 수 있도록 한다. 저장된 리뷰들을 조회하여 Json 파일 형태로 하여 NLP 서버와 통신할 수 있도록 웹 크롤링 서버를 구현하였다.

![image](https://user-images.githubusercontent.com/22928068/122672823-7934b200-d208-11eb-994e-7bab60a94b33.png)

**[JSON 파일 형식]**   


## NLP 
### 긍부정 학습 모델 제작
![image](https://user-images.githubusercontent.com/66078685/122672904-df213980-d208-11eb-810f-7d9ba9145eb4.png)


다음과 같이 리뷰 데이터를 JSON 형식으로 받으면 각 리뷰를 Tokenized 작업을 수행한다. 이 작업을 수행한다면 단어의 품사별로 나눠지며 각 단어의 상위 빈도수에 따른 리스트를 생성할 수 있다. 후에 각 리뷰 마다 상위 빈도수의 단어의 개수를 x Label, 별점을 y Label을 설정하여 생성한 모델에 삽입하고 학습된 모델을 만든다.   

![image](https://user-images.githubusercontent.com/66078685/122673063-b3528380-d209-11eb-9d9b-d15a0eea1074.png)


만든 모델을 불러와 긍.부정 메서드를 구현하고 크롤링한 데이터를 저장하는 DB 에서 추가적인 리뷰를 가져와 긍부정 판단을 수행한다.
후에 이 결과는 API를 통해 프론트 쪽으로 시각화 작업이 이루어진다. 



### 감상 사전 제작
![image](https://user-images.githubusercontent.com/66078685/122672987-62db2600-d209-11eb-8eaa-84172ff59aa0.png)


> ## Installation
 NLP/jsonEdit.ipynp 파일로 크롤링한 데이터 json 형식으로 전환   
 NLP/NLP.ipynb 파일을 순차적으로 실행   


 
 ## 웹(Front-End)
 ### Installation
 ```
 git clone https://github.com/CSID-DGU/2021-1-CECD3-SASO-2.git
 
 cd 2021-1-CECD3-SASO-2/front/web_front
 
 npm install
 
 npm start
 ```

