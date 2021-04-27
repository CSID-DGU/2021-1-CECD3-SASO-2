import java.util.ArrayList;
import java.util.HashMap;

public class Review {

    HashMap<String, Integer> stars = null;


    String text;

    public Review(String text, HashMap<String, Integer> stars) {
        this.text = text;
        this.stars = stars;
    }

    public Integer getAvgStars() throws Exception {
        Integer result = 0;

        if (this.stars == null) {
            throw new Exception("Stars is null");
        }
        for (Integer point: this.stars.values()){
            result += point;
        }

        return result / this.stars.size();
    }

    public String getText() {
        return text;
    }

    @Override
    public String toString() {
        return "Review{" +
                "stars=" + stars +
                ", text='" + text + '\'' +
                '}';
    }
}
