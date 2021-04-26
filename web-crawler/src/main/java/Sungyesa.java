import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Sungyesa implements WebpageI{
    private String baseUrl = "https://sungyesa.com";

    private ArrayList<Document> documents = new ArrayList<>();
    private ArrayList<String> urls = new ArrayList<>();
    private ArrayList<String> reviews = new ArrayList<>();
    private ArrayList<HashMap<String, Integer>> stars = new ArrayList<>();

    public Sungyesa() {
        setConnectUrl(23334,23335);
        connect();
        scraping();
    }

    // 연결할 Url을 설정하는 함수, [1, idRange] 범위까지 페이지 url을 설정한다.
    private void setConnectUrl(int start, int end) {
        for (int i = start; i < end; i++) {
            urls.add(baseUrl + "/new/bbs/board.php?bo_table=hlist&wr_id=" + i + "#cs");
        }
    }

    private void connect()  {
        for (String url : this.urls) {
            try{
                Document doc = Jsoup.connect(url).get();
                documents.add(doc);
            } catch (IOException exception) {
                System.out.println(Arrays.toString(exception.getStackTrace()));
            }
        }
    }

    private void scraping() {
        for (Document doc: this.documents) {
            Elements reviewArea = doc.select("textarea[id*=save]");
            Elements tabContents = doc.select("div.tab1_content");

            Elements stars = tabContents.select("div.star_icon_div > span");

            setReviewsFromDoc(reviewArea);
            setStarsFromDoc(stars);
        }
    }

    private void setReviewsFromDoc(Elements reviews) {
        for (Element r: reviews) {
            this.reviews.add(r.text());
        }
    }

    private void setStarsFromDoc(Elements stars) {
        String[] starKey = {"의사친절도", "상담전문성", "스탭친절도", "병원시설", "수술기대치"};

        HashMap<String, Integer> starMap = new HashMap<>();

        for (int i = 0; i < stars.size(); i++) {
            if (i != 0 && i % 5 == 0) {
                this.stars.add(starMap);
                starMap.clear();
            }

            String[] a = stars.get(i).attr("style").split(":");
            starMap.put(starKey[i%5], percentToInteger(a[1]));
        }
    }

    private Integer percentToInteger(String percent) {
        String point = percent.split("%")[0];
        return Integer.parseInt(point);
    }

    @Override
    public ArrayList<String> getReviews() {

        for (String s: this.reviews) {
            System.out.println(s);
        }
        return null;
    }

    @Override
    public Double avgStars() {
        for (HashMap<String,Integer> s: this.stars) {
            for (String key: s.keySet()) {
                System.out.println("Key: " + key + ", Value: " +s.get(key));
            }
        }
        return null;
    }
}
