import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;


// 해당 사이트에서 데이터를 가지고 올 책임이 있다.
public class Sungyesa implements Crawler {
    private String baseUrl = "https://sungyesa.com";
    private ArrayList<Document> documents = new ArrayList<>();
    private static final int MAX_PAGE_INDEX = 10000;

    public Sungyesa(int crawlingSize) {
        System.out.println("sugn");
        ArrayList<Review> result = null;
        // 멀티 Thread 병렬 처리
        for (int i = 1; i + crawlingSize < MAX_PAGE_INDEX; i += crawlingSize) {
            JSONArray jsonArray = new JSONArray();
            result = crawlingPage(i, i + crawlingSize);

            for (Review r : result) {
                JSONObject obj = new JSONObject();

                obj.put("text", r.getText());
                obj.put("avgStar", r.getAvgStars());

                if (obj.keySet().size() != 2) continue;
                jsonArray.put(obj);
            }

            File file = new File("/home/ec2-user/crawling-server/crawling-reviews");

            if (!file.exists()) {
                try {
                    file.createNewFile();

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            try {
                BufferedWriter fw = new BufferedWriter(new FileWriter(file, true));

                fw.write(jsonArray.toString() + ',');
                fw.flush();
                fw.close();

            } catch (Exception e) {
                e.printStackTrace();
            }

            System.out.println(jsonArray.toString());
            try {
                Thread.sleep(1000 * 60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public ArrayList<Review> crawlingPage(int startPageIndex, int endPageIndex) {
        ArrayList<Review> result = null;
        ArrayList<String> urls = null;
        ArrayList<Document> documents = null;
        urls = (setConnectUrl(startPageIndex, endPageIndex));
        documents = connect(urls);
        result = scraping(documents);

        return result;
    }

    // 연결할 Url을 설정하는 함수, [1, idRange] 범위까지 페이지 url을 설정한다.
    private ArrayList<String> setConnectUrl(int start, int end) {
        ArrayList<String> urls = new ArrayList<>();

        for (int i = start; i < end; i++) {
            urls.add(baseUrl + "/new/bbs/board.php?bo_table=hlist&wr_id=" + i + "#cs");
        }

        return urls;
    }

    private ArrayList<Document> connect(ArrayList<String> urls) {
        ArrayList<Document> documents = new ArrayList<>();

        for (String url : urls) {
            try {
                Document doc = Jsoup.connect(url).get();
                documents.add(doc);
            } catch (IOException exception) {
                System.out.println(Arrays.toString(exception.getStackTrace()));
            }
        }

        return documents;
    }

    private ArrayList<Review> scraping(ArrayList<Document> documents) {
        ArrayList<String> reviews = null;
        ArrayList<HashMap<String, Integer>> ratings = null;
        ArrayList<Review> result = new ArrayList<>();

        for (Document doc : documents) {
            Elements reviewArea = doc.select("textarea[id*=save]");
            Elements tabContents = doc.select("div.tab1_content");
            Elements stars = tabContents.select("div.star_icon_div > span");

            reviews = setReviewsFromDoc(reviewArea);
            ratings = setStarsFromDoc(stars);

            if (reviews.size() != ratings.size()) continue;

            for (int i = 0; i < reviews.size(); i++) {
                result.add(new Review(reviews.get(i), ratings.get(i)));
            }
        }

        return result;
    }

    private ArrayList<String> setReviewsFromDoc(Elements reviews) {
        ArrayList<String> reviewText = new ArrayList<>();

        for (Element r : reviews) {
            reviewText.add(r.text());
        }

        return reviewText;
    }

    private ArrayList<HashMap<String, Integer>> setStarsFromDoc(Elements stars) {
        ArrayList<HashMap<String, Integer>> ratings = new ArrayList<>();
        String[] starKey = {"의사친절도", "상담전문성", "스탭친절도", "병원시설", "수술기대치"};
        HashMap<String, Integer> starMap = new HashMap<>();

        for (int i = 0; i < stars.size(); i += 5) {
            for (int j = i; j < i + 5 && j < stars.size(); j++) {
                String[] a = stars.get(j).attr("style").split(":");
                starMap.put(starKey[j % 5], percentToInteger(a[1]));
            }

            ratings.add(starMap);
            starMap = new HashMap<>();
        }

        return ratings;
    }

    private Integer percentToInteger(String percent) {
        String point = percent.split("%")[0];
        return Integer.parseInt(point);
    }

    @Override
    public ArrayList<Review> getReviews() {
        return null;
    }
}
