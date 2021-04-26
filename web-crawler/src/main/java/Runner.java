import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.select.Selector;
import org.jsoup.nodes.Element;

import java.io.IOException;

public class Runner {
    public static void main(String[] args) throws IOException {

        WebpageI sungyesa = new Sungyesa();
        sungyesa.getReviews();
        sungyesa.avgStars();

//        String cms = "cms_*";
//        try {
//
//        Document doc = Jsoup.connect("https://sungyesa.com/new/bbs/board.php?bo_table=hlist&wr_id=23334#cs").get();
//        Elements tabContents = doc.select("div.tab1_content");
//        Elements stars = tabContents.select("div.star_icon_div > span");
//
//        for (Element e: stars) {
//            System.out.println(e.attr("style"));
//            System.out.println(e.toString());
//        }
//
//        } catch (Exception exception) {
//            System.out.println("error");
//            System.out.println(exception.getStackTrace());
//        }

        //        System.out.println(doc.select("div:contains(상담전문성)"));
//        System.out.println(doc.select("div:containsOwn(상담전문성)+div").);


    }
}
