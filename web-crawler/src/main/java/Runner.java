import java.util.ArrayList;

public class Runner {
    public static void main(String[] args) throws Exception {
        CrawlerContainer crawlerContainer = new CrawlerContainer();
        ArrayList<Review> reviews = crawlerContainer.getReviews();



        //리뷰 + 평점 존재하는 리뷰는 파일로 만들고
        //전체 리뷰는 디비에 저장
    }
}
