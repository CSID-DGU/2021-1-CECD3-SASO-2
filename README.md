# 2021-1-CECD3-SASO-2   
NLP 감정 분석을 통한 마케팅 시장 분석

## Installation
 - react, flask 설치가 필요합니다. <br/>
 - 문장 전처리시 Khaiii 라이브러리를 사용하기 때문에 맥 혹은 리눅스 환경을 권장합니다. <br />
 - **huggingface transformer, sentence transformers, tokenizers** 라이브러리를 사용하기 때문에 가상환경(conda) 사용을 권장합니다. <br />
 - python 버전 문제로 ETRI KorBERT 에서 SKT KoGPT2로 변경하였습니다. <br />
 - react template 으로 react shard-dashborad를 사용하였습니다. <br />
    - https://github.com/DesignRevision/shards-dashboard/tree/525efdca736a2203b8c3e5f8f64c766841e71c57 <br>
 - nlp 서버를 정상적으로 동작시키기 위해선 fine-tuning 된 모델, DataBase 가 필요합니다. <br />
 - 웹서버 NGINX 설정 또한 필요합니다. <br />
 - 설치 환경을 Ubuntu 18.04 버전으로 가정 합니다. <br />

react
```
git clone https://github.com/CSID-DGU/2021-1-CECD3-SASO-2.git
cd 2021-1-CECD3-SASO-2/front/src
git clone https://github.com/DesignRevision/shards-dashboard.git
cd ../..
npm install
npm run build
```

flask
```python
conda create -n <환경명> python=3.9.7
conda activate <환경명>
cd 2021-1-CECD3-SASO-2/front/src
pip install -r requriements.txt
```

## Fine-tuning
...

## 

## DB, 필요 라이브러리 설치, NGINX
...

## Demo
...

## Developer
장준표,  구미송,  최선욱


