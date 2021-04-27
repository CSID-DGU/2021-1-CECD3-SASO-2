import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Sungyesa implements WebpageI {
    private String baseUrl = "https://sungyesa.com";
    private ArrayList<Document> documents = new ArrayList<>();
    private ArrayList<String> urls = new ArrayList<>();
    private ArrayList<Review> reviews = new ArrayList<>();

    public Sungyesa() {
        setConnectUrl(1, 100);
        connect();
        scraping();

    }

    // 연결할 Url을 설정하는 함수, [1, idRange] 범위까지 페이지 url을 설정한다.
    private void setConnectUrl(int start, int end) {
        for (int i = start; i < end; i++) {
            urls.add(baseUrl + "/new/bbs/board.php?bo_table=hlist&wr_id=" + i + "#cs");
        }
    }

    private void connect() {
        for (String url : this.urls) {
            try {
                Document doc = Jsoup.connect(url).get();
                documents.add(doc);
            } catch (IOException exception) {
                System.out.println(Arrays.toString(exception.getStackTrace()));
            }
        }
    }

    private void scraping() {

        ArrayList<String> reviews = null;
        ArrayList<HashMap<String, Integer>> ratings = null;

        for (Document doc : this.documents) {
            Elements reviewArea = doc.select("textarea[id*=save]");
            Elements tabContents = doc.select("div.tab1_content");
            Elements stars = tabContents.select("div.star_icon_div > span");

            reviews = setReviewsFromDoc(reviewArea);
            ratings = setStarsFromDoc(stars);

            if (reviews.size() != ratings.size()) continue;
            for (int i = 0; i < reviews.size(); i++) {
                this.reviews.add(new Review(reviews.get(i), ratings.get(i)));
            }


        }
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
    public ArrayList<Review> getReviewsAndStars() {

        return this.reviews;
    }
}
