# 2021-1-CECD3-SASO-2   
π² NLP κ°μ  λΆμμ ν΅ν λ§μΌν μμ₯ λΆμ

## Installation
 - React, Flask λ₯Ό μ¬μ©ν©λλ€. <br/>
 - λ¬Έμ₯ μ μ²λ¦¬μ Khaiii λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©νκΈ° λλ¬Έμ λ§₯ νΉμ λ¦¬λμ€ νκ²½μ κΆμ₯ν©λλ€. <br />
 - **huggingface transformer, sentence transformers, tokenizers** λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©νκΈ° λλ¬Έμ κ°μνκ²½(conda) μ¬μ©μ κΆμ₯ν©λλ€. <br />
 - python λ²μ  λ¬Έμ λ‘ ETRI KorBERT μμ SKT KoGPT2λ‘ λ³κ²½νμμ΅λλ€. <br />
 - react template μΌλ‘ react shard-dashboradλ₯Ό μ¬μ©νμμ΅λλ€. <br />
    - https://github.com/DesignRevision/shards-dashboard/tree/525efdca736a2203b8c3e5f8f64c766841e71c57 <br>
 - nlp μλ²λ₯Ό μ μμ μΌλ‘ λμμν€κΈ° μν΄μ  fine-tuning λ λͺ¨λΈ, DataBase, GPU κ° νμν©λλ€. <br />
 - μΉμλ² NGINX μ€μ  λν νμν©λλ€. <br />
 - μ€μκ° ν¬λ‘€λ§μ μν΄μ  λ€μ΄λ², κ΅¬κΈ, λ€μ Open API Key λ°κΈμ΄ νμν©λλ€.
 - μ€μΉ νκ²½μ Ubuntu 18.04 λ²μ μΌλ‘ κ°μ  ν©λλ€. <br />

React
```
git clone --recurse-submodules https://github.com/CSID-DGU/2021-1-CECD3-SASO-2.git
cd 2021-1-CECD3-SASO-2/front
npm install
npm run build
```

Flask
```python
conda create -n <νκ²½λͺ> python=3.9.7
cd 2021-1-CECD3-SASO-2/nlp
conda activate <νκ²½λͺ>
pip install -r requriements.txt
```

## Fine-tuning
 - Fine-tuning μ νκΈ° μν΄μ  Pre-training λ λͺ¨λΈμ΄ νμν©λλ€.<br />
 - νλμ¨μ΄(GPU), Tensorflow=2.7 μ νΈνλλ NVIDIA DRIVER, CUDA, CUDNN μ€μΉλ₯Ό κΆμ₯ν©λλ€. <br />
...


## Demo
![μμνμΌ](https://user-images.githubusercontent.com/66078685/144558506-197ec37d-622f-4355-b196-f570e3772614.gif) <br>
![μμνμΌ](https://user-images.githubusercontent.com/66078685/144559424-94c1ccff-0dc4-405e-bb62-f959a3e19a16.gif) <br>




## Developer
π² μ₯μ€ν,  π² κ΅¬λ―Έμ‘,  π² μ΅μ μ±


