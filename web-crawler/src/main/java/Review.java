import java.util.HashMap;

public class Review {
    HashMap<String, Integer> stars = null;
    String text;

    public Review(String text, HashMap<String, Integer> stars) {
        this.text = text;

        this.stars = stars;
    }

    public Review(String text) {
        this.text = text;
    }

    public Integer getAvgStars() {
        Integer result = 0;

        if (this.stars == null) return null;

        for (Integer point : this.stars.values()) {
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
