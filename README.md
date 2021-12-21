# 2021-1-CECD3-SASO-2   
🌲 NLP 감정 분석을 통한 마케팅 시장 분석

## Installation
 - React, Flask 를 사용합니다. <br/>
 - 문장 전처리시 Khaiii 라이브러리를 사용하기 때문에 맥 혹은 리눅스 환경을 권장합니다. <br />
 - **huggingface transformer, sentence transformers, tokenizers** 라이브러리를 사용하기 때문에 가상환경(conda) 사용을 권장합니다. <br />
 - python 버전 문제로 ETRI KorBERT 에서 SKT KoGPT2로 변경하였습니다. <br />
 - react template 으로 react shard-dashborad를 사용하였습니다. <br />
    - https://github.com/DesignRevision/shards-dashboard/tree/525efdca736a2203b8c3e5f8f64c766841e71c57 <br>
 - nlp 서버를 정상적으로 동작시키기 위해선 fine-tuning 된 모델, DataBase, GPU 가 필요합니다. <br />
 - 웹서버 NGINX 설정 또한 필요합니다. <br />
 - 실시간 크롤링을 위해선 네이버, 구글, 다음 Open API Key 발급이 필요합니다.
 - 설치 환경을 Ubuntu 18.04 버전으로 가정 합니다. <br />

React
```
git clone --recurse-submodules https://github.com/CSID-DGU/2021-1-CECD3-SASO-2.git
cd 2021-1-CECD3-SASO-2/front
npm install
npm run build
```

Flask
```python
conda create -n <환경명> python=3.9.7
cd 2021-1-CECD3-SASO-2/nlp
conda activate <환경명>
pip install -r requriements.txt
```

## Fine-tuning
 - Fine-tuning 을 하기 위해선 Pre-training 된 모델이 필요합니다.<br />
 - 하드웨어(GPU), Tensorflow=2.7 와 호환되는 NVIDIA DRIVER, CUDA, CUDNN 설치를 권장합니다. <br />
...


## Demo
![영상파일](https://user-images.githubusercontent.com/66078685/144558506-197ec37d-622f-4355-b196-f570e3772614.gif) <br>
![영상파일](https://user-images.githubusercontent.com/66078685/144559424-94c1ccff-0dc4-405e-bb62-f959a3e19a16.gif) <br>




## Developer
🌲 장준표,  🌲 구미송,  🌲 최선욱


