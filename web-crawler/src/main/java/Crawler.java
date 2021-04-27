import java.lang.reflect.Array;
import java.util.ArrayList;

public class Crawler {
    ArrayList<WebpageI> webpages = new ArrayList<>();

    public Crawler() {
        webpages.add(new Sungyesa());
    }

    public void addWebpage(WebpageI webpage) {
        this.webpages.add(webpage);
    }

    public ArrayList<Review> getReviews() throws Exception {
        ArrayList<Review> result = new ArrayList<>();

        for (WebpageI webpage: webpages) {
            for (Review r: webpage.getReviewsAndStars()){
                result.add(r);
            }
        }

        System.out.println("[");
        for (Review r : result) {
            System.out.println("{\"text\" : \"" + r.getText() + "\", ");
            System.out.println("\"avgStar\" : \"" + r.getAvgStars() +"\" },");
        }
        System.out.println("]");
        return result;
    }

}
