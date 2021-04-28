import java.util.ArrayList;

// 크롤링할 객체들을 관리하는  컨테이너 객체
public class CrawlerContainer {
    ArrayList<Crawler> webpages = new ArrayList<>();

    public CrawlerContainer() {
        addWebpage(new Sungyesa(100));
    }

    public void addWebpage(Crawler webpage) {
        this.webpages.add(webpage);
    }

    public ArrayList<Review> getReviews() throws Exception {
        ArrayList<Review> result = new ArrayList<>();

        for (Crawler webpage: webpages) {
            result.addAll(webpage.getReviews());
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

