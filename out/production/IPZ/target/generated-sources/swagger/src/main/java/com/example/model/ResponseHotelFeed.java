package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelFeedFeed;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelFeed
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelFeed   {
  @JsonProperty("feed")
  @Valid
  private List<ResponseHotelFeedFeed> feed = null;

  public ResponseHotelFeed feed(List<ResponseHotelFeedFeed> feed) {
    this.feed = feed;
    return this;
  }

  public ResponseHotelFeed addFeedItem(ResponseHotelFeedFeed feedItem) {
    if (this.feed == null) {
      this.feed = new ArrayList<>();
    }
    this.feed.add(feedItem);
    return this;
  }

  /**
   * Get feed
   * @return feed
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelFeedFeed> getFeed() {
    return feed;
  }

  public void setFeed(List<ResponseHotelFeedFeed> feed) {
    this.feed = feed;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelFeed responseHotelFeed = (ResponseHotelFeed) o;
    return Objects.equals(this.feed, responseHotelFeed.feed);
  }

  @Override
  public int hashCode() {
    return Objects.hash(feed);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelFeed {\n");
    
    sb.append("    feed: ").append(toIndentedString(feed)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
