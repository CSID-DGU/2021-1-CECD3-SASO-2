import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;

public class Runner {
    public static void main(String[] args) throws IOException {

        String cms = "cms_*";

        Document doc = Jsoup.connect("https://sungyesa.com/new/bbs/board.php?bo_table=hlist&wr_id=2#cs").get();
//        System.out.println(doc.select("div:contains(상담전문성)"));
//        System.out.println(doc.select("div:containsOwn(상담전문성)+div").);


        System.out.println(doc.select("textarea[id*=save]"));

    }
}
